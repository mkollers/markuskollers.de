import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FooterComponent } from './components/footer/footer.component';
import { SocialFooterComponent } from './components/social-footer/social-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    // Material
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    FooterComponent,
    SocialFooterComponent
  ],
  exports: [
    FooterComponent,
    SocialFooterComponent
  ]
})
export class LayoutModule { }
