import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock simple des composants sans data-testid
jest.mock('./Component/Header', () => () => <div>Header</div>);
jest.mock('./Pages/SaveUserDatasPage', () => () => <div>SaveUserDatasPage</div>);
jest.mock('./Pages/UsersPage', () => () => <div>UsersPage</div>);
jest.mock('./Pages/AdminPage', () => () => <div>AdminPage</div>);
jest.mock('./Pages/ConnectionPage', () => () => <div>ConnectionPage</div>);

// Mock de react-router-dom de manière plus simple
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div></div>
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rend SaveUserDatasPage avec disableRouter=true', () => {
    const { container } = render(<App disableRouter={true} />);
    
    // Vérifier que SaveUserDatasPage est rendu
    expect(screen.getByText('SaveUserDatasPage')).toBeInTheDocument();
    
    // Vérifier que Header n'est pas rendu
    expect(screen.queryByText('Header')).not.toBeInTheDocument();
  });

  test('inclut le Header quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que Header est rendu
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('utilise React.Fragment comme Wrapper quand disableRouter=true', () => {
    const { container } = render(<App disableRouter={true} />);
    
    // Quand on utilise Fragment, il n'y a pas de div supplémentaire
    // Le premier enfant du container devrait être directement la div avec className="App"
    expect(container.firstChild).toHaveClass('App');
  });

  test('a les bonnes routes quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // On ne peut pas tester directement les props du Router, mais on peut 
    // vérifier que les composants attendus sont rendus
    expect(screen.getByText('Header')).toBeInTheDocument();
    
    // Il y a 4 routes définies mais une seule est active à la fois
    // Dans le cas du test, c'est normalement SaveUserDatasPage qui est rendu
    expect(screen.getByText('SaveUserDatasPage')).toBeInTheDocument();
  });
});