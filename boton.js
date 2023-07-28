const boton = document.querySelector('#boton');
const menu = document.querySelector('#mobile-menu');

boton?.addEventListener('click',() => {
    menu.classList.toggle('hidden')
});

