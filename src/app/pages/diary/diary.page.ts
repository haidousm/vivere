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

  caloricProgress = 0;
  caloriesRemainingText = '';
  timerHandler: number;

  constructor() {}

  ngOnInit() {}

  previousMonth() {}

  nextMonth() {}

  selectDay(day: Day) {
    this.days.forEach((d) => (d.selected = false));
    day.selected = true;
    const maxCals = 2000;
    this.caloricProgress =
      ((Math.floor(Math.random() * 1000) + 1000) / maxCals) * 100;
    this.caloriesRemainingText = `${
      maxCals - Math.floor((this.caloricProgress / 100) * maxCals)
    } calories rem.`;
  }
}

interface Day {
  name: string;
  date: number;
  selected: boolean;
}
