// 1. Клас поштового відправлення
class Parcel {
    #weight;
    static #count = 0;

    constructor(recipient, weight, length, width, height) {
        this.recipient = recipient;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.height = height;

        Parcel.#count++;
    }

    get weight() {
        return this.#weight;
    }

    set weight(value) {
        if (value <= 0) {
            throw new Error("Вага посилки має бути додатним числом!");
        }
        this.#weight = value;
    }

    get volumetricWeight() {
        return (this.length * this.width * this.height) / 5000;
    }

    get chargeableWeight() {
        return Math.max(this.weight, this.volumetricWeight);
    }

    describe() {
        return `Посилка для: ${this.recipient} (факт. вага: ${this.weight} кг, об'ємна: ${this.volumetricWeight} кг, розрахункова: ${this.chargeableWeight} кг)`;
    }

    static getCount() {
        return Parcel.#count;
    }
}
