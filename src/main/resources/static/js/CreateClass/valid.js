$(document).ready(function () {
    $('#search-input').on('input', function () {
        var name = $('#search-input').val();
        if(name.length >0){
            $.ajax({
                type: "GET",
                url: "/class/check-class-name",
                data: {name: name},
                success: function (data) {
                    if (data === '') {
                        $('#create').prop('disabled', false);
                        $('#result').html('Available');
                        $('#result').css('color', '#2bc48a');
                    } else if (data !== null) {
                        $('#create').prop('disabled', true);
                        $('#result').html('Class name have exist');
                        $('#result').css('color', 'red');
                    }
                }
            })
        }else{
            $('#create').prop('disabled', true);
            $('#result').html('Class name is null');
            $('#result').css('color', 'red');
        }
    })
})

$(document).ready(function (){
    $('#save-class').click(function (event){
        var trainerValue = document.getElementById('trainer').value;
        if(trainerValue === ''){
            event.preventDefault();
            swal({
                icon: "error",
                title: "Oops...",
                text: "Trainer(s) is missing!",
            });
        }
    })
})
$(document).ready(function (){
    $('#date-start').change(function (){
        var startValue = document.getElementById('datepicker').value;
        console.log(startValue)
        if(startValue===''){
            $('#warning').css('display','block');
            $('#date-to').css('display','none');
        }else{
            $('#warning').css('display','none');
            $('#date-to').css('display','inline-flex');
        }
    })
})
$(document).ready(function (){
    $('#next-tooltip-2').click(function (event){
        var startValue = document.getElementById('datepicker').value;
        if(startValue === ''){
            event.preventDefault();
            swal({
                icon: "error",
                title: "Oops...",
                text: "Start Day is missing!",
            });
        }
    })
})
$(document).ready(function (){
    $('#datepicker-end').change(function (){
        var startDate = new Date($('#datepicker').val());
        var endDate = new Date($('#datepicker-end').val());

        if (startDate > endDate) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "The start day must be before the end day!",
            });
            $('#datepicker-end').val('');
        }
    })
})
$(document).ready(function (){
    $('#timeTo').change(function (){
        var startTime = new Date("1970-01-01T" + $('#timeFrom').val());
        var endTime = new Date("1970-01-01T" + $('#timeTo').val());

        if (startTime >= endTime) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "The start time must be before the end time!",
            });
            $('#timeTo').val('');
        }
    })
})
$(document).ready(function (){
    $('#timeFrom').change(function (){
        var startTime = new Date("1970-01-01T" + $('#timeFrom').val());
        var endTime = new Date("1970-01-01T" + $('#timeTo').val());

        if (startTime >= endTime) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "The start time must be before the end time!",
            });
            $('#timeTo').val('');
        }
    })
})

$(document).ready(function (){
    $('#timeTo').input(function (){
        var startTime = new Date("1970-01-01T" + $('#timeFrom').val());
        var endTime = new Date("1970-01-01T" + $('#timeTo').val());

        if (startTime >= endTime) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "The start time must be before the end time!",
            });
            $('#timeTo').val('');
        }
    })
})
$(document).ready(function (){
    $('#timeFrom').input(function (){
        var startTime = new Date("1970-01-01T" + $('#timeFrom').val());
        var endTime = new Date("1970-01-01T" + $('#timeTo').val());

        if (startTime >= endTime) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "The start time must be before the end time!",
            });
            $('#timeTo').val('');
        }
    })
})
