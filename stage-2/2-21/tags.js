(function (win, Util) {
    'use strict';

    var ENTRY_SELECTOR = '.tag-entry';

    var SUBMIT_SELECTOR = '.tag-submit';

    var TAG_LIST_SELECTOR = '.tag-list';
    var TAG_ITEM_SELECTOR = '.tag-item';

    var DELETE_BTN_CLASS = 'tag-delete';

    var SEPARATOR_REGEXP = /[ ,\r]/g;

    var DEFAULT_SETTING = {
        wrapper: null,
        selector: {
            tagList: TAG_LIST_SELECTOR,
            tagItem: TAG_ITEM_SELECTOR,
            tagEntry: ENTRY_SELECTOR,
            tagSubmit: SUBMIT_SELECTOR
        },
        separator: SEPARATOR_REGEXP,
        maxLength: Math.POSITIVE_INFINITY
    };

    var HTML_STRING = {
        tag: '<li class="{class}" data-tag-value="{value}">{deleteBtn}<span>{value}</span></li>',
        deleteBtn: '<a href="javascript:;" class="tag-delete">删除</a>'
    };

    function _getDom(options) {
        var wrapper = options.wrapper;
        var selector = options.selector;
        return {
            wrapper: wrapper,
            list: wrapper.querySelector(selector.tagList),
            entry: wrapper.querySelector(selector.tagEntry),
            submitBtn: wrapper.querySelector(selector.tagSubmit)
        }
    }

    /**
     * 创建一个新的Tag
     * @param value
     * @param options
     * @returns {String}
     * @private
     */
    function _createTag(value, options) {
        var tag = HTML_STRING.tag;
        //替换值
        tag = tag.replace(new RegExp('{value}', 'g'), value);
        //设置Class
        tag = tag.replace('{class}', options.selector.tagItem.replace('.', ''));

        //添加删除功能键
        tag = tag.replace('{deleteBtn}', HTML_STRING.deleteBtn);
        return tag;
    }

    /**
     * 清除输入框
     * @private
     */
    function _clearEntry() {
        this.getDom().entry.value = '';
    }

    /**
     * 绑定事件
     * @private
     */
    function _bindEvent() {
        var self = this,
            addEvent = Util.addDOMEvent,
            entry = this.getDom().entry,
            submitBtn = this.getDom().submitBtn,
            list = this.getDom().list,
            options = this.getOption();
        //提交数据
        if (submitBtn) {
            addEvent(submitBtn, 'click', function () {
                var values = entry.value.split(options.separator);
                values.forEach(function (value) {
                    self.add(value)
                });
                _clearEntry.call(self);
            })
        } else {
            addEvent(entry, 'keypress', function (e) {
                var isSubmit = options.separator.test(String.fromCharCode(e.keyCode));
                if (isSubmit) {
                    self.add(entry.value.substring(0, entry.value.length));
                    //由于对输入框的赋值是发生在keyboard事件之后的,利用setTimeout向事件循环队列队尾添加异步函数,即可清除此时输入的分隔符
                    setTimeout(function () {
                        _clearEntry.call(self);
                    },0);
                }

                return false;
            })
        }

        //删除Tag
        addEvent(list, 'click', function (e) {
            var target = e.target || e.srcElement;
            if (target.className === DELETE_BTN_CLASS) {
                self.remove(target.parentNode.dataset['tagValue']);
            }
        });
    }

    /**
     * 渲染Tag列表
     * @private
     */
    function _render() {
        var tagData = this.getData();
        var list = this.getDom().list;
        var options = this.getOption();
        var content = '';

        tagData.forEach(function (val) {
            content += _createTag(val, options);
        });

        list.innerHTML = content;
    }

    /**
     * 是否有Tag
     * @param value
     * @param tagData
     * @returns {boolean}
     */
    function hasTag(value, tagData) {
        return tagData.indexOf(value) >= 0;
    }

    /**
     * Tag类
     * @param options {Object}
     * @constructor
     */
    var Tags = function (options) {
        var tagData = [], dom;

        this.getData = function () {
            return tagData;
        };

        this.getOption = function () {
            return options;
        };

        this.getDom = function () {
            return dom;
        };

        if (options.wrapper == null) {
            throw new Error('没有指定Tags的wrapper')
        }

        options = Util.deepCopyObject({}, options, DEFAULT_SETTING);

        dom = _getDom(options);
    };

    Tags.prototype.init = function () {
        _bindEvent.call(this);
    };

    Tags.prototype.add = function (value) {
        value = value.trim();
        if (value === '') return;
        var tagData = this.getData();
        var options = this.getOption();
        if (hasTag(value, tagData))
            return;
        if (tagData.length < options.maxLength) {
            tagData.shift();
            tagData.push(value);
        } else {
            tagData.push(value);
        }

        _render.call(this);
    };

    Tags.prototype.remove = function (value) {
        if (!confirm('确认删除?')) {
            return;
        }
        var tagData = this.getData();

        tagData.splice(tagData.indexOf(value), 1);

        _render.call(this);
    };
    win.Tags = Tags;
}(window, Util));