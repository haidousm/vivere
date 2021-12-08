import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.page.html',
  styleUrls: ['./meal-details.page.scss'],
})
export class MealDetailsPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  saveChanges() {
    // this.diaryService.addOrUpdateFoodEntry(this.foodEntry).subscribe(() => {
    //   this.modalController.dismiss();
    //   this.modalController.dismiss({}, '', 'search-modal').catch((e) => {});
    //   this.diaryService.refreshDiary.next(Math.random());
    // });
  }

  deleteMeal() {
    // this.diaryService
    //   .deleteFoodEntry(this.currentDiaryId, this.foodEntry.id)
    //   .subscribe(() => {
    //     this.modalController.dismiss();
    //     this.modalController.dismiss({}, '', 'search-modal').catch((e) => {});
    //     this.diaryService.refreshDiary.next(Math.random());
    //   });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
