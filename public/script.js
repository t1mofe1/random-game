let randomNumber, tries;

function generateRandom() {
	randomNumber = Math.floor(Math.random() * 10) + 1;
	console.log('RandomNumber:', randomNumber);
	tries = 0;
}

generateRandom();

// enter key submit
input.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		e.preventDefault();
		btn.click();
	}
});

// if input is empty, make button disabled
input.addEventListener('change', () => (btn.disabled = input.value.length <= 0));

btn.addEventListener('click', () => {
	if (input.value.length <= 0) return (btn.disabled = true);

	const userValue = Number(input.value);
	input.value = '';

	console.log(`User typed: ${userValue}`);

	tries++;

	let modalTitle;
	let modalIcon;

	if (userValue === randomNumber) {
		// user guessed the number
		modalTitle = window.lang.getRightNumText(tries);
		modalIcon = 'success';
	} else if ([userValue + 1, userValue - 1].includes(randomNumber)) {
		// user guessed number next to the random number
		modalTitle = window.lang.close_num;
		modalIcon = 'info';
	} else {
		// user guessed wrong number
		modalTitle = window.lang.wrong_num;
		modalIcon = 'error';
	}

	Swal.fire({
		title: modalTitle,
		icon: modalIcon,
		confirmButtonText: window.lang.swal_btn_text,
	});

	// if user guessed right number, restart game
	userValue === randomNumber && generateRandom();
});
