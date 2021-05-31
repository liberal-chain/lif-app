//トップページのスクリプト

//ナビゲーションのクリックイベント
$("#nav-salon a").on("click", () => {
    let scrollTop = $("#salon").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});
$("#nav-company a").on("click", () => {
    let scrollTop = $("#company").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});
$('#hamburger-button').on("click", () => {
    if($("#hamburger-button").attr("mode") == "0") {
        $("#nav-sp").slideDown();
        $("#hamburger-button").attr("mode", "1");
    } else {
        $("#nav-sp").slideUp();
        $("#hamburger-button").attr("mode", "0");
    }
});
$("#nav-salon-sp a").on("click", () => {
    let scrollTop = $("#salon").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});
$("#nav-company-sp a").on("click", () => {
    let scrollTop = $("#company").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});
$("#footer-nav-salon a").on("click", () => {
    let scrollTop = $("#salon").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});
$("#footer-nav-company a").on("click", () => {
    let scrollTop = $("#company").offset().top;
    $("html, body").animate({"scrollTop": `${scrollTop}px`}, 800, "swing");
});

//トップに戻るボタン
let topbackbutton = $("#topbackbutton");
$(window).on("scroll", () => {
    let scrollTop = $(this).scrollTop();
    let screenHeight = $(this).innerHeight();
    let footerPos = $("footer").offset().top;
    topbackbutton.css("top", "auto");
    if(scrollTop >= screenHeight) {
        if(footerPos <= scrollTop) {
            topbackbutton.attr("mode", "2");
            if($(window).innerWidth() <= 1219) {
                topbackbutton.css("top", `${$("#footer-bottom").offset().top}px`);
            } else {
                topbackbutton.css("top", `${$("#footer-bottom").offset().top - 140}px`);
            }
        } else topbackbutton.attr("mode", "1");
    } else {
        topbackbutton.attr("mode", "0");
    }
});
topbackbutton.on("click", () => {
    $("html, body").animate({"scrollTop": "0"}, 800, "swing");
});