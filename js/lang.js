document.addEventListener('DOMContentLoaded', function(){

    lang = document.querySelector('.lang');
    mainRu = document.querySelector('.russian');
    mainEng = document.querySelector('.english');

    lang.addEventListener('click', function(e){
        if(e.target.classList.contains('ru')){
            mainRu.style.display = 'flex';
            mainEng.style.display = 'none';
        } 
        if(e.target.classList.contains('eng')){
            mainEng.style.display = 'flex';
            mainRu.style.display = 'none';
        } 
    });

});