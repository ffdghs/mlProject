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
  results: Array<any>;
  topics: Array<any>=[];
  categories: Array<any>=[];

  view: any[] = [1000, 700];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#47575c', '#366a6d', '#257c70', '#318d66', '#579c4f', '#87a631', '#c0aa05', '#ffa600']
  };

  constructor(private calendar: NgbCalendar) {
    Object.assign(this, { this:this.categories });
  }

  getProducts() {
    this.topics = [];
    this.categories = [];
    this.selectedDate = this.model;
    this.body = JSON.stringify(this.selectedDate);
    fetch('http://localhost:8000/products', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: this.body,
    }).then((res) => res.json())
    .then((data) => {
      this.results = data.posts.edges
      for(let result of this.results) {
        for(let topicResults of result.node.topics.edges) {
            this.topics.push({name: topicResults.node.name});
        }
      }
      this.getNumberCategories();
    })
  }

  getNumberCategories() {
    this.categories = Object.values(this.topics.reduce((obj:Object, { name }) => {
      if(obj[name] === undefined) obj[name] = { name: name, value: 1};
      else obj[name].value++
      return obj;
    },{}))
  }

}
