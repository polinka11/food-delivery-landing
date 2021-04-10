document.addEventListener('DOMContentLoaded', function(){
   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');
         

   function hideTab(){
      tabsContent.forEach(tab =>{
         tab.classList.add('hide');
         tab.classList.remove('fade');

      });
      tabs.forEach(tab =>{
         tab.classList.remove('tabheader__item_active'); 
      });
   }
   
   function showTab(i){
      tabsContent[i].classList.remove('hide');
      tabsContent[i].classList.add('fade');
      
      tabs[i].classList.add('tabheader__item_active');
   }
   
   tabsParent.addEventListener('click', function(event){
      const target = event.target;

      if( target && target.classList.contains('tabheader__item')){
         tabs.forEach(function(item,i){
              if( target == item){
               hideTab();
               showTab(i);
              } 
         });
      }
   });

   function changeTab(){
     const activeTab = document.querySelector('.tabheader__item_active');
     tabs.forEach((item, i)=>{
      if(tabsParent.lastElementChild == activeTab) {
         hideTab();
         showTab(0); 
      }
      else if(item==activeTab){
         hideTab();
         showTab(i+1);
       }
     });
   }
   
   const timerTabs = setInterval(changeTab, 5000);
     

   const modalBtns = document.querySelectorAll('button[data-modal]'),
        modal = document.querySelector('.modal'),
        closeBtn = document.querySelector('.modal__close');
    
    
    modalBtns.forEach((btn)=>{
        btn.addEventListener('click', function(event){
            modal.classList.add('show');
            modal.classList.add('fade');
            document.body.style.overflow = 'hidden';
        });

    });
    function closeModal(event){
        modal.classList.remove('show');
        modal.classList.remove('fade');

        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

     modal.addEventListener('click', (event)=>{
         if(event.target === modal){
             closeModal();
         }
     });
 
   







});