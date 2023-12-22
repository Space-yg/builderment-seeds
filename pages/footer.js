"use strict";
(async () => {
    const path = (window.location.pathname.split("/").length === 2) ? "./pages/versions/index.html" : "../versions/index.html";
    const file = await fetch(path);
    const text = await file.text();
    const d = document.createElement("div");
    d.innerHTML = `<footer>
    <p id="footerText"></p>
    <p><a href="${path}">${new DOMParser().parseFromString(text, 'text/html').getElementsByTagName("h2").item(0).innerHTML}</a></p>
    </footer>`;
    document.getElementsByTagName("html")[0].appendChild(d.firstChild);
})();
