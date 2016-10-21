/**
 * File Description
 * Author: Colorless.
 * Date: 2016/10/20
 * Project: ife-baidu
 */
(function (DriveSystem) {
    'use strict';
    var MIN_SPEED = '20px',
        MIN_COST_PERCENT = '2%';
    var Base = function () {
        DriveSystem.call(this, 'BASE', MIN_SPEED, MIN_COST_PERCENT);
    };

    Base.prototype = Object.create(DriveSystem.prototype);
    Base.prototype.super = Object.create(DriveSystem.prototype);
    Base.prototype.constructor = Base;

    /**
     * 初始化操作
     * @param setting
     */
    Base.prototype.init = function (setting) {
      this.super.init.call(this,setting);
    };

    Base.prototype.draw = function () {

    };

    window.BaseDriveSystem = Base;
}(DriveSystem));
