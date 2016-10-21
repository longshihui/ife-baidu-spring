/**
 * File Description
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function () {
    'use strict';
    /**
     * 传输介质
     * @constructor
     */
    var Mediator = function () {
        this.data = '';
    };
    /**
     * 传输成功率
     * @type {number}
     */
    Mediator.prototype.loseRate = 0;
    /**
     * 传输延迟
     * @type {number}
     */
    Mediator.prototype.defer = 0;
    /**
     * 打包信息
     * @param msg
     */
    Mediator.prototype.pack = function (msg) {
        this.data = msg;
    };
    /**
     * 解开封装
     * @returns {*|null}
     */
    Mediator.prototype.unpack = function () {
        return this.data;
    };
    window.Mediator = Mediator;
}());
