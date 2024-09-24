// create the class cell

export class Cell {
    id: number;
    name: string;
    soc:number;
    constructor(objet:any) {
        if(objet==null){
            this.id=0
            this.name=""
            this.soc=0
            return
        }
        if(typeof objet != "object"){
            objet = JSON.parse(objet);
        }
        this.id = objet.id;
        this.name = objet.name;
        this.soc = objet.soc;
    }
}

