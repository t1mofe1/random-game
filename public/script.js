const input = document.querySelector('#input');
const btn = document.querySelector('#btn');

let randomNumber, tries;

function generateRandom() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log("RandomNumber:", randomNumber);
    tries = 0;
}

generateRandom();

input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        btn.click();
    }
});

input.addEventListener("change", () => {
    if(input.value.length <= 0) btn.disabled = true;
    else btn.disabled = false;
});

btn.addEventListener('click', () => {
    if(input.value.length <= 0) return btn.disabled = true;
    let userValue = +input.value;
    input.value = '';
    console.log("User typed:", userValue);
    tries++;
    if (userValue === randomNumber) {
        Swal.fire({
            title: window.lang.getRightNumText(tries),
            icon: 'success',
            confirmButtonText: window.lang.swal_btn_text
        });
        generateRandom();
    } else if ((userValue + 1 === randomNumber) || (userValue - 1 === randomNumber)) {
        Swal.fire({
            title: window.lang.close_num,
            icon: 'info',
            confirmButtonText: window.lang.swal_btn_text
        });
    } else {
        Swal.fire({
            title: window.lang.wrong_num,
            icon: 'error',
            confirmButtonText: window.lang.swal_btn_text
        });
    }
});