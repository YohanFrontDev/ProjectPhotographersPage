
import { Photographers } from "../classes/Photographers.js";
import { Media } from "../classes/Media.js";
import { listMedia } from "../classes/listMedia.js";
import { displayFilterMenu } from "../import/dropdown.js";
import { displayHeader } from "../import/header.js";
import { displayLightbox, openLightbox } from "../import/lightbox.js";
import { openDialog, closeDialog, verifModal } from "../import/modale.js";

const linkToData = "/scripts/data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const mediaList = new listMedia();
const main = document.querySelector(".main");
const arrowIcon = document.querySelector('.fa-solid');

let mediaFactory = new Media();
let currentPhotographer;
let totalLikes = [];
let totalLikesPhotographer;

window.onresize = responsiveIcon;

window.addEventListener("load", () => {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        // console.log("il n'y a pas d'erreur")
        return response.json();
      } else {
        console.log('erreur')
      }
    })
    .then((data) => createData(data))
    .then((data) => displayPage(data))
});


function responsiveIcon() {
  if (window.matchMedia("(max-width: 680px)").matches) {
    arrowIcon.classList.add('fa-xs')
  } else if (window.matchMedia("(min-width: 680px) and (max-width:980px)").matches) {
    arrowIcon.classList.add('fa-sm')
  }
}
// Récupération des données via ma classe Photographes
function createData(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer = new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      );
    }
  });

  // Récupère les médias du photographe.
  data.media.forEach((media) => {
    if (media.photographerId === currentPhotographer.id) {
      media.getLikes;
      mediaList.addMedia(
        mediaFactory.createMedia(
          media.image?.split(".").pop() || media.video?.split(".").pop(),
          media.alt,
          media.date,
          media.id,
          media.image || media.video,
          media.likes,
          media.photographerId,
          media.tags,
          media.title,
        )
      );
    }
  });
}

export function displayMediaList() {
  let displayMediaList = [];

  const filters = [];
  const cardsMediaContainer = document.querySelector(".cards-media-container");
  const sort = document.querySelector(".filter-option.selected")?.getAttribute("data-value");

  cardsMediaContainer.innerHTML = "";

  displayMediaList = mediaList.getMediaList(sort, ...filters);

  //Création de ma section cards media
  displayMediaList.forEach((media) => {
    const mediaElement = media.createImg(currentPhotographer.getNamePhotograph());
    const cardsMedia = document.createElement("section");
    const cardsMediaImg = document.createElement("a");
    const cardsMediaFooter = document.createElement("div");
    const cardsMediaTitle = document.createElement("p");
    const cardsMediaHeaderLike = document.createElement("div");
    const lightboxLink = document.querySelectorAll(".cards-media-img");

    //Ajout d'un écouteur d'évènement sur mon image/vidéo pour afficher ma ligthbox.
    lightboxLink.forEach((link) => {
      link.addEventListener("click", openLightbox);
    });
    const cardsMediaCompteurLike = document.createElement("p");
    const heartLink = document.createElement("button");
    const heart = document.createElement("em");

    cardsMedia.classList.add("cards-media");
    cardsMediaImg.classList.add("cards-media-img");
    cardsMediaFooter.classList.add("cards-media-footer");
    cardsMediaTitle.classList.add("cards-media-title");
    cardsMediaHeaderLike.classList.add("header-like");
    cardsMediaCompteurLike.classList.add("compteur");
    heartLink.classList.add("heart-link");
    heart.classList.add("heart");
    heart.classList.add("far");
    heart.classList.add("fa-heart");

    cardsMediaCompteurLike.setAttribute("aria-label", `likes`);
    heartLink.setAttribute("aria-label", "aimer cette photo");
    heartLink.setAttribute("role", "button");
    cardsMediaImg.setAttribute("role", "button");
    cardsMediaImg.setAttribute("tabindex", "0");
    cardsMediaImg.setAttribute("title", media.alt);
    cardsMediaImg.setAttribute("aria-describedby", "ouvrir le slider");
    cardsMediaImg.href = "#";
    heartLink.setAttribute("tabindex", "-1");
    cardsMediaCompteurLike.setAttribute("tabindex", "-1");
    cardsMediaCompteurLike.setAttribute(
      "aria-label",
      `Nombre de likes ${media.likes}`
    );

    cardsMediaTitle.textContent = `${media.title}`;
    cardsMediaCompteurLike.textContent = `${media.likes}`;

    cardsMediaContainer.append(cardsMedia);
    cardsMedia.append(cardsMediaImg, cardsMediaFooter);
    cardsMediaImg.append(mediaElement);
    cardsMediaFooter.append(cardsMediaTitle, cardsMediaHeaderLike);
    cardsMediaHeaderLike.append(cardsMediaCompteurLike, heartLink);
    heartLink.append(heart);
    compteurLikes(totalLikes);

    //Fonction actualisant le nombre de likes
    function compteurLikes() {
      heartLink.addEventListener("click", () => {
        if (heart.classList.contains("fas")) {
          media.likes--;
          heart.classList.remove("fas");
          heart.classList.add("far");
          cardsMediaCompteurLike.textContent = media.likes;
          displayInfo();
        } else {
          media.likes++;
          heart.classList.remove("far");
          heart.classList.add("fas");
          cardsMediaCompteurLike.textContent = media.likes;
          displayInfo();
        }
      });
    }

    cardsMediaImg.addEventListener("click", (e) => e.preventDefault());
    cardsMediaImg.addEventListener("click", () =>
      displayLightbox(media, displayMediaList, currentPhotographer)
    );
    cardsMediaImg.addEventListener("keyCode", (e) => {
      if (e.code === "13") {
        displayLightbox(media, displayMediaList, currentPhotographer);
      }
    });
  });
}

function displayPage() {
  const dialogTitle = document.querySelector(".modal-title");
  const btnContact = document.querySelector(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.href = "#";

  document.title += " - " + currentPhotographer.name;
  dialogTitle.textContent = `Contactez moi ${currentPhotographer.name}`;

  closeBtn.addEventListener("click", () => closeDialog());

  btnContact.addEventListener("click", () => openDialog());
  closeBtn.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeDialog();
    }
  });

  displayHeader(currentPhotographer, displayMediaList);
  verifModal(currentPhotographer);
  displayFilterMenu(displayMediaList);
  displayInfo(displayMediaList);
  displayMediaList();
}

function displayInfo() {
  const totalLikesContainer = document.createElement("div");
  const priceContainer = document.createElement("div");
  const price = document.createElement("p");
  const totalLikesNb = document.createElement("div");
  const heart = document.createElement("em");

  heart.classList.add(`fas`);
  heart.classList.add(`fa-heart`);
  heart.classList.add(`heart`);
  heart.classList.add(`heart-global`);

  priceContainer.classList.add("price-container");
  price.classList.add("price");
  totalLikesContainer.classList.add("total-likes-container");
  totalLikesNb.classList.add("total-likes");
  totalLikesNb.textContent = `${mediaList.getLikes()}`;
  price.textContent = `${currentPhotographer.price}€/ jour`;

  main.append(totalLikesContainer);
  totalLikesNb.append(heart);
  priceContainer.append(price);
  totalLikesContainer.append(totalLikesNb, priceContainer);
}
