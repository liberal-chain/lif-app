//ログインページのスクリプト

//登録エラーがあった際の処理
const errorMSG = [
    "メールアドレスが使用されていません。",
    "不適切なメールアドレスです。",
    "メールアドレスを入力してください。",
    "パスワードが違います。",
    "パスワードを入力してください。"
];
$(() => {
    const url = new URL(window.location.href);
    let params = url.search;
    params = params.substring(1, params.length);
    params = params.split("&");
    for(let i = 0; i < params.length; i++) {
        params[i] = params[i].split("=");
    }
    for(let i = 0; i < params.length; i++) {
        if(params[i][0] == "param") {
            let ele = $(`#login-form input[name="${params[i][1]}"]`);
            ele.attr("placeholder", errorMSG[Number(params[i + 1][1])]);
            ele.attr("mode", "failed");
        }
    }
    history.replaceState(null, null, url.origin + url.pathname);
});

//ナビゲーションのクリックイベント
$('#hamburger-button').on("click", () => {
    if($("#hamburger-button").attr("mode") == "0") {
        $("#nav-sp").slideDown();
        $("#hamburger-button").attr("mode", "1");
    } else {
        $("#nav-sp").slideUp();
        $("#hamburger-button").attr("mode", "0");
    }
});

//登録ボタン
$("#loginbutton").on("click", () => {
    let check = true;
    let email = $("#email");
    let password = $("#password");
    let autologin = $("#autologin");

    if(email.val() == "") {
        email.attr("mode", "failed");
        email.attr("placeholder", "メールアドレスを入力してください。");
        check = false;
    }
    if(password.val() == "") {
        password.attr("mode", "failed");
        password.attr("placeholder", "パスワードを入力してください。");
        check = false;
    }

    if(check) {
        let data = {
            email: email.val(),
            password: password.val(),
            autologin: autologin.prop("checked")
        };
        $.post("/login", data, (data, ts, jqxhr) => {
            location.href = data;
        });
    }
});