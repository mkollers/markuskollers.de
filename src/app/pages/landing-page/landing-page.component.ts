import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {

  constructor(meta: Meta) {
    // tslint:disable-next-line:max-line-length
    meta.updateTag({ name: 'description', content: 'Ich entwickel cloud-native Software, meistens Web-basiert, lerne gerne neue Technologien und realisiere innovative Projekte' });
  }

}
