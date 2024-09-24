import { Cell } from "./Cell.model";
import { Test } from "./Test.model";
import { Estimator } from "./Estimator.model";
import { RequestService } from '../request.service';
import { Observable } from "rxjs";
export class CellGraph{
		voltage:any=[];
        surfaceTemperature:any=[];
		soc:any=[];
        
        

        voltageEstimator:any=[];
        socEstimator:any=[];
        surfaceEstimatorTemperature:any=[];
        coreEstimatorTemperature:any=[];

        chartOptionsSoc:any;
        chartOptionsCurrent:any;
        chartOptionsVoltage:any;
        chartOptionsTemperature:any;

        // constructor(testId:number,request:RequestService){
        constructor(){
            this.chartOptionsSoc = {
                exportEnabled: true,
                title: {
                    text: "SOC"
                },
                axisY: {
                    title: "SOC",
                    minimum: 0,
                    maximum: 1.1,
                },
                data: [{
                    showInLegend: true,
                    name: "Soc measured",
                    type: "line",
                    dataPoints: this.soc
                },{
                    showInLegend: true,
                    name: "Soc estimated",
                    type: "line",
                    dataPoints: this.socEstimator
                }]
            }
        
            this.chartOptionsVoltage = {
                exportEnabled: true,
                title: {
                    text: "Voltage"
                },
                axisY: {
                    title: "Volt",
                    minimum: 0,
                    maximum: 5.5,
                },
                data: [{
                    showInLegend: true,
                    name: "Voltage measured",
                    type: "line",
                    dataPoints: this.voltage
                },{
                    showInLegend: true,
                    name: "Voltage estimated",
                    type: "line",
                    dataPoints: this.voltageEstimator
                }]
            }
        
            this.chartOptionsTemperature = {
                exportEnabled: true,
                title: {
                    text: "Surface temperature"
                },
                axisY: {
                    title: "Celsius",
                    minimum: 0,
                    maximum: 50,
                },
        
                data: [
                {
                    showInLegend: true,
                    name: "Surface temperature measured",
                    type: "line",
                    dataPoints: this.surfaceTemperature
                },
                {
                    showInLegend: true,
                    name: "Surface temperature estimated",
                    type: "line",
                    dataPoints: this.surfaceEstimatorTemperature
                },
                {
                    showInLegend: true,
                    name: "Core temperature estimated",
                    type: "line",
                    dataPoints: this.coreEstimatorTemperature
                }
                ]
            }
            
    }
    

}