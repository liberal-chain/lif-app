//会員登録ページのスクリプト

//登録エラーがあった際の処理
const errorMSG = [
    "氏名を入力してください。",
    "このメールアドレスは既に使われています。",
    "不適切なメールアドレスです。",
    "メールアドレスを入力してください。",
    "パスワードは8文字以上にしてください。",
    "正しい年齢を入力してください。",
    "年齢を入力してください。",
    "正しい電話番号を入力してください。",
    "電話番号を入力してください。"
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
            let ele = $(`#registration-form input[name="${params[i][1]}"]`);
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
$("#registration-button").on("click", () => {
    let check = true;
    let name = $("#name");
    let email = $("#email");
    let password = $("#password");
    let passwordConf = $("#password-conf");
    let age = $("#age");
    let telNumber = $("#telnumber");
    let termsCheck = $("#terms-check");

    if(name.val() == "") {
        name.attr("mode", "failed");
        name.attr("placeholder", "氏名を入力してください。");
        check = false;
    }
    if(email.val() == "") {
        email.attr("mode", "failed");
        email.attr("placeholder", "メールアドレスを入力してください。");
        check = false;
    }
    if(password.val().length < 8) {
        password.attr("mode", "failed");
        password.attr("placeholder", "パスワードは8文字以上にしてください。");
        check = false;
    }
    if(password.val() == "") {
        password.attr("mode", "failed");
        password.attr("placeholder", "パスワードを入力してください。");
        check = false;
    }
    if(password.val() !== passwordConf.val()) {
        passwordConf.attr("mode", "failed");
        passwordConf.attr("placeholder", "パスワードが一致しません。");
        check = false;
    }
    if(Number(age.val()) == NaN) {
        age.attr("mode", "failed");
        age.attr("placeholder", "正しい年齢を入力してください。");
        check = false;
    }
    if(age.val() == "") {
        age.attr("mode", "failed");
        age.attr("placeholder", "年齢を入力してください。");
        check = false;
    }
    if(Number(telNumber.val()) == NaN) {
        telNumber.attr("mode", "failed");
        telNumber.attr("placeholder", "正しい電話番号を入力してください。");
        check = false;
    }
    if(telNumber.val() == "") {
        telNumber.attr("mode", "failed");
        telNumber.attr("placeholder", "電話番号を入力してください。");
        check = false;
    }
    if(!termsCheck.prop("checked")) {
        $("#registration-button").val("利用規約に同意してください。");
        setTimeout(() => {
            $("#registration-button").val("登録する"); 
        }, 1000);
        check = false;
    }

    if(check) {
        $("#registration-form").submit();
    }
});