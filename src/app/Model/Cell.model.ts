// create the class cell

export class Cell {
    id: number;
    name: string;
    soc:number;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.soc = 0;
    }
    setSOC(soc:number){
        this.soc = soc;
    }
}

