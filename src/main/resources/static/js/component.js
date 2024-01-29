$(document).ready(function (){
    var url = window.location.href;
    var MenuBtn;
    var Btn;
    var ContentBtn;
   if(url === '/user'){
       MenuBtn = $('button:contains("User management")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navUserManagementCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("User list")');
       ContentBtn.addClass('btn-active')
   } else if(url.includes('Permission')){
       MenuBtn = $('button:contains("User management")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navUserManagementCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("User permission")');
       ContentBtn.addClass('btn-active')
   }else if(url.includes('/class')){
       MenuBtn = $('button:contains("Class")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navClassCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("View class")');
       ContentBtn.addClass('btn-active')
   }else if(url.includes('/createClass') || url.includes('class-name')){
       MenuBtn = $('button:contains("Class")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navClassCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("Create class")');
       ContentBtn.addClass('btn-active')
   }else if(url.includes('home') || url === '/home'){
       MenuBtn = $('button:contains("Home")');
       MenuBtn.addClass('btn-active');
   }else if(url.includes('Materials')){
       MenuBtn = $('button:contains("Learning Material")');
       MenuBtn.addClass('btn-active');
   }else if(url.includes('/account/')){
       MenuBtn = $('button:contains("Setting")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navSettingCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("Account")');
       ContentBtn.addClass('btn-active')
   }else if(url === '/trainingprogram'){
       MenuBtn = $('button:contains("Training program")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navTrainingProgramCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("View program")');
       ContentBtn.addClass('btn-active')
   }else if(url === '/syllabus/View'){
       MenuBtn = $('button:contains("Syllabus")');
       MenuBtn.addClass('btn-active');
       Btn = $('#navSyllabusCollapse');
       Btn.addClass('show');
       ContentBtn = $('button:contains("View syllabus")');
       ContentBtn.addClass('btn-active')
   }else if(url === 'http://localhost:8080/syllabus/create'){
               MenuBtn = $('button:contains("Syllabus")');
               MenuBtn.addClass('btn-active');
               Btn = $('#navSyllabusCollapse');
               Btn.addClass('show');
               ContentBtn = $('button:contains("Create syllabus")');
               ContentBtn.addClass('btn-active')
           }
})

var navWidth;
var closeNavWidth;
$(document).ready(function () {
    var mainNav = $("#mainNav");
    navWidth = mainNav.outerWidth(true);
    $("#mainNav").css("width", navWidth);
    closeNavWidth = $("#btn-nav-toggle").outerWidth(true) + navWidth - mainNav.width();
    $("#btn-nav-toggle-open-icon").css("opacity", "0.5");
    $("#btn-nav-toggle-open-icon").css("transform", "rotate(-90deg)");
});
$("#btn-nav-toggle").click(function () {
    $(this).prop("disabled", true);
    if ($(".nav-collapsed").length === 0) {
        collapseNavbar();
    } else {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
$(".btn-nav").click(function () {
    $(this).prop("disabled", true);
    if ($(".nav-collapsed").length !== 0) {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
function expandNavbar() {
    $(".nav-collapsed").removeClass("nav-collapsed");
    $(".nav-text").removeClass("hide");
    $(".nav-dropdown").removeClass("hide");
    $("#mainNav").animate({ width: navWidth }, 150, function () {
    });
    $("#btn-nav-toggle-open-icon").animate(
        {
            opacity: 1,
            angle: -45
        },
        {
            duration: 75,
            step: function (now, fx) {
                if (fx.prop === "angle") {
                    $(this).css("transform", "rotate(" + now + "deg)");
                } else {
                    $(this).css("opacity", now);
                }
            },
            complete: function () {
                $("#btn-nav-toggle-open-icon").addClass("hide");
                $("#btn-nav-toggle-close-icon").removeClass("hide");
                $("#btn-nav-toggle-close-icon").animate(
                    {
                        opacity: 1,
                        angle: 0

                    },
                    {
                        duration: 75,
                        step: function (now, fx) {
                            if (fx.prop === "angle") {
                                $(this).css("transform", "rotate(" + now + "deg)");
                            } else {
                                $(this).css("opacity", now);
                            }
                        }
                    }
                );
            }
        });
}
function collapseNavbar() {
    $("#mainNav").addClass("nav-collapsed");
    $(".collapse.show").removeClass("show");
    $(".nav-dropdown-open").removeClass("nav-dropdown-open");
    $("#mainNav").animate({ width: closeNavWidth }, 150, function () {
        $(".nav-text").addClass("hide");
        $(".nav-dropdown").addClass("hide");
    });
    $("#btn-nav-toggle-close-icon").animate(
        {
            opacity: 0.5,
            angle: 45
        },
        {
            duration: 75,
            step: function (now, fx) {
                if (fx.prop === "angle") {
                    $(this).css("transform", "rotate(" + now + "deg)");
                } else {
                    $(this).css("opacity", now);
                }
            },
            complete: function () {
                $("#btn-nav-toggle-close-icon").addClass("hide");
                $("#btn-nav-toggle-open-icon").removeClass("hide");
                $("#btn-nav-toggle-open-icon").animate(
                    {
                        opacity: 1,
                        angle: 0
                    },
                    {
                        duration: 75,
                        step: function (now, fx) {
                            if (fx.prop === "angle") {
                                $(this).css("transform", "rotate(" + now + "deg)");
                            } else {
                                $(this).css("opacity", now);
                            }
                        }
                    }
                );
            }
        }
    );
}
$(".btn-nav").click(function () {
    $(this).prop("disabled", true);
    let dropdown = $(this).find(".nav-dropdown");
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    if (dropdown.length !== 0) {
        dropdown.toggleClass("nav-dropdown-open");
        $(this).next(".collapsing").children(".btn-nav-sub:first-child").addClass("btn-active");
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
$(".btn-nav-sub").click(function () {
    $(this).prop("disabled", true);
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(this).parent(".collapse").prev(".btn-nav").addClass("btn-active");
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});