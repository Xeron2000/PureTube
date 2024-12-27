// ==UserScript==
// @name         PureTube
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  删除 YouTube 的右侧推荐视频、顶部导航栏，并保留左侧导航栏的“订阅”部分
// @author       Xeron
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 删除符合条件的元素
    const removeElement = (selector, condition) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            if (condition(element)) {
                element.remove();
            }
        });
    };

    // 删除页面中的指定元素
    const removePageElements = () => {
        removeElement('ytd-guide-entry-renderer', (element) => {
            const title = element.querySelector('yt-formatted-string.title');
            return title && [
                '设置', '首页', 'Shorts', '订阅', '举报记录', '帮助', '发送反馈'
            ].includes(title.textContent);
        });

        removeElement('ytd-guide-section-renderer', (section) => {
            const guideTitle = section.querySelector('yt-formatted-string#guide-section-title');
            return guideTitle && (
                guideTitle.textContent === "探索" || guideTitle.textContent === "更多 YouTube 产品与功能"
            );
        });

        const footer = document.getElementById('footer');
        if (footer) {
            footer.remove();
        }
    };

    // 隐藏右侧推荐视频区域
    const hideSidebar = () => {
        const sidebar = document.getElementById('secondary');
        if (sidebar) {
            sidebar.remove();
        }
    };

    // 删除顶部导航栏
    const removeHeader = () => {
        const header = document.getElementById('header');
        if (header) {
            header.remove();
        }
    };

    // 监听 DOM 变化
    const observer = new MutationObserver(() => {
        removePageElements();
        hideSidebar();
        removeHeader();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // 初始执行
    removePageElements();
    hideSidebar();
    removeHeader();

})();
