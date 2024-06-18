// create test model

export class Test {
    id_action: number;
    cells:number[];
    observers:number[];
    comment:string;
    constructor(id_action: number, id_cell:number[], id_observer:number[], comment:string) {
        this.id_action = id_action;
        this.cells = id_cell;
        this.observers = id_observer;
        this.comment = comment;
    }
}