import { Estimator } from "./Estimator.model";

export class MeasureObserver {
//     {\"id\":\"1\",\"observer\":\"{\"id\":\"2\",\"name\":\"Neural network dynamic\",\"function\":\"FNN\"}\",
// //  \"surface_temperature\":\"21.0\",\"output_voltage\":\"4.9\",\"soc\":\"0.9999\"}
    observer:Estimator;
    surface_temperature:number;
    output_voltage:number;
    core_temperature:number;
    soc:number;
    constructor(objet:any) {
        if(objet == null){
            this.observer=new Estimator(null)
            this.surface_temperature=0
            this.output_voltage=0
            this.core_temperature=0
            this.soc=0
            return
        }
        if(typeof objet != "object"){
            objet = JSON.parse(objet);
        }
        this.core_temperature=objet.core_temperature
        this.observer = new Estimator(objet.observer);
        this.surface_temperature = objet.surface_temperature;
        this.output_voltage = objet.output_voltage;
        this.soc = objet.soc;
    }

}