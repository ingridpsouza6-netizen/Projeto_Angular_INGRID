import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroInscricoesComponent } from './cadastro-inscricoes-component';

describe('CadastroInscricoesComponent', () => {
  let component: CadastroInscricoesComponent;
  let fixture: ComponentFixture<CadastroInscricoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroInscricoesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroInscricoesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
