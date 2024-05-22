import config from './config.js';

// Hàm này sẽ điền thông tin đăng nhập và thực hiện đăng nhập
async function autoLogin() {
    const username = config.username;
    const password = config.password;

    console.log("Auto login started");

    // Sử dụng selector chính xác cho trường username
    const usernameInput = document.querySelector('#keycloak > div > div > div > form > div.el-form-item.is-error.is-required > div > div.el-input.el-input--prefix > input');
    if (usernameInput) {
        console.log("Username input found");
        usernameInput.value = username;
        const inputEvent = new Event('input', { bubbles: true });
        usernameInput.dispatchEvent(inputEvent); // Gửi sự kiện input để cập nhật giá trị
        const nextButton = document.querySelector('button[type="button"]'); // Selector cho nút "Next"
        if (nextButton) {
            console.log("Next button found");
            nextButton.click();
        } else {
            console.log("Next button not found");
        }
    } else {
        console.log("Username input not found");
    }

    // Đợi form mới tải xong và điền password
    setTimeout(() => {
        const passwordInput = document.querySelector('input[type="password"]');
        if (passwordInput) {
            console.log("Password input found");
            passwordInput.value = password;
            const inputEvent = new Event('input', { bubbles: true });
            passwordInput.dispatchEvent(inputEvent); // Gửi sự kiện input để cập nhật giá trị
            const loginButton = document.querySelector('button[type="submit"]'); // Selector cho nút "Log in"
            if (loginButton) {
                console.log("Login button found");
                loginButton.click();
            } else {
                console.log("Login button not found");
            }
        } else {
            console.log("Password input not found");
        }
    }, 1000); // Điều chỉnh thời gian nếu cần
}

// Kiểm tra xem trang đã sẵn sàng chưa và thực hiện autoLogin
if (document.readyState === 'complete') {
    autoLogin();
} else {
    window.addEventListener('load', autoLogin);
}
