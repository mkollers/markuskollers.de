import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPageComponent {

  constructor(meta: Meta) {
    // tslint:disable-next-line:max-line-length
    meta.updateTag({ name: 'description', content: 'Ich entwickel cloud-native Software, meistens Web-basiert, lerne gerne neue Technologien und realisiere innovative Projekte' });
  }
}
