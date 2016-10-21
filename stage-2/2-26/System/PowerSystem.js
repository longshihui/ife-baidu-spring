/**
 * 能源系统类
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function (TimerInterface, $) {
    'use strict';

    var MAX_POWER = 100000,
        MIN_POWER = 0,
        POWER_SYSTEM_TYPE = 'BASE';
    /**
     * 能源系统
     * @param type {String} 能源系统
     * @param setting {Object} 默认参数
     * @constructor
     */
    var PowerSystem = function (type) {
        this._type = type || POWER_SYSTEM_TYPE;
        this._totalPower = MAX_POWER;
        this._currentPower = MAX_POWER;
    };
    //实现TimerInterface
    $.implementInterface(PowerSystem, TimerInterface);
    /**
     * 减少能源量
     * @param percent 百分比
     */
    PowerSystem.prototype.reducePower = function (percent) {
        percent = parseFloat(percent) / 100;
        var total = this._totalPower,
            current = this._currentPower;
        current -= total * percent;
        this._currentPower = Math.max(current, MIN_POWER);
    };
    /**
     * 系统初始化
     */
    PowerSystem.prototype.init = function (setting) {
    };
    /**
     * 增加能源量
     * @param percent
     */
    PowerSystem.prototype.increasePower = function (percent) {
        percent = parseFloat(percent) / 100;
        var total = this._totalPower,
            current = this._currentPower;
        current += total * percent;
        this._currentPower = Math.min(current, MAX_POWER);
    };
    /**
     * 判断能源是否为空
     * @returns {boolean}
     */
    PowerSystem.prototype.isEmpty = function () {
        return this._currentPower === MIN_POWER;
    };
    /**
     * 返回剩余能量百分比
     * @returns {string}
     */
    PowerSystem.prototype.getRemainPercent = function () {
        return (this._currentPower / this._totalPower * 100).toFixed(2) + '%';
    };
    window.PowerSystem = PowerSystem;
}(TimerInterface, jQuery));
