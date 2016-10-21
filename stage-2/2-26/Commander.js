/**
 * 指挥官类
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function () {
    'use strict';
    var _createId = (function () {
        var count = 0;
        return function () {
            return ++count;
        }
    }());
    /**
     * 指挥官
     * @constructor
     */
    var Commander = function () {
        this.id = _createId();
        this.messageSystem = null;
    };

    Commander.prototype.ready = function (msgSys, area) {
        this.messageSystem = msgSys;
        this.messageSystem.init(this);
        this.messageSystem.connect(area);
    };

    Commander.prototype.sendCommand = function (command) {
        return this.messageSystem.send(command);
    };

    Commander.prototype.relax = function () {
        this.messageSystem.disconnect();
    };

    window.Commander = Commander;
}());
