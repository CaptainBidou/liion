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
    strDate:string;
    cRateString:string;

    constructor(id: number,comment:string,cRate:number,action:any,cells:string[],observers:string[],time:Date) {
        this.id = id;
        this.comment = comment;
        this.cRate=cRate;
        this.action=action.brief;
        this.cells = "";
        for (let i = 0; i < cells.length; i++) {
            this.cells =this.cells + cells[i][1] + ",";
        }
        this.cells = this.cells.slice(0, -1);
        this.observers = observers;
        this.time= new Date(time);
        // strDate = ddmmyyyy
        // this.strDate= this.time.getDate()+"/"+this.time.getMonth()+"/"+this.time.getFullYear();
        // getMonth return 0-11 ; getMonth,getDate return 1 digit if < 10, so we need to add 1 to month and 0 to date if < 10
        if(this.time.getDate()<10){
            this.strDate = "0"+this.time.getDate();
        }else{
            this.strDate = this.time.getDate().toString();
        }
        if(this.time.getMonth()<10){
            this.strDate = this.strDate+"0"+(this.time.getMonth()+1);
        }else{
            this.strDate = this.strDate+(this.time.getMonth()+1).toString();
        }
        this.strDate = this.strDate+this.time.getFullYear();

        if(cRate<10){
            this.cRateString="0"+"0"+cRate.toString();
        }
        else if(cRate<100){
            this.cRateString="0"+cRate.toString();}
        else{
            this.cRateString=cRate.toString();
        }



        if(action.id_action == 3 || action.id_action == 1 || action.id_action == 5){
            this.name = this.cells + "_"+this.action.toString()+this.cRateString+"_" + this.strDate;
        }else{
        this.name = this.cells + "_"+this.action.toString() +"_"+this.strDate;
        }
    }
}