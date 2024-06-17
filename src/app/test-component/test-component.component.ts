import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.css'
})
export class TestComponentComponent {
cells = [{name: 'test1', value: 'test1'}, {name: 'test2', value: 'test2'}, {name: 'test3', value: 'test3'}];
cellsName = "";
actions = [{id:1,name:"CC-CV"},{id:2,name:"Random"},{id:3,name:"Test"}];
actionSelected = {id:1,name:"CC-CV"}
date = new Date();
voltage = 0;
current = 0;
capacity = 0;

ngOnInit() {
  this.cellsName= this.cells.map((item) => item.name).join(',');
}


dps = [{x: 1, y: 10}];
	chartV: any;
	chartS: any;
	chartC: any;

	
	chartOptionsSoc = {
	  exportEnabled: true,
	  title: {
		text: "SOC"
	  },
	  data: [{
		type: "line",
		dataPoints: this.dps
	  }]
	}

	chartOptionsVoltage = {
		exportEnabled: true,
		title: {
		  text: "Voltage and Current"
		},
		data: [{
		  type: "line",
		  dataPoints: this.dps
		},
	  {
		type: "line",
		dataPoints: this.dps
		}]
	  }
	  chartOptionsCapacity = {
		exportEnabled: true,
		title: {
		  text: "Capacity"
		},
		data: [{
		  type: "line",
		  dataPoints: this.dps
		},]
	  }

	getChartInstanceSOC(chart: object) {
		this.chartS = chart;
		setTimeout(this.updateChartS, 1000); //Chart updated every 1 second
	}
	getChartInstanceCapacity(chart: object) {
		this.chartC = chart;
		setTimeout(this.updateChartC, 1000); //Chart updated every 1 second
	}
	getChartInstanceVoltage(chart: object) {
		this.chartV = chart;
		setTimeout(this.updateChartV, 1000); //Chart updated every 1 second
	}

	updateChartV = () => {
		var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
		this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});
		this.chartV.render();
		setTimeout(this.updateChartV, 1000); //Chart updated every 1 second
	}	
	updateChartS = () => {
		var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
		this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});
		this.chartS.render();
		setTimeout(this.updateChartS, 1000); //Chart updated every 1 second
	}
	updateChartC = () => {
		var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
		this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});
		this.chartC.render();
		setTimeout(this.updateChartC, 1000); //Chart updated every 1 second
	}
}
