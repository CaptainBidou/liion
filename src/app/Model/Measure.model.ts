// class measure

import { Cell } from "./Cell.model";
import { Estimator } from "./Estimator.model";

export class Measure {
//  "{measure: \"{\"id\":\"1\",\"id_test\":\"1\",\"time\":2024-09-16 10:31:01,\"current\":\"2.01\",\"output_voltage\":\"5.0\",
//  \"ambient_temperature\":\"21.0\",\"surface_temperature_plus\":\"22.0\",\"surface_temperature_minus\":\"20.0\"}\" ,
//  \"tabEstimator\": [{\"id\":\"1\",\"observer\":\"{\"id\":\"2\",\"name\":\"Neural network dynamic\",\"function\":\"FNN\"}\",
//  \"surface_temperature\":\"21.0\",\"output_voltage\":\"4.9\",\"soc\":\"0.9999\"}]}"


    id: number;
    time: Date;
    current: number;
    output_voltage: number;
    estimated_output_voltage: number;
    ambient_temperature: number;
    surface_temperature_plus: number;
    surface_temperature_minus: number;
    observer:Estimator;
    estimated_surface_temperature:number;
    estimated_core_temperature:number;
    estimated_soc:number;
    cell:Cell;

    constructor(objet:any) {
        if(objet==null){
            this.id = 0;
            this.time = new Date();
            this.current = 0;
            this.output_voltage = 0;
            this.ambient_temperature = 0;
            this.surface_temperature_plus = 0;
            this.surface_temperature_minus = 0;
            this.observer = new Estimator(null);
            this.estimated_surface_temperature = 0;
            this.estimated_output_voltage = 0;
            this.estimated_core_temperature = 0;
            this.estimated_soc = 0;
            this.cell = new Cell(null);

            
            return;
        }
        objet = JSON.parse(objet);
        this.id = objet.measure.id;
        this.time = new Date(objet.measure.time);
        this.current = objet.measure.current;
        this.output_voltage = objet.measure.output_voltage;
        this.ambient_temperature = objet.measure.ambient_temperature;
        this.surface_temperature_plus = objet.measure.surface_temperature_plus;
        this.surface_temperature_minus = objet.measure.surface_temperature_minus;
        this.observer = new Estimator(objet.estimation.observer);
        this.estimated_surface_temperature = objet.estimation.surface_temperature;
        this.estimated_output_voltage = objet.estimation.output_voltage;
        this.estimated_core_temperature = objet.estimation.core_temperature;
        this.estimated_soc = objet.estimation.soc;
        this.cell = new Cell(objet.measure.cell);

        
    
}

}