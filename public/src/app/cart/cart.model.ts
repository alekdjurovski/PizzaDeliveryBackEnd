import { Pizza } from "../shared/pizza.model";

export interface ICart {
  items: Pizza[];
  total?: number;
}
