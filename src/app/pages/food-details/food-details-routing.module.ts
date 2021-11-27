import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodDetailsPage } from './food-details.page';

const routes: Routes = [
  {
    path: '',
    component: FoodDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodDetailsPageRoutingModule {}
