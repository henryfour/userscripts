// ==UserScript==
// @name         etherscan-helper
// @version      0.0.1
// @description  Gadget for etherscan.io
// @namespace    userscripts.henryfour.com
// @homepageURL  https://github.com/henryfour/userscripts
// @supportURL   https://github.com/henryfour/userscripts/issues
// @author       HenryFour
// @copyright    2020+, HenryFour
// @license      MIT
//
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @match        https://cn.etherscan.com/*
// @match        https://*.etherscan.io/*
// @icon         https://etherscan.io/images/favicon2.ico
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// ==/UserScript==

GM_addStyle(
  // reference: https://gradientbuttons.colorion.co/
  ".btn-grad {background-image: linear-gradient(to right, #E55D87 0%, #5FC3E4 51%, #E55D87 100%)}"
  + ".btn-grad {margin: 10px; padding: 10px 20px; text-align: center; text-transform: uppercase; transition: 0.5s; background-size: 200% auto; color: white; box-shadow: 0 0 20px #eee; border-radius: 10px; display: block; border-width: 0;}"
  + ".btn-grad:hover { background-position: right center; color: #fff; text-decoration: none; }"
  + ".auto-jump { margin: 10px; padding: 4px; color: #fff; background-color: #21325b; }"
  + ".auto-jump label { margin: 0 0 0 4px; }"
);

(function () {
  'use strict';

  const HostCN = "cn.etherscan.com";
  const HostEN = "etherscan.io";
  const KeyAutoJump = "etherscan.auto-jump";

  function isHostEN() {
    return window.location.hostname == HostEN;
  }
  function isHostCN() {
    return window.location.hostname == HostCN;
  }

  function jumpToHost(toHost) {
    if (toHost && window.location.hostname != toHost) {
      if (getAutoJumpHost()) {
        setAutoJump(toHost);
      }
      let jumpUrl = window.location.href.replace(window.location.hostname, toHost);
      window.location.href = jumpUrl;
      return true;
    }
    return false;
  }

  function getAutoJumpHost() {
    return GM_getValue(KeyAutoJump, "");
  }

  function setAutoJump(toHost) {
    GM_setValue(KeyAutoJump, toHost);
  }

  function tryAutoJump() {
    let toHost = getAutoJumpHost();
    switch (toHost) {
      case HostEN:
        return isHostCN() && jumpToHost(toHost);
      case HostCN:
        return isHostEN() && jumpToHost(toHost);
      default:
        return false;
    }
  }

  // auto jump before document loaded
  if (tryAutoJump()) {
    return;
  }

  window.addEventListener('load', () => {
    // Hide username for screenshots sharing
    let profile = document.getElementById("dropdownUser");
    if (profile) {
      profile.childNodes[1].textContent = "My Profile";
    }

    // floating functions
    const floatingArea = addFloatingArea();
    let btnText, toHost, checkText;
    if (isHostEN()) {
      btnText = '转到中文站';
      toHost = HostCN;
      checkText = '自动跳转';
    } else if (isHostCN()) {
      btnText = 'Goto EN';
      toHost = HostEN;
      checkText = 'Auto Jump';
    } else {
      // no jump for testnets
      return;
    }
    addButton(floatingArea, btnText, () => { jumpToHost(toHost) }, 'btn-grad');
    addCheckbox(floatingArea, checkText, (checked) => { setAutoJump(checked ? toHost : ""); });
  })

  function addButton(parent, text, onclick, cls, styles) {
    let button = document.createElement('button');
    button.innerHTML = text;
    button.onclick = onclick;
    button.className = cls;
    styles = styles || {}
    Object.keys(styles).forEach(key => button.style[key] = styles[key]);
    parent.appendChild(button);
    return button
  }

  function addCheckbox(parent, text, cb, cls) {
    let div = document.createElement('div');
    div.className = 'auto-jump';
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'auto-jump-check';
    input.checked = getAutoJumpHost() ? true : false;
    input.value = true;
    input.onclick = () => { cb(input.checked); };
    let label = document.createElement('label');
    label.innerHTML = text;
    label.setAttribute('for', input.id);
    div.append(input, label);
    parent.appendChild(div);
  }

  function addFloatingArea() {
    let div = document.createElement('div');
    let styles = { position: 'fixed', top: '20%', right: '1%', 'z-index': 9999 };
    Object.keys(styles).forEach(key => div.style[key] = styles[key]);
    document.body.appendChild(div);
    return div;
  }
})();
