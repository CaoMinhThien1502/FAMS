$(document).on("mousedown", "#searchResults .result-item", function (event) {
    console.log("Result item clicked!");

    // Lấy topicCode từ result-item được nhấn
    let selectedCode = $(this).find(".topic-code").text();

    // Gọi hàm để lấy thông tin từ controller và hiển thị
    getSyllabusByCodeAndDisplay(selectedCode);

    // Ngăn chặn sự kiện click lan rộng lên trên
    event.stopPropagation();
});

// Sự kiện lắng nghe khi nhấp vào document
$(document).on("click", function (event) {
    console.log("Document clicked!");

    var resultsContainer = $("#searchResults");

    // Kiểm tra xem người dùng đã nhấp vào ngoài vùng kết quả hay không
    if (
        !resultsContainer.is(event.target) &&
        resultsContainer.has(event.target).length === 0 &&
        !$(event.target).hasClass('result-item') &&
        !$(event.target).closest('.result-item').length
    ) {
        // Ẩn kết quả khi nhấp ra ngoài vùng
        resultsContainer.removeClass("active");
    }
});


// Thêm sự kiện lắng nghe cho input
$("#keyword").on("input", function (event) {
    var resultsContainer = $("#searchResults");

    // Kiểm tra xem input có trống không trước khi thêm hoặc xóa class "active"
    if ($("#keyword").val().trim() !== "") {
        // Hiển thị kết quả khi có sự thay đổi trong input
        resultsContainer.addClass("active");
    } else {
        // Ẩn kết quả nếu input trống
        resultsContainer.removeClass("active");
    }
    event.stopPropagation(); // Ngăn chặn sự kiện click lan rộng đến document
});
// Thêm sự kiện click vào search-input
$(document).on("click", ".search-input", function (event) {
    var resultsContainer = $("#searchResults");

    if ($("#keyword").val().trim() !== "") {
        resultsContainer.addClass("active");
    } else {
        resultsContainer.removeClass("active");
    }

    event.stopPropagation();
});

function searchSyllabus() {
    var keyword = $("#keyword").val();

    $.ajax({
        type: "GET",
        url: "/syllabus/search",
        data: {"keyword": keyword},
        success: function (data) {
            displayResults(data);
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}

function displayResults(results) {
    var resultsContainer = $("#searchResults");
    resultsContainer.empty();

    if (results && results.length > 0) {
        var resultHtml = "";

        results.forEach(function (result) {
            resultHtml += `
                <div class='result-item'>
                    <div class="result-item-content">
                    <div style="display: none" class='topic-code'>${result.topicCode}</div>
                    <div>Syllabus name: </div>
                    <div class='topic-name'>${result.topicName}</div>
                    </div>
                </div>
            `;
        });

        // Thêm chuỗi HTML vào container
        resultsContainer.append(resultHtml);

        // Hiển thị kết quả khi có dữ liệu và #keyword không trống
        if ($("#keyword").val().trim() !== "") {
            resultsContainer.addClass("active");
        } else {
            resultsContainer.removeClass("active");
        }
    } else {
        resultsContainer.text("No results found.");

        // Hiển thị thông báo khi không có dữ liệu và #keyword không trống
        if ($("#keyword").val().trim() !== "") {
            resultsContainer.addClass("active");
        } else {
            resultsContainer.removeClass("active");
        }
    }
}

function getSyllabusByCodeAndDisplay(code) {
    // Kiểm tra xem chủ đề đã tồn tại trong selectedSyllabus hay không
    var isTopicExist = isTopicAlreadySelected(code);

    if (isTopicExist) {
        // Hiển thị thông báo nếu chủ đề đã tồn tại
        alert('Chủ đề đã tồn tại trong danh sách đã chọn.');
    } else {
        // Nếu chủ đề chưa tồn tại, thực hiện AJAX request
        $.ajax({
            type: "GET",
            url: "/syllabus/getsyllabuscode",
            data: {"code": code},
            success: function (data) {
                // Kiểm tra nếu dữ liệu trả về là null
                if (data === null) {
                    alert('Không tìm thấy thông tin chủ đề.');
                } else {
                    // Xử lý dữ liệu trả về từ controller, có thể hiển thị thông tin ở đây
                    console.log("Syllabus Detail:", data);

                    // Hiển thị thông tin đã chọn trong danh sách
                    displaySelectedSyllabus(data);
                }

                // Ẩn kết quả tìm kiếm
                $("#searchResults").removeClass("active");
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    }
}

// Hàm kiểm tra xem chủ đề đã tồn tại trong selectedSyllabus hay không
function isTopicAlreadySelected(code) {
    var isExist = false;

    // Lặp qua các phần tử trong selectedSyllabus để kiểm tra
    $("#selectedSyllabus .topic-code").each(function () {
        if ($(this).text() === code) {
            isExist = true;
            return false; // Dừng lặp nếu đã tìm thấy chủ đề
        }
    });

    return isExist;
}


// Function để hiển thị thông tin đã chọn trong danh sách
function displaySelectedSyllabus(syllabusDetail) {
    var selectedSyllabusContainer = $("#selectedSyllabus");

    // Chuyển đổi duration từ phút sang giờ và phút
    var hours = Math.floor(syllabusDetail.duration / 60);
    var minutes = syllabusDetail.duration % 60;

    // Tạo một chuỗi HTML cho thông tin đã chọn
    var selectedHtml = `
            <div class="syllabus-i">
                <div class="frame-111">
                    <div class="syllabus-1">
                        <div class="program-name">
                            <div class="frame-98">
                                <div style="display: none" class="topic-code">${syllabusDetail.topicCode}</div>
                                <div class="linux">${syllabusDetail.topicName}</div>
                                <div class="activate">
                                    <div class="active">${syllabusDetail.status}</div>
                                </div>
                            </div>
                        </div>
                        <div class="syllabus-meta">
                            <div class="lin-v-2-0">${syllabusDetail.version}</div>
                            <div class="">|</div>
                            <div class="_4-days-12-hours">
                                <span class="_4-days-12-hours-span">${hours} hrs ${minutes} min</span>
                                <span class="totalTime" style="display: none">${syllabusDetail.duration}</span>
                            </div>
                            <div class="">|</div>
                            <div class="modified-on-23-07-2022-by-johny-deep">
                                <span>
                                    <span class="modified-on-23-07-2022-by-johny-deep-span">Modified on </span>
                                    <span class="modified-on-23-07-2022-by-johny-deep-span2">${syllabusDetail.modifiedDate}</span>
                                    <span class="modified-on-23-07-2022-by-johny-deep-span3"> by </span>
                                    <span class="modified-on-23-07-2022-by-johny-deep-span4">${syllabusDetail.modifiedBy}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="syllabus-4">
                        <div class="syllabus-meta">
                            <svg
                                class="delete-forever"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_56_8760)">
                                    <path
                                        d="M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"
                                        fill="#F1F1F1"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_56_8760">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    // Thêm chuỗi HTML vào container
    selectedSyllabusContainer.append(selectedHtml);

    // Gọi hàm để tính tổng
    calculateTotalDuration();
}


function calculateTotalDuration() {
    var totalDuration = 0;

    // Lặp qua tất cả các phần tử có class totalTime
    $(".totalTime").each(function () {
        // Lấy giá trị duration từ thuộc tính data-duration của mỗi phần tử
        var duration = parseInt($(this).text());

        // Kiểm tra nếu giá trị duration là một số hợp lệ
        if (!isNaN(duration)) {
            // Cộng vào tổng
            totalDuration += duration;
        }
    });
    // Chuyển đổi tổng duration thành giờ, phút và ngày
    var days = Math.floor(totalDuration / (60 * 24));
    var hours = Math.floor((totalDuration % (60 * 24)) / 60);
    var minutes = totalDuration % 60;

    // Đặt giá trị vào phần tử có id là totalDurationDisplay
    $("#totalDurationDisplay").text(days + " days " + hours + " hrs " + minutes + " min");
}



$(document).on("click", ".syllabus-4", function () {
    // Xác định phần tử cha (syllabus-i) của phần tử được nhấn
    var syllabusItem = $(this).closest(".syllabus-i");

    // Xóa phần tử syllabus-i
    syllabusItem.remove();
    // Gọi hàm để tính tổng
    calculateTotalDuration();
});

$(document).ready(function () {
    $("form").submit(function () {
        var selectedTopicCodes = [];

        // Lặp qua các phần tử .topic-code trong selectedSyllabus để lấy giá trị và thêm vào mảng
        $(".syllabus-i .topic-code").each(function () {
            selectedTopicCodes.push($(this).text());
        });

        // Gán giá trị của input ẩn
        $("#selectedTopicCodesInput").val(selectedTopicCodes.join(','));
    });
});
