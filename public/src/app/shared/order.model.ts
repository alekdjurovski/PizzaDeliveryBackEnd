export class Order {
    public name: string;
    public description: string;
    public quantity: number;
    public price: number;
    public orderStatus: string;
    public date: number;

    constructor(name: string, description: string, quantity: number, price: number, orderStatus?: string, date?: number) {
        this.name = name || '';
        this.description = description || '';
        this.quantity = quantity || 0;
        this.price = price;
        this.orderStatus = orderStatus;
        this.date = date;
    }

}