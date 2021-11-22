import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'splashscreens',
    loadChildren: () =>
      import('./pages/splashscreens/splashscreens.module').then(
        (m) => m.SplashscreensPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('./pages/diary/diary.module').then((m) => m.DiaryPageModule),
  },
  {
    path: 'food-details',
    loadChildren: () => import('./pages/food-details/food-details.module').then( m => m.FoodDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
