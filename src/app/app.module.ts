import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule,MatToolbarModule, MatDatepickerModule, MatGridListModule, MatInputModule, MatNativeDateModule, MatListModule, MatCardModule, MatRadioModule, MatButtonModule, MatSlideToggleModule, MatChipsModule, MatCheckbox, MatCheckboxModule, MatIconModule, MatDialogModule, MatSelectModule} from '@angular/material';
import { JobSchedulerComponent } from './job-scheduler/job-scheduler.component'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListComponent } from './dailog/holiday-list/holiday-list.component';
import { AddHolidayComponent } from './dailog/add-holiday/add-holiday.component';


@NgModule({
  declarations: [
    AppComponent,
    JobSchedulerComponent,
    AddHolidayComponent,
    HolidayListComponent
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
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
    
    
  ],
  providers: [],
  entryComponents:[ 
    AddHolidayComponent,
    HolidayListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
