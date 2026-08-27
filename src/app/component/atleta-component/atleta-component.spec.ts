import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtletaComponent } from './atleta-component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AtletaComponent', () => {
  let component: AtletaComponent;
  let fixture: ComponentFixture<AtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtletaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AtletaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve executar o salvar ao clicar em Cadastrar', () => {
    const salvarSpy = vi.spyOn(component, 'salvar');

    const botao = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    botao.click();

    expect(salvarSpy).toHaveBeenCalled();
  });
});