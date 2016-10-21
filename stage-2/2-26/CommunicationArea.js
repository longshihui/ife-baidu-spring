/**
 * 信号范围
 * 中介者模式
 * Author: Colorless.
 * Date: 2016/10/21
 * Project: ife-baidu
 */
(function () {
    'use strict';
    var CommunicationArea = function () {
        this.communicators = [];
    };

    CommunicationArea.prototype.join = function (communicator) {
        this.communicators.push(communicator);
    };

    CommunicationArea.prototype.leave = function (communicator) {
        var communicators = this.communicators;
        var i = communicators.indexOf(communicator);
        communicators.splice(i, 1);
    };

    /**
     * 广播
     * @param mediator  介质
     * @param sender    发送者
     * @return boolean  表示信号是否丢失
     */
    CommunicationArea.prototype.broadcast = function (mediator, sender) {
        var communicators = this.communicators;
        /**
         * 发送失败
         */
        if (Math.random() <= mediator.loseRate) {
            return false;
        }
        setTimeout(function () {
            communicators.filter(function (commt) {
                return commt !== sender;
            }).forEach(function (commt) {
                commt.receive(mediator);
            });
        }, mediator.defer);

        return true;
    };

    window.CommunicationArea = CommunicationArea;
}());
