/**
 * File Description
 * Author: Colorless.
 * Date: 2016/10/20
 * Project: ife-baidu
 */
(function (PowerSystem) {
    'use strict';
    /**
     * 太阳能能源系统
     * @constructor
     */
    var SUNPowerSystem = function () {
        PowerSystem.call(this,'SUN');
        this._currentEnvironment = null;
    };
    //继承能源系统原型
    SUNPowerSystem.prototype = Object.create(PowerSystem.prototype);
    //保存父类原型方便调用
    SUNPowerSystem.super = Object.create(PowerSystem.prototype);
    //修正constructor属性
    SUNPowerSystem.prototype.constructor = SUNPowerSystem;
    /**
     * 太阳能型能源系统充能参数
     * @type {{percent: string, environment: number}}
     */
    SUNPowerSystem.prototype.recover = {
        percent: '2%',
        environment:Star.TYPE.FIXED_STAR
    };

    SUNPowerSystem.prototype.init = function (setting) {};
    /**
     * 改变当前能源系统所处环境
     * @param env
     */
    SUNPowerSystem.prototype.changeEnvironment = function (env) {
        this._currentEnvironment = env;
    };
    /**
     * 充能
     */
    SUNPowerSystem.prototype.startRecoverPower = function () {
        var self = this,
            recoverPercentPerFrame = parseFloat(this.recover.percent) / (1000 / 20) + '%';
        self.registerLoopTimer('recoverPower', function () {
            var curEnv = self._currentEnvironment,
                recoverEnv = self.recover.environment;
            //是否满足当前充能条件
            if (curEnv === recoverEnv) {
                //每一帧增长能量
                self.increasePower(recoverPercentPerFrame);
            }
        }, 20);
    };
    /**
     * 停止充能
     */
    SUNPowerSystem.prototype.stopRecoverPower = function () {
        this.cancelTimer('recoverPower');
    };

    window.SUNPowerSystem = SUNPowerSystem;
}(PowerSystem));
