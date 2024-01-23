import { ComponentFixture, TestBed,  } from '@angular/core/testing';

import { AuctionCarouselComponent } from './auction-carousel.component';

describe('AuctionCarouselComponent', () => {
  let component: AuctionCarouselComponent;
  let fixture: ComponentFixture<AuctionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCarouselComponent ]
    })
    .overrideTemplate(AuctionCarouselComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCarouselComponent);
    component = fixture.componentInstance;
    component.carouselThumbsUseCase={
      select:()=>true
    }
    component.carouselUseCase={
      slideCounter:true
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

describe('check handleCarouselUseCaseEvents',()=>{
  it('carouselThumbsUseCase.select to be called',()=>{
    component.carouselThumbsUseCase={
      select:()=>true
    }
    component.carouselUseCase={
      slideCounter:true
    }
    const spy=jest.spyOn(component.carouselThumbsUseCase,'select')
    component.handleCarouselUseCaseEvents(true);
    expect(spy).toBeCalled()
  })
})

describe('on download',()=>{
  it('should create element with a tag and click to be called',()=>{
    const mLink = { href: '', click: jest.fn(), download: '' } as any;
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mLink);
    const createElementSpy2 = jest.spyOn(document, 'removeChild').mockReturnValueOnce(mLink);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    component.download('blobUrl', 'go');
    expect(createElementSpy).toBeCalledWith('a');
    expect(mLink.click).toBeCalled();
    expect(createElementSpy2).toBeCalled();
  })
})

});


