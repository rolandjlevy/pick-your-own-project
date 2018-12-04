const box = document.querySelector('.score__board');

function toggleScoreBoard () {
    box.classList.toggle('visible');
}
document.addEventListener('click', function (event) {
    if (event.target.closest('.header__fame')) return
    if (event.target.closest('.score__board')) return
    box.classList.remove('visible');
});