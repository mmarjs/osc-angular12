import { TestBed } from '@angular/core/testing';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';

describe('LibsFormBuilderModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibsFormBuilderModule],
    }).compileComponents();
  });

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(LibsFormBuilderModule).toBeDefined();
  });
});
