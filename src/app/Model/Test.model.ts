// create test model

import { json } from "stream/consumers";
import { Action } from "./Action.model";
import { Cell } from "./Cell.model";
import { Estimator } from "./Estimator.model";

export class Test {
    id: number;
    time:Date;
    action: Action;
    comment:string;
    c_rate:number;
    cellsList: Cell[];
    observersList: Estimator[];
    running_bool: boolean;
    time_resting: number;
    constructor(objet:any) {
        this.time_resting = 0;
        if(objet==null){
            this.id = 0;
            this.time = new Date();
            this.action = new Action(null);
            this.comment = "";
            this.c_rate = 0;
            this.cellsList = [];
            this.observersList = [];
            this.running_bool = false;
            return;
        }
        objet = JSON.parse(objet);
        this.id = objet.id;
        this.time = new Date(objet.time);
        this.action = new Action(objet.action);
        this.comment = objet.comment;
        this.c_rate = objet.c_rate;
        this.cellsList = [];
        for (let i = 0; i < objet.cellsList.length; i++) {
            this.cellsList.push(new Cell(objet.cellsList[i]));
        }
        this.observersList = [];
        for (let i = 0; i < objet.observersList.length; i++) {
            this.observersList.push(new Estimator(objet.observersList[i]));
        }
        
        this.running_bool = Boolean(Number(objet.running_bool));
        if(objet.time_resting!=undefined){
            this.time_resting = objet.time_resting;
        }

    }
    public name():string{
        let cells = "";
        for (let i = 0; i < this.cellsList.length; i++) {
            cells =cells + this.cellsList[i].name + ",";
        }
        cells = cells.slice(0, -1);
        let strDate="";
        if(this.time.getDate()<10){
            strDate = "0"+this.time.getDate();
        }else{
            strDate = this.time.getDate().toString();
        }
        if(this.time.getMonth()<10){
            strDate = strDate+"0"+(this.time.getMonth()+1);
        }else{
            strDate = strDate+(this.time.getMonth()+1).toString();
        }
        strDate = strDate+this.time.getFullYear();

        let cRateString = "";
        if(this.c_rate<10){
            cRateString="0"+"0"+this.c_rate.toString();
        }
        else if(this.c_rate<100){
            cRateString="0"+this.c_rate.toString();}
        else{
            cRateString=this.c_rate.toString();
        }



        if(this.action.crate_bool==true){
            return cells + "_"+this.action.brief+cRateString+"_" + strDate;
        }else{
        return cells + "_"+this.action.brief +"_"+strDate;
        }
    }
}