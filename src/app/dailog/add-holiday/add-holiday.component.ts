import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {
  result:Holidays=new Holidays();

days:any = [
  {id:1,name:'Monday'},
  {id:2,name:'Tuesday'},
  {id:3,name:'Wednesday'},
  {id:4,name:'Thursday'},
  {id:5,name:'Friday'},
  {id:6,name:'Saturday'},
  {id:0,name:'Sunday'},
  ];
  constructor(
    public dialogRef: MatDialogRef<AddHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.result.nonWorkingDays=data.nonWorkingDays;
    };

  ngOnInit() {
  }

}
export class Holidays{
selectedDate:Date;
nonWorkingDays:number[];
}