import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  chosenMonth = 'November';
  chosenYear = '2021';
  days: Day[] = [
    {
      date: 1,
      name: 'M',
      selected: false,
    },
    {
      date: 2,
      name: 'T',
      selected: true,
    },
    {
      date: 3,
      name: 'W',
      selected: false,
    },
    {
      date: 4,
      name: 'T',
      selected: false,
    },
    {
      date: 5,
      name: 'F',
      selected: false,
    },
    {
      date: 6,
      name: 'S',
      selected: false,
    },
    {
      date: 7,
      name: 'S',
      selected: false,
    },
  ];

  slidesOptions = {
    slidesPerView: 6.5,
  };

  constructor() {}

  ngOnInit() {}

  previousMonth() {}

  nextMonth() {}

  selectDay(day: Day) {
    this.days.forEach((d) => (d.selected = false));
    day.selected = true;
  }
}

interface Day {
  name: string;
  date: number;
  selected: boolean;
}
