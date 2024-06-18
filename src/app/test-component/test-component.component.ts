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
requestService: RequestService;

actions: Action[] = [];
action$: Observable<any>;
actionSelected = {id:1,name:"CC-CV"}

cells : Cell[];
cellsName = "";

date = new Date();
voltage = 0;
current = 0;
capacity = 0;
comment="";

lastMeasure: number = 0;

startStop$ : Observable<any>;
measure$: Observable<any[]>;
allMeasure$: Observable<any[]>;

pointVoltage = [];
pointCurrent = [];
pointSoc = [];

chartV: any;
chartS: any;
chartC: any;


constructor(requestService: RequestService, private router: Router) { 
	this.id = this.route.snapshot.params['id'];
	this.requestService = requestService;
	this.test$ = requestService.doRequest({"id": 6, "data": {"id_test": this.id}});
	this.action$ = requestService.doRequest({"id": 1, "data": {"nothing": "nothing"}});
	this.cells = [];
	this.startStop$ = new Observable<any>();
	this.measure$ = requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": this.lastMeasure}});
	this.allMeasure$ = requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": 0}});


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
});


console.log(this.cellsName);

	this.action$.subscribe((data) => {
		console.log(data);
		data.forEach((element: any) => {
		  this.actions.push(new Action(element[0], element[1]));
		});
	  });

}



	
	chartOptionsSoc = {
	  exportEnabled: true,
	  title: {
		text: "SOC"
	  },
	  data: [{
		type: "line",
		dataPoints: this.pointSoc
	  }]
	}

	chartOptionsVoltage = {
		exportEnabled: true,
		title: {
		  text: "Voltage"
		},
		data: [{
		  type: "line",
		  dataPoints: this.pointVoltage
		},
	  {
		type: "line",
		dataPoints: this.pointVoltage
		}]
	  }
	  chartOptionsCurrent = {
		exportEnabled: true,
		title: {
		  text: "Current"
		},
		data: [{
		  type: "line",
		  dataPoints: this.pointCurrent
		},]
	  }

	updateAllCharts(){
		this.measure$ = this.requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": this.lastMeasure}});
		this.measure$.subscribe((data) => {
			console.log(data);
		});
		setTimeout(this.updateAllCharts, 1000);
	}
	getAllPoints(){
		this.allMeasure$ = this.requestService.doRequest({"id": 4, "data": {"id_test": this.id,"id_last_measure": 0}});
		this.allMeasure$.subscribe((data) => {
			console.log(data);
		});
	}





	getChartInstanceSOC(chart: object) {
		this.chartS = chart;
	}
	getChartInstanceCurrent(chart: object) {
		this.chartC = chart;
	}
	getChartInstanceVoltage(chart: object) {
		this.chartV = chart;
	}



	startTest(){
		this.startStop$ = this.requestService.doRequest({"id": 11, "data": {"id_test": this.id}});
		this.startStop$.subscribe((data) => {
			console.log(data);
			this.getAllPoints();
			this.updateAllCharts();
		});
	}
	
	stopTest(){
		this.startStop$ = this.requestService.doRequest({"id": 12, "data": {"id_test": this.id}});
		this.startStop$.subscribe((data) => {
			console.log(data);
		});
		
	}

}
