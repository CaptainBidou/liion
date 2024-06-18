// class measure

export class Measure {
    id: number;
    time: number;
    current: number;
    output_voltage: number;
    ambient_temperature: number;
    surface_temperature: number;

    constructor(id: number, time: number, current: number, output_voltage: number, ambient_temperature: number, surface_temperature: number) {
        this.id = id;
        this.time = time;
        this.current = current;
        this.output_voltage = output_voltage;
        this.ambient_temperature = ambient_temperature;
        this.surface_temperature = surface_temperature;
    }
    
}