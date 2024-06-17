import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-param',
  templateUrl: './test-param.component.html',
  styleUrl: './test-param.component.css'
})
export class TestParamComponent {
  actions = [{id:1,name:"CC-CV"},{id:2,name:"Random"},{id:3,name:"Test"}];
  action = 'test1';
  comment ="";
  cellSelected = [{name: 'test1', value: 'test1'}];
  cells = [{name: 'test1', value: 'test1'}, {name: 'test2', value: 'test2'}, {name: 'test3', value: 'test3'}];
  observers = [];
  estimator = [];
  constructor() { 

  }
  ngOnInit() {
  }

  selected(event:any){
    console.log(event);
    this.cellSelected.push(event);
  }
  remove(event:any){
    this.cellSelected = this.cellSelected.filter((item) => item.name !== event.name);
    console.log(event);
  }



}
