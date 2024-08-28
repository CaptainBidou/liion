import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestParamComponent } from './test-param/test-param.component';
import { PopUpComponent } from './pop-up/pop-up.component';

const routes: Routes = [
  {path:'test/:id',component:TestComponentComponent},
  {path:'',component:TestParamComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
