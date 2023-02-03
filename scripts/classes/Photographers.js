  export default class Photographers {
  constructor(name, id, city, country, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }
  getNamePhotograph() {
    return this.name.toLowerCase().replace(" ", "");
  }
}

export {Photographers}

