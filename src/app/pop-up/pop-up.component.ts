import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
voltage = 0;
current = 0;

requestService: RequestService;

@Input() id?:number;
@Input() b?: Boolean;
@Output() bChange = new EventEmitter<Boolean>();

obs$ : Observable<any>;
  constructor(RequestService: RequestService,private sanitizer: DomSanitizer) {
    this.requestService = RequestService;
    this.obs$ = RequestService.doRequest({"id": 0, "data": {"id_test": this.id}});
   }

  ngOnInit(): void {
    console.log(this.id);
    this.obs$ = this.requestService.doRequest({"id": 0, "data": {"id_test": this.id}});
    this.obs$.subscribe((data) => {
      console.log(data);
      this.voltage = data.Voltage;
      this.current = data.Current;
  }
)}


  close(){
    console.log("close");
    this.b = !this.b;
    this.bChange.emit(this.b);
  }
  back(){
    console.log("back");
    window.location.href = "/";
  } 

}
