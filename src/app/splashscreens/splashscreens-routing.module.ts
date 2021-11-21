import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashscreensPage } from './splashscreens.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscreensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashscreensPageRoutingModule {}
