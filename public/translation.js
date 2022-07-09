document.body.children[0].hidden = true;

const supported_languages = { en: 'English', et: 'Eesti', ru: 'Русский' };

const langs = window.navigator.languages.filter(lang => supported_languages[lang]);

function askUserLanguage() {
	Swal.fire({
		input: 'radio',
		inputOptions: supported_languages,
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
		confirmButtonText: '<i class="check"></i>',
	}).then(result => {
		if (result.value === null) return askUserLanguage();

		fetch(`/languages/${result.value}.json`)
			.then(res => res.json())
			.then(data => {
				window.lang = {
					...data,
					getTitle: (min = 1, max = 10) => window.lang.game_title.replace('<min>', min).replace('<max>', max),
					getRightNumText: tries => window.lang.right_num[tries === 1 ? 0 : tries <= 3 ? 1 : 2].replace('<tries>', tries),
				};

				document.title = window.lang.doc_title;

				title.innerText = window.lang.getTitle();
				btn.innerText = window.lang.btn_text;

				mainContainer.hidden = false;
			});
	});
}

askUserLanguage();
