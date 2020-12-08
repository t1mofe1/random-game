document.body.children[0].hidden = true;

let user_languages = window.navigator.languages;
let supported_languages = { en: "English", et: "Eesti", ru: "Русский" };

let langs = user_languages.filter(lang => supported_languages[lang]);

if(langs.length === 0) lang = "en";
else {
    let inputOptions = {};
    for(let i = 0; i < langs.length; i++) {
        inputOptions[langs[i]] = supported_languages[langs[i]];
    }

    function askUserLanguage() {
        Swal.fire({
            input: "radio",
            inputOptions,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: '<i class="check"></i>'
        }).then((result) => {
            if(result.value === null) return askUserLanguage();
    
            let request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open("GET", `/languages/${result.value}.json`, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status == "200") {
                    window.lang = JSON.parse(request.responseText);
    
                    window.lang.getTitle = (min=1, max=10) => { return window.lang.game_title.replace("<min>", min).replace("<max>", max); }
                    
                    window.lang.getRightNumText = tries => {
                        if(tries === 1) return window.lang.right_num[0];
                        else if(tries <= 3) return window.lang.right_num[1].replace("<tries>", tries);
                        else return window.lang.right_num[2].replace("<tries>", tries);
                    }
    
                    document.title = window.lang.doc_title;
                    document.getElementById("title").innerText = window.lang.getTitle();
                    btn.innerText = window.lang.btn_text;
                    document.body.children[0].hidden = false;
                }
            }
            request.send(null);
        });
    }

    askUserLanguage();
}