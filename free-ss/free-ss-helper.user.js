// ==UserScript==
// @name         free-ss-helper
// @version      0.0.1
// @description  方便添加 free-ss 到 ss 客户端的工具脚本
// @namespace    userscripts.henryfour.com
// @homepageURL  https://github.com/henryfour/userscripts
// @supportURL   https://github.com/henryfour/userscripts/issues
// @author       HenryFour
// @copyright    2019+, HenryFour
// @license	     MIT
//
// @run-at       document-end
// @grant        GM_addStyle
// @match        https://free-ss.site/*
// @icon         http://shadowsocks.org/assets/img/favicon/apple-touch-icon.png
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// ==/UserScript==

var state = null;

// show next qrcode in ss table rows
function showNextRow() {
  if (!checkLoading()) {
    return;
  }
  if (state.showRow >= 0) {
    // hide prev qrcode
    state.shadeArea.click();
    // cancel highlight for prev row
    $(state.rows[state.showRow]).css("background-color", "");
  }
  state.showRow = state.nextRow;
  state.nextRow++;
  if (state.nextRow >= state.rows.length) {
    state.nextRow = 0;
  }
  // highlight row and show qrcode
  $(state.rows[state.showRow]).css("background-color", "yellow");
  var qrcode = $(state.rows[state.showRow]).find('i.fa-qrcode');
  qrcode.click();
}

// 检查表格是否已经加载完毕, 如果没有则返回 false, 否则初始化 state 并返回 true
function checkLoading() {
  if (state) {
    return true;
  }
  var rows = $('table#tbss tbody tr');
  if (rows.length == 0) {
    console.log('ss table has not loaded');
    return false;
  }
  state = {
    shadeArea: $('.layui-layer-shade'),
    rows: rows,
    showRow: -1,
    nextRow: 0,
  };
  console.log(state.rows.length);
  return true;
}

// 将一行 ss 转换成 uri 格式, 参考 https://shadowsocks.org/en/config/quick-guide.html
function convertRowToURI(row) {
  // uri = "ss://" + base64(method:password@hostname:port) + "#tag"
  var tds = row.find('td');
  var hostname=tds[1].innerText;
  var port=tds[2].innerText;
  var method=tds[3].innerText;
  var password=tds[4].innerText;
  var area=tds[6].innerText;
  var tag = area;
  return "ss://" + btoa(method+":"+password+"@"+hostname+":"+port) + "#" + tag;
}

// export all rows to URIs to clipboard
function exportAllRows() {
  if (!checkLoading()) {
    return;
  }
  var uris = [];
  for (var i = 0; i < state.rows.length; i++) {
    var uri = convertRowToURI($(state.rows[i]));
    uris.push(uri);
  }
  console.log(uris);
  // alert(uris);
  return uris;
}

function init() {
  // title - 免费S账号
  var title = $('div.main > h3').eq(1);
  // insert export button
  title.append('<button id="export" style="padding:8px; margin:2px 8px; color:red;">点击导出所有服务器</button>');
  $('<textarea id="uris" rows="4" style="width:100%;"></textarea>').insertAfter(title);
  $('#export').click(function() {
    console.log("ok");
    var uris = exportAllRows();
    // copy uris to textarea
    $('#uris').text(uris.join("\n"));
  });
}

(function() {
  'use strict';

  init();
  // checkLoading();
  $('body').keydown(function(e) {
    // console.log(e);
    if (e.keyCode === 91) {
      return false;
    }
    if (e.keyCode === 13) {
      showNextRow();
    }
  });

  // window.onfocus = function(){
  //   console.log("focus");
  // }
  // // 网页失去焦点
  // window.onblur = function(){
  //   console.log("blur");
  // }
})();
