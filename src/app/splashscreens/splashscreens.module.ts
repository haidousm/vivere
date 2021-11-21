import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashscreensPageRoutingModule } from './splashscreens-routing.module';

import { SplashscreensPage } from './splashscreens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscreensPageRoutingModule
  ],
  declarations: [SplashscreensPage]
})
export class SplashscreensPageModule {}
