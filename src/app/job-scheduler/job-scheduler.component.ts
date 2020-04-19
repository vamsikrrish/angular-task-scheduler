import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { timer } from 'rxjs';
import { JobSchedulerService } from '../job-scheduler.service';
import { HolidayListComponent } from '../dailog/holiday-list/holiday-list.component';

@Component({
  selector: 'app-job-scheduler',
  templateUrl: './job-scheduler.component.html',
  styleUrls: ['./job-scheduler.component.scss']
})


export class JobSchedulerComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  showLifeCycle:boolean=false;
  selectedTabIndex: number=0;
  scheduledTime: Date;
  limit: number;
  offset: number;
  endOfSchedule: boolean;
  triggerTime: Date;
  triggerCount: number;
  lifeCycleStartDate: Date;
  lifeCycleEndDate: Date;
  preference:preference;
  isOneTimeForm: any;
  scheduledDays: any[];
  scheduleApplied: boolean;
  days: any;
  months: any;

  constructor(public jobService:JobSchedulerService) {
    this.days=this.jobService.days;
    this.months=this.jobService.months;
   }


dailyForm:FormGroup;
weeklyForm:FormGroup;
monthlyForm: FormGroup;
yearlyForm:FormGroup;
oneTimeForm:FormGroup;
lifeCycleForm:FormGroup;
  ngOnInit() {
    this.minDate = new Date();
    this.initForms();
    //this.maxDate = new Date().;
  }

  initForms(){
    this.dailyForm = new FormGroup({
      frequency: new FormControl(1, Validators.required),
      time: new FormControl('12:00 pm',Validators.required)
    });
    this.weeklyForm = new FormGroup({
      frequency: new FormControl(1,[Validators.required, Validators.min(1)]),
      time: new FormControl('12:00 pm',Validators.required),
      day: new FormControl(1,Validators.required),

    });
    this.monthlyForm = new FormGroup({
      date:new FormControl('1',Validators.required),
      frequency: new FormControl(1, [Validators.required,Validators.max(31), Validators.min(1)]),
      time: new FormControl('12:00 pm',Validators.required)
    });
    this.yearlyForm = new FormGroup({
      date:new FormControl('1',Validators.required),
      month:new FormControl(0,Validators.required),
      frequency: new FormControl(1, Validators.required),
      time: new FormControl('12:00 pm',Validators.required)
    });
    this.oneTimeForm = new FormGroup({
      date: new FormControl(new Date().toISOString(), Validators.required),
      time: new FormControl('12:00 pm',Validators.required)
    });
    this.lifeCycleForm=new FormGroup({
      startDate: new FormControl(new Date().toISOString(), Validators.required),
      endDate: new FormControl(''),
      repetitions: new FormControl(1,Validators.min(1)),
      onGoing:new FormControl(true)
    });
    
  }

  changeOngoingCheckBox(){
    this.lifeCycleForm.get('onGoing').setValue(false);
  }

  resetLifeCycleForm(){
    console.log('toggle life cycle')
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.selectedTabIndex=tabChangeEvent.index;
  }
  submit(){
    console.log('submit'); 
    this.scheduledDays=[];
    this.preference=new preference();
    this.scheduledTime=new Date();
    this.triggerTime=new Date();
    this.triggerCount=0;
    this.isOneTimeForm=false;
    this.scheduleApplied=true;
    this.lifeCycleStartDate= new Date(this.lifeCycleForm.value.startDate);
    this.lifeCycleEndDate= this.lifeCycleForm.value.endDate!=null && this.lifeCycleForm.value.endDate!=""? new Date(this.lifeCycleForm.value.endDate):undefined;
    switch(this.selectedTabIndex){
        case 0: { 
          this.processsDailyFilters();
           console.log('form values:', this.dailyForm.value); 
           break; 
        }
        case 1: { 
          console.log('form values:', this.weeklyForm.value); 
          this.processWeeklyFilters();

          break; 
       } 
        case 2: { 
          console.log('form values:', this.monthlyForm.value); 
          this.processMonthlyFilters();

          break; 
      } 
      case 3: { 
        console.log('form values:', this.yearlyForm.value); 
        this.processYearlyFilters();

        break; 
       }  
       case 4: { 
        console.log('form values:', this.oneTimeForm.value);
        this.isOneTimeForm=true;
        this.processOneTimeFilters();
 
        break; 
       }  
        default: { 
          console.log('no match'); 
          break; 
        } 
     } 
     console.log('lifecycle form values:',this.lifeCycleForm.value);
    console.log('preference:',this.preference);
     this.schedule();



  }

  processOneTimeFilters() {
    const timeString:String = this.oneTimeForm.value.time;
    const timeArray:String[] = timeString.split(':');
    this.preference.hourOfDay=timeArray[1].includes('PM')?Number(timeArray[0])+12:Number(timeArray[0]);
    this.preference.minuteOfDay= Number(timeArray[1].split(" ")[0]); 
    this.triggerTime=new Date(this.oneTimeForm.value.date);
   }
  processYearlyFilters() {
    const timeString:String = this.yearlyForm.value.time;
    const timeArray:String[] = timeString.split(':');
    this.preference.hourOfDay=timeArray[1].includes('PM')?Number(timeArray[0])+12:Number(timeArray[0]);
    this.preference.minuteOfDay= Number(timeArray[1].split(" ")[0]);
    this.preference.dateOfMonth=this.yearlyForm.value.date;
    this.preference.monthOfYear=this.yearlyForm.value.month;
    this.preference.frequency=this.yearlyForm.value.frequency;
    this.preference.frequencyOffset='year';
    }
  processMonthlyFilters() {
    const timeString:String = this.monthlyForm.value.time;
    const timeArray:String[] = timeString.split(':');
    this.preference.hourOfDay=timeArray[1].includes('PM')?Number(timeArray[0])+12:Number(timeArray[0]);
    this.preference.minuteOfDay= Number(timeArray[1].split(" ")[0]);
    this.preference.frequency=this.monthlyForm.value.frequency;
    this.preference.frequencyOffset='month';
    this.preference.dateOfMonth=this.monthlyForm.value.date;
   }
  processWeeklyFilters() {
    const timeString:String = this.weeklyForm.value.time;
    const timeArray:String[] = timeString.split(':');
    this.preference.hourOfDay=timeArray[1].includes('PM')?Number(timeArray[0])+12:Number(timeArray[0]);
    this.preference.minuteOfDay= Number(timeArray[1].split(" ")[0]);
    this.preference.dayOfWeek=this.weeklyForm.value.day;
    this.preference.frequency=this.weeklyForm.value.frequency;
    this.preference.frequencyOffset='week';  
  }
  
  processsDailyFilters() {
    const timeString:String = this.dailyForm.value.time;
    const timeArray:String[] = timeString.split(':');
    this.preference.hourOfDay=timeArray[1].includes('PM')? Number(timeArray[0])+12:Number(timeArray[0]);
    this.preference.minuteOfDay= Number(timeArray[1].split(" ")[0]);
    this.preference.frequency=this.dailyForm.value.frequency;
    this.preference.frequencyOffset='day';
  }

  schedule(){
    //this.scheduledTime;
    //this.limit=100;
    //this.offset+=100;
   for(this.triggerCount;this.triggerCount<100;this.triggerCount++){
    this.triggerTime=this.getNextTriggerTime(this.triggerTime);
      if(this.lifeCycleEndDate && this.triggerTime > this.lifeCycleEndDate ||( !this.lifeCycleForm.value.onGoing  && this.triggerCount>=this.lifeCycleForm.value.repetitions)){
        console.log('end of scheduler');
        this.endOfSchedule=true;
        break;
        }else{
          if((this.lifeCycleForm.value.onGoing 
            || this.triggerCount < this.lifeCycleForm.value.repetitions) 
            && this.triggerTime >= this.lifeCycleStartDate
            ){
          console.log('schedule Time is:',this.triggerTime);
          this.scheduledDays.push(new Date(this.triggerTime));
          if(this.isOneTimeForm){
            break;
          }
        }

    }

    }
  }


  getNextTriggerTime(triggerTime: Date): Date {
    const temp=triggerTime.getDay();

  if(this.preference.frequencyOffset=='day'){
    triggerTime.setDate(triggerTime.getDate() + this.preference.frequency);
  } else  if(this.preference.frequencyOffset=='week'){
        triggerTime.setDate(triggerTime.getDate() + 
        ((triggerTime.getDay()==this.preference.dayOfWeek)? this.preference.frequency*7:
      this.getSuitableOffsetToGetDay(this.preference.dayOfWeek,triggerTime.getDay())));
    
  } else  if(this.preference.frequencyOffset=='month'){
    triggerTime.setMonth(triggerTime.getMonth() + this.preference.frequency);
    triggerTime.setDate( this.preference.dateOfMonth);
  }else  if(this.preference.frequencyOffset=='year'){
    triggerTime.setFullYear(triggerTime.getFullYear() + this.preference.frequency);
    triggerTime.setMonth(this.preference.monthOfYear);
    triggerTime.setDate( this.preference.dateOfMonth);
  }
    triggerTime.setHours(this.preference.hourOfDay,this.preference.minuteOfDay);
    return this.getNextPossibleWorkingDay(triggerTime)
  }

  getNextPossibleWorkingDay(date:Date): Date{
    console.log('checking the validity of date:',date)
    const selectedDay = date.getDay();
    let validDate:boolean=true;
    if(this.jobService.nonWOrkingDays.length>=7){
      console.log('all days cannot be non - working');
      return undefined;
    }
    if(this.jobService.nonWOrkingDays.includes(selectedDay)){
      validDate=false;
    }else{  //For efficiency
      this.jobService.holidayDateList.forEach(holiday => {
        if(holiday.getDate()==date.getDate() && holiday.getMonth()==date.getMonth() && holiday.getFullYear() == date.getFullYear()){
          validDate=false;
        }
      });
    }
    
    if(!validDate){
      date.setDate(date.getDate()+1);
      return this.getNextPossibleWorkingDay(date);
    }else{
     console.log('valid date is:',date)
      return date;
    }
  }
  getSuitableOffsetToGetMonth(expectedMonth: number, currentMonth: number): number {
    if((currentMonth+1)%12==expectedMonth){
      return 1;
    } else if((currentMonth+2)%12==expectedMonth){
      return 2;
    } else if((currentMonth+3)%12==expectedMonth){
      return 3;
    } else if((currentMonth+4)%12==expectedMonth){
      return 4;
    } else if((currentMonth+5)%12==expectedMonth){
      return 5;
    } else if((currentMonth+6)%12==expectedMonth){
      return 6;
    } else if((currentMonth+7)%12==expectedMonth){
      return 7;
    } else if((currentMonth+8)%12==expectedMonth){
      return 8;
    } else if((currentMonth+9)%12==expectedMonth){
      return 9;
    } else if((currentMonth+10)%12==expectedMonth){
      return 10;
    } else if((currentMonth+11)%12==expectedMonth){
      return 11;
    }
    }
  getSuitableOffsetToGetDay(expectedDay: number, currentDay: number): number {
    if((currentDay+1)%7==expectedDay){
      return 1;
    }else  if((currentDay+2)%7==expectedDay){
      return 2;
    }else  if((currentDay+3)%7==expectedDay){
      return 3;
    }else  if((currentDay+4)%7==expectedDay){
      return 4;
    }else  if((currentDay+5)%7==expectedDay){
      return 5;
    }else  if((currentDay+6)%7==expectedDay){
      return 6;
    }
  }

}

export class preference{
  hourOfDay:number;
  minuteOfDay:number;
  frequency:number;
  frequencyOffset:string;
  dayOfWeek:number;
  monthOfYear: number;
  dateOfMonth:number;
}
