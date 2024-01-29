function post(path, parameters) {
    let form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function (key, value) {
        let field = $('<input/>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
}

//............................................................................................................................
//chặn from nhập dob không cho nhật ngày > ngày hiện tại
// Lấy ngày hiện tại
var today = new Date().toISOString().split('T')[0];
// Gán giá trị max vào input date
// document.getElementById("dob").setAttribute("max", today);
document.getElementById("pick-date-of-birth").setAttribute("max", today);
//............................................................................................................................
console.log("account.js");
$("#update-user-form").submit(function (event) {
    event.preventDefault();

    $(".is-invalid").removeClass("is-invalid")
    $(".invalid-feedback").text("");
    let arr1 = $(this).serializeArray();
    let keyValues = {}
    let isValid = true;
    $.each(arr1, function (index, item) {
        let key = item.name;
        let value = item.value;
        if (key === "name" && value.trim().length === 0) {
            $("#invalid-user-name").text("Name address is invalid. Please check and input again.");
            $("#input-user-name").addClass("is-invalid");
            isValid = false;
        }
        if (key === "name" && value.trim().length === 0) {
            $("#invalid-user-name").text("Name address is invalid. Please check and input again.");
            $("#input-user-name").addClass("is-invalid");
            isValid = false;
        }

        if (key === "phone" && !value.trim().match(/^0[0-9]{9}$/)) {
            $("#invalid-phone-number").text("Phone number must consist of 10 numbers and start with 0");
            $("#input-user-phone").addClass("is-invalid");
            isValid = false;
        }
        //check phone
        if (key === "phone" && !value.trim().match(/^[0-9]{10}$/)) {
            $("#invalid-phone-number").text("Phone is invalid. Please check and input again");
            $("#input-user-phone").addClass("is-invalid");
            isValid = false;
        }
        //check dob
        // Lấy ngày hiện tại
        var currentDate = new Date();

        if (key === "dob") {
            // Lấy ngày sinh từ value (giả sử value là định dạng ngày tháng năm YYYY-MM-DD)
            var dobValue = value.trim();
            var dobDate = new Date(dobValue);

            if (value.trim().length === 0 || isNaN(dobDate) || dobDate > currentDate) {
                $("#invalid-date-of-birth").text("Date of birth is invalid. Please check and input again");
                $("#pick-date-of-birth").addClass("is-invalid");
                isValid = false
            }
        }
        if (key === "status") {
            value = value === "true";
        }
        if (value === "true") {
            value = true
        }
        if (value === "false") {
            value = false
        }
        keyValues[key] = value;

    });
    if (isValid) {
        // console.log(this.action);
        post(this.action, keyValues)
    }
});
