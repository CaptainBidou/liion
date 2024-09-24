import { Cell } from "./Cell.model";
export class SohStat {
    cell: Cell;
    avgr0: number;
    maxr0: number;
    minr0: number;
    constructor(objet:any) {
        if(typeof objet != "object"){
            objet = JSON.parse(objet);
        }
        this.cell = new Cell(objet.cell);
        this.avgr0 = objet.AVGR0;
        this.maxr0 = objet.MAXR0;
        this.minr0 = objet.MINR0;
    }

}