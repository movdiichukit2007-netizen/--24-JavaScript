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

// 3. Класи-нащадки (наслідування та поліморфізм)

// Відділення пошти — 15 грн/кг
class PostOfficeParcelPriceCalculator extends ParcelPriceCalculator {
    constructor() {
        super(15);
    }

    getName() {
        return "Відділення пошти";
    }
}

// Кур'єрська доставка — 30 грн/кг
class CourierParcelPriceCalculator extends ParcelPriceCalculator {
    constructor() {
        super(30);
    }

    getName() {
        return "Кур'єрська доставка";
    }
}

// Експрес-доставка — 30 грн/кг + 25 грн/кг за терміновість
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

// --- Перевірка роботи програми ---

// Створюємо посилки:
// 1. Посилка 1: фактична вага більша за об'ємну (8 кг > 0.8 кг)
const parcel1 = new Parcel("Іван Петренко", 8, 20, 20, 10);

// 2. Посилка 2: об'ємна вага більша за фактичну (12 кг > 2 кг)
const parcel2 = new Parcel("Олена Коваль", 2, 50, 40, 30);

// 3. Посилка 3: звичайна посилка
const parcel3 = new Parcel("Марія Овдійчук", 4, 30, 25, 20);

// Масив посилок
const parcels = [parcel1, parcel2, parcel3];

// Масив калькуляторів
const calculators = [
    new PostOfficeParcelPriceCalculator(),
    new CourierParcelPriceCalculator(),
    new ExpressParcelPriceCalculator()
];

// Виведення результатів
console.log("=== РОЗРАХУНОК ВАРТОСТІ ДОСТАВКИ ===");

const outputDiv = document.getElementById("output");

for (const parcel of parcels) {
    console.log("\n" + parcel.describe());

    let htmlCard = `
        <div class="parcel-card">
            <div class="parcel-title">${parcel.describe()}</div>
            <ul class="calc-list">
    `;

    for (const calculator of calculators) {
        const cost = calculator.calculate(parcel);
        console.log(`  - ${calculator.getName()}: ${cost} грн`);
        htmlCard += `<li><strong>${calculator.getName()}:</strong> ${cost} грн</li>`;
    }

    htmlCard += `</ul></div>`;
    if (outputDiv) outputDiv.innerHTML += htmlCard;
}

console.log("\nВсього створено посилок: " + Parcel.getCount());

if (outputDiv) {
    outputDiv.innerHTML += `<div class="total-count">📦 Загальна кількість створених відправлень: ${Parcel.getCount()}</div>`;
}
