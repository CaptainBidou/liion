import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
// import the action model
// import the cell model
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { Estimator } from '../Model/Estimator.model';
import { Test } from '../Model/Test.model';

@Component({
  selector: 'app-test-param',
  templateUrl: './test-param.component.html',
  styleUrl: './test-param.component.css'
})
export class TestParamComponent {
  actions: Action[] = [];
  action$: Observable<any>;
  actionModel:number;


  cells : Cell[] = [];
  cell$: Observable<any>;;
  cellModel:number;

  commentModel ="";
  
  observers : Estimator[] = [];
  observer$: Observable<any>;
  observerModel:number;

  sendRequest$: Observable<any>;
  data:Test;
  
  RequestService: RequestService;

  constructor(RequestService: RequestService) { 
    this.data = new Test(-1, [-1], [-1], "");
    this.RequestService = RequestService;

    this.action$ = RequestService.doRequest({"id": 1, "data": {"nothing": "nothing"}});
    this.cell$ = RequestService.doRequest({"id": 2, "data": {"nothing": "nothing"}});
    this.observer$ = RequestService.doRequest({"id": 3, "data": {"nothing": "nothing"}});
    this.sendRequest$ = RequestService.doRequest({"id":10,"data":this.data});

    this.cellModel=-1;
    this.actionModel=-1;
    this.observerModel=-1;
  }
  ngOnInit() {


    this.action$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.actions.push(new Action(element[0], element[1]));
      });
    });

    this.cell$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.cells.push(new Cell(element[0], element[1]));
      });
    });
    this.observer$.subscribe((data) => {  
      console.log(data);
      data.forEach((element: any) => {
        this.observers.push(new Estimator(element[0], element[1]));
      });
    });

  }

  // selected(event:any){
  //   console.log(event);
  //   this.cellSelected.push(event);
  // }
  // remove(event:any){
  //   this.cellSelected = this.cellSelected.filter((item) => item.name !== event.name);
  //   console.log(event);
  // }

  public submitFormulary(){
    console.log(this.cellModel);
    console.log(this.actionModel);
    console.log(this.observerModel);
    console.log(this.commentModel);
    this.pushTest();
  }

  public getValueComment(event:any){
    this.commentModel = event.target.value;
  }

  public pushTest(){
    console.log("push");
    // data = {'id_action':,'comment':,cells:[],'observers':[]}
    this.data = new Test(this.actionModel, [this.cellModel], [this.observerModel], this.commentModel);
    this.sendRequest$ = this.RequestService.doRequest({"id":10,"data":this.data});
    this.sendRequest$.subscribe((data) => {
      console.log(data);
      if(data!=0)
        window.location.href = "/test/"+data;
      // go to the /test page
    });
    
  }


}
