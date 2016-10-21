/**
 * Timer 接口
 * Author: Colorless.
 * Date: 2016/10/17
 * Project: ife-baidu
 */
(function (win) {
    'use strict';
    /**
     * Timer接口
     * @type {{timer, registerTimer, cancelTimer}}
     */
    win.TimerInterface = (function () {
        return {
            timer: {},
            registerLoopTimer: function (name, callback, time) {
                this.timer[name] = win.setInterval(callback, time);
            },
            registerOnceTimer: function (name, callback, time) {
                var self = this;
                setTimeout(function () {
                    callback();
                    delete self.timer[name];
                }, time);
            },
            cancelTimer: function (name) {
                clearInterval(this.timer[name]);
                clearTimeout(this.timer[name]);
                delete this.timer[name];
            }
        }
    }());
}(window));
