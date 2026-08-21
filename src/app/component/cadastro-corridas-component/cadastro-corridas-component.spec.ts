import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCorridasComponent } from './cadastro-corridas-component';

describe('CadastroCorridasComponent', () => {
  let component: CadastroCorridasComponent;
  let fixture: ComponentFixture<CadastroCorridasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCorridasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroCorridasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
