(function ($) {
    document.querySelector('.upload').addEventListener("click", function () {
        document.querySelector('#file-upload').click();
    });
    document.querySelector('#file-upload').addEventListener("change", function () {
        const file = this.files[0];
        const name = file.name;
        $.ajax({
            method: 'GET',
            url : '/material/check-duplicate',
            data: {name:name},
            success:function (data){
                if(data === ''){
                    if(checkFile(file.name)){
                        const code = $('#code').attr('value');
                        const tp = $('#tp').attr('value');
                        const tp_code = $('#tp_code').attr('value');
                        const day = $('#day').attr('value');
                        const name = $('#name_tp').attr('value');
                        const content = $('#content_tp').attr('value');
                        // Lưu giá trị vào input file
                        let formData = new FormData();
                        formData.append('material', file);
                        formData.append('code', code);
                        formData.append('tp', tp);
                        formData.append('tp_code', tp_code);
                        formData.append('day', day);
                        formData.append('name', name);
                        formData.append('content', content);
                        $.ajax({
                            method: 'POST',
                            url: '/material/upload',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                notificationsSuccess();
                            }
                        })
                    }else {
                        notificationsError();
                    }
                }else{
                    notificationsWarning();
                }
            }
        });
    });
})(jQuery);

$(document).ready(function () {
    $('#close').click(function () {
        $('#trainer-box').css('display', 'none');
        $('#over').remove();
    });
})
function notificationsSuccess() {
    const notifications = document.querySelector(".notifications");

    const toast = document.createElement("li");
    toast.className = 'toast success';

    toast.innerHTML = "<div class=\"column\">\n" +
        "             <i class=\"fa-solid fa-circle-check\"></i>\n" +
        "             <span>Upload file successfully</span>\n" +
        "             </div>" +
        "<style>" +
        ".toast {" +
        "display: flex!important;" +
        "}" +
        "</style>";
    notifications.appendChild(toast);
    console.log(notifications);

    toast.timeoutId = setTimeout(
        () => removeToast(toast),
        3000
    );
    const removeToast = (toast) => {
        toast.classList.add("hide");
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        setTimeout(() => toast.remove(), 100);
    };
}
function notificationsError() {
    const notifications = document.querySelector(".notifications");

    const toast = document.createElement("li");
    toast.className = 'toast error';

    toast.innerHTML = "<div class=\"column\">\n" +
        "             <i class=\"fa-solid fa-circle-xmark\"></i>\n" +
        "             <span>Allowed file/extension: jpg,png,gif,pdf,ppt,mp4,xlsx</span>\n" +
        "             </div>" +
        "<style>" +
        ".toast {" +
        "display: flex!important;" +
        "}" +
        "</style>";
    notifications.appendChild(toast);
    console.log(notifications);

    toast.timeoutId = setTimeout(
        () => removeToast(toast),
        3000
    );
    const removeToast = (toast) => {
        toast.classList.add("hide");
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        setTimeout(() => toast.remove(), 100);
    };
}
function notificationsWarning() {
    const notifications = document.querySelector(".notifications");

    const toast = document.createElement("li");
    toast.className = 'toast warning';

    toast.innerHTML = "<div class=\"column\">\n" +
        "             <i class=\"fa-solid fa-triangle-exclamation\"></i>\n" +
        "             <span>File have exist</span>\n" +
        "             </div>" +
        "<style>" +
        ".toast {" +
        "display: flex!important;" +
        "}" +
        "</style>";
    notifications.appendChild(toast);
    console.log(notifications);

    toast.timeoutId = setTimeout(
        () => removeToast(toast),
        3000
    );
    const removeToast = (toast) => {
        toast.classList.add("hide");
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        setTimeout(() => toast.remove(), 100);
    };
}
function checkFile(extension){
    var text = extension.split('.');
    var tail = text[length+1];
    if(tail === 'jpg'){
        return true;
    }else if(tail === 'png'){
        return true;
    }else if(tail === 'gif'){
        return true;
    }else if(tail === 'pdf'){
        return true;
    }else if(tail === 'ppt'){
        return true;
    }else if(tail === 'mp4'){
        return true;
    }else if(tail === 'xlsx'){
        return true;
    }else{
        return false;
    }
}