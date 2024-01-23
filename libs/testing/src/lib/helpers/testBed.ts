import { TestBed } from '@angular/core/testing';

/**
 * Taken from jest-preset-angular
 */

type CompilerOptions = Partial<{
  providers: any[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;

export type ConfigureFn = (testBed: typeof TestBed) => void;

export const configureTests = (
  configure: ConfigureFn,
  compilerOptions: CompilerOptions = {}
) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions
  };

  const configuredTestBed = TestBed.configureCompiler(compilerConfig);

  configure(configuredTestBed);

  return configuredTestBed.compileComponents().then(() => configuredTestBed);
};

/*
 * setup your test with that function like following:

import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '@ocean/testing/helpers';

import { AppComponent } from './foo.component';

describe('Component snapshots', () => {

  let fixture: ComponentFixture<FooComponent>;
  let component: FooComponent;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [FooComponent],
          imports: [...],
          schemas: [NO_ERRORS_SCHEMA],
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(FooComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it(`should create snapshots without blank lines/white spaces`, () => {
    expect(fixture).toMatchSnapshot();
  });
});
*/

/*
 * @Input() bindings are not reflected into fixture when ChangeDetectionStrategy.OnPush is used

beforeEach(
  async(() => {
    TestBed.configureTestingModule({ declarations: [PizzaItemComponent] })
      .overrideComponent(PizzaItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  })
);
*/
