import {Component} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

/** @title Datepicker with custom date classes */
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  model: NgbDateStruct;
  date: {year: number, month: number};
  selectedDate: NgbDateStruct;
  body: string;
  result: string;

  constructor(private calendar: NgbCalendar) {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
  getProducts() {
    this.selectedDate = this.model;
    this.body = JSON.stringify(this.selectedDate);
    fetch('http://localhost:8000/products', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: this.body,
    }).then((res) => res.json())
    .then((data) => this.result = data.posts.edges[0].node.name)
  }
}
