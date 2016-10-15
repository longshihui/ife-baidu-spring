(function (win) {
    'use strict';
    var Queue = function (maxLength) {
        this.data = [];
        this.maxLength = parseInt(maxLength) || Math.POSITIVE_INFINITY;
    };

    /**
     * 入队
     * @param value
     */
    Queue.prototype.enQueue = function (value) {
        if (this.data.length === this.maxLength) throw {
            name: 'Queue'
        };
        this.data.push(value);
    };

    /**
     * 出队
     * @returns {*}
     */
    Queue.prototype.deQueue = function () {
        return this.data.shift();
    };
    /**
     * 将某元素从队列中删除
     * @param value
     */
    Queue.prototype.delete = function (value) {
        var index = this.indexOf(value);
        if (index >= 0) {
            this.data.splice(index,1)
        }
    };

    /**
     * 返回指定元素在队列中的位置
     * @param value
     * @returns {number}
     */
    Queue.prototype.indexOf = function (value) {
        return this.data.indexOf(value);
    };

    /**
     * 根据指定位置返回队列中的位置
     * @param index
     * @returns {*}
     */
    Queue.prototype.get = function (index) {
        return this.data[index];
    };

    Queue.prototype.isFilled = function () {
      return this.data.length === this.maxLength;
    };
    
    Queue.prototype.getData = function () {
      return this.data;  
    };

    win.Queue = Queue;
}(window));
