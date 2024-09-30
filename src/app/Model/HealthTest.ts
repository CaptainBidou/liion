import { TestForm } from "./TestForm";

export class healthTest{
    commentary: string;
    time:Date;
    testsList:TestForm[];

    constructor(objet:any) {
        if(objet==null){
            this.commentary = "";
            this.time = new Date();
            this.testsList = [];
            return;
        }
        // objet = JSON.parse(objet);
        this.commentary = objet.commentary;
        this.time = new Date();
        this.testsList = [];
        for (let i = 0; i < objet.testsList.length; i++) {
            this.testsList.push(objet.testsList[i]);
        }

    }

    toString():string{
        // return json of the object
        return JSON.stringify(this);
    }

}