"use strict";
(async () => {
    const path = (window.location.pathname.split("/").pop() === "index.html" || window.location.pathname.split("/").pop() === "") ? "./pages/versions/versions.html" : "../versions/versions.html";
    const file = await fetch(path);
    const text = await file.text();
    const d = document.createElement("div");
    d.innerHTML = `<footer>
    <p id="footerText"></p>
    <p><a href="${path}">${new DOMParser().parseFromString(text, 'text/html').getElementsByTagName("h2").item(0).innerHTML}</a></p>
    </footer>`;
    document.getElementsByTagName("html")[0].appendChild(d.firstChild);
})();
