document.addEventListener("DOMContentLoaded", function () {
    const accountInput = document.getElementById("account");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login");

    // 帳號格式：1 字母 + 7 數字
    function isAccountValid(value) {
        const trimmed = value.trim();
        const regex = /^[a-zA-Z][0-9]{7}$/;
        return regex.test(trimmed);
    }

    // 密碼長度至少 10
    function isPasswordValid(value) {
        return value.trim().length >= 10;
    }

    function toggleButtonState() {
        const isValid = isAccountValid(accountInput.value);
        const hasValidPassword = isPasswordValid(passwordInput.value);
        loginButton.disabled = !(isValid && hasValidPassword);
    }

    // 綁定輸入監聽
    accountInput.addEventListener("input", toggleButtonState);
    passwordInput.addEventListener("input", toggleButtonState);

    // 支援 Enter 登入
    document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !loginButton.disabled) {
            loginButton.click();
        }
    });

    // 登入按鈕邏輯
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const account = accountInput.value.trim();
        const password = passwordInput.value.trim();

        if (isAccountValid(account) && isPasswordValid(password)) {
            console.log(`帳號: ${account}`);
            console.log(`密碼: ${password}`);
            // 直接跳出新視窗（避免覆蓋原頁）
            window.open("link.html", "_blank");
        } else {
            alert("登入失敗，請確認帳密格式！");
        }
    });

    toggleButtonState(); // 初始化按鈕狀態
});
