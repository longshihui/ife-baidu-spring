'use strict';

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
            search:{
              input: Util.$("#search-text"),
                btn: Util.$("#search-btn")
            },
            ElementClassName: 'queue-el'
        },
        /**
         * 创建DOM;
         * @param value
         * @returns String
         */
        createDOM = function (value) {
            var div = "<div style class>text</div>";
            div = div.replace('class', 'class="'+setting.ElementClassName + '"');
            div = div.replace('text', value);
            return div;
        },
        /**
         * 返回最后指定方向上的最后一个元素
         * @param direct
         * @returns {Node}
         */
        getQueryLastChild = function (direct) {
            return direct.toLowerCase() === 'left' ? setting.wrap.firstChild : setting.wrap.lastChild;
        },
        /**
         * 查找指定节点对应的数组下标
         * @param dom
         * @returns {number}
         */
        getDOMIndex = function (dom) {
            return Array.prototype.slice.call(setting.wrap.childNodes, 0).indexOf(dom);
        };
    return {
        listen: function () {
            var selfView = this;
            var btns = setting.btns;
            var searchGroup = setting.search;
            var wrap = setting.wrap;
            var presenterName = selfView.presenterName;

            /**
             * 左侧操作监听
             */
            Util.addDOMEvent(btns.left.inDOM, 'click', function () {
                Presenter.notify(presenterName, 'in', ['left', setting.input.value])
            });
            Util.addDOMEvent(btns.left.outDOM, 'click', function () {
                Presenter.notify(presenterName, 'out', ['left', setting.input.value])
            });

            /**
             * 右侧操作监听
             */
            Util.addDOMEvent(btns.right.inDOM, 'click', function () {
                Presenter.notify(presenterName, 'in', ['right', setting.input.value])
            });
            Util.addDOMEvent(btns.right.outDOM, 'click', function () {
                Presenter.notify(presenterName, 'out', ['right', setting.input.value])
            });

            /**
             * 指定元素弹出监听
             */
            Util.addDOMEvent(wrap, 'click', function (e) {
                var originEl = e.target || e.currentTarget;
                if (originEl === wrap) return;
                var id = getDOMIndex(originEl);
                Presenter.notify(presenterName, 'outById', [id])
            });

            /**
             * 查询
             */
            Util.addDOMEvent(searchGroup.btn, 'click', function () {
                Presenter.notify(presenterName, 'search', [searchGroup.input.value]);
            })
        },
        render: {
            'in': function (direct, inputArr) {
                var wrap = setting.wrap;
                var newEls = '';
                inputArr.forEach(function (value) {
                    newEls += createDOM(value);
                });
                if (direct === 'left') {
                    wrap.innerHTML = newEls + wrap.innerHTML;
                } else {
                    wrap.innerHTML += newEls;
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
            'searchResult': function (result) {
                var wrap = setting.wrap,
                    content = '';
                result.forEach(function (val) {
                    content += createDOM(val);
                });
                wrap.innerHTML = content;
            },
            'error': function (err) {
                alert(err.message);
            }
        }
    }
})());