// Đường dẫn API
const apiEndpointTotal = 'api/dashboard/total';

// Hàm gọi API bằng AJAX và cập nhật dữ liệu
function fetchTotalAndRender() {
  // Lấy dữ liệu từ API total
  $.ajax({
    url: apiEndpointTotal,
    method: 'GET',
    success: function (data) {
      // Cập nhật dữ liệu lấy được từ API lên giao diện
      document.getElementById("trainerCount").textContent = data.trainerCount;
      document.getElementById("classCount").textContent = data.classCount;
      document.getElementById("syllabusCount").textContent = data.syllabusCount;
      document.getElementById("trainingProgramCount").textContent = data.trainingProgramCount;
    },
    error: function () {
      console.error('Error fetching data from API for total.');
    }
  });
}

// Gọi hàm cập nhật dữ liệu khi trang web được tải lần đầu
fetchTotalAndRender();

// // Cập nhật dữ liệu mỗi 5 giây
// setInterval(fetchTotalAndRender, 5000);

//.................................................................................................................................
// bieu do tron status class
// Thêm dòng này ở đầu file js
// Lấy canvas
const ctx = document.getElementById('statusChart').getContext('2d');

// Dữ liệu giả định
const data = {
  labels: ['Scheduled', 'Planning', 'Opening', 'Completed'],
  data: []
};

function fillDataChart() {
  // Lấy dữ liệu từ API total
  $.ajax({
    url: 'api/dashboard/chart',
    method: 'GET',
    success: function (response) {
      // Cập nhật dữ liệu lấy được từ API lên counst data
      // Duyệt qua các phần tử trong response
      // Push count vào mảng data
      data.data.push(response.scheduledCount);
      data.data.push(response.planningCount);
      data.data.push(response.openingCount);
      data.data.push(response.completedCount);

      // Tạo biểu đồ Chart.js
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ]
          }]
        }
      });
    },
    error: function () {
      console.error('Error fetching data from API for total.');
    }
  });
}
// Gọi hàm cập nhật dữ liệu Chart khi trang web được tải lần đầu
fillDataChart();

// ..................................................................................................................
// Hàm lấy dữ liệu từ API
async function getClasses() {

  // Call API lấy danh sách lớp
  const response = await fetch('/class/getByStatus');
  return response.json();

}

// Hàm hiển thị bảng
function renderClassTable(classes) {

  // Lấy 5 phần tử đầu
  // const items = classes.slice(0, 5);

  let rows = '';
  classes.forEach(c => {
    rows += `
      <tr>
        <td>${c.className}</td>
        <td>${c.classCode}</td>
        <td style="width: 87.49px">${c.duration}</td>
        <td>${c.location}</td>
        <td>
          <div class="table-status">
            ${c.status}
          </div>
        </td>
      </tr>  
    `;
  });

  $('.classes-table tbody').html(rows);

}

// Gọi các hàm
(async () => {
  const classes = await getClasses();
  renderClassTable(classes);
})();