import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { Test } from '../Model/Test.model';
import { TestForm } from '../Model/TestForm';
import { Estimator } from '../Model/Estimator.model';
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { healthTest } from '../Model/HealthTest';

@Component({
  selector: 'app-health-test',
  templateUrl: './health-test.component.html',
  styleUrl: './health-test.component.css'
})
export class HealthTestComponent {

  actions: Action[] = [];
  action$: Observable<any>;
  actionModel:Action;


  cells : Cell[] = [];
  cell$: Observable<any>;
  cellSelected:Cell[]=[];

  commentModel ="";
  commentModel2 ="";
  timeResting:number = 0;
  testList:TestForm[] = [];
  
  observers : Estimator[] = [];
  observer$: Observable<any>;
  observerSelected:Estimator[]=[];

  sendRequest$: Observable<any>;
  
  test$: Observable<any>;
  testModel:number;

  RequestService: RequestService;

  cratePercent:number = 0;

  healthTest:healthTest;

  constructor(RequestService: RequestService,private sanitizer: DomSanitizer) { 
    this.RequestService = RequestService;
    this.action$ = RequestService.doGetRequest("action");
    this.cell$ = RequestService.doGetRequest("cell");
    this.observer$ = RequestService.doGetRequest("observer");
    this.sendRequest$ = RequestService.doGetRequest("export?");
    this.test$ = RequestService.doGetRequest("test");
    this.actionModel=new Action(null);
    this.testModel=-1;
    this.healthTest=new healthTest(null)
  }

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {


    this.action$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.actions.push(new Action(element));

      });
      console.log(this.actions);
    });

    this.cell$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.cells.push(new Cell(element));
      });
    });
    this.observer$.subscribe((data) => {  
      console.log(data);
      data.forEach((element: any) => {
        this.observers.push(new Estimator(element));
      });
    });

}


public submitFormulary(){
  console.log(this.actionModel);
  console.log(this.commentModel);
  this.pushTest();
}

public getValueComment(event:any,model:string){
  model = event.target.value;
}

public pushTest(){
  if(!this.verifInput())
    return;
  console.log("push");
  // data = {'id_action':,'comment':,cells:[],'observers':[]}
  console.log({"action":this.actionModel,"comment":this.commentModel,"cells":this.cellSelected,"observers":this.observerSelected,"c_rate":this.cratePercent})
  // this.data = new Test(this.actionModel, tabid, tabobs, this.commentModel,this.cratePercent);
  this.sendRequest$ = this.RequestService.doPutRequest("test",{"action":this.actionModel,
    "comment":this.commentModel,"cellsList":this.cellSelected,"observersList":this.observerSelected,"c_rate":this.cratePercent,"running_bool":false});

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

AddToList(){

  if(!this.verifInput())
    return;

  console.log(this.commentModel)
  console.log(this.cellSelected)
  this.testList.push(new TestForm(this.actionModel,this.cellSelected,this.observerSelected,this.commentModel,this.cratePercent,this.timeResting));
  console.log(this.testList.toString());

  // clean the var
  this.cellSelected = [];
  this.observerSelected = [];
  this.commentModel = "";
  this.cratePercent = 0;
  this.timeResting = 0;
  this.actionModel = new Action(null);
}


verifInput(){
  if(this.actionModel.name==""){
    this.openSnackBar("Please select an action","Ok");
    return false;
  }
  if(this.cellSelected.length==0){
    this.openSnackBar("Please select at least one cell","Ok");
    return false;
  }
  if(this.cellSelected.length!=1 && this.cellSelected.length!=8){
    this.openSnackBar("Please select 1 or 8 cells","Ok");
    return false;

  }
  if(this.observerSelected.length==0){
    this.openSnackBar("Please select at least one estimator","Ok");
    return false;
  }



  return true;
}


drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.testList, event.previousIndex, event.currentIndex);
}

dropcell(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.cellSelected, event.previousIndex, event.currentIndex);
}

removeTest(test:TestForm){
  this.testList.splice(this.testList.indexOf(test),1);
}
removeCell(cell:Cell){
  this.cellSelected.splice(this.cellSelected.indexOf(cell),1);
}


copyTest(test:TestForm){
  this.testList.push(test)
}

createHealthTest(){
  let objet:any = {}
  if(this.testList.length==0){
    this.openSnackBar("Please select at least one test","Ok");
    return;
  }
  objet.commentary = this.commentModel2
  objet.testsList= this.testList
  this.healthTest = new healthTest(objet)
  console.log(this.healthTest.toString())
  this.sendRequest$=this.RequestService.doPutRequest("health_test",this.healthTest.toString())

  this.sendRequest$.subscribe((data) => {
    console.log(data);
    if(data!=0){
      this.sendRequest$=this.RequestService.doGetRequest("health_test?"+data)
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        let healthTestEx = JSON.parse(data)
        // window.location.href = "/healthTest/"+healthTestEx.id+"/"+healthTestEx.testsList[0].id;
        window.location.href=window.location.href+"/healthTest/"+healthTestEx.id+"/"+healthTestEx.testsList[0].id;
      });




    }
      

    // if(data!=0)
    //   window.location.href = "/healthTest/"+data;
    // go to the /test page
  });




}

}
