import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'imprint', loadChildren: './pages/imprint-page/imprint-page.module#ImprintPageModule'
}, {
  path: 'privacy', loadChildren: './pages/privacy-page/privacy-page.module#PrivacyPageModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
