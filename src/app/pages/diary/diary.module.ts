import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { DiaryPageRoutingModule } from './diary-routing.module';

import { DiaryPage } from './diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryPageRoutingModule,
    NgCircleProgressModule.forRoot({
      radius: 30,
      innerStrokeWidth: 1,
      outerStrokeWidth: 3,
      innerStrokeColor: '#5E5CE6',
      outerStrokeColor: '#bf5af2',
      startFromZero: true,
      animation: true,
      responsive: true,
      showUnits: false,
      showTitle: false,
      titleFontSize: '5',
      unitsFontSize: '5',
      subtitleFontSize: '8',
      subtitleColor: 'white',
    }),
  ],
  declarations: [DiaryPage],
})
export class DiaryPageModule {}
