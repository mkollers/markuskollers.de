import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @HostBinding('class.small') isSmall = false;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 64) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }

}
