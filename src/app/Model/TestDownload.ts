// create test model

import { Action } from "./Action.model";

export class TestDownload {
    id: number;
    action:string;
    cells:string;
    observers:string[];
    comment:string;
    cRate:number;
    time:Date;
    name:string;

    constructor(id: number,comment:string,cRate:number,action:any,cells:string[],observers:string[],time:Date) {
        this.id = id;
        this.comment = comment;
        this.cRate=cRate;
        this.action=action.name;
        this.cells = "";
        for (let i = 0; i < cells.length; i++) {
            this.cells =this.cells + cells[i][1] + ",";
        }
        this.cells = this.cells.slice(0, -1);
        this.observers = observers;
        this.time= new Date(time);
        console.log(action)
        if(action.id_action == 3 || action.id_action == 1 || action.id_action == 5){
            this.name = this.cells + "_"+this.action.toString() +"_"+cRate.toString() +"_" + this.time.getDate()+"_"+this.time.getMonth();
        }else{
        this.name = this.cells + "_"+this.action.toString() +"_"+ this.time.getDate()+"_"+this.time.getMonth();//time must be dd_mm
        }
    }
}