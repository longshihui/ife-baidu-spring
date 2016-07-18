var promise = function (){

};

(function ($, promise) {
    var Setting = {
        countTask: 52,
        groupLastTaskNum: [12, 36, 49, 52],
        url: 'task-(groupID)/(groupID)-(taskID)/task-(groupID)-(taskID).html'
    };

    function loadMainContent() {
        var wrapper = $('.main-content');
        var CN_Map = {
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四'
        };

        function hasTask(groupID, taskID) {
            var curUrl = Setting.url.replace(/\(groupID\)/g, '' + (groupID + 1));
            var url = curUrl.replace(/\(taskID\)/g, '' + taskID);
            $.ajax({
                    url: url,
                    success: function () {
                        render(groupID, taskID, url);
                    }
                }
            )
        }

        function render(groupID, taskID, url) {
            var groupNum = groupID + 1;
            var stage = $('#stage-' + groupNum);

            if (stage.size() === 0) {
                stage = $('<section class="stage row" id="stage-' + groupNum + '"></section>');
                var head = $('<h3 class="stage-head">阶段' + CN_Map['' + groupNum] + '</h3>');
                var list = $('<ul class="task-list"></ul>');
                stage.append(head);
                stage.append(list);
                wrapper.append(stage);
            }

            var task_list = stage.children('.task-list');
            var task = $('<li class="task col-md-3 col-sm-6"></li>');
            var cover = $('<a href="'+ url +'" class="cover"></a>');

            task.append(cover);

            for (var str = '' + taskID,
                     i = 0,
                     l = str.length,
                     temp;
                 i < l;
                 i++
            ) {
                temp = $('<span class="num' + str.charAt(i) + '"></span>');
                task.append(temp.text(str.charAt(i)));
            }

            task_list.append(task);
        }

        var curTaskID = 1;
        Setting.groupLastTaskNum.forEach(function (countTask, groupID) {

            while (curTaskID++ <= Setting.groupLastTaskNum[groupID]) {
                hasTask(groupID, curTaskID);
            }

        })
    }

    function loadAsideContent() {

    }

    loadMainContent();

})(jQuery, promise);
