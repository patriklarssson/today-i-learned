import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-calendar',
  templateUrl: './post-calendar.component.html',
  styleUrls: ['./post-calendar.component.scss']
})
export class PostCalendarComponent implements OnInit {

  @Input() postsList: Post[]

  constructor() { }

  ngOnInit(): void {
  }

  today = new Date();
  currentMonth = this.today.getMonth()
  currentYear = this.today.getFullYear()
  currentDaysInMonth = this.daysInMonth()
  selectYear: number
  selectMonth: number  

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  next(): void {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.currentDaysInMonth = this.daysInMonth()
    console.log(this.currentDaysInMonth);
  }

  previous(): void {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.currentDaysInMonth = this.daysInMonth()
    console.log("Year: " + this.currentYear + " Month: " + this.months[this.currentMonth]);
    console.log(this.currentDaysInMonth);    
  }

  isHighlighted(day): boolean {
    let date = new Date(this.months[this.currentMonth] + " " + day + " " + this.currentYear).toDateString()      
    return (this.postsList.some(x => x.date == date))
  }

  daysInMonth(): number {
    return 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
  }


}
