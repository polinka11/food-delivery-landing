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
      if (event.target === modal){
         closeModal();
      }
   });


   const deadline = '2021-05-11';


   function getTimeRemain(deadline){
      endDate = Date.parse(deadline);
      const now = new Date(),
            t = endDate - now;


      const days = Math.floor(t / 1000 / 60/ 60 / 24)  ;  
      const hours = Math.floor((t / 1000 / 60 /60) % 24 );  
      const minutes = Math.floor((t / 1000 / 60) % 60) ;  
      const seconds = Math.floor((t / 1000) % 60) ;  

      return {
         'days': days,
         'hours':hours,
         'minutes': minutes,
         'seconds':seconds,
         'total': t
      };
   }

   function setClock(endtime){
      const timer = document.querySelector('.timer'),
            days = document.getElementById('days'),
            hours = document.getElementById('hours'),
            minutes = document.getElementById('minutes'),
            seconds = document.getElementById('seconds');           
            

            updateClock();

            let timerUpdate = setInterval(updateClock, 1000);

      function updateClock(){
         const newTime = getTimeRemain(endtime);
         
         days.innerHTML = newTime.days;
         hours.innerHTML = newTime.hours;
         minutes.innerHTML = newTime.minutes;
         seconds.innerHTML = newTime.seconds;

         if (newTime.total<=0){
            clearInterval(timerUpdate);

         }
      }
   }

   setClock(deadline);

   
   


   
   
   const slider = document.querySelector('.offer__slider'),
      slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      sliderWrapper = document.querySelector('.offer__slider-wrapper');

   const swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      
      // Navigation arrows
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

      

         












});