import { Component, Input } from '@angular/core';
import { CellGraph } from '../Model/CellGraph';
import { Cell } from '../Model/Cell.model';
import { Test } from '../Model/Test.model';
import { RequestService } from '../request.service';
import { Measure } from '../Model/Measure.model';
import { Observable } from 'rxjs';
import { Estimator } from '../Model/Estimator.model';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
 	@Input() test!:Test;
	@Input() cell!:Cell;
	@Input() estimator!:Estimator;

  cellGraph = new CellGraph();
  chartV: any = null;
	chartS: any = null;
	chartT: any = null;
  lastMeasure: Measure;
  requestService: RequestService;
  measure$: Observable<any[]>;


  constructor(requestService: RequestService) {
		this.lastMeasure = new Measure(null)
		this.requestService = requestService;
		this.measure$ = requestService.doGetRequest("measure_observer?");
	}

  getChartInstanceSOC(chart: object) {
		this.chartS = chart;
		this.chartS.render()
	}
	getChartInstanceVoltage(chart: object) {
		this.chartV = chart;
		this.chartV.render()
	}
	getChartInstanceTemperature(chart: object) {
		this.chartT = chart;
		this.chartT.render()
		this.getAllPoints();
	}


  getAllPoints() {
	this.measure$ = this.requestService.doGetRequest("measure_observer?"+this.test.id+"&"+this.lastMeasure.id+"&"+this.estimator.id+"&"+this.cell.id);
		this.measure$.subscribe((data) => {
			console.log(data);
			if (data != null) {

				data.forEach(element => {
					console.log(element)
					this.lastMeasure = new Measure(element)
					console.log(this.lastMeasure)
					// update soc



					let dateMesure = new Date(this.lastMeasure.time)
					let timeCount = (dateMesure.getTime() - this.test.time.getTime())/1000;

					this.cellGraph.soc.push({x: timeCount, y: Number(this.lastMeasure.cell.soc)});
					this.cellGraph.socEstimator.push({x:timeCount,y:Number(this.lastMeasure.estimated_soc)})

					this.cellGraph.voltage.push({x:timeCount,y:Number(this.lastMeasure.output_voltage)})
					this.cellGraph.voltageEstimator.push({x:timeCount,y:Number(this.lastMeasure.estimated_output_voltage)})

					this.cellGraph.surfaceTemperature.push({x:timeCount,y:Number(this.lastMeasure.surface_temperature_plus)})
					this.cellGraph.surfaceEstimatorTemperature.push({x:timeCount,y:Number(this.lastMeasure.estimated_surface_temperature)})
					this.cellGraph.coreEstimatorTemperature.push({x:timeCount,y:Number(this.lastMeasure.estimated_core_temperature)})

					this.chartS.render()
					this.chartV.render()
					this.chartT.render()
				});
			}
		});
		this.chartS.render()
		this.chartV.render()
		this.chartT.render()
		setTimeout(()=>{this.getAllPoints()},2000)
	}



}
