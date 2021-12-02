import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { BarcodeScannerPage } from '../barcode-scanner/barcode-scanner.page';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {}

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
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
    const modal = await this.modalController.create({
      component: BarcodeScannerPage,
      id: 'barcode-modal',
    });
    return await modal.present();
  }
}
