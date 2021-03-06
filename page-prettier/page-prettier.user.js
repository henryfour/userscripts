// ==UserScript==
// @name         page-prettier
// @version      0.0.1
// @description  通过修改 css 来自定义特定网页, 用于改善页面显示效果或者优化打印为 pdf 文件时的效果.
//
// @namespace    userscripts.henryfour.com
// @homepageURL  https://github.com/henryfour/userscripts
// @supportURL   https://github.com/henryfour/userscripts/issues
// @author       HenryFour
// @copyright    2019+, HenryFour
// @license      MIT
// @icon         https://github.com/henryfour/userscripts/raw/master/page-prettier/icon.png
//
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
//
// @match        https://*.csdn.net/*
// @match        https://*.vitalik.ca/*
// @match        https://*.8btc.com/article/*
// @match        https://*.chainnews.com/*
// @match        https://*.learnblockchain.cn/*
// @match        https://*.zhihu.com/*
// @match        https://*.opensea.io/*
// @match        https://*.github.com/*
// @match        https://*.juejin.im/post/*
// @match        https://*.ethfans.org/*
// @match        https://*.jianshu.com/p/*
// @match        https://*.zendesk.com/*
// @match        https://*.okex.com/*
// @match        https://baike.baidu.com/*
// @match        https://www.tokengazer.com/*
// ==/UserScript==

var confs = [
  {
    domain: "csdn.net",
    printHides: [
      "#csdn-toolbar",
      ".tool-box", ".csdn-side-toolbar", ".recommend-box", ".comment-box", ".template-box", ".blog_container_aside",
      ".more-toolbox", ".person-messagebox"
    ],
    hides: [],
    normalCss: [],
    printCss: [],
  },
  {
    domain: "vitalik.ca",
    printHides: [
      "#disqus_thread",
    ],
    hides: [],
    normalCss: [],
    printCss: [],
  },
  {
    domain: "8btc.com",
    printHides: [
      ".bbt-topbar", ".bbt-header", ".bbt-rightbar", 
      ".main__sidebar", ".share-module", ".related-module", "#comment-module",
      ".bbt-footer", 
    ],
    hides: [],
    normalCss: [],
    printCss: [
      ".bbt-container > .bbt-row > .bbt-col-xs-16 {width: 100%}",
    ],
  },
  {
    domain: "chainnews.com",
    printHides: [
      ".section-subnav", ".section-header", ".section-navbar",
      ".aside-container", "footer.section-footer", ".post-sidebar", 
      ".section-tips", ".post-share-bottom", ".article-sponsors", ".post-related", 
    ],
    hides: [],
    normalCss: [],
    printCss: [],
  },
  {
    domain: "learnblockchain.cn",
    printHides: [
      ".global-nav",".top-alert",
      "#comments", ".widget-comments", ".widget-answers", "#sub-menu", "#header", ".post-copyright", ".post-footer", ".row .side",
      "#support-button", "#collect-button",
    ],
    hides: [],
    normalCss: [],
    printCss: [
      ".content-wrap {padding: 0}"
    ],
  },
  {
    domain: "zhihu.com",
    printHides: [
      // 专栏
      ".ColumnPageHeader-Wrapper", ".RichContent-actions", ".CornerButtons", ".Recommendations-Main", ".Comments-container", ".Post-Sub", 
      // 问答, question
      ".Question-sideColumn"
    ],
    hides: [],
    normalCss: [],
    printCss: [
      ".Question-mainColumn {width: auto}",
    ],
  },
  {
    domain: "opensea.io",
    printHides: [
      ".App > div:first-child", ".App nav",
      ".Discord", ".Footer2",
    ],
    hides: [],
    normalCss: [],
    printCss: [],
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
  GM_addStyle('@media print { ' + conf.printHides.join(",") + ' { display: none !important; } }');
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
