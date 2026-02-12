import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDown } from './scroll-down';

describe('ScrollDown', () => {
  let component: ScrollDown;
  let fixture: ComponentFixture<ScrollDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollDown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
