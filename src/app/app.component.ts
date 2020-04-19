import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HolidayListComponent } from './dailog/holiday-list/holiday-list.component';
import { AddHolidayComponent } from './dailog/add-holiday/add-holiday.component';
import { JobSchedulerService } from './job-scheduler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-scheduler';
  constructor(public dialog: MatDialog,public jobService:JobSchedulerService) {}
openHolidayList(){
  let dialogRef = this.dialog.open(HolidayListComponent, {
    data: { 
      days:this.jobService.days, 
      nonWorkingDays:this.jobService.nonWOrkingDays,
      holidayList:this.jobService.holidayDateList
    },
    height: '50%',
    width: '50%'

  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
  });
}
openAddHolidayDailog(){
  let dialogRef = this.dialog.open(AddHolidayComponent, {
    data: {
        nonWorkingDays: this.jobService.nonWOrkingDays,
        days:this.jobService.days 
      },
      height: '400px',
      width: '600px'

  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    if(result){
      this.jobService.nonWOrkingDays=result.nonWorkingDays;
      this.jobService.holidayDateList.push(result.selectedDate);
    }

    console.log(this.jobService.holidayDateList,this.jobService.nonWOrkingDays)
  });
}

}
