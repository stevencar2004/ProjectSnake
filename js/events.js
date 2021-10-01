let btnInfo = document.getElementById("btn-details"),
	modal = document.getElementById("modal"),
	modalExit = document.getElementById("modalExit");
btnInfo.addEventListener("click", () => {
	modal.setAttribute("style", "top:0;"),
		modalExit.setAttribute("style", "display:block;");
}),
	modalExit.addEventListener("click", () => {
		modal.setAttribute("style", "top:-100vh;");
	});
