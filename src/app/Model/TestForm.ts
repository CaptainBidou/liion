export class TestForm {
    id_action: number;
    id_cells: number[];
    id_observers: number[];
    comment: string;
    cRate: number;
    constructor(act:number,cells:number[],obs:number[],comment:string,c_rate:number) {
        this.id_action = act;
        this.id_cells = cells;
        this.id_observers = obs;
        this.comment = comment;
        this.cRate = c_rate;
    }
}