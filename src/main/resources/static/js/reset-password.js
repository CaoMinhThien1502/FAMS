let countdownTimer;
const verificationCodeInput = document.getElementById('verificationCodeInput');
const verificationCode = document.getElementById('verificationCode');
const verifyCodeSubmit = document.getElementById('verifyCodeSubmit');
const sendMailButton = document.getElementById('sendMailButton');
const resend = document.getElementById('resend');
const countdown = document.getElementById('countdown');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('reenterPassword');
const passwordMismatchError = document.getElementById('passwordMismatch');

let userId = document.getElementById('userId');
const resetPasswordSubmit = document.getElementById('resetPasswordSubmit');
const verifyCodeMessage = document.getElementById('verifyCodeMessage');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
let input = '';

function validateEmail() {
    const mailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailInput.value.match(mailFormat)) {
        return true; // Địa chỉ email hợp lệ
    } else {
        emailError.style.display = 'block';
        emailError.innerText = 'Please enter a valid email address.';
        setTimeout(function() {
            emailError.style.display = 'none';
        }, 3000);
        return false; // Địa chỉ email không hợp lệ
    }
}

function sendEmail() {
    if (validateEmail()) {
        input = emailInput.value;
        // Dữ liệu để gửi đến API
        const data = {
            email: emailInput.value.trim()
        };

        // Thực hiện yêu cầu POST đến API
        fetch("/api/v1/auth/send", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.status === 200){
                    res.json().then(data => {
                        userId.value = data.userId;
                    });
                    verificationCodeInput.style.display = 'block';
                    verificationCodeInput.focus(); // Focus vào trường nhập số
                    verificationCode.value = '';
                    sendMailButton.style.display = 'none';
                    resend.style.display = 'none';
                    startCountdown();
                } else if (res.status === 400){
                    res.json().then(data => {
                        emailError.style.display = 'block';
                        emailError.innerHTML = data.message;
                        setTimeout(function() {
                            emailError.style.display = 'none';
                        }, 3000);
                    });
                }
            })
    }
}

function startCountdown() {
    // Hiển thị bộ đếm và gửi lại email sau khi đếm xong
    countdown.style.display = 'block';
    resend.style.display = 'none';

    let seconds = 60;
    document.getElementById('timer').textContent = seconds;

    countdownTimer = setInterval(function() {
        seconds--;
        document.getElementById('timer').textContent = seconds;

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            countdown.style.display = 'none';
            resend.style.display = 'block';
        }
    }, 1000);
}
function validateInput(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, ''); // Loại bỏ các ký tự không phải số
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5); // Giới hạn chỉ được nhập tối đa 5 số
    }
}

// Lắng nghe sự kiện khi người dùng nhập vào input
emailInput.addEventListener('input', function() {
    // Kiểm tra nếu đã nhập đủ 5 ký tự
    if (emailInput.value !== input.value) {
        sendMailButton.style.display = 'block';
        verificationCodeInput.style.display = 'none';
        countdown.style.display = 'none';
        resend.style.display = 'none';
        newPassword.disabled = true;
        confirmPassword.disabled = true;
        resetPasswordSubmit.disabled = true;
        clearInterval(countdownTimer);
    }
});


function verifyCode() {
    const codeInput = document.getElementById('verificationCode');
    const data = {
        code: codeInput.value,
        userId: userId.value
    };

    // Thực hiện yêu cầu POST đến API
    fetch("/api/v1/auth/verify", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    verifyCodeMessage.style.display = 'block';
                    verifyCodeMessage.innerText = data.message;
                    verifyCodeMessage.style.color = 'red';
                    setTimeout(function() {
                        verifyCodeMessage.style.display = 'none';
                    }, 3000);
                });
            } else if (response.ok){
                response.json().then(data => {
                    userId.value = data.userId;
                    newPassword.disabled = false;
                    confirmPassword.disabled = false;
                    resetPasswordSubmit.disabled = false;
                });
                verifyCodeMessage.style.display = 'block';
                verifyCodeMessage.innerText = 'Confirmed successfully';
                verifyCodeMessage.style.color = 'green';
                setTimeout(function () {
                    verifyCodeMessage.style.display = 'none';
                    verifyCodeMessage.style.color = 'red';
                }, 3000);
            }
        })
}

function resetPassword() {
    if (newPassword.value === confirmPassword.value) {
        const data = {
            newPassword: newPassword.value,
            userId: userId.value
        };

        // Thực hiện yêu cầu POST đến API
        fetch("/api/v1/auth/reset-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('resetPasswordMessage').textContent = data.toString();
                $('#resetPasswordMessageModal').modal('show');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    } else {
    }
}

function validatePassword() {
        // Mật khẩu mới hợp lệ, kiểm tra sự trùng khớp
        if (newPassword.value === confirmPassword.value) {
            passwordMismatchError.style.display = 'none'; // Ẩn thông báo lỗi
            passwordMismatchError.style.borderColor = 'none'; // Ẩn thông báo lỗi
            passwordMismatchError.style.borderStyle = 'inset'; // Ẩn thông báo lỗi
        } else {
            passwordMismatchError.style.display = 'block'; // Hiện thông báo lỗi
            passwordMismatchError.style.borderColor = 'red'; // Ẩn thông báo lỗi
            passwordMismatchError.style.borderStyle = 'solid'; // Ẩn thông báo lỗi
        }
}
$('#resetPasswordMessageModal').on('click', '.btn-secondary', function () {
    $('#resetPasswordMessageModal').modal('hide');
    window.location.href = "/login";
});
$(document).ready(function () {
    const resetPasswordModal = $('#resetPasswordMessageModal');
    resetPasswordModal.on('shown.bs.modal', function () {
        resetPasswordModal.on('click', function (event) {
            if (event.target === resetPasswordModal[0]) {
                window.location.href = '/login';
            }
        });
    });
});
