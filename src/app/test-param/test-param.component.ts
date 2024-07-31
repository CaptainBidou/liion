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

  githubCommitName: string = "";
  githubCommitPseudo: string = "";
  githubCommitDate: string = "";
  githubCommitPicture: string = "";

  pointSoc:any[] = [];
  pointSocEstimator = [];
  chartS: any;

  futebol$ : Observable<any>;
futebolObject:any;

lastTest$: Observable<any>;
lastTestid:number = 0;
lastTestName:string="";
lastTestData:any=0;
allMeasure$: Observable<any>;
allMeasureData:any[] = [];



  constructor(RequestService: RequestService,private sanitizer: DomSanitizer) { 
    this.data = new Test(-1, [-1], [-1], "",0);
    this.RequestService = RequestService;

    this.action$ = RequestService.doRequest({"id": 1, "data": {"nothing": "nothing"}});
    this.cell$ = RequestService.doRequest({"id": 2, "data": {"nothing": "nothing"}});
    this.observer$ = RequestService.doRequest({"id": 3, "data": {"nothing": "nothing"}});
    this.sendRequest$ = RequestService.doRequest({"id":10,"data":this.data});
    this.test$ = RequestService.doRequest({"id": 7, "data": {"nothing": "nothing"}});
    this.futebol$ = RequestService.doFutbolRequestGet({});
    this.lastTest$ = RequestService.doRequest({"id": 6, "data": {"id_test": this.lastTestid}});
    this.allMeasure$ = RequestService.doRequest({"id": 4, "data": {"id_test": this.lastTestid,"id_last_measure": 0}});

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
      this.tests.forEach((element: any) => {
        if(element.id>this.lastTestid){
          console.log(element.id);
          this.lastTestid = element.id;
          this.lastTestName = element.name
        }

      });
      this.lastTest$ = this.RequestService.doRequest({"id": 6, "data": {"id_test": this.lastTestid}});
      this.lastTest$.subscribe((data) => {console.log(data);this.lastTestData = data;});
      this.allMeasure$ = this.RequestService.doRequest({"id": 4, "data": {"id_test": this.lastTestid,"id_last_measure": 0}});
      this.allMeasure$.subscribe((data) => {console.log(data);
      this.allMeasureData = data;
      let i = 0
      if(this.allMeasureData.length!=0){
      this.allMeasureData.forEach((element: any) => {
          
        element=JSON.parse(element);
        this.pointSoc.push({x:i,y:element.estimator_soc});
        i=i+1
      });
      console.log(this.pointSoc);
    }

      });
    });
    

    this.futebol$.subscribe((data) => {
      console.log(data);
      this.futebolObject = data;
      if(this.futebolObject.response.length==0)
      {
  this.futebolObject =  {
    "get": "teams/statistics",
    "parameters": {
        "team": "126",
        "league": "71",
        "season": "2024"
    },
    "errors": [],
    "results": 11,
    "paging": {
        "current": 1,
        "total": 1
    },
    "response": {
        "league": {
            "id": 71,
            "name": "Serie A",
            "country": "Brazil",
            "logo": "https://media.api-sports.io/football/leagues/71.png",
            "flag": "https://media.api-sports.io/flags/br.svg",
            "season": 2024
        },
        "team": {
            "id": 126,
            "name": "Sao Paulo",
            "logo": "https://media.api-sports.io/football/teams/126.png"
        },
        "form": "LLWDWWWDDLLWWWWLWDDL",
        "fixtures": {
            "played": {
                "home": 10,
                "away": 10,
                "total": 20
            },
            "wins": {
                "home": 6,
                "away": 3,
                "total": 9
            },
            "draws": {
                "home": 2,
                "away": 3,
                "total": 5
            },
            "loses": {
                "home": 2,
                "away": 4,
                "total": 6
            }
        },
        "goals": {
            "for": {
                "total": {
                    "home": 15,
                    "away": 13,
                    "total": 28
                },
                "average": {
                    "home": "1.5",
                    "away": "1.3",
                    "total": "1.4"
                },
                "minute": {
                    "0-15": {
                        "total": 7,
                        "percentage": "24.14%"
                    },
                    "16-30": {
                        "total": 4,
                        "percentage": "13.79%"
                    },
                    "31-45": {
                        "total": 5,
                        "percentage": "17.24%"
                    },
                    "46-60": {
                        "total": 4,
                        "percentage": "13.79%"
                    },
                    "61-75": {
                        "total": 3,
                        "percentage": "10.34%"
                    },
                    "76-90": {
                        "total": 5,
                        "percentage": "17.24%"
                    },
                    "91-105": {
                        "total": 1,
                        "percentage": "3.45%"
                    },
                    "106-120": {
                        "total": null,
                        "percentage": null
                    }
                }
            },
            "against": {
                "total": {
                    "home": 8,
                    "away": 13,
                    "total": 21
                },
                "average": {
                    "home": "0.8",
                    "away": "1.3",
                    "total": "1.1"
                },
                "minute": {
                    "0-15": {
                        "total": 3,
                        "percentage": "15.00%"
                    },
                    "16-30": {
                        "total": 2,
                        "percentage": "10.00%"
                    },
                    "31-45": {
                        "total": 3,
                        "percentage": "15.00%"
                    },
                    "46-60": {
                        "total": 6,
                        "percentage": "30.00%"
                    },
                    "61-75": {
                        "total": 1,
                        "percentage": "5.00%"
                    },
                    "76-90": {
                        "total": 3,
                        "percentage": "15.00%"
                    },
                    "91-105": {
                        "total": 2,
                        "percentage": "10.00%"
                    },
                    "106-120": {
                        "total": null,
                        "percentage": null
                    }
                }
            }
        },
        "biggest": {
            "streak": {
                "wins": 4,
                "draws": 2,
                "loses": 2
            },
            "wins": {
                "home": "3-1",
                "away": "0-3"
            },
            "loses": {
                "home": "1-2",
                "away": "4-1"
            },
            "goals": {
                "for": {
                    "home": 3,
                    "away": 3
                },
                "against": {
                    "home": 2,
                    "away": 4
                }
            }
        },
        "clean_sheet": {
            "home": 4,
            "away": 3,
            "total": 7
        },
        "failed_to_score": {
            "home": 2,
            "away": 3,
            "total": 5
        },
        "penalty": {
            "scored": {
                "total": 2,
                "percentage": "100.00%"
            },
            "missed": {
                "total": 0,
                "percentage": "0%"
            },
            "total": 2
        },
        "lineups": [
            {
                "formation": "4-2-3-1",
                "played": 12
            },
            {
                "formation": "3-4-2-1",
                "played": 3
            },
            {
                "formation": "3-4-1-2",
                "played": 2
            },
            {
                "formation": "4-4-2",
                "played": 2
            },
            {
                "formation": "4-1-3-2",
                "played": 1
            }
        ],
        "cards": {
            "yellow": {
                "0-15": {
                    "total": 5,
                    "percentage": "8.47%"
                },
                "16-30": {
                    "total": 4,
                    "percentage": "6.78%"
                },
                "31-45": {
                    "total": 11,
                    "percentage": "18.64%"
                },
                "46-60": {
                    "total": 9,
                    "percentage": "15.25%"
                },
                "61-75": {
                    "total": 8,
                    "percentage": "13.56%"
                },
                "76-90": {
                    "total": 14,
                    "percentage": "23.73%"
                },
                "91-105": {
                    "total": 7,
                    "percentage": "11.86%"
                },
                "106-120": {
                    "total": null,
                    "percentage": null
                },
                "": {
                    "total": 1,
                    "percentage": "1.69%"
                }
            },
            "red": {
                "0-15": {
                    "total": null,
                    "percentage": null
                },
                "16-30": {
                    "total": null,
                    "percentage": null
                },
                "31-45": {
                    "total": null,
                    "percentage": null
                },
                "46-60": {
                    "total": 1,
                    "percentage": "50.00%"
                },
                "61-75": {
                    "total": null,
                    "percentage": null
                },
                "76-90": {
                    "total": null,
                    "percentage": null
                },
                "91-105": {
                    "total": 1,
                    "percentage": "50.00%"
                },
                "106-120": {
                    "total": null,
                    "percentage": null
                }
            }
        }
    }
  }
      }
    });

    this.getLastCommitGithub();


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

    public getLastCommitGithub(){
      this.sendRequest$ = this.RequestService.doGithubRequest({});
      this.sendRequest$.subscribe((data) => {
        console.log(data);
        this.githubCommitName = data[0].commit.message;
        this.githubCommitPseudo = data[0].commit.author.name;
        this.githubCommitDate = data[0].commit.author.date;
        this.githubCommitPicture = data[0].author.avatar_url;
      });
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
    getChartInstanceSOC(chart: object) {
      this.chartS = chart;
      this.chartS.render()
    }

    fileChange($event:any){

    }

}