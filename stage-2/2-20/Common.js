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
        /**
         * 注册一个视图
         * @param viewName
         * @param presenterName
         * @param obj
         */
        register: function (viewName, presenterName, obj) {
            var view = Util.extend(obj, new BaseView(viewName, presenterName));
            viewMap[viewName] = view;
            console.log(view);

            view.listen();
        },
        /**
         * 注销一个视图
         * @param viewName
         */
        cancel: function (viewName) {
            delete viewMap[viewName];
        },
        /**
         * 触发视图的指定渲染Handle
         * @param viewName
         * @param renderName
         * @param data
         */
        trigger: function (viewName, renderName, data) {
            viewMap[viewName]['render'][renderName].apply(viewMap[viewName], data || []);
        }
    }
})();

/**
 * 中转者
 * @type {{register, cancel}}
 */
var Presenter = (function () {
    var presenterMap = {};
    return {
        /**
         * 注册一个中转者
         * @param presenterName
         * @param viewName
         * @param model
         * @param routers
         */
        register: function (presenterName, viewName, model, routers) {
            presenterMap[presenterName] = {
                model: model,
                viewName: viewName,
                router: routers
            }
        },
        /**
         * 注销一个中转者
         * @param presenterName
         */
        cancel: function (presenterName) {
            delete presenterMap[presenterName];
        },
        /**
         * 通知一个中转者
         * @param presenterName
         * @param routerName
         * @param data
         */
        notify: function (presenterName, routerName, data) {
            presenterMap[presenterName]['router'][routerName].apply(presenterMap[presenterName], data || []);
        }
    }
})();

