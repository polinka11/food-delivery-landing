document.addEventListener('DOMContentLoaded', function(){
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');
          tabsParent = document.querySelector('.tabheader__items');
          

    function hideTab(){
        tabsContent.forEach(tab =>{
            tab.classList.add('hide');
            tab.classList.remove('fade');
        });
        tabs.forEach(tab =>{
            tab.classList.remove('.tabheader__items_active')
        });
    }

    function showTab(i){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('fade');
        tabs[i].classList.add('.tabheader__items_active');
        
    }
    tabsParent.addEventListener('click', function(event){
       const target = event.target;

       if( target && target.classList.contains('.tabheader__items')){
           tabs.forEach(function(item,i){
               if( target ==item){
                   hideTab();
                   showTab(i);
               }
           });
       }
    });
});