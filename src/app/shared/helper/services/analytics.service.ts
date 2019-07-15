import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

// declare ga as a function to set and sent the events
declare let ga: (action: string, type: string, args?: any) => void;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _router: Router
  ) {
    this.trackPageNavigation();
  }

  private trackPageNavigation() {
    // subscribe to router events and send page views to Google Analytics
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter(() => isPlatformBrowser(this.platformId)),
      tap((event: NavigationEnd) => ga('set', 'page', event.urlAfterRedirects)),
      tap(() => ga('send', 'pageview')),
      tap(() => console.log(42))
    ).subscribe();
  }

  emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
    ga('send', 'event', {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    });
  }
}
