import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorMenorComponent } from './mayormenor.component';

describe('MayormenorComponent', () => {
  let component: MayorMenorComponent;
  let fixture: ComponentFixture<MayorMenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayorMenorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
