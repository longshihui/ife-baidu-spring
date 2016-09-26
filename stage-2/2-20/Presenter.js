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
            presenterMap[presenterName]['router'][routerName].apply(presenterMap[presenterName], data || []);
        }
    }
})();

(function () {
    var queue = new Queue();

    Presenter.register('PQueue', 'VQueue', queue, {
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
            View.trigger(this.viewName, 'outById', [index, value])
        }
    });
})();
