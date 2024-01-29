let header = document.getElementById("header");
header.innerHTML += `
<header class="bg-main text-white px-5 py-1" style="overflow: visible;">
        <div class="d-flex flex-row align-items-center p-2">
            <div class="flex-grow-1 mx-3">
                <a href="/">
                    <img style="height: 60px;" src="/img/FPT_logo.png">
                </a>
            </div>
            <div class="">  
                <a href="/unigate" target="_blank">
                    <button class="btn btn-dark" style="overflow: hidden; white-space: nowrap;">
                        <img style="height: 30px;" src="/img/uniGate_logo.png" alt="uniGate logo">
                        uniGate
                    </button>
                </a>
                
            </div>
            <div class="d-flex flex-row mx-3">
                <div class="mx-3 align-middle my-auto">
                    <img style="height: 60px; border-radius: 50%;" src="/img/avatar-anime.png" alt="profile picture">
                </div>
                <div class="d-flex flex-column">
                    <div id="groupName" class="flex-grow-1 fw-bold fs-5 text-white text-center"
                    style="overflow: hidden; white-space: nowrap;"></div>
                    <div class="flex-grow-1 text-center" style="overflow: hidden; white-space: nowrap;"><a
                            class=" fs-6 text-white text-decoration-none" href="/logout">Log out</a></div>
                </div>
            </div>
        </div>
    </header>
`;

$.ajax({
    url: '/api/user/username',
    method: 'GET',
    success: function(response) {
        document.getElementById('groupName').innerText = response;
    },
    error: function(error) {
        console.error('Lỗi khi lấy user name:', error);
    }
});