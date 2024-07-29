import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { DomSanitizer } from '@angular/platform-browser';
// import the action model
// import the cell model
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { Estimator } from '../Model/Estimator.model';
import { Test } from '../Model/Test.model';
import { exit } from 'process';
import {TestDownload} from '../Model/TestDownload';

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
  cell$: Observable<any>;
  cellModel:number;
  cellSelected:Cell[]=[];

  commentModel ="";
  
  observers : Estimator[] = [];
  observer$: Observable<any>;
  observerModel:number;
  observerSelected:Estimator[]=[];

  sendRequest$: Observable<any>;
  data:Test;
  
  tests:TestDownload[] = [];
  test$: Observable<any>;
  testModel:number;

  RequestService: RequestService;

  cratePercent:number = 0;

  fileUrl: any;

  newCellName: string = "";

  constructor(RequestService: RequestService,private sanitizer: DomSanitizer) { 
    this.data = new Test(-1, [-1], [-1], "",0);
    this.RequestService = RequestService;

    this.action$ = RequestService.doRequest({"id": 1, "data": {"nothing": "nothing"}});
    this.cell$ = RequestService.doRequest({"id": 2, "data": {"nothing": "nothing"}});
    this.observer$ = RequestService.doRequest({"id": 3, "data": {"nothing": "nothing"}});
    this.sendRequest$ = RequestService.doRequest({"id":10,"data":this.data});
    this.test$ = RequestService.doRequest({"id": 7, "data": {"nothing": "nothing"}});

    this.cellModel=-1;
    this.actionModel=-1;
    this.observerModel=-1;
    this.testModel=-1;
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
    this.test$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.tests.push(new TestDownload(element.id,element.comment,element.cRate,element.action,element.cells,element.observers,element.time));
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

  public getValueCell(event:any){
    this.newCellName = event.target.value;
  }

  public pushTest(){
    console.log("push");
    // data = {'id_action':,'comment':,cells:[],'observers':[]}
    let tabid:number[] = []
    this.cellSelected.forEach((element: any) => {
      tabid.push(element.id)
    });

    let tabobs:number[] = []
    this.observerSelected.forEach((element: any) => {
      tabobs.push(element.id)
    });

    this.data = new Test(this.actionModel, tabid, tabobs, this.commentModel,this.cratePercent);
    this.sendRequest$ = this.RequestService.doRequest({"id":10,"data":this.data});
    this.sendRequest$.subscribe((data) => {
      console.log(data);
      if(data!=0)
        window.location.href = "/test/"+data;
      // go to the /test page
    });
    
  }

  formatLabel(value: number): string {
    return `${value+"%"}`;
  }

  addCellected(){
    this.cells.forEach((element: Cell) => {
      if(element.id==this.cellModel){
        this.cellSelected.push(element)
        this.cellModel=-1;
      }
    });
  }

  removeCellected(idRm:number){
  this.cellSelected = this.cellSelected.filter(({id})=> id !== idRm )
  console.log("fonction")
  }

  addObserver(){
    this.observers.forEach((element: Cell) => {
      if(element.id==this.observerModel){
        this.observerSelected.push(element)
        this.observerModel=-1;
      }
    });
  }

  removeObserver(idRm:number){
    this.observerSelected = this.observerSelected.filter(({id})=> id !== idRm )
    console.log("fonction")
    }


    public downloadTest(){
      console.log(this.testModel);
      this.sendRequest$ = this.RequestService.doRequest({"id":8,"data":this.testModel});
    this.sendRequest$.subscribe((data) => {
      // console.log(data);
      const blob = new Blob([data], { type: 'application/octet-stream' });
      this.fileUrl=this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      // window.location.href = this.fileUrl.changingThisBreaksApplicationSecurity;
      const a = document.createElement('a')
      const objectUrl = this.fileUrl.changingThisBreaksApplicationSecurity;
      a.href = objectUrl
      let name = ""
      for(let i = 0; i < this.tests.length; i++){
        if(this.tests[i].id == this.testModel){
          name = this.tests[i].name + ".csv";
      }}
      a.download = name;
      a.click();
      URL.revokeObjectURL(objectUrl);

    });
    }

    public createCell(){
      console.log(this.newCellName);
      this.sendRequest$ = this.RequestService.doRequest({"id": 13, "data": {"name": this.newCellName}});
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        this.cells.push(new Cell(data, this.newCellName));
        this.newCellName = "";
      });
    }

}
