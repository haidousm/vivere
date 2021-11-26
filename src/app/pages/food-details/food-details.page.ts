import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/types/FoodItem';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {
  @Input() food: FoodItem;

  numberOfServings = 1;
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.numberOfServings =
      this.food.numberOfServings > 0 ? this.food.numberOfServings : 1;
  }

  // decreaseServings() {
  //   this.numberOfServings--;
  //   this.updateTotalCalories();
  // }
  // increaseServings() {
  //   this.numberOfServings++;
  //   this.updateTotalCalories();
  // }

  updateTotalCalories() {
    this.food.totalCalories =
      this.numberOfServings * this.food.caloriesPerServing;
  }

  inputChanged(event) {
    this.numberOfServings = event.target.value;
    this.updateTotalCalories();
  }

  saveChanges() {
    this.food.numberOfServings = this.numberOfServings;
    this.modalController.dismiss();
  }

  dismiss() {
    this.food.totalCalories =
      this.food.caloriesPerServing * this.food.numberOfServings;
    this.modalController.dismiss();
  }
}
