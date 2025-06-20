import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Mock des composants pour éviter les erreurs liées aux dépendances
jest.mock('./Component/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./Pages/SaveUserDatasPage', () => () => <div data-testid="save-user-page">SaveUserDatasPage</div>);
jest.mock('./Pages/UsersPage', () => () => <div data-testid="users-page">UsersPage</div>);
jest.mock('./Pages/AdminPage', () => () => <div data-testid="admin-page">AdminPage</div>);
jest.mock('./Pages/ConnectionPage', () => () => <div data-testid="connection-page">ConnectionPage</div>);

// Mock de react-router-dom pour pouvoir espionner BrowserRouter
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    BrowserRouter: jest.fn(({ children, future }) => (
      <div data-testid="mock-router" data-future={JSON.stringify(future)}>
        {children}
      </div>
    )),
    Routes: ({ children }) => <div data-testid="mock-routes">{children}</div>,
    Route: () => <div data-testid="mock-route"></div>
  };
});

describe('App Component', () => {
  beforeEach(() => {
    // Réinitialiser le compteur d'appels à BrowserRouter
    jest.clearAllMocks();
  });

  test('utilise React.Fragment comme Wrapper quand disableRouter=true', () => {
    const { container } = render(<App disableRouter={true} />);
    
    // Quand on utilise Fragment, il n'y a pas de div supplémentaire
    // Donc le premier enfant du container devrait être directement la div avec className="App"
    expect(container.firstChild).toHaveClass('App');
    
    // BrowserRouter ne devrait pas être appelé
    const { BrowserRouter } = require('react-router-dom');
    expect(BrowserRouter).not.toHaveBeenCalled();
  });

  test('utilise BrowserRouter avec options futures quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que BrowserRouter a été appelé avec les options futures
    const { BrowserRouter } = require('react-router-dom');
    expect(BrowserRouter).toHaveBeenCalledTimes(1);
    expect(BrowserRouter).toHaveBeenCalledWith(
      expect.objectContaining({
        future: { v7_startTransition: true }
      }),
      expect.anything()
    );
    
    // Vérifier que les futures options sont correctement passées
    const routerElement = screen.getByTestId('mock-router');
    expect(routerElement).toHaveAttribute('data-future', JSON.stringify({ v7_startTransition: true }));
  });

  test('rend l\'enfant correctement dans le Wrapper quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que le contenu de l'App est rendu à l'intérieur du Router
    const routerElement = screen.getByTestId('mock-router');
    const appDiv = routerElement.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    
    // Vérifier que le Header est présent
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  test('rend les Routes avec toutes les routes définies quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que les Routes sont rendues
    expect(screen.getByTestId('mock-routes')).toBeInTheDocument();
    
    // Vérifier qu'il y a 4 routes définies
    const routes = screen.getAllByTestId('mock-route');
    expect(routes).toHaveLength(4);
  });

  test('rend seulement SaveUserDatasPage sans Routes quand disableRouter=true', () => {
    render(<App disableRouter={true} />);
    
    // SaveUserDatasPage devrait être présent
    expect(screen.getByTestId('save-user-page')).toBeInTheDocument();
    
    // Routes ne devrait pas être présent
    expect(screen.queryByTestId('mock-routes')).not.toBeInTheDocument();
    
    // Header ne devrait pas être présent
    expect(screen.queryByTestId('mock-header')).not.toBeInTheDocument();
  });
});