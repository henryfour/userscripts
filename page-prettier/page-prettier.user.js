// ==UserScript==
// @name         page-prettier
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
// @match        https://opensea.io/*
// @match        https://*.github.com/*
// @match        https://*.juejin.im/post/*
// @match        https://*.ethfans.org/posts/*
// @match        https://*.jianshu.com/p/*
// @match        https://*.zendesk.com/*
// @match        https://*.okex.com/*
// @match        https://baike.baidu.com/*
// @match        https://www.tokengazer.com/*
// @icon         https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// ==/UserScript==

var confs = [
  {
    domain: "opensea.io",
    printHides: [
      ".App > div:first-child", ".App nav",
      ".Discord", ".Footer2",
    ],
    hides: [],
    normalCss: [
    ],
    printCss: [
      "#discussion_bucket > .col-9 {width: 100%;}", // issuse
    ],
  },
  {
    domain: "github.com",
    printHides: [
      "#discussion_bucket > .col-3", // issuse 右侧
      ".pagehead",
      // 存在问题, 先不处理: "#blob-path", ".branch-select-menu", ".BtnGroup", ".Box-header", ".repository-content > div.flex-items-start",
    ],
    hides: [],
    normalCss: [
    ],
    printCss: [
      "#discussion_bucket > .col-9 {width: 100%;}", // issuse
    ],
  },
  {
    domain: "juejin.im",
    printHides: [
      ".main-header-box", ".sidebar", ".article-suspended-panel", ".recommended-area", ".suspension-panel", 
      ".main-area .article-banner", ".main-area #comment-box",
    ],
    hides: [],
    normalCss: [
    ],
    printCss: [
    ],
  },
  {
    domain: "tokengazer.com",
    printHides: [
      "#app .head", "#app .footer", "#app .reportLeft .static"
    ],
    hides: [],
    normalCss: [
    ],
    printCss: [
      "#app .center {padding:0;}",
    ],
  },
  {
    domain: "baike.baidu.com",
    printHides: [
      ".header-wrapper", ".navbar-wrapper", ".before-content", ".lemmaWgt-searchHeader", ".wgt-footer-main",
      "#side-share", ".side-content", ".personal-content", ".top-tool", 
    ],
    hides: [],
    normalCss: [],
    printCss: [
      ".body-wrapper .content-wrapper .content .main-content {width: auto}",
    ],
  },
  {
    domain: "ethfans.org",
    printHides: [
      ".navbar-wrapper", "p.meta.tags", ".mask",
      ".content-footer", ".topic-reply-container", "footer.footer"
    ],
    hides: [],
    normalCss: [],
    printCss: [],
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
    normalCss: [
      "#__next div[role=main] > div:first-child {width: 100%}",
    ],
    printCss: [],
  },
  {
    domain: "zendesk.com",
    printHides: [
      "header.header", "nav.sub-nav", "main .container-divider",
      "#article-container .article-sidebar",
       "#article-container .article-relatives", "#article-container .article-return-to-top", "#article-container footer",
      ".article-comments", ".article-subscribe",
      "footer.footer"
    ],
    hides: [],
    normalCss: [],
    printCss: [],
  },
  {
    domain: "okex.com",
    printHides: [
      "#headerContainer", "#footerContainer", "#YSF-BTN-HOLDER"
    ],
    hides: [],
    normalCss: [],
    printCss: [],
  },
];

function doPrettier(index) {
  var conf = confs[index];
  var i;
  // custom normal css
  for (i = 0; i < conf.normalCss.length; i++) {
    GM_addStyle(conf.normalCss[i]);
  }
  // custom css for print media
  for (i = 0; i < conf.printCss.length; i++) {
    GM_addStyle('@media print { ' + conf.printCss[i] + ' }');
  }
  GM_addStyle(conf.hides.join(",") + ' { display: none; } }');
  // hide elements
  GM_addStyle(conf.hides.join(",") + ' { display: none; } }');
  // hide when print
  // for (i = 0; i < conf.printCss.length; i++) {
  //   GM_addStyle('@media print { ' + conf.printHides[i]  + ' { display: none; } }');
  // }
  GM_addStyle('@media print { ' + conf.printHides.join(",") + ' { display: none; } }');
}

(function() {
  'use strict';
  var url = window.location.href;
  for (var i = 0; i < confs.length; i++) {
    // console.log(selectors.join(","));
    if (url.indexOf(confs[i].domain) > 0) {
      console.log("doPrettier", i);
      doPrettier(i);
      break;
    }
  }
})();
