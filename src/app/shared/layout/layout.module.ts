import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialBarComponent } from './components/social-bar/social-bar.component';

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
    SocialBarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SocialBarComponent
  ]
})
export class LayoutModule { }
