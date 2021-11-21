import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashscreens',
    pathMatch: 'full',
  },
  {
    path: 'splashscreens',
    loadChildren: () =>
      import('./splashscreens/splashscreens.module').then(
        (m) => m.SplashscreensPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
