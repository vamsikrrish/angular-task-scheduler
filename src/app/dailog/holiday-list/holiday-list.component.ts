import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
nonWorkingDays;
days;
holidayList;
  constructor( public dialogRef: MatDialogRef<HolidayListComponent>,
           @Inject(MAT_DIALOG_DATA) public data: any) { 
            console.log('data received',data);
            this.nonWorkingDays=data.nonWorkingDays;
            this.days=data.days;
            this.holidayList=data.holidayList;
           }

  ngOnInit() {
    
  }

}
