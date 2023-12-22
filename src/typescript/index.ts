// Add transition to all anchor tags
// This is so that the transition does not work when the page is loaded, but to work later
for (const a of document.getElementsByTagName("a")) a.style.transition = "all .1s"