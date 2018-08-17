import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ImprintPageRoutingModule } from './imprint-page-routing.module';
import { ImprintPageComponent } from './imprint-page.component';

@NgModule({
  imports: [
    CommonModule,
    ImprintPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [ImprintPageComponent]
})
export class ImprintPageModule { }
