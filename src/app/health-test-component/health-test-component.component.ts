import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-health-test-component',
  templateUrl: './health-test-component.component.html',
  styleUrl: './health-test-component.component.css'
})
export class HealthTestComponentComponent {
  private route = inject(ActivatedRoute);
	id: number;
  healthTest$: Observable<any>;
  requestService:RequestService;
  healthTestEx:any=null;
  idTest:number;
  charge:boolean=false;
  constructor(requestService: RequestService, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.requestService=requestService;
    this.healthTest$ = requestService.doGetRequest('healthTest?' + this.id);
    this.idTest = 0;
  }

  ngOnInit(): void {
    this.healthTest$ = this.requestService.doGetRequest('health_test?' + this.id);
  this.healthTest$.subscribe((data) => {
    console.log(JSON.parse(data));  
    this.healthTestEx=JSON.parse(data);
    this.charge=true;
  });

  
  
  
  
  }
}
