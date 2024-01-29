$(document).ready(function () {
    $('#text-input-search-value').on('input', function () {
        var name = $(this).val();
        var count = 0;
        if (name.length >= 1) {
            $.ajax({
                type: "GET",
                url: "/material/real-time",
                data: {name: name},
                success: function (data) {
                    $('#class-information-table').dataTable().fnDestroy();
                    let tableData = [];
                    data.forEach(element => {
                        let elementArr = [];
                        elementArr.push(element.name);
                        elementArr.push(element.createBy);
                        elementArr.push(element.createDate);
                        elementArr.push(`<a href="/material/download?filename=${element.name}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clip-path="url(#clip0_184_16023)">
                                                    <path d="M19 9H15V3H9V9H5L12 16L19 9ZM11 11V5H13V11H14.17L12 13.17L9.83 11H11ZM5 18H19V20H5V18Z" fill="#2D3748"/>
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_184_16023">
                                                    <rect width="24" height="24" fill="white"/>
                                                  </clipPath>
                                                </defs>
                                            </svg>
                                        </a>`)
                        tableData.push(elementArr);
                    });
                    $("#class-information-table").DataTable({
                        data: tableData,
                        searching: false,
                        info: false,
                        paging: true
                    });
                }
            })
        } else {
            $.ajax({
                type: "GET",
                url: "/material/getAll",
                data: {name: name},
                success: function (data) {
                    $('#class-information-table').dataTable().fnDestroy();
                    let tableData = [];
                    data.forEach(element => {
                        let elementArr = [];
                        elementArr.push(element.name);
                        elementArr.push(element.createBy);
                        elementArr.push(element.createDate);
                        elementArr.push(`<a href="/material/download?filename=${element.name}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clip-path="url(#clip0_184_16023)">
                                                    <path d="M19 9H15V3H9V9H5L12 16L19 9ZM11 11V5H13V11H14.17L12 13.17L9.83 11H11ZM5 18H19V20H5V18Z" fill="#2D3748"/>
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_184_16023">
                                                    <rect width="24" height="24" fill="white"/>
                                                  </clipPath>
                                                </defs>
                                            </svg>
                                        </a>`)
                        tableData.push(elementArr);
                    });
                    $("#class-information-table").DataTable({
                        data: tableData,
                        searching: false,
                        info: false,
                        paging: true
                    });
                }
            })
        }
    })
})

$.ajax({
    url: "material/getAll",
    method: "GET",
    success: function (response) {
        let tableData = [];
        response.forEach(element => {
            let elementArr = [];
            elementArr.push(element.name);
            elementArr.push(element.createBy);
            elementArr.push(element.createDate);
            elementArr.push(`<a href="/material/download?filename=${element.name}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_184_16023)">
                                                <path d="M19 9H15V3H9V9H5L12 16L19 9ZM11 11V5H13V11H14.17L12 13.17L9.83 11H11ZM5 18H19V20H5V18Z" fill="#2D3748"/>
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_184_16023">
                                                <rect width="24" height="24" fill="white"/>
                                              </clipPath>
                                            </defs>
                                        </svg>
                                </a>`)
            tableData.push(elementArr);
        });
        $("#class-information-table").DataTable({
            data: tableData,
            searching: false,
            info: false,
            paging: true
        });
    }
});

function getMaterialsTableData() {
    $.ajax({
        url: "https://fabackend.azurewebsites.net/material/getAll",
        method: "GET",
        success: function (response) {
            let tableData = [];
            response.forEach(element => {
                let elementArr = [];
                elementArr.push(element.name);
                elementArr.push(element.createBy);
                elementArr.push(element.createDate);
                elementArr.push(`<a href="/material/download?filename=${element.name}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_184_16023)">
                                                <path d="M19 9H15V3H9V9H5L12 16L19 9ZM11 11V5H13V11H14.17L12 13.17L9.83 11H11ZM5 18H19V20H5V18Z" fill="#2D3748"/>
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_184_16023">
                                                <rect width="24" height="24" fill="white"/>
                                              </clipPath>
                                            </defs>
                                        </svg>
                                </a>`)
                tableData.push(elementArr);
            });
            $("#class-information-table").DataTable({
                data: tableData,
                searching: false,
                info: false,
                paging: true
            });
        }
    });
};