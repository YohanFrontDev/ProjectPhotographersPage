function displayHeader(currentPhotographer) {
    const photoLink ="/assets/img/PhotographersIDPhotos/" + currentPhotographer.portrait;

    // Création des éléments html
    const headerBody = document.createElement("div");
    const headerTitle = document.createElement("h2");
    const headerLocation = document.createElement("p");
    const headerTagline = document.createElement("p");
    const containerImgHeader = document.createElement("div");
    const headerImg = document.createElement("img");
    const btnModal = document.createElement("button");
    const header = document.querySelector(".header");

    btnModal.addEventListener("click", () => {
        const dialog = document.querySelector(".dialog");
        const main = document.querySelector(".main");
        const closeBtn = document.querySelector(".close-btn");
        const dialogMask = document.querySelector(".dialog-mask");

        dialog.classList.add("opened");
        closeBtn.focus();
        dialogMask.addEventListener("click", () => {
            const dialog = document.querySelector(".dialog");
            const main = document.querySelector(".main");
            dialog.classList.remove("opened");
            main.classList.remove("anti-scroll");
            main.setAttribute("aria-hidden", "false");
            dialog.setAttribute("aria-hidden", "true");
        });
        main.classList.add("anti-scroll");
        main.setAttribute("aria-hidden", "true");
        dialog.setAttribute("aria-hidden", "false");
    });

    // Ajouts des classes et attributs html
    headerBody.classList.add("header-body");
    btnModal.classList.add("header-btn");
    containerImgHeader.classList.add("header-img");
    headerTitle.classList.add("header-body-title");
    headerLocation.classList.add("header-body-location");
    headerImg.src = photoLink;
    headerTitle.setAttribute("lang", "en");
    headerImg.setAttribute("alt", `${currentPhotographer.name}`);

    // Attribution du contenu HTML
    headerTitle.textContent = currentPhotographer.name;
    headerLocation.textContent = currentPhotographer.city + " ," + currentPhotographer.country;
    headerTagline.textContent = currentPhotographer.tagline;
    btnModal.textContent = "Contactez-moi";

    // Ajout des éléments dans le DOM
    header.append(headerBody, btnModal, containerImgHeader);
    headerBody.append(headerTitle, headerLocation, headerTagline);
    containerImgHeader.appendChild(headerImg);

    return btnModal;
}

export { displayHeader };
