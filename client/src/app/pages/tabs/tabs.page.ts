import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { DiaryService } from 'src/app/services/diary.service';
import { FoodService } from 'src/app/services/food.service';
import { MealsService } from 'src/app/services/meals.service';
import { MealTime } from 'src/app/types/MealTime';
import { FoodDetailsPage } from '../food-details/food-details.page';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  mealTimes: MealTime[] = [];
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private barcodeScanner: BarcodeScanner,
    private diaryService: DiaryService,
    private mealsService: MealsService,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.mealsService.getMealTimes().subscribe((meals: MealTime[]) => {
      this.mealTimes = meals.sort((a, b) => a.order - b.order);
    });
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      cssClass: 'search-modal',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      backdropDismiss: true,
      showBackdrop: true,
      mode: 'ios',
      id: 'search-modal',
    });
    return await modal.present();
  }

  async openBarCodeModal() {
    this.scanBarcode();
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13',
      orientation: 'portrait',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        this.foodService
          .getFoodItemByGTIN(barcodeData.text)
          .subscribe(async (foodItem) => {
            console.log(foodItem);
            if (!foodItem) {
              return;
            }
            const modal = await this.modalController.create({
              component: FoodDetailsPage,
              backdropDismiss: true,
              componentProps: {
                food: foodItem,
                mealTimes: this.mealTimes,
                currentDiaryId: this.diaryService.getCurrentDiaryId(),
              },
              id: 'food-details-modal',
            });
            return await modal.present();
          });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
