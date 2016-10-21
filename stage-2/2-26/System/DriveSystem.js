/**
 * 动力装置类
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function ($, TimerInterface) {
    'use strict';
    var DEFAULT_TYPE_NAME = 'base';//默认型号
    var STATE = {
        UNINITIALIZED: 0,
        INITIALIZED: 1,
        RUN: 2,
        STOP: 3
    };
    /**
     * 动力系统
     * @param typeName {String} 动力系统型号
     * @param minSpeed {*} 动力系统支持的最小速度
     * @param minCostPercent {String} 动力系统的最小功耗
     * @constructor
     */
    var DriveSystem = function (typeName, minSpeed, minCostPercent) {
        this._state = STATE.UNINITIALIZED;
        this._type = typeName || DEFAULT_TYPE_NAME;
        this._minSpeed = minSpeed || 0;
        this._minCostPercent = minCostPercent || '0%';
        this._currentSpeed = 0;
        this._currentCostPercent = minCostPercent || '0%';
        this._powerSystem = null;
        this._canves = null;
    };
    //实现Timer接口
    $.implementInterface(DriveSystem, TimerInterface);
    /**
     * 初始化系统,设定相关参数
     * @param setting
     */
    DriveSystem.prototype.init = function (setting) {
        if (!setting) {
            throw new Error('动力系统初始化参数不能未空');
        }
        var self = this;
        var isSuccessInit;
        self._powerSystem = setting.powerSystem;
        self._currentSpeed = setting.speed || this._minSpeed;

        self._currentCostPercent = setting.costPercent ? Math.max(parseFloat(setting.costPercent), parseFloat(this._minCostPercent)) + '%' : this._minCostPercent;
        self._canves = setting.canvas;

        isSuccessInit = Object.keys(self).filter(function (propName) {
            return typeof self[propName] !== 'function';
        }).every(function (propName) {
            return self[propName] !== undefined;
        });
        if (isSuccessInit) {
            this._state = STATE.INITIALIZED;
        } else {
            throw new Error('动力系统未初始化成功');
        }
    };
    /**
     * 运行动力系统
     */
    DriveSystem.prototype.run = function () {
        if (this._state === STATE.UNINITIALIZED) {
            throw new Error('驱动系统未初始化')
        }
        var self = this,
            powerSystem = this._powerSystem;
        //开始运行
        self.registerLoopTimer('run', function () {
            //若能源量不为空,则运行
            if (!powerSystem.isEmpty()) {
                var costPercentPerFrame = parseFloat(self._currentCostPercent) / (1000 / 20) + '%';
                //消耗能源
                powerSystem.reducePower(costPercentPerFrame);
                //绘制飞船位置
                self.draw();
            } else {
                //动力系统停止
                self.stop();
            }
        }, 20);

        this._state = STATE.RUN;
    };
    /**
     * 停止驱动器
     */
    DriveSystem.prototype.stop = function () {
        this.cancelTimer('run');
        this._state = STATE.STOP;
    };
    /**
     * 绘制
     */
    DriveSystem.prototype.draw = function () {
    };

    DriveSystem.prototype.STATE = $.extend({}, STATE);

    window.DriveSystem = DriveSystem;
}(jQuery, TimerInterface));
