import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'blog', loadChildren: () => import('./pages/blog-page/blog-page.module').then(m => m.BlogPageModule) },
  { path: 'imprint', loadChildren: () => import('./pages/imprint-page/imprint-page.module').then(m => m.ImprintPageModule) },
  { path: 'privacy', loadChildren: () => import('./pages/privacy-page/privacy-page.module').then(m => m.PrivacyPageModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
