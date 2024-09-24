// create estimator model

export class Estimator {
    id: number;
    name: string;
    function: string;
    constructor(objet:any) {
        if(objet == null){
            this.id=0
            this.name=""
            this.function=""
            return

        }

        if(typeof objet != "object"){
            objet = JSON.parse(objet);
        }
        this.id = objet.id;
        this.name = objet.name;
        this.function=objet.function;
    }
}