import { FirstModuleModule } from './first-module.module';

describe('FirstModuleModule', () => {
  let firstModuleModule: FirstModuleModule;

  beforeEach(() => {
    firstModuleModule = new FirstModuleModule();
  });

  it('should create an instance', () => {
    expect(firstModuleModule).toBeTruthy();
  });
});
