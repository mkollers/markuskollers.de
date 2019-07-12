import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPageComponent } from './privacy-page.component';

const routes: Routes = [
  { path: '', component: PrivacyPageComponent, data: { path: 'privacy' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPageRoutingModule { }
