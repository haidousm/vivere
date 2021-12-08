import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppComponent } from './app.component';
import { SearchPage } from './pages/search/search.page';
import { AppRoutingModule } from './app-routing.module';
import { FoodDetailsPage } from './pages/food-details/food-details.page';
import { MealDetailsPage } from './pages/meal-details/meal-details.page';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { Drivers } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, SearchPage, FoodDetailsPage, MealDetailsPage],
  entryComponents: [SearchPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.LocalStorage, Drivers.IndexedDB],
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BarcodeScanner,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
