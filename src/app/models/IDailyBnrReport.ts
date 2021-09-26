import { IRate } from "./IRate";

export interface IDailyBnrReport {
    rates: IRate[];
    date: string;
}