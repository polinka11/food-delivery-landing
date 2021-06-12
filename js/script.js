document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTab() {
    tabsContent.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("fade");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTab(i) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("fade");

    tabs[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          hideTab();
          showTab(i);
        }
      });
    }
  });

  function changeTab() {
    const activeTab = document.querySelector(".tabheader__item_active");
    tabs.forEach((item, i) => {
      if (tabsParent.lastElementChild == activeTab) {
        hideTab();
        showTab(0);
      } else if (item == activeTab) {
        hideTab();
        showTab(i + 1);
      }
    });
  }

  const timerTabs = setInterval(changeTab, 5000);

  /* Модальне вікно */
  const modalBtns = document.querySelectorAll("button[data-modal]"),
    modal = document.querySelector(".modal"),
    closeBtn = document.querySelector(".modal__close");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      modal.classList.add("show");
      modal.classList.add("fade");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal(event) {
    modal.classList.remove("show");
    modal.classList.remove("fade");

    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* Валідація форми */

  const forms = document.querySelectorAll("form");

  forms.forEach(function (form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach(function (input) {
      input.addEventListener("change", function () {
        if (input.getAttribute("type") == "email") {
          if (!validateEmail(input.value)) {
            addErrorMessage(input, "Введіть правильний email");
          } else {
            removeErrorMessage(input);
          }
        } else if (input.getAttribute("type") == "phone") {
          if (!validatePhone(input.value)) {
            addErrorMessage(input, "Введіть правильний номер телефону");
          } else {
            removeErrorMessage(input);
          }
        } else if (input.getAttribute("type") == "text") {
          if (!validateName(input.value)) {
            addErrorMessage(input, "Введіть правильне ім'я");
          } else {
            removeErrorMessage(input);
          }
        }
      });
    });

    
  });

  function validateEmail(inputEmail) {
    return /\S+@\S+\.\S+/.test(inputEmail);
  }

  function validatePhone(inputPhone) {}
  function validateName(inputPhone) {}

  function addErrorMessage(input, message) {
    if (input.nextElementSibling.classList.contains("error_label")) {
      return;
    }

    input.classList.add("error");
    const messageError = document.createElement("p");
    messageError.style.textAlign = "center";
    messageError.classList.add("error_label");
    messageError.textContent = message;
    input.after(messageError);
  }
  function removeErrorMessage(input) {
    input.classList.remove("error");
    if (input.nextElementSibling.classList.contains("error_label")) {
      input.nextElementSibling.remove();
    }
  }

  const deadline = "2021-04-21";

  function getTimeRemain(deadline) {
    endDate = Date.parse(deadline);
    const now = new Date(),
      t = endDate - now;

    const days = Math.floor(t / 1000 / 60 / 60 / 24);
    const hours = Math.floor((t / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      total: t,
    };
  }

  function setClock(endtime) {
    const timer = document.querySelector(".timer"),
      days = document.getElementById("days"),
      hours = document.getElementById("hours"),
      minutes = document.getElementById("minutes"),
      seconds = document.getElementById("seconds");

    updateClock();

    let timerUpdate = setInterval(updateClock, 1000);

    function updateClock() {
      try {
        const newTime = getTimeRemain(endtime);

        days.innerHTML = newTime.days;
        hours.innerHTML = newTime.hours;
        minutes.innerHTML = newTime.minutes;
        seconds.innerHTML = newTime.seconds;

        if (newTime.total <= 0) {
          days.innerHTML = "00";
          hours.innerHTML = "00";
          minutes.innerHTML = "00";
          seconds.innerHTML = "00";
          clearInterval(timerUpdate);
        }
      } catch (error) {
        console.log(error);
        let endMessage = document.createElement("h3");
        endMessage.textContent = "Акція вже закінчилася.";
        endMessage.style.marginTop = "40px";
        endMessage.style.textAlign = "center";

        timer.after(endMessage);
      }
    }
  }

  setClock(deadline);

  /* SWIPER-SLIDER */

  // const swiper = new Swiper(slider, {
  //    // Optional parameters
  //    direction: 'horizontal',
  //    loop: true,
  //    allowTouchMove: true,
  //    freeMode: true,
  //    slidesPerView: 2,
  //    spaceBetween: 15,
  //    navigation: {
  //      nextEl: next,
  //      prevEl: prev,
  //    },

  //    // And if we need scrollbar
  //    scrollbar: {
  //      el: '.swiper-scrollbar',
  //    },
  //  });

  /* Слайдер */

  const slider = document.querySelector(".offer__slider"),
    slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(sliderWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  let slideIndex = 1;
  let offset = 0;
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  total.textContent = slides.length;
  current.textContent = slideIndex;

  sliderWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  let widthSlide = +width.slice(0, width.length - 2);

  next.addEventListener("click", function () {
    if (offset == widthSlide * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += widthSlide;
      slideIndex++;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    current.textContent = slideIndex;
  });

  prev.addEventListener("click", function () {
    if (offset == 0) {
      offset = widthSlide * (slides.length - 1);
      slideIndex = slides.length;
    } else {
      offset -= widthSlide;
      slideIndex--;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    current.textContent = slideIndex;
  });

  // Калькулятор калорій

  const result = document.querySelector(".calculating__result span");
  let gender = "female",
    height,
    weight,
    age,
    ratio = 1.375;

  function calcNormKkal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "_____";
      return;
    }
    if (gender === "male") {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }
  }

  calcNormKkal();

  function getStaticInformation(parentSelecter, activeClass) {
    const elements = document.querySelectorAll(
      `${parentSelecter} .calculating__choose-item`
    );

    elements.forEach(function (elem) {
      elem.addEventListener("click", function (event) {
        if (parentSelecter === "#gender") {
          gender = event.target.getAttribute("id");
        } else {
          ratio = event.target.getAttribute("data-ratio");
        }
        console.log(gender, ratio);
        elements.forEach(function (item) {
          item.classList.remove(activeClass);
        });
        elem.classList.add(activeClass);
        calcNormKkal();
      });
    });
  }
  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", function (event) {
      switch (input.getAttribute("id")) {
        case "height":
          height = input.value;
          break;
        case "weight":
          weight = input.value;
          break;
        case "age":
          age = input.value;
          break;
      }

      calcNormKkal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  /* Загрузка меню */


  /* Надсилання форми */
  const formSubmitted = document.querySelectorAll("form");
  
  async function postData(url, data){
    
    let res =  await fetch(url, {
        method: 'POST', // или 'PUT'
        body: data, // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await res.json();
  }

    formSubmitted.forEach(form=>{
      form.addEventListener("submit", function (event){
        event.preventDefault();
    
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()))
        
        postData("http://localhost:3000/requests", jsonData)
        .then(result=>{
          console.log(result);
        }).catch(e => console.log(e))
        .finnaly(()=>{
          form.reset();
        });
      });
    });

});