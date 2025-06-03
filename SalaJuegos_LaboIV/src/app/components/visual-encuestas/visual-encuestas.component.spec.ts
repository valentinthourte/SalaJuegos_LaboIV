import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEncuestasComponent } from './visual-encuestas.component';

describe('VisualEncuestasComponent', () => {
  let component: VisualEncuestasComponent;
  let fixture: ComponentFixture<VisualEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualEncuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
