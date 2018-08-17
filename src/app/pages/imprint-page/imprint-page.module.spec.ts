import { ImprintPageModule } from './imprint-page.module';

describe('ImprintPageModule', () => {
  let imprintPageModule: ImprintPageModule;

  beforeEach(() => {
    imprintPageModule = new ImprintPageModule();
  });

  it('should create an instance', () => {
    expect(imprintPageModule).toBeTruthy();
  });
});
