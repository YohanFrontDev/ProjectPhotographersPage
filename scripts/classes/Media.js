//Image ou Vidéo
export default class Media {
 
    createMedia(type, alt, date, id, link, likes, photographerId, path) {
        if (type === "jpg") {
            const photo = new Photo();
            photo.type = type;
            photo.alt = alt;
            photo.date = new Date(date);
            photo.id = id;
            photo.link = link;
            photo.likes = likes;
            photo.photographerId = photographerId;
            photo.title = link.replace(".jpg", "").replaceAll("_", " ");
            photo.path = path + link;

            return photo;
        } else if (type === "mp4") {
            const video = new Video();
            video.type = type;
            video.alt = alt;
            video.date = new Date(date);
            video.id = id;
            video.link = link;
            video.likes = likes;
            video.photographerId = photographerId;
            video.title = link.replace(".mp4", "").replaceAll("_", " ");
            return video;
        }
    }
}

export class Photo extends Media {
    createImg(photographer) {
        const myPhoto = `/assets/img/photographers/${photographer}/`;
        const cardsMediaImg = document.createElement("img");
        cardsMediaImg.src = myPhoto + this.link;
        cardsMediaImg.alt = this.alt;
        cardsMediaImg.classList.add("media-img");

        return cardsMediaImg;
    }
}

export class Video extends Media {
    createImg(photographer) {
        const myVideo = `/assets/img/photographers/${photographer}/`;
        const cardsMediaVideo = document.createElement("video");
        cardsMediaVideo.loop = true;
        cardsMediaVideo.muted = true;

        cardsMediaVideo.src = myVideo + this.link;
        cardsMediaVideo.alt = this.alt;
        cardsMediaVideo.classList.add("media-img");

        return cardsMediaVideo;
    }
}

export {Media}