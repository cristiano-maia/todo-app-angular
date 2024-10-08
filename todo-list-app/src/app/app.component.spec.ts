import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent], // O AppComponent é um componente standalone, então deve ser importado em vez de declarado.
    });
    
    // Cria uma instância do componente
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // Obtém a instância do componente
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // Verifica se o componente foi criado
  });

  it(`should have as title 'Teste Desenvolvedor Angular'`, () => {
    expect(component.title).toEqual('Teste Desenvolvedor Angular'); // Verifica se o título está correto
  });

  it('should render title in a h1 tag', () => {
    // Atualiza a visualização
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement; // Obtém o elemento DOM
    expect(compiled.querySelector('h1').textContent).toContain('Teste Desenvolvedor Angular'); // Verifica se o título está sendo renderizado
  });
});