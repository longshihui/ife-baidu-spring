/**
 * 通用库
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function ($) {
    'use strict';
    $.implementInterface = function (target,i) {
        if (typeof target !== 'function'){
            throw new Error(target + '这不是一个构造器');
        }
        if (typeof i !== 'object'){
            throw new Error(i + '这不是一个接口')
        }
        Object.keys(i).forEach(function (prop) {
            target.prototype[prop] = i[prop];
        });
    }
}(jQuery));
