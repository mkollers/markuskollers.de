import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImprintPageRoutingModule } from './imprint-page-routing.module';
import { ImprintPageComponent } from './imprint-page.component';


@NgModule({
  declarations: [ImprintPageComponent],
  imports: [
    CommonModule,
    ImprintPageRoutingModule
  ]
})
export class ImprintPageModule { }
