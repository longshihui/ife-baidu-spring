'use strict';
var Util = {
    /**
     * 封装获取DOM节点函数，减少重复代码
     * @param selector
     * @returns {Element}
     */
    $: function (selector) {
        return document.querySelector(selector);
    },
    /**
     * 事件添加函数
     * @param dom
     * @param eventName
     * @param callback
     */
    addDOMEvent: function (dom, eventName, callback) {
        if (window.addEventListener) {
            dom.addEventListener(eventName, callback, false);
        } else if (window.attachEvent) {
            dom.attachEvent(eventName, callback);
        } else {
            dom['on' + eventName] = callback;
        }
    },
    /**
     * 继承
     * @param targetObj
     * @returns {*}
     */
    extend: function (targetObj) {
        for (var i = 1, len = arguments.length; i < len; i++) {
            for (var propName in arguments[i]) {
                if (arguments[i].hasOwnProperty(propName))
                    targetObj[propName] = arguments[i][propName];
            }
        }
        return targetObj;
    },
    /**
     * 主线程休眠函数
     * @param msec
     */
    sleep: function (msec) {
        var begin = Date.now();
        while (msec > Date.now() - begin) {
        }
    }
};