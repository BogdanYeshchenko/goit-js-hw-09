!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")},n=null,e=!1;function o(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.startBtn.addEventListener("click",(function(){if(e)return;e=!0,n=setInterval(o,1e3)})),t.stopBtn.addEventListener("click",(function(){e=!1,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.42f86626.js.map