$(document).ready(function () {
    const div6Elements = document.querySelectorAll('.div-6');
    div6Elements.forEach(div => {

        // Lấy img có class "img" bên trong div
        const img = div.querySelector('.img');

        // Nếu không tìm thấy img
        if (!img) {

            // Ẩn div đó đi
            div.style.display = 'none';
        }

    });
})