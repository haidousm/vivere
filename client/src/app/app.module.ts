import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AppComponent } from './app.component';
import { SearchPage } from './pages/search/search.page';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, SearchPage],
  entryComponents: [SearchPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
