import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSharedComponent } from './core-shared.component';

describe('CoreSharedComponent', () => {
  let component: CoreSharedComponent;
  let fixture: ComponentFixture<CoreSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
