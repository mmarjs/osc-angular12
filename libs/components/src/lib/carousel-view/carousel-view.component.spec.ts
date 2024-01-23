import { MockModule } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselModule } from '@ocean/carousel';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PartialsModule } from '@ocean/shared/partials/partials.module';

import { CarouselViewComponent } from './carousel-view.component';

describe('CarouselViewComponent', () => {
  let component: CarouselViewComponent;
  let fixture: ComponentFixture<CarouselViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselModule, MockModule(PartialsModule)],
      declarations: [CarouselViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on download', () => {
    it('should create element with a tag and click to be called', () => {
      const mLink = { href: '', click: jest.fn(), download: '' } as any;
      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValueOnce(mLink);
      const createElementSpy2 = jest
        .spyOn(document, 'removeChild')
        .mockReturnValueOnce(mLink);
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();
      component.download('blobUrl', 'go');
      expect(createElementSpy).toBeCalledWith('a');
      expect(mLink.click).toBeCalled();
      expect(createElementSpy2).toBeCalled();
    });
  });
});
