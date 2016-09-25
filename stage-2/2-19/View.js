'use strict';
/**
 * 视图管理类
 * @type {{register, cancel, getView}}
 */
var View = (function () {
    /**
     * 视图基类
     * @param viewName
     * @param presenterName
     * @constructor
     */
    function BaseView(viewName, presenterName) {
        this.name = viewName;
        this.presenterName = presenterName;
    }

    var viewMap = {};
    return {
        register: function (viewName, presenterName, obj) {
            var view = Util.extend(obj, new BaseView(viewName, presenterName));
            viewMap[viewName] = view;
            console.log(view);

            view.listen();
        },
        cancel: function (viewName) {
            delete viewMap[viewName];
        },
        trigger: function (viewName, renderName, data) {
            viewMap[viewName]['render'][renderName].apply(viewMap[viewName], data);
        }
    }
})();

View.register('VQueue', 'PQueue', (function () {

    var setting = {
            wrap: Util.$("#queue-display"),
            input: Util.$("#entry"),
            btns: {
                left: {
                    inDOM: Util.$("#left-in"),
                    outDOM: Util.$("#left-out")
                },
                right: {
                    inDOM: Util.$("#right-in"),
                    outDOM: Util.$("#right-out")
                }
            },
            ElementClassName: 'queue-el'
        },
        wrapHeight = parseInt(window.getComputedStyle(setting.wrap).height),
        /**
         * 创建DOM;
         * @param number
         * @returns {Element}
         */
        createDOM = function (number) {
            var div = document.createElement('div'),
                text = document.createTextNode(number),
                attr = document.createAttribute('class');
            attr.nodeValue = setting.ElementClassName;
            div.appendChild(text);
            div.setAttributeNode(attr);
            var marginTop = (100 - parseInt(number)) * (wrapHeight / 100);
            div.style.marginTop = marginTop + 'px';
            div.style.height = wrapHeight - marginTop + 'px';
            return div;
        },

        formValidator = function () {
            var value = setting.input.value;
            if (!/[0-9]+/g.test(value)) {
                throw new Error('请输入一个数字!');
            }
            if (10 > value || value > 100) {
                throw new Error('输入的数字必须在10至100之间');
            }
        },

        getQueryLastChild = function (direct) {
            return direct.toLowerCase() === 'left' ? setting.wrap.firstChild : setting.wrap.lastChild;
        },

        getDOMIndex = function (dom) {
            return Array.prototype.slice.call(setting.wrap.childNodes, 0).indexOf(dom);
        };
    return {
        listen: function () {
            var selfView = this;
            var btns = setting.btns;
            var wrap = setting.wrap;
            var presenterName = selfView.presenterName;

            Util.addDOMEvent(btns.left.inDOM, 'click', function () {
                try {
                    formValidator();
                } catch (err) {
                    View.trigger(selfView.name, 'error', [err]);
                    return;
                }
                Presenter.notify(presenterName, 'in', ['left', setting.input.value])
            });
            Util.addDOMEvent(btns.left.outDOM, 'click', function () {
                Presenter.notify(presenterName, 'out', ['left', setting.input.value])
            });
            Util.addDOMEvent(btns.right.inDOM, 'click', function () {
                try {
                    formValidator();
                } catch (err) {
                    View.trigger(selfView.name, 'error', [err]);
                    return;
                }
                Presenter.notify(presenterName, 'in', ['right', setting.input.value])
            });
            Util.addDOMEvent(btns.right.outDOM, 'click', function () {
                Presenter.notify(presenterName, 'out', ['right', setting.input.value])
            });

            Util.addDOMEvent(wrap, 'click', function (e) {
                var originEl = e.target || e.currentTarget;
                var id = getDOMIndex(originEl);
                Presenter.notify(presenterName, 'outById', [id])
            })
        },
        render: {
            'in': function (direct, number) {
                var wrap = setting.wrap;
                var lastNode = getQueryLastChild(direct);
                var newEl = createDOM(number);
                if (direct === 'left') {
                    wrap.insertBefore(newEl, lastNode);
                } else {
                    wrap.appendChild(newEl);
                }
            },
            'out': function (direct, number) {
                var wrap = setting.wrap;
                var lastNode = getQueryLastChild(direct);
                wrap.removeChild(lastNode);
                alert(number);
            },
            'outById': function (id, number) {
                var wrap = setting.wrap;
                wrap.removeChild(wrap.childNodes[id]);
                alert(number);
            },
            'error': function (err) {
                alert(err.message);
            }
        }
    }
})());