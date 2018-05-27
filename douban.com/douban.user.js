// ==UserScript==
// @name         豆瓣私有设置
// @version      0.0.1
// @description  豆瓣操作自动设置仅自己可见
// @match        *://*.douban.com/*
// @run-at       document-body
// @icon         https://img3.doubanio.com/favicon.ico
// @namespace    userscripts.henryfour.com
// @homepageURL  https://github.com/henryfour/userscripts
// @supportURL   https://github.com/henryfour/userscripts/issues
// @author       HenryFour
// @copyright    2018, HenryFour
// ==/UserScript==

$('body').click(function(e) {
    // 豆瓣广播
    $("input[name=share-shuo]").attr("checked", null);
    // 仅自己可见
    $("#inp-private").attr("checked", "checked");
});
