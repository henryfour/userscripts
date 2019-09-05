// ==UserScript==
// @name         prettier-page
// @version      0.0.1
// @description  为将页面打印为 pdf 而隐藏页面部分内容
// @namespace    userscripts.henryfour.com
// @homepageURL  https://github.com/henryfour/userscripts
// @supportURL   https://github.com/henryfour/userscripts/issues
// @author       HenryFour
// @copyright    2019+, HenryFour
// @license	     MIT
//
// @run-at       document-end
// @grant        GM_addStyle
// @match        https://*.ethfans.org/posts/*
// @match        https://*.jianshu.com/p/*
// @icon         https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// ==/UserScript==

var confs = [
  {
    domain: "ethfans.org",
    printHides: [
      ".navbar-wrapper", "p.meta.tags", ".mask",
      ".content-footer", ".topic-reply-container", "footer.footer"
    ],
    hides: [
    ],
    customs: [
    ],
  },
  {
    domain: "jianshu.com",
    printHides: [
      "#__next header", "#__next aside", "#__next aside + div", "#__next footer",
      "#__next #note-page-comment", "#__next #note-page-comment + section", 
    ],
    hides: [
      "#__next footer + div", // 赞, 赏
    ],
    customs: [
      "#__next div[role=main] > div:first-child {width: 100%}",
    ],
  },
];

function doPrettier(index) {
  var conf = confs[index];
  // custom css
  for (var i = 0; i < conf.customs.length; i++) {
    GM_addStyle(conf.customs[i]);
  }
  GM_addStyle(conf.hides.join(",") + ' { display: none; } }');
  // hide elements
  GM_addStyle(conf.hides.join(",") + ' { display: none; } }');
  // hide when print
  GM_addStyle('@media print { ' + conf.printHides.join(",") + ' { display: none; } }');
}

(function() {
  'use strict';
  var url = window.location.href;
  for (var i = 0; i < confs.length; i++) {
    // console.log(selectors.join(","));
    if (url.indexOf(confs[i].domain) > 0) {
      doPrettier(i);
      break;
    }
  }
})();