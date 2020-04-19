import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule,MatToolbarModule, MatDatepickerModule, MatGridListModule, MatInputModule, MatNativeDateModule, MatListModule, MatCardModule, MatRadioModule, MatButtonModule, MatSlideToggleModule, MatChipsModule, MatCheckbox, MatCheckboxModule, MatIconModule} from '@angular/material';
import { JobSchedulerComponent } from './job-scheduler/job-scheduler.component'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    JobSchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
