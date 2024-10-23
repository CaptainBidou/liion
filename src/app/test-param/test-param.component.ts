import { Component, inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Action } from '../Model/Action.model';
import { Cell } from '../Model/Cell.model';
import { Estimator } from '../Model/Estimator.model';
import { Test } from '../Model/Test.model';
import { TestForm } from '../Model/TestForm';
import { SohStat } from '../Model/SohStat';
import { exit } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-param',
  templateUrl: './test-param.component.html',
  styleUrl: './test-param.component.css'
})


export class TestParamComponent {
  actions: Action[] = [];
  action$: Observable<any>;
  actionModel:Action;

  cells : Cell[] = [];
  cell$: Observable<any>;
  cellModel:number;
  cellSelected:Cell[]=[];

  r0 :any = [];
  r0$: Observable<any>;

  commentModel ="";
  
  observers : Estimator[] = [];
  observer$: Observable<any>;
  observerModel:number;
  observerSelected:Estimator[]=[];

  sendRequest$: Observable<any>;
  
  tests:Test[] = [];
  test$: Observable<any>;
  testModel:number;

  RequestService: RequestService;

  cratePercent:number = 0;

  fileUrl: any;

  newCellName: string = "";
  newCellSoc:number = 0;
  math = Math;

  database:Boolean = false;
  database$: Observable<any>;

  arduino:Boolean = false;
  arduino$: Observable<any>;

  device:Boolean = false;
  device$: Observable<any>;

  bms:Boolean=false;
  bms$:Observable<any>;

  constructor(RequestService: RequestService,private sanitizer: DomSanitizer) { 
    this.RequestService = RequestService;

    this.action$ = RequestService.doGetRequest("action");
    this.cell$ = RequestService.doGetRequest("cell");
    this.observer$ = RequestService.doGetRequest("observer");
    this.sendRequest$ = RequestService.doGetRequest("export?");
    this.test$ = RequestService.doGetRequest("test");
    this.r0$ = RequestService.doGetRequest("measure_soh");
    this.database$ = RequestService.doGetRequest("database");
    this.arduino$ = RequestService.doGetRequest("arduino");
    this.device$ = RequestService.doGetRequest("device");
    this.bms$=RequestService.doGetRequest("bms")

    this.cellModel=-1;
    this.actionModel=new Action(null);
    this.observerModel=-1;
    this.testModel=-1;
  }

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {

    this.database$.subscribe((data) => {
      console.log(data);
      if(data == true){
        this.database = true;
      }
    });
    this.arduino$.subscribe((data) => {
      console.log(data);
      if(data == true){
        this.arduino = true;
      }
    }
    );
    this.device$.subscribe((data) => {
      console.log(data);
      if(data == true){
        this.device = true;
      }
    }
    );
    // this.bms$.subscribe((data)=>
    // {
    //   console.log(data)
    //   if(data==true){
    //     this.bms=true
    //   }
    // })


    this.action$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.actions.push(new Action(element));
      });
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
    this.test$.subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.tests.push(new Test(element));
      });
    });

    this.r0$.subscribe((data) => {
      console.log(data);
        for(let i = 0; i < this.cells.length; i++){
          let find=false;
          data.forEach((element:any) => {
            let objet = JSON.parse(element)
            if(this.cells[i].id == objet.cell.id){
              this.r0.push(new SohStat({"cell":this.cells[i],"AVGR0":objet.AVGR0,"MAXR0":objet.MAXR0,"MINR0":objet.MINR0}));
              find = true
            }});
          if(!find){
            this.r0.push(new SohStat({"cell":this.cells[i],"AVGR0":0,"MAXR0":0,"MINR0":0}));
          }
  }
  console.log(this.r0)
});


  }

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
  public getValueSocCell(event:any){
    this.newCellSoc = event.target.value;
  }

  public pushTest(){
    console.log("push");
    // data = {'id_action':,'comment':,cells:[],'observers':[]}
    let tabid:number[] = []
    this.cellSelected.forEach((element: any) => {
      tabid.push(element)
    });

    let tabobs:number[] = []
    this.observerSelected.forEach((element: any) => {
      tabobs.push(element)
    });
    console.log({"action":this.actionModel,"comment":this.commentModel,"cells":tabid,"observers":tabobs,"c_rate":this.cratePercent})
    // this.data = new Test(this.actionModel, tabid, tabobs, this.commentModel,this.cratePercent);
    this.sendRequest$ = this.RequestService.doPutRequest("test",{"action":this.actionModel,
      "comment":this.commentModel,"cells":tabid,"observers":tabobs,"c_rate":this.cratePercent,"running_bool":false});

    this.sendRequest$.subscribe((data) => {
      console.log(data);
      if(data!=0)
        window.location.href =window.location.href+ "/test/"+data;
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
    this.observers.forEach((element: Estimator) => {
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
      this.sendRequest$ = this.RequestService.doGetRequest("export?"+this.testModel);
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
          name = this.tests[i].name() + ".txt";
      }}
      a.download = name;
      a.click();
      URL.revokeObjectURL(objectUrl);

    });
    }

    public createCell(){
      console.log(this.newCellName);
      if(this.newCellName == ""){
        this.openSnackBar("Please enter a name for the cell", "Close");
        return;
      }
      this.sendRequest$ = this.RequestService.doPutRequest("cell",{"name":this.newCellName,"soc":this.newCellSoc});
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        // this.cells.push(new Cell(data, this.newCellName));
        this.newCellName = "";
        window.location.reload();
      });
    }
    
    public deleteTest(){
      this.sendRequest$ = this.RequestService.doDeleteRequest("test?"+this.testModel);
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
    }

    fileChange($event:any){

    }

    stopTest(id:number){
      this.sendRequest$ = this.RequestService.doPostRequest("stop_test",{"running_bool":false,"id":id});
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
    }

    goToTest(id:number){
      window.location.href = window.location.href+"/test/"+id;
    }

    createHealthTest(){
      window.location.href = window.location.href+"/healthTest";
    }

}