function uploadMaterial(clickedLi) {
    var content = clickedLi.getAttribute('id')
    var text = clickedLi.getAttribute('name')
    var tmp = text.split('_');
    var day = tmp[0];
    var code = tmp[1];
    var name = tmp[2];
    var tp = tmp[3];
    $.ajax({
        method: 'GET',
        url: '/material/list-file',
        data: {content: content},
        success: function (data) {
            var trainer_box = $('#trainer-box');
            trainer_box.css('display', 'block')
            const box = document.getElementById('trainer-box');
            box.innerHTML = '';
            var trainer_content =
                '<div  class="trainer">\n' +
                '            <div style="background: #2D3748;color: white;padding-bottom: 10px;padding-left: 10px;padding-top: 10px">\n' +
                '                Day ' + day + '\n' +
                '                <svg id="close" style="position: relative;left: 510px" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
                '                     viewBox="0 0 24 24" fill="none">\n' +
                '                    <g clip-path="url(#clip0_4165_1168)">\n' +
                '                        <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"\n' +
                '                              fill="white"/>\n' +
                '                    </g>\n' +
                '                    <defs>\n' +
                '                        <clipPath id="clip0_4165_1168">\n' +
                '                            <rect width="24" height="24" fill="white"/>\n' +
                '                        </clipPath>\n' +
                '                    </defs>\n' +
                '                </svg>\n' +
                '            </div>\n' +
                '            <div style="display: inline-flex;padding: 10px">\n' +
                '               ' + code + ' <span style="width: 50px"></span> ' + name + '\n' +
                '            </div>\n' +
                '            <div style="padding: 15px">\n' +
                '                <div class="file" style="padding: 10px">\n' +
                '                    <p>' + content + '</p>\n';
            for (var i = 0; i < data.length; i++) {
                trainer_content +=

                    '                    <p style="display: flex;justify-content: space-between;">\n' +
                    '                        <a href="/material/download?filename=' + data[i].name + '\">' + data[i].name + '</a>\n' +
                    '                        <span class="modified-file"> by ' + data[i].createBy + ' on ' + data[i].createDate + '\n' +
                    '<a href="/material/delete?filename=' + data[i].name + '&tp=' + tp + '&day=' + day + '&code=' + code + '&name=' + name + '&content=' + content + '\">' +
                    '                            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"\n' +
                    '                                 fill="none">\n' +
                    '                                <g clip-path="url(#clip0_4165_1185)">\n' +
                    '                                    <path d="M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"\n' +
                    '                                          fill="#2D3748"/>\n' +
                    '                                </g>\n' +
                    '                                <defs>\n' +
                    '                                    <clipPath id="clip0_4165_1185">\n' +
                    '                                        <rect width="24" height="24" fill="white"/>\n' +
                    '                                    </clipPath>\n' +
                    '                                </defs>\n' +
                    '                            </svg>\n' +
                    '</a>' +
                    '                        </span>\n' +
                    '                    </p>\n';
            }
            trainer_content +=
                '                </div>\n' +
                '            </div>\n' +
                '    <input type="file" id="file-upload" style="display: none;"/>\n' +
                '    <input type="hidden" id="code" value="'+content+'">\n' +
                '    <input type="hidden" id="tp" value="'+tp+'">\n' +
                '    <input type="hidden" id="tp_code" value="'+code+'">\n' +
                '    <input type="hidden" id="day" value="'+day+'">\n' +
                '    <input type="hidden" id="name_tp" value="'+name+'">\n' +
                '    <input type="hidden" id="content_tp" value="'+content+'">\n' +
                '    <input type="submit" value="Upload new" class="upload">\n' +
                '</div>' +
                '<script src="/js/materials/materials-js.js"></script>';
            trainer_box.append(trainer_content);
            console.log(data);
        }
    })
}

(function ($) {
    $(document).ready(function () {
        var id = $('#materials').attr('value');
        if (id !== '') {
            var tmp = id.split('_');
            var day = tmp[0];
            var code = tmp[1];
            var name = tmp[2];
            var content = tmp[3];
            var tp = tmp[4];
            $.ajax({
                method: 'GET',
                url: '/material/list-file',
                data: {content: content},
                success: function (data) {
                    var trainer_box = $('#trainer-box');
                    trainer_box.css('display', 'block');
                    $('body').append('<div id="over">');
                    $('#over').fadeIn(300);
                    const box = document.getElementById('trainer-box');
                    box.innerHTML = '';
                    var trainer_content =
                        '<div  class="trainer">\n' +
                        '            <div style="background: #2D3748;color: white;padding-bottom: 10px;padding-left: 10px;padding-top: 10px">\n' +
                        '                Day ' + day + '\n' +
                        '                <svg id="close" style="position: relative;left: 510px" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
                        '                     viewBox="0 0 24 24" fill="none">\n' +
                        '                    <g clip-path="url(#clip0_4165_1168)">\n' +
                        '                        <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"\n' +
                        '                              fill="white"/>\n' +
                        '                    </g>\n' +
                        '                    <defs>\n' +
                        '                        <clipPath id="clip0_4165_1168">\n' +
                        '                            <rect width="24" height="24" fill="white"/>\n' +
                        '                        </clipPath>\n' +
                        '                    </defs>\n' +
                        '                </svg>\n' +
                        '            </div>\n' +
                        '            <div style="display: inline-flex;padding: 10px">\n' +
                        '               ' + code + ' <span style="width: 50px"></span> ' + name + '\n' +
                        '            </div>\n' +
                        '            <div style="padding: 15px">\n' +
                        '                <div class="file" style="padding: 10px">\n' +
                        '                    <p>' + content + '</p>\n';
                    for (var i = 0; i < data.length; i++) {
                        trainer_content +=

                            '                    <p style="display: flex;justify-content: space-between;">\n' +
                            '                        <a href="/material/download?filename=' + data[i].name + '\">' + data[i].name + '</a>\n' +
                            '                        <span class="modified-file"> by ' + data[i].createBy + ' on ' + data[i].createDate + '\n' +
                            '<a href="/material/delete?filename=' + data[i].name + '&tp=' + tp + '&day=' + day + '&code=' + code + '&name=' + name + '&content=' + content + '\">' +
                            '                            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"\n' +
                            '                                 fill="none">\n' +
                            '                                <g clip-path="url(#clip0_4165_1185)">\n' +
                            '                                    <path d="M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"\n' +
                            '                                          fill="#2D3748"/>\n' +
                            '                                </g>\n' +
                            '                                <defs>\n' +
                            '                                    <clipPath id="clip0_4165_1185">\n' +
                            '                                        <rect width="24" height="24" fill="white"/>\n' +
                            '                                    </clipPath>\n' +
                            '                                </defs>\n' +
                            '                            </svg>\n' +
                            '</a>' +
                            '                        </span>\n' +
                            '                    </p>\n';
                    }
                    trainer_content +=
                        '                </div>\n' +
                        '            </div>\n' +
                        '    <input type="file" id="file-upload" style="display: none;"/>\n' +
                        '    <input type="hidden" id="code" value="'+content+'">\n' +
                        '    <input type="hidden" id="tp" value="'+tp+'">\n' +
                        '    <input type="hidden" id="tp_code" value="'+code+'">\n' +
                        '    <input type="hidden" id="day" value="'+day+'">\n' +
                        '    <input type="hidden" id="name_tp" value="'+name+'">\n' +
                        '    <input type="hidden" id="content_tp" value="'+content+'">\n' +
                        '    <input type="submit" value="Upload new" class="upload">\n' +
                        '</div>' +
                        '<script src="/js/materials/materials-js.js"></script>';
                    trainer_box.append(trainer_content);
                    console.log(data);
                }
            })
        }
    })
})(jQuery);


$(document).ready(function () {
    $('.folder').click(function () {
        // thêm phần tử id="over" vào sau body
        $('body').append('<div id="over">');
        $('#over').fadeIn(300);
        return false;
    });
    // khi click đóng hộp thoại
});