import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UISharedComponent } from './ui-shared.component';

describe('UISharedComponent', () => {
  let component: UISharedComponent;
  let fixture: ComponentFixture<UISharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UISharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UISharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
