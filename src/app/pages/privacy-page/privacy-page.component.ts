import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
