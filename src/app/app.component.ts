import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { easeInAnimation } from './shared/layout/animations/ease-in.animation';

@Component({
  animations: [easeInAnimation],
  selector: 'mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    this.registerIcons('social', ['mail', 'twitter', 'github', 'linkedin', 'xing']);
    this.registerIcons('material', ['menu']);
  }

  getState = (outlet: RouterOutlet) => outlet.activatedRouteData.path;

  /** Registers one icon for a namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  /** Registers many icons in one namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcons(namespace: string, names: string[]) {
    names.forEach(name => this.registerIcon(namespace, name));
  }
}
