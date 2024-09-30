import { Test } from "./Test.model";

export class healthTestModel{
    id:number;
    commentary: string;
    time:Date;
    testsList:Test[];
    constructor(objet:any){
        this.id=objet.id;
        this.commentary=objet.commentary;
        this.time=new Date(objet.time);
        this.testsList=[];
        for (let i = 0; i < objet.testsList.length; i++) {
            let obj = objet.testsList[i];
            obj["time_resting"] = objet.timeRestsList[i];
            this.testsList.push(new Test(JSON.stringify(obj)));
        }

    }

}