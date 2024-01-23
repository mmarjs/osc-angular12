import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './component';

describe('TestComponent', () => {
  let Mock: Type<Component>;
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    Mock = TestComponent('test-component', {
      template: '{{ input }}',
      inputs: ['input'],
      outputs: ['output'],
    });

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [Mock],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input', () => {
    component.input = 'Test Text';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual('Test Text');
  });

  it('should trigger the output', (done) => {
    function trigger() {
      // tslint:disable-next-line:no-invalid-this
      this.output.next('checked');
    }

    try {
      let test;
      // the Mock already creates the EventEmitter
      component.output.subscribe((v) => (test = v));

      component.trigger = trigger.bind(component);
      component.trigger();

      expect(test).toBe('checked');

      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
