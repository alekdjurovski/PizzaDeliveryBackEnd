export class Ingredient {
    public name: string;
    public amount: number;
    public price: number;

    decrease() {
        if (this.amount) {
            this.amount -= 1;
        }
    }

    increase() {
        if (this.amount < 3) {
            this.amount += 1;
        }
    }


    constructor(name: string, price: number, amount: number) {
        this.name = name;
        this.amount = 0;
        this.price = price;
    }

}
