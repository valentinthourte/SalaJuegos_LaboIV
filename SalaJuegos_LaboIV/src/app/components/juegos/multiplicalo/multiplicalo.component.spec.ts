import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicaloComponent } from './multiplicalo.component';

describe('MultiplicaloComponent', () => {
  let component: MultiplicaloComponent;
  let fixture: ComponentFixture<MultiplicaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplicaloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplicaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
