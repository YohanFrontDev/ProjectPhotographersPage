import Photographers from "../classes/Photographers.js";
import PhotographerList from "../classes/PhotographerList.js";

// Récupération des données du Json.
window.addEventListener("load", () => init(), false);
export async function init() {

    const dataLink = await fetch('/scripts/data/FishEyeDataFR.json')
    if (!dataLink.ok) {
        console.log("Données introuvables");
    }
    const data = await dataLink.json();
    let photographers = data.photographers;
    let medias = data.media;
    createPhotographerList(photographers);
    return photographers, medias;
}

// Fonction créant un tableau de ma liste de photographes.
function createPhotographerList(data) {
    const photographerList = new PhotographerList();
    for (const photographers of data) {
        photographerList.addPhotographer(
            new Photographers(
                photographers.name,
                photographers.id,
                photographers.city,
                photographers.country,
                photographers.tags,
                photographers.price,
                photographers.portrait,
                photographers.element
            )
        );
    };
    displayAllPhotographers(data);
    return PhotographerList;
}

//Récupération de ma liste de photographes.
function getMiniature(photograph) {
    
    let miniatureContent = document.createElement('article');
    miniatureContent.setAttribute('class', 'photographer-miniature');
    miniatureContent.innerHTML =
        `<div class="article_minia">
            <header>
                <a class="miniature_photographer" role="link" href="photographerPage.html?id=${photograph.id}">
                <img class="miniature_photographer_img" src="/assets/img/PhotographersIDPhotos/${photograph.portrait}" alt="${photograph.name} picture">
                <h3 class="miniature_photographer_name">${photograph.name}</h3>
                </a>
            </header>
            <body>
                <div class="photographer_cardText">
                    <h4 class="photographer_cardText">${photograph.city}, ${photograph.country}</h4>
                    <p class="description_photographer">${photograph.tagline}</p>
                    <p class="price_photographer">${photograph.price}€/jour</p>
                </div>
            </body>   
        </div>`
    const listOfPhotograph = miniatureContent.innerHTML;
    const sectionPhotographer = document.getElementById('sectionPhotographer').innerHTML += listOfPhotograph;
}

export default function displayAllPhotographers(data) {
    for (const photograph of data) {
        if (photograph.element == undefined || photograph.element == isNaN) {
            const listeMinia = getMiniature(photograph);
        } else {
            console.log("mon élément exite déjà")
        }
    };
}
