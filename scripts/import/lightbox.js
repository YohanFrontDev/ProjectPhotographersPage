function displayLightbox(media, displayMediaList, currentPhotographer) {
  let myMedia = media;
  const lightboxModal = document.querySelector(".lightbox");
  const slideContainer = document.querySelector(".container-slides");
  const closeBtn = document.querySelector(".close");
  const next = document.querySelector(".right");
  const previous = document.querySelector(".left");
  const titleMedia = document.querySelector(".titre-media-lightbox");
  const myImage = document.createElement("img");
  const myVideo = document.createElement("video");

  const focusableElements = `button`;
  const firstFocusableElement = lightboxModal.querySelectorAll(focusableElements)[0];
  const focusableContent = lightboxModal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];
  
  document.addEventListener('keydown', function(e) {
    let isTabPressed = e.key === 'Tab';
  
    if (!isTabPressed) {
      return;
    }
  
    if (e.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
  closeBtn.addEventListener("click", closelightbox);

  lightboxModal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closelightbox(e, media);
    }
    if (e.code === "ArrowRight") {
      nextSlide(e);
    }
    if (e.code === "ArrowLeft") {
      previousSlide(e);
    }
  });

  function nextSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(myMedia) + 1 >= displayMediaList.length) {
      myMedia = displayMediaList[0];
    } else {
      myMedia =
        displayMediaList[displayMediaList.indexOf(myMedia) + 1];
    }
    displayContent();
  }

  function previousSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(myMedia) <= +0) {
      myMedia = displayMediaList[displayMediaList.length - 1];
      displayContent(myMedia);
    } else {
      myMedia =
        displayMediaList[displayMediaList.indexOf(myMedia) - 1];
      displayContent(myMedia);
    }
  }

  function closelightbox() {
    const lightboxModal = document.querySelector(".lightbox");
    const main = document.querySelector(".main");
    lightboxModal.style.display = "none";
    main.classList.remove("anti-scroll");
    main.style.display = "block";
  }

  displayContent(myMedia);
  function displayContent() {
    if (myMedia.type === "jpg") {
      myVideo.replaceWith(myImage);
      myImage.src = `assets/img/photographers/${currentPhotographer.getNamePhotograph()}/${
        myMedia.link
      }`;
      titleMedia.textContent = `${myMedia.title}`;
      myImage.alt = myMedia.alt;
      slideContainer.appendChild(myImage);
    } else if (myMedia.type === "mp4") {
      myVideo.src = `assets/img/photographers/${currentPhotographer.getNamePhotograph()}/${
        myMedia.link
      }`;
      titleMedia.textContent = `${myMedia.title}`;

      myImage.replaceWith(myVideo);
      myVideo.setAttribute("alt", myMedia.alt);
      myVideo.autoplay = true;
      myVideo.loop = true;
      slideContainer.appendChild(myVideo);
    }
  }
}
function openLightbox() {
  const main = document.querySelector(".main");
  const left = document.querySelector(".left");
  const lightboxModal = document.querySelector(".lightbox");
  lightboxModal.style.display = "flex";
  main.classList.add("anti-scroll");
  left.focus();
  main.style.display = "none";
}
export { displayLightbox, openLightbox };
