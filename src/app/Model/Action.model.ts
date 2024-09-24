
// create the class action

export class Action {
    id: number;
    name: string;
    brief:string;
    chargeBool:boolean;
    crate_bool:boolean;
    function:string;
    constructor(objet:any) {
        if(objet==null){
            console.log("objet null")
            this.id = 0;
            this.name = "";
            this.brief="";
            this.chargeBool=false;
            this.crate_bool=false;
            this.function="";
            return;
        }
        if(typeof objet != "object"){
            objet = JSON.parse(objet);
        }
        this.id = objet.id;
        this.name = objet.name;
        this.brief=objet.brief;
        this.chargeBool=objet.chargeBool;
        this.crate_bool=objet.crate_bool;
        this.function=objet.function;
    }
}