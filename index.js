document.addEventListener("DOMContentLoaded", function () {
    const accountInput = document.getElementById("account");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login");

    function toggleButtonState() {
        loginButton.disabled = !(accountInput.value.trim() && passwordInput.value.trim());
    }

    accountInput.addEventListener("input", toggleButtonState);
    passwordInput.addEventListener("input", toggleButtonState);

    // 初始化按鈕狀態
    toggleButtonState();
});