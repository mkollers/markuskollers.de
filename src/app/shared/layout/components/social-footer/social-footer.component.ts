import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mk-social-footer',
  templateUrl: './social-footer.component.html',
  styleUrls: ['./social-footer.component.scss']
})
export class SocialFooterComponent {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    this.registerIcon('social', 'xing');
    this.registerIcon('social', 'linkedin');
    this.registerIcon('social', 'twitter');
    this.registerIcon('social', 'github');
    this.registerIcon('social', 'mail');
  }

  /** Registers one icon for a namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }

}
