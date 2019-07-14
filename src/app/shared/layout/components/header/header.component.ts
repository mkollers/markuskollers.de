import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, filter, tap, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @HostBinding('class.small') isSmall = false;
  path$: Observable<string>;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.path$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap(route => route.data || of({})),
      map(data => data.path || '')
    );
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 64) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }

}
