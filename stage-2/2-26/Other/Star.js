/**
 * 天体类
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function (win) {
    'use strict';
    /**
     * 天体类
     * @param type {Star.TYPE} 天体类型
     * @constructor
     */
    var Star = function (type) {
        if (type === null || type === undefined) throw new Error('未知天体');
        this.getType = function () {
            return type;
        };
    };
    /**
     * 天体类型
     * @type {{PLANET: number, FIXED_STAR: number}}
     */
    Star.TYPE = {
        'PLANET': 0,    //行星
        'FIXED_STAR': 1 //恒星
    };
    /**
     * 判断一个天体是否是指定类型
     * @param star  {Star} 天体的实例
     * @param type  {Star.TYPE} 天体的类型
     * @returns {boolean}
     */
    Star.is = function (star, type) {
        return star.getType() === type;
    };
    window.Star = Star;
}());
