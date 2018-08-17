import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImprintPageComponent } from './imprint-page.component';

const routes: Routes = [{
  path: '', component: ImprintPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprintPageRoutingModule { }
