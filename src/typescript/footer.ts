// Footer
(async () => {
	const path = (document.getElementsByClassName("filterGrid").length) ? "./pages/versions/" : "../versions/"
	const text = await (await fetch(path + "versions.md")).text()
	document.getElementsByTagName("html")[0].innerHTML += `<footer>
		<p id="footerText"></p>
		<p><a href="${path + "index.html"}">${text.split("\n", 1)[0].split(" ")[1]}</a></p>
	</footer>`
})()