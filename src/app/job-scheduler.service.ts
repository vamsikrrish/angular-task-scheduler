import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobSchedulerService {
nonWOrkingDays:number[]=[0,6];
days:any = [
  {id:1,name:'Monday'},
  {id:2,name:'Tuesday'},
  {id:3,name:'Wednesday'},
  {id:4,name:'Thursday'},
  {id:5,name:'Friday'},
  {id:6,name:'Saturday'},
  {id:0,name:'Sunday'},
  ];
  months:any = [
    {id:0,name:'January'},
    {id:1,name:'February'},
    {id:2,name:'March'},
    {id:3,name:'April'},
    {id:4,name:'May'},
    {id:5,name:'June'},
    {id:6,name:'July'},
    {id:7,name:'August'},
    {id:8,name:'September'},
    {id:9,name:'October'},
    {id:10,name:'November'},
    {id:11,name:'December'}
  ];
  holidayDateList: Date[]=[];
  constructor() { }
}
