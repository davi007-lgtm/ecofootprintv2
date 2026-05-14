import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalidadAirePage } from './calidad-aire.page';

describe('CalidadAirePage', () => {
  let component: CalidadAirePage;
  let fixture: ComponentFixture<CalidadAirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadAirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
