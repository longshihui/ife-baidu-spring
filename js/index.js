(function ($) {
    var Setting = {
        countTask: 52,
        groupLastTaskNum: [12, 36, 49, 52],
        url: 'task-(groupID)/(groupID)-(taskID)/task-(groupID)-(taskID).html'
    };

    var cursor = 1;
    Setting.groupLastTaskNum.forEach(function (countTask, groupID) {
        var curUrl = Setting.url.replace(/\(groupID\)/g, '' + (groupID + 1));

        while (cursor++ <= Setting.groupLastTaskNum[groupID]) {
            $.get(curUrl.replace(/\(taskID\)/g, '' + cursor),
                function (data, status) {
                    console.log(status);
                }
            )
        }

    })

})(jQuery);
