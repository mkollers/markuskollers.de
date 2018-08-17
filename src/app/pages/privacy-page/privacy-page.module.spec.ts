import { PrivacyPageModule } from './privacy-page.module';

describe('PrivacyPageModule', () => {
  let privacyPageModule: PrivacyPageModule;

  beforeEach(() => {
    privacyPageModule = new PrivacyPageModule();
  });

  it('should create an instance', () => {
    expect(privacyPageModule).toBeTruthy();
  });
});
