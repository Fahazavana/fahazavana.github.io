async function typingTextEffect(array, display) {
	const nbr_text = array.length;
	let i = -1;
	while (true) {
		i = (i + 1) % nbr_text;
		await typeText(array[i], display);
		await waitForMs(1000);
		await deleteText(display);
		await waitForMs(300);
	}
}

async function typeText(sentence, eltId, delay = 200) {
	const letters = sentence.split("");
	let i = 0;
	while (i < letters.length) {
		await waitForMs(delay);
		document.getElementById(eltId).append(letters[i]);
		i++;
	}
	return;
}

async function deleteText(eltId) {
	const sentence = document.getElementById(eltId).innerHTML;
	const letters = sentence.split("");

	let i = 0;
	while (letters.length > 0) {
		await waitForMs(200);
		letters.pop();
		document.getElementById(eltId).innerHTML = letters.join("");
	}
}

function waitForMs(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = () => {
	const datas = document.getElementById("typing-data"),
		children = Array.from(datas.children),
		display = "typing-text";
	textArray = Array.from(children, (element) => element.innerText);
	typingTextEffect(textArray, display);
};
