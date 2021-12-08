import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealDetailsPage } from './meal-details.page';

const routes: Routes = [
  {
    path: '',
    component: MealDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealDetailsPageRoutingModule {}
