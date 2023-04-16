// ==UserScript==
// @name         GitHub Gist TOC Navigation
// @namespace    userscripts.henryfour.com
// @description  Add a table of contents navigation to Github Gist pages
// @version      0.1
// @author       HenryFour
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @license	     MIT
//
// @match        https://gist.github.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function createTOC() {
    const headers = document.querySelectorAll('h1, h2');
    if (headers.length === 0) {
      return;
    }

    const toc = document.createElement('div');
    toc.classList.add('toc');
    toc.innerHTML = '<h3>Table of Contents</h3>';
    const tocList = document.createElement('ul');
    toc.appendChild(tocList);

    for (const header of headers) {
      const listItem = document.createElement('li');
      listItem.style.marginLeft = (header.tagName.slice(1) * 10) + 'px';
      const target = header.querySelector('a');
      if (target && target.id) {
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = '#' + target.id;
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      }
    }
    // 将导航条固定在页面左侧
    toc.style.position = 'fixed';
    toc.style.top = '40%';
    toc.style.left = '4em';
    toc.style.transform = 'translateY(-50%)';
    // 插入到页面
    const container = document.querySelector('.container-lg');
    container.insertBefore(toc, container.firstChild);
  }

  setTimeout(createTOC, 500);
})();
