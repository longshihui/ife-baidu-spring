(function (Util) {
    "use strict";
    /**
     * 判断一个对象是否严格为Object而不为Object的子类
     * @param obj
     * @returns {boolean}
     * @private
     */
    function _isStrictObject(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    }


    /**
     * 深度拷贝对象方法(不拷贝原型链上的属性)
     * @param target
     * @returns {*|{}}
     */
    var deepCopyObject = function (target) {
        target = target || {};
        var i, len, source;

        for (i = 1, len = arguments.length; i < len; i++) {
            source = arguments[i];
            if (!source) {
                continue;
            }
            Object.keys(source).forEach(function (propName) {
                //未拥有源对象属性
                //undefined == null is true
                if (target[propName] == null) {
                    target[propName] = source[propName];
                } else {
                    //忽略String,Array等继承于Object对象的属性值,两属性同时为Object时进行深度拷贝
                    if (_isStrictObject(target[propName]) && _isStrictObject(source[propName])) {
                        deepCopyObject(target[propName], source[propName])
                    }
                }
            })
        }

        return target;
    };

    // 将拓展方法添加至Util命名空间
    Util.deepCopyObject = deepCopyObject;
    Util.$ = function (selector) {
        return document.querySelectorAll(selector);
    }
    
}(Util));
