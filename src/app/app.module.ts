import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { TestParamComponent } from './test-param/test-param.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { filteredCells } from './pipe/filteredCells';
import { TestComponentComponent } from './test-component/test-component.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {HttpClientModule} from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import { PopUpComponent } from './pop-up/pop-up.component';
import { GraphComponent } from './graph/graph.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TestParamComponent,
    filteredCells,
    TestComponentComponent,
    PopUpComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatNavList,
    MatIcon,
    MatSlideToggle,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatRadioModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    CanvasJSAngularChartsModule,
    HttpClientModule,
    MatSliderModule,
    DragDropModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
