import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuellaCalculadorPage } from './huella-calculador.page';

describe('HuellaCalculadorPage', () => {
  let component: HuellaCalculadorPage;
  let fixture: ComponentFixture<HuellaCalculadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HuellaCalculadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
