import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialFooterComponent } from './components/social-footer/social-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,

    // Material
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SocialFooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SocialFooterComponent
  ]
})
export class LayoutModule { }
