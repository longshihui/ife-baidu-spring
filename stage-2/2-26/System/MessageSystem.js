/**
 * 通信系统
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function () {
    'use strict';
    /**
     * 通信系统
     * @param Mediator   //传输介质的构造器
     * @constructor
     */
    var MessageSystem = function (Mediator) {
        this.Mediator = Mediator;               //传输介质
        this.communicationArea = null;
        this.refer = null;
    };
    /**
     * 设置所属人
     * @param refer
     */
    MessageSystem.prototype.init = function (refer) {
      this.refer = refer;
    };
    /**
     * 连接
     * @param area
     */
    MessageSystem.prototype.connect = function (area) {
        area.join(this);
        this.communicationArea = area;
    };
    /**
     * 断开连接
     */
    MessageSystem.prototype.disconnect = function () {
      this.communicationArea.leave(this);
    };
    /**
     * 发送信息
     * @param msg
     * @returns {*}
     */
    MessageSystem.prototype.send = function (msg) {
        var MediatorConstructor = this.Mediator;
        var mediator = new MediatorConstructor();
        var area = this.communicationArea;
        mediator.pack(msg);
        return area.broadcast(mediator, this);
    };
    /**
     * 接受信息
     * @param mediator
     * @returns {*|null}
     */
    MessageSystem.prototype.receive = function (mediator) {
        console.log(this.refer.name + ': receive, the msg is :' + mediator.unpack());
        return mediator.unpack();
    };

    window.MessageSystem = MessageSystem;
}());
