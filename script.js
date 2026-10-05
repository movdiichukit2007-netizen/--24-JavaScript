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

// 2. Базовий клас калькулятора вартості
class ParcelPriceCalculator {
    constructor(ratePerKg) {
        this.ratePerKg = ratePerKg;
    }

    calculate(parcel) {
        return parcel.chargeableWeight * this.ratePerKg;
    }

    getName() {
        return "Базовий тариф";
    }
}

// 3. Класи-нащадки
class PostOfficeParcelPriceCalculator extends ParcelPriceCalculator {
    constructor() {
        super(15);
    }

    getName() {
        return "Відділення пошти";
    }
}

class CourierParcelPriceCalculator extends ParcelPriceCalculator {
    constructor() {
        super(30);
    }

    getName() {
        return "Кур'єрська доставка";
    }
}

class ExpressParcelPriceCalculator extends ParcelPriceCalculator {
    constructor() {
        super(30);
        this.expressRatePerKg = 25;
    }

    calculate(parcel) {
        return super.calculate(parcel) + parcel.chargeableWeight * this.expressRatePerKg;
    }

    getName() {
        return "Експрес-доставка";
    }
}
