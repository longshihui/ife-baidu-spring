'use strict';

(function (View) {
    var queue = new Queue();

    Presenter.register('PQueue', 'VQueue', queue, (function () {
        /**
         * 表单验证
         */
        var formValidator = function (arr) {
            if (arr.length === 0) {
                throw new Error('请输入一个数字!');
            }

        };
        return {
            'in': function (direct, inputData) {
                var queue = this.model;
                inputData = inputData.split(/[^0-9a-zA-Z\u4E00-\u9FFF]+/g).filter(function (val) {
                    return val.length > 0;
                });

                try {
                    formValidator(inputData);
                    
                    if (direct === 'left') {
                        inputData.forEach(function (val) {
                            queue.unshift(val);
                        })
                    } else {
                        inputData.forEach(function (val) {
                            queue.push(val);
                        });
                    }
                    View.trigger(this.viewName, 'in', [direct, inputData]);
                } catch (err) {
                    View.trigger(this.viewName, 'error', [err]);
                }
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
            },
            'search': function (searchStr) {
                if (searchStr.trim().length === 0){
                    View.trigger(this.viewName, 'error', [{message: '请输入一个非空查询'}]);
                    return;
                }
                var result,
                    queueData = this.model.getData(),
                    reg = new RegExp(searchStr,'g');
                result = queueData.map(function (val) {
                    return val.replace(reg, '<span style="color: red">'+ searchStr +'</span>')
                });
                View.trigger(this.viewName, 'searchResult', [result]);
            }
        }
    })());
})(View);
