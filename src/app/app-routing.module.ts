import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestParamComponent } from './test-param/test-param.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { GraphComponent } from './graph/graph.component';
import { HealthTestComponent } from './health-test/health-test.component';
import { HealthTestComponentComponent } from './health-test-component/health-test-component.component';

const routes: Routes = [
  {path:'healthTest/:idHealth/:idTest',component:TestComponentComponent},
  {path:'test/:id',component:TestComponentComponent},
  {path:'',component:TestParamComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
