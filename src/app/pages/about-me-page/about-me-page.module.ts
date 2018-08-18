import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutMePageRoutingModule } from './about-me-page-routing.module';
import { AboutMePageComponent } from './about-me-page.component';

@NgModule({
  imports: [
    CommonModule,
    AboutMePageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [AboutMePageComponent]
})
export class AboutMePageModule { }
