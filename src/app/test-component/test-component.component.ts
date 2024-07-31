import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { Estimator } from '../Model/Estimator.model';
import { Test } from '../Model/Test.model';
import { Measure } from '../Model/Measure.model';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.css'
})
export class TestComponentComponent {
private route = inject(ActivatedRoute);
id:number;
test$: Observable<any>;
public requestService: RequestService;
soc:number;
crate:number=0;

actions: Action[] = [];
action$: Observable<any>;
actionSelected:Action = new Action(0,"feur")

cells : Cell[];
cellsName = "";

date = new Date();
voltage = 0;
current = 0;
comment="";

lastMeasure: number = 0;

startStop$ : Observable<any>;
measure$: Observable<any[]>;
allMeasure$: Observable<any[]>;

pointVoltage:any[] = [];
pointVoltageEstimator:any[] = [];
pointCurrent:any[] = [];
pointSoc:any[] = [];
pointSocEstimator:any[] = [];

chartV: any;
chartS: any;
chartC: any;

actionStart:Boolean = false;

observers : Estimator[] = [];
observer$: Observable<any>;
observerSelected:Estimator[] = [];

constructor(requestService: RequestService, private router: Router) { 
	this.id = this.route.snapshot.params['id'];
	this.requestService = requestService;
	this.test$ = requestService.doRequest({"id": 6, "data": {"id_test": this.id}});
	this.action$ = requestService.doRequest({"id": 1, "data": {"nothing": "nothing"}});
	this.cells = [];
	this.startStop$ = new Observable<any>();
	this.measure$ = requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": this.lastMeasure}});
	this.allMeasure$ = requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": 0}});
	this.observer$ = requestService.doRequest({"id": 3, "data": {"nothing": "nothing"}});
	this.soc = 1
}

ngOnInit() {
  this.test$.subscribe((data) => {
	console.log(data);
	data.cells.forEach((element: any) => {
	  this.cells.push(new Cell(element[0], element[1]));
	  this.cellsName += element[1] + ", ";
	});
	this.cellsName = this.cellsName.slice(0, -2);
	this.date = new Date(data.time);
	this.comment = data.comment;
	this.actionSelected = new Action(data.action.id_action,data.action.name)
	this.crate = data.cRate;
	data.observers.forEach((element: any) => {
		this.observerSelected.push(new Estimator(element[0], element[1]));
	});

});


console.log(this.cellsName);
	this.action$.subscribe((data) => {
		console.log(data);
		data.forEach((element: any) => {
		  this.actions.push(new Action(element[0], element[1]));
		});
	  });

	  this.observer$.subscribe((data) => {  
		console.log(data);
		data.forEach((element: any) => {
		  this.observers.push(new Estimator(element[0], element[1]));
		});
	  });

	  this.getAllPoints();
}


	isEstimatorUsed(id:number){
		let res = false;
		this.observerSelected.forEach(element => {
			if(element.id == id)
				res = true
		});
		return res;
	}

	
	chartOptionsSoc = {
	  exportEnabled: true,
	  title: {
		text: "SOC"
	  },
	  axisY:{
		minimum: 0,
		maximum: 1.1,
	  },

	  data: [{
		type: "line",
		dataPoints: this.pointSoc
	  },
	  {
		type: "line",
		dataPoints: this.pointSocEstimator
		}
	]
	}

	chartOptionsVoltage = {
		exportEnabled: true,
		title: {
		  text: "Voltage"
		},
		axisY:{
			minimum: 0,
			maximum: 5.5,
		  },
		data: [{
		  type: "line",
		  dataPoints: this.pointVoltage
		},
	  {
		type: "line",
		dataPoints: this.pointVoltageEstimator
		}]
	  }
	  chartOptionsCurrent = {
		exportEnabled: true,
		title: {
		  text: "Current"
		},
		axisY:{
			minimum: 0,
			maximum: 5.5,
		  },
		data: [{
		  type: "line",
		  dataPoints: this.pointCurrent
		},]
	  }

	public updateAllCharts(){
		this.measure$ = this.requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": this.lastMeasure}});
		this.measure$.subscribe((data) => {
			console.log(data);
			if (data != null){
			data.forEach(element => {
				let decode = JSON.parse(element)
				this.lastMeasure=decode.id;
				this.current=parseFloat(decode.current);
				this.voltage=parseFloat(decode.output_voltage);
				if(this.pointCurrent.length >= 2){
					let lastCurrent = this.pointCurrent[this.pointCurrent.length-2]
					this.soc = this.soc-lastCurrent.y*(1/(3600*3.08))


				}
					
				let dateMesure = new Date(decode.time)
				let timeCount = (dateMesure.getTime() - this.date.getTime())/1000;
				this.pointVoltage.push({x:timeCount,y:this.voltage})
				this.pointCurrent.push({x:timeCount,y:this.current})
				this.pointSoc.push({x:timeCount,y:this.soc})
				this.pointVoltageEstimator.push({x:timeCount,y:decode.estimator_voltage})
				this.pointSocEstimator.push({x:timeCount,y:decode.estimator_soc})
			});
			this.chartC.render()
			this.chartS.render()
			this.chartV.render()
		}
			if(this.actionStart)
				setTimeout(() => {this.updateAllCharts()}, 2000);
		});
	}

	//start of the programm
	getAllPoints(){
		this.measure$ = this.requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": this.lastMeasure}});
		this.measure$.subscribe((data) => {
			console.log(data);
			data.forEach(element => {
				let decode = JSON.parse(element)
				this.lastMeasure=decode.id;
				this.current=parseFloat(decode.current);
				this.voltage=parseFloat(decode.output_voltage);
				if(this.pointCurrent.length >= 2){
					let lastCurrent = this.pointCurrent[this.pointCurrent.length-2]
					this.soc = this.soc-lastCurrent.y*(1/(3600*3.08))


				}
					
				let dateMesure = new Date(decode.time)
				let timeCount = (dateMesure.getTime() - this.date.getTime())/1000;
				this.pointVoltage.push({x:timeCount,y:this.voltage})
				this.pointVoltageEstimator.push({x:timeCount,y:decode.estimator_voltage})
				this.pointSocEstimator.push({x:timeCount,y:decode.estimator_soc})
				this.pointCurrent.push({x:timeCount,y:this.current})
				this.pointSoc.push({x:timeCount,y:this.soc})
			});
			this.chartC.render()
			this.chartS.render()
			this.chartV.render()
		});
	}





	getChartInstanceSOC(chart: object) {
		this.chartS = chart;
		this.chartS.render()
	}
	getChartInstanceCurrent(chart: object) {
		this.chartC = chart;
		this.chartC.render()
	}
	getChartInstanceVoltage(chart: object) {
		this.chartV = chart;
		this.chartV.render()
	}



	startTest(){
		this.startStop$ = this.requestService.doRequest({"id": 11, "data": {"id_test": this.id}});
		this.startStop$.subscribe((data) => {
			console.log(data);
			this.updateAllCharts();
			this.actionStart = true ;
		});

	}
	
	stopTest(){
		this.startStop$ = this.requestService.doRequest({"id": 12, "data": {"id_test": this.id}});
		this.startStop$.subscribe((data) => {
			console.log(data);
			this.actionStart = false ;
		});
	}



}
