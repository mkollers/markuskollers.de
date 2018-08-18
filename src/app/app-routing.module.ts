import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: './pages/about-me-page/about-me-page.module#AboutMePageModule'
}, {
  path: 'imprint', loadChildren: './pages/imprint-page/imprint-page.module#ImprintPageModule'
}, {
  path: 'privacy', loadChildren: './pages/privacy-page/privacy-page.module#PrivacyPageModule'
}, {
  path: '**', redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
