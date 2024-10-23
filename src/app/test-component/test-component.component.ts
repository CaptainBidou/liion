import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { Estimator } from '../Model/Estimator.model';
import { Test } from '../Model/Test.model';
import { Measure } from '../Model/Measure.model';
import { CellGraph } from '../Model/CellGraph';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { read } from 'fs';
import { healthTestModel } from '../Model/HealthTestModel';

@Component({
	selector: 'app-test-component',
	templateUrl: './test-component.component.html',
	styleUrl: './test-component.component.css'
})
export class TestComponentComponent {

	private route = inject(ActivatedRoute);
	id: number;
	idH:number|null;
	test$: Observable<any>;
	test: Test;
	public requestService: RequestService;
	request$: Observable<any>;

	healthTest:healthTestModel|null=null;

	actions: Action[] = [];

	lastMeasure: Measure;

	measureTab: any;

	startStop$: Observable<any>;
	measure$: Observable<any[]>;


	chartC: any = null;
	lastData: any[] = [1];

	observers: Estimator[] = [];

	popUp:Boolean = true;
	// popUp: Boolean = false;

	bindingEstimator:any=[];
	bindingCell:any=[];

	temperature$:Observable<any>;
	temperature:number;

	current:any=[];
	chartOptionsCurrent = {
		exportEnabled: true,
		title: {
			text: "Current"
		},
		axisY: {
			title: "Ampere",
			minimum: -4,
			maximum: 6.5,
		},
		data: [{
			showInLegend: true,
			name: "current",
			type: "line",
			dataPoints: this.current
		},]
	}

	
	cellTab: any=[];

	constructor(requestService: RequestService, private router: Router) {
		this.test = new Test(null);
		this.lastMeasure = new Measure(null)
		if(this.route.snapshot.params['idHealth']==undefined||this.route.snapshot.params['idTest']==undefined){
			this.id = this.route.snapshot.params['id'];
			this.idH =null;
		}else{
			this.id =this.route.snapshot.params['idTest'];
			this.idH=  this.route.snapshot.params['idHealth'];

		}
		// console.log(this.id)
		


		this.requestService = requestService;
		this.request$=this.requestService.doGetRequest("");
		
		this.test$ = requestService.doGetRequest("test?" + this.id);
		this.temperature$ =  requestService.doGetRequest("temperature");
		
		this.startStop$ = new Observable<any>();
		this.measure$ = requestService.doGetRequest("measure_observer?" + this.id + "&" + this.lastMeasure.id);
		this.measureTab = []
		this.temperature=0;

	}

	ngOnInit() {
		this.test$.subscribe((data) => {
			console.log(data);
			this.test = new Test(data[0])
			// this.cellGraph=new CellGraph(this.test);
			this.test.cellsList.forEach(cell => {
				this.bindingCell[cell.name]=true
				console.log(this.test.running_bool)
				this.test.observersList.forEach(obs => {
					this.cellTab.push({cell:cell,estimator:obs})
				});
				console.log(this.cellTab)
			});
			this.test.observersList.forEach(obs => {
				this.bindingEstimator[obs.name]=true
			});
			// setTimeout(()=>{this.testEnd()},3000)
		});

		this.temperature$.subscribe((data)=>{
			let objet = JSON.parse(data);
			this.temperature = objet.ambientTemperature
		})

		if(this.idH!=null){
			this.request$=this.requestService.doGetRequest("health_test?" + this.idH);
			this.request$.subscribe((data) => {
				this.healthTest=new healthTestModel(JSON.parse(data));
				console.log("lasfnalskdjalskdalsk")
				console.log(this.healthTest)
				// for(let i=0;i<this.healthTest.testsList.length;i++){
				// 	if(this.healthTest.testsList[i].id<=this.id&& i!=0){
				// 				// remove this element from the array
				// 				this.healthTest?.testsList.splice(i,1);
				// 			}
				// 	if(this.healthTest)
							// if(this.healthTest.testsList[i].id == this.id){
							// 	// remove this element from the array
							// 	this.healthTest?.testsList.splice(this.healthTest?.testsList.indexOf(this.healthTest.testsList[i]),1);
							// }

							// if(this.healthTest.testsList[i].id==this.id&&this.healthTest.testsList.length==1){
							// 	// remove this element from the array
							// 	this.healthTest?.testsList.pop()
							// }

						});
				}
			





			
		}

		testEnd(){
			this.test$.subscribe((data) => {
				console.log(data);
				let testVar = new Test(data[0])
				if(testVar.running_bool){
					setTimeout(()=>{this.testEnd()},3000)
				}
				else{
					this.test.running_bool=false
				}
			});

		}


	chargeTime(){
		this.temperature$ =  this.requestService.doGetRequest("temperature");
		this.temperature$.subscribe((data)=>{
			console.log("Temp change")
			console.log(data)
			let objet = JSON.parse(data);
			this.temperature = objet.ambientTemperature
			
		})
		setTimeout(()=>{this.chargeTime()},5000)
	}

	isEstimatorUsed(id: number) {
		let res = false;
		this.test.observersList.forEach(element => {
			if (element.id == id)
				res = true
		});
		return res;
	}

	//start of the programm
	getAllPoints() {
		console.log("update courant")
		this.measure$ = this.requestService.doGetRequest("measure_observer?" + this.id + "&" + this.lastMeasure.id+"&"+this.test.observersList[0].id+"&"+this.test.cellsList[0].id);
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

					this.current.push({x:timeCount,y:Number(this.lastMeasure.current)})
				});
				this.chartC.render()
			}
		});
		this.test$ = this.requestService.doGetRequest("test?" + this.id +"&" + this.lastMeasure.id);
		this.test$.subscribe((data) => {
			console.log(data);
			let testVar = new Test(data[0])
			console.log(testVar)
			if(!testVar.running_bool){
				this.test.running_bool=false
			}});
		this.chartC.render()
		if(this.test.running_bool){
			setTimeout(()=>{this.getAllPoints()},2000)
		}else{
			if(this.healthTest!=null)
			{
				// setTimeout(()=>{window.location=},)
			}
		}
		
	}






	getChartInstanceCurrent(chart: object) {
		this.chartC = chart;
		this.chartC.render()

	}

	startTest() {
		this.chargeTime()
		this.startStop$ = this.requestService.doPostRequest("start_test", { "id": this.test.id});
		this.startStop$.subscribe((data) => {
			console.log(data);
			setTimeout(()=>{this.getAllPoints()},3000)
			this.testEnd();
			this.test.running_bool = true ;
		});
	}

	stopTest() {
		this.startStop$ = this.requestService.doPostRequest("stop_test", { "id": this.test.id});
		this.startStop$.subscribe((data) => {
			console.log(data);
			this.test.running_bool = false;
		});
	}

	updateCheck(boo:boolean,entree:any,tableau:boolean){
		console.log(boo)
		if(tableau){
			this.bindingEstimator[entree]=boo;
		}
		else{
			this.bindingCell[entree]=boo;
		}

	}

	goToNext(idH:any,idT:any){
		window.location.href = "/healthTest/"+idH+"/"+idT
	}


}
