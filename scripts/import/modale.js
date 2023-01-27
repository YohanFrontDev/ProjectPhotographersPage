function openDialog() {
    const dialog = document.querySelector(".dialog");
    const main = document.querySelector(".main");
    const closeBtn = document.querySelector(".close-btn");
    const dialogMask = document.querySelector(".dialog-mask");

    dialog.classList.add("opened");
    closeBtn.focus();
    dialogMask.addEventListener("click", closeDialog);
    main.classList.add("anti-scroll");
    main.setAttribute("aria-hidden", "true");
    dialog.setAttribute("aria-hidden", "false");
}
function closeDialog() {
    const dialog = document.querySelector(".dialog");
    const main = document.querySelector(".main");
    dialog.classList.remove("opened");
    main.classList.remove("anti-scroll");
    main.setAttribute("aria-hidden", "false");
    dialog.setAttribute("aria-hidden", "true");
}

function verifModal(currentPhotographer) {
    const formFirstNameInp = document.querySelector(".firstName-inp");
    const formLastNameInp = document.querySelector(".lastName-inp");
    const formEmailInp = document.querySelector(".email-inp");
    const formMsgInp = document.querySelector(".msg-inp");
    const errorMessage = document.querySelectorAll(".message-alert");

    let verifFirst;
    let verifLast;
    let verifMail;
    let verifMsg;

    // verifie si les champs de la modal sont bien rempli
    formFirstNameInp.addEventListener("input", (e) => {
        if (e.target.value.length <= 3) {
            errorMessage[0].style.display = "inline";
            formFirstNameInp.classList.add("border");
        } else {
            errorMessage[0].style.display = "none";
            verifFirst = true;
        }     
    });
    formLastNameInp.addEventListener("input", (e) => {
        if (e.target.value.length <= 3) {
            errorMessage[1].style.display = "inline";
            formLastNameInp.classList.add("echec");
            formLastNameInp.classList.add("border");
        } else {
            errorMessage[1].style.display = "none";
            verifLast = true;
        }
    });
    formEmailInp.addEventListener("input", (e) => {
        const regexMail = /\S+@\S+\.\S+/;
        if (e.target.value.search(regexMail) === 0) {
            errorMessage[2].style.display = "none";
            verifMail = true;
        } else if (e.target.value.search(regexMail) === -1) {
            errorMessage[2].style.display = "inline";
            formEmailInp.classList.add("echec");
            formEmailInp.classList.add("border");
            verifMail = false;
        }
    });

    formMsgInp.addEventListener("input", (e) => {
        if (e.target.value.length <= 3) {
            errorMessage[3].style.display = "inline";
            formMsgInp.classList.add("echec");
            formMsgInp.classList.add("border");
            verifMsg = false;
        } else {
            errorMessage[3].style.display = "none";
            verifMsg = true;
        }
    });

    // submit form
    document.getElementById("contact").addEventListener("submit", function (e) {
        e.preventDefault();
        if (verifFirst === true && verifLast === true && verifMail === true && verifMsg === true) {
            const contactModal = document.querySelector(".dialog-window");
            const modalTitle = document.querySelector(".modal-title");
            const close = document.querySelector(".close-btn");

            const headerModal = document.querySelector(".modal-form");
            headerModal.style.display = "none";
            headerModal.setAttribute("aria-hidden", "true");
            close.focus();
            modalTitle.innerHTML = `Votre message a été envoyé à <br>${currentPhotographer.name} `;
            modalTitle.classList.add("message-valid");

            contactModal.append(photographersName);
            // log des information entrée par l'uttisatteur
            let datas = new FormData(headerModal);
            for (let i of datas.entries()) {
                console.log(i[0], ":", i[1]);
            }
        }
    });
}

export { verifModal, openDialog, closeDialog };
