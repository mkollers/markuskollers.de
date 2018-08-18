import { AboutMePageModule } from './about-me-page.module';

describe('AboutMePageModule', () => {
  let aboutMePageModule: AboutMePageModule;

  beforeEach(() => {
    aboutMePageModule = new AboutMePageModule();
  });

  it('should create an instance', () => {
    expect(aboutMePageModule).toBeTruthy();
  });
});
