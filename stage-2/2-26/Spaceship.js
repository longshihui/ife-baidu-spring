/**
 * 飞船类
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function () {
    'use strict';
    /**
     * 创建独立的编码
     */
    var _createId = (function () {
        var count = 0;
        return function () {
            return ++count;
        }
    }());
    /**
     * 飞船构造函数
     * @constructor
     */
    var Spaceship = function () {
        this.id = _createId();               //飞船的身份卡
        this.name = 'spaceship' + this.id;   //飞船名称
        this.state = 'stop';                 //飞船的状态
        this.powerSystem = null;             //能源系统
        this.driveSystem = null;             //动力系统
        this.messageSystem = null;           //通信系统
        this.canvas = null;
    };
    /**
     * 飞船初始化
     * @param setting
     */
    Spaceship.prototype.init = function (setting) {
        this.powerSystem = setting.powerSystem;
        this.driveSystem = setting.driveSystem;
        this.messageSystem = setting.messageSystem;
        this.canvas = setting.canvas;

        this.driveSystem.init({
            powerSystem: setting.powerSystem,
            canvas: setting.canvas
        });

        this.messageSystem.init(this);
        this.messageSystem.connect(setting.communicationArea);
    };
    /**
     * 飞行
     */
    Spaceship.prototype.fly = function () {
        var self = this,
            powerSystem = this.powerSystem,
            driveSystem = this.driveSystem,
            timer;
        powerSystem.stopRecoverPower();
        driveSystem.run();
        timer = setInterval(function () {
            if (powerSystem.isEmpty()) {
                self.stop();
                clearInterval(timer);
            }
        }, 20);
        this.state = 'flying';
    };
    /**
     * 停止
     */
    Spaceship.prototype.stop = function () {
        this.driveSystem.stop();
        this.powerSystem.startRecoverPower();
        this.state = 'stop';
    };
    /**
     * 销毁
     */
    Spaceship.prototype.destroy = function () {
        this.driveSystem.stop();
        this.powerSystem.stopRecoverPower();
    };
    /**
     * 接受消息
     * @param mediator
     */
    Spaceship.prototype.reviceMessage = function (mediator) {
        var self = this;
        var message = this.messageSystem.receive(mediator);
        if (message.id === this.id) {
            switch (message.command) {
                case 'fly':
                    self.fly();
                    break;
                case 'stop':
                    self.stop();
                    break;
                case 'destroy':
                    self.destroy();
                    break;
            }
        }
    };

    window.Spaceship = Spaceship;
}());
