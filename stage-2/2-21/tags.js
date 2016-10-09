'use strict';

/**
 * Tag组件
 */
var Tags = (function (Model, View, Presenter, $) {

    var DEFAULT_VIEW_NAME = 'TAG',
        DEFAULT_PRESENTER_NAME = 'TAG',
        INDEX = 1,
        DEFAULT_SETTING = {
            dom: {
                parent: document.body,
                inputType: 'input' || 'textarea'
            },
            style: {
                backgroundColor: '#bfb0f2', 
                color: '#fff',
                fontFamily: 'Microsoft YaHei,sans-serif'
            }
        };

    function fillOptions(options) {
        if (!options) return DEFAULT_SETTING;
    }

    /**
     * @param options
     * option = {
     *   dom: {
     *     parent: document.body
     *     inputType：input || textarea  输入框类型 input default
     *   },
     *   style:{
     *     backgroundColor: #bfb0f2  背景色
     *     color: #fff               字体色
     *     fontFamily: 'Microsoft YaHei,sans-serif' 字体家族
     *   }
     * }
     */
    return function (options) {
        var model = new Queue(),
            view = DEFAULT_VIEW_NAME + INDEX,
            presenter = DEFAULT_PRESENTER_NAME + INDEX;

        options = fillOptions(options);

        View.register(view, presenter, function () {


            return {
                listen: function () {

                },
                render: {
                    add: function () {

                    },
                    remove: function () {

                    },
                    error: function (err) {
                        alert(err.message);
                    }
                }
            }
        }());

        Presenter.register(presenter, view, model, {
            add: function (input) {
                View.trigger(this.viewName, 'add', input)
            },
            remove: function (index) {
                View.trigger(this.viewName, 'remove', index)
            }
        });
    }

})(Queue, View, Presenter, Util.$);