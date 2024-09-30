import { Action } from "./Action.model";
import { Cell } from "./Cell.model";
import { Estimator } from "./Estimator.model";

export class TestForm {
    action: Action;
    cellsList: Cell[];
    observersList: Estimator[];
    comment: string;
    c_rate: number;
    time: Date;
    time_resting:number;
    constructor(act:Action,cells:Cell[],obs:Estimator[],comment:string,c_rate:number,time?:number) {
        this.action = act;
        this.cellsList = cells;
        this.observersList = obs;
        this.comment = comment;
        this.c_rate = c_rate;
        this.time = new Date();
        if(time!=undefined)
            this.time_resting=time
        else
            this.time_resting=0
    }

    toString():string{
        // return json of the object
        return JSON.stringify(this);
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