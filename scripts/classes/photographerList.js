

// Créer un photographe.
 
export default class PhotographerList {
  
  constructor() {
    this.photographerList = [];
  }

  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }

  // retourne un photographe grâce à son ID
  getPhotographerById(id) {
    for (const photographer of this.photographerList) {
      if (photographer.id === id) {
}
    }
  }
}
