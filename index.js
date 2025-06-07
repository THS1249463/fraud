document.addEventListener("DOMContentLoaded", function () {
    // 語言切換功能
    const langSelect = document.getElementById("language-select");
    const accountInput = document.getElementById("account");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login");
    const cookieInfo = document.getElementById("cookie-info");
    const nidLink = document.getElementById("link");
    const rightTitle = document.querySelector(".right h2");

    // 多語字典
    const langDict = {
        zh_tw: {
            account: "帳號",
            password: "密碼",
            login: "登入",
            cookieInfo: "cookie使用資訊",
            cookieAlert: '您的瀏覽器必須啟動 Cookies 功能\n' +
                '\n' +
                '本站使用了兩個cookie： 必要的是連線cookie，通常叫做 MoodleSession。您必須在瀏覽器裡允許這個cookie，以便使您的登入在頁與頁之間連續有效。當您登離或關閉瀏覽器，這個cookie在瀏覽器和伺服器裡都會被刪除。 另一個cookie純粹是為了方便，通常被叫做類似 MOODLEID 之類的名字。它只用來在瀏覽器裡記住您的用戶名。這意味著當您再次回到本站，登入頁面裡的用戶名已經替您填好了。拒絕此cookie是安全的，只不過每次登入都要重新輸入用戶名而已。',
            rightTitle: "請使用NID帳號/密碼登入平台。",
            nidLink: "NID"
        },
        en: {
            account: "Username",
            password: "Password",
            login: "Login",
            cookieInfo: "Cookie notice",
            cookieAlert: 'Cookies must be enabled in your browser\n' +
                '\n' +
                'Two cookies are used on this site:\n' +
                '\n' +
                'The essential one is the session cookie, usually called MoodleSession. You must allow this cookie in your browser to provide continuity and to remain logged in when browsing the site. When you log out or close the browser, this cookie is destroyed (in your browser and on the server).\n' +
                '\n' +
                'The other cookie is purely for convenience, usually called MOODLEID or similar. It just remembers your username in the browser. This means that when you return to this site, the username field on the login page is already filled in for you. It is safe to refuse this cookie - you will just have to retype your username each time you log in.',
            rightTitle: "請使用NID帳號/密碼登入平台。",
            nidLink: "NID"
        }
    };

    function setLang(lang) {
        accountInput.placeholder = langDict[lang].account;
        passwordInput.placeholder = langDict[lang].password;
        loginButton.textContent = langDict[lang].login;
        cookieInfo.textContent = langDict[lang].cookieInfo;
        rightTitle.textContent = langDict[lang].rightTitle;
        nidLink.textContent = langDict[lang].nidLink;
    }

    langSelect.addEventListener("change", function() {
        setLang(this.value);
    });
    // 預設語言
    setLang(langSelect.value);

    // 帳號格式：1 字母 + 7 數字
    function isAccountValid(value) {
        const trimmed = value.trim();
        const regex = /^[a-zA-Z][0-9]{7}$/;
        return regex.test(trimmed);
    }

    // 密碼長度至少 12
    function isPasswordValid(value) {
        return value.trim().length >= 12;
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
            console.log("你的帳密我偷走啦!")
            // 直接跳出新視窗（避免覆蓋原頁）
            window.open("link.html", "_blank");
        } else {
            alert("登入失敗，請確認帳密格式！");
        }
    });

    toggleButtonState(); // 初始化按鈕狀態
});

// cookie alert 多語
function getCurrentLang() {
    const select = document.getElementById('language-select');
    return select ? select.value : 'zh_tw';
}

document.getElementById('cookie-info').addEventListener('click', function(e) {
    e.preventDefault();
    const lang = getCurrentLang();
    const dict = {
        zh_tw: '您的瀏覽器必須啟動 Cookies 功能\n' +
            '\n' +
            '本站使用了兩個cookie： 必要的是連線cookie，通常叫做 MoodleSession。您必須在瀏覽器裡允許這個cookie，以便使您的登入在頁與頁之間連續有效。當您登離或關閉瀏覽器，這個cookie在瀏覽器和伺服器裡都會被刪除。 另一個cookie純粹是為了方便，通常被叫做類似 MOODLEID 之類的名字。它只用來在瀏覽器裡記住您的用戶名。這意味著當您再次回到本站，登入頁面裡的用戶名已經替您填好了。拒絕此cookie是安全的，只不過每次登入都要重新輸入用戶名而已。',
        en: 'Your browser must have cookies enabled.\n' +
            '\n' +
            'This site uses two cookies: The essential one is the session cookie, usually called MoodleSession. You must allow this cookie in your browser to keep your login active as you move from page to page. When you log out or close the browser, this cookie will be deleted from both your browser and the server. The other cookie is purely for convenience, usually called something like MOODLEID. It just remembers your username in the browser. This means when you return to this site, your username will already be filled in on the login page. It is safe to refuse this cookie, but you will have to re-enter your username every time you log in.'
    };
    alert(dict[lang]);
});
