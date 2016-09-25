'use strict';
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
            presenterMap[presenterName]['router'][routerName].apply(presenterMap[presenterName], data);
        }
    }
})();

Presenter.register('PQueue', 'VQueue', new Queue(), {
    'in': function (direct, inputData) {
        var queue = this.model;
        try {
            if (direct === 'left') {
                queue.unshift(inputData);
            } else {
                queue.push(inputData);
            }
        } catch (err) {
            View.trigger(this.viewName, 'error', [err]);
            return;
        }
        View.trigger(this.viewName, 'in', [direct, inputData]);
    },
    'out': function (direct) {
        var queue = this.model, value;
        try {
            if (direct === 'left') {
                value = queue.shift();
            } else {
                value = queue.pop();
            }
        } catch (err) {
            View.trigger(this.viewName, 'error', [err]);
            return;
        }
        View.trigger(this.viewName, 'out', [direct, value]);
    },
    'outById': function (index) {
        var queue = this.model, value;
        try {
            value = queue.deleteElByIndex(index);
        } catch (err) {
            View.trigger(this.viewName, 'error', [err]);
            return;
        }
        View.trigger(this.viewName, 'outById', [index ,value])
    }
});

/**
 * 排序集合
 * @type {{bubble, insert, select, quick}}
 */
var Sort = (function () {
    var defaultComparator = function (a, b) {
            return a > b;
        },
        defaultCallback = function () {

        };

    /**
     * 数组元素交换函数
     * @param arr
     * @param preIndex
     * @param nextIndex
     * @param isNeedSwap
     * @param callback
     */
    function swap(arr, preIndex, nextIndex, isNeedSwap, callback) {
        if (isNeedSwap) {
            var temp = arr[preIndex];
            arr[preIndex] = arr[nextIndex];
            arr[nextIndex] = temp;
        }
        callback();
    }

    function getComparator(args) {
        if (args.length === 3 && typeof args[1] === "function") {
            return args[1];
        } else {
            return defaultComparator;
        }
    }

    function getCallback(args) {
        if (args.length === 3 && typeof args[2] === "function") {
            return args[2];
        } else if (args.length === 2 && typeof args[1] === "function") {
            return args[1];
        } else {
            return defaultCallback;
        }
    }

    return {
        /**
         * 冒泡排序
         * @param arr
         */
        bubble: function (arr) {
            if (!Array.isArray(arr))
                throw new Error('不是一个合法的数组');
            if (!arr.length)
                return [];
            var comparator = getComparator(arguments),
                callback = getCallback(arguments);

            for (var i = 0, len = arr.length; i < len; i++) {
                for (var j = i + 1; j < len; j++) {
                    swap(arr, i, j, comparator(arr[i], arr[j]), callback);
                }
            }
            return arr;
        },
        /**
         * 插入排序
         * @param arr
         * @param swap
         */
        insert: function (arr, swap) {

        },
        /**
         * 选择排序
         * @param arr
         * @param swap
         */
        select: function (arr, swap) {

        },
        /**
         * 快速排序
         * @param arr
         * @param swap
         */
        quick: function (arr, swap) {

        }
    };
})();
