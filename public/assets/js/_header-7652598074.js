const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  setTimeout(function(){
    menu.classList.toggle('hidden');   
  }, 100);
});
