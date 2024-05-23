
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const interval = 100; // Time between checks (ms)
        const endTime = Date.now() + timeout;

        const checkExist = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(checkExist);
                resolve(document.querySelector(selector));
            } else if (Date.now() > endTime) {
                clearInterval(checkExist);
                reject(new Error(`Timeout: ${selector} not found`));
            }
        }, interval);
    });
}

// Function to simulate a click event
function simulateClick(element) {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

// This function will fill in the login information and perform the login
async function autoLogin() {
    const username = "";
    const password = "";

    console.log("Auto login started");

    try {
        // Simulate a click on the body to initialize page elements
        console.log("Simulating initial click");
        simulateClick(document.body);

        // Wait for the username field to be ready
        const usernameInput = await waitForElement('#keycloak > div > div > div > form > div.el-form-item.is-error.is-required > div > div.el-input.el-input--prefix > input', 10000);
        console.log("Username input found");
        usernameInput.focus(); // Trigger the focus event
        usernameInput.value = username;
        const inputEvent = new Event('input', { bubbles: true });
        usernameInput.dispatchEvent(inputEvent); // Dispatch input event to update value

        // Wait for the "Next" button to be ready
        const nextButton = await waitForElement('button[type="button"]', 10000);
        console.log("Next button found");
        nextButton.click();

        // Wait for the password field to be ready
        const passwordInput = await waitForElement('input[type="password"]', 10000);
        console.log("Password input found");
        passwordInput.focus(); // Trigger the focus event
        passwordInput.value = password;
        passwordInput.dispatchEvent(inputEvent); // Dispatch input event to update value

        // Wait for the "Log in" button to be ready
        const loginButton = await waitForElement('button[type="submit"]', 10000);
        console.log("Login button found");
        loginButton.click();
    } catch (error) {
        console.error(error.message);
    }
}

// Check if the page is ready and perform autoLogin
if (document.readyState === 'complete') {
    console.log("Page is ready");
    autoLogin();
} else {
    console.log('Waiting for page to load');
    window.addEventListener('load', autoLogin);
}
