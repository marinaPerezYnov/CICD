import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mettre les mocks AVANT l'import d'App
// Mock des composants avec des fonctions simplifiées
jest.mock('./Component/Header', () => {
  return function MockHeader() {
    return <div>Header</div>;
  };
});

jest.mock('./Pages/SaveUserDatasPage', () => {
  return function MockSaveUserDatasPage() {
    return <div>SaveUserDatasPage</div>;
  };
});

jest.mock('./Pages/UsersPage', () => {
  return function MockUsersPage() {
    return <div>UsersPage</div>;
  };
});

jest.mock('./Pages/AdminPage', () => {
  return function MockAdminPage() {
    return <div>AdminPage</div>;
  };
});

jest.mock('./Pages/ConnectionPage', () => {
  return function MockConnectionPage() {
    return <div>ConnectionPage</div>;
  };
});

// Mock de react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  
  return {
    ...originalModule,
    BrowserRouter: function MockBrowserRouter({ children }) {
      return <div data-testid="browser-router">{children}</div>;
    },
    Routes: function MockRoutes({ children }) {
      return <div data-testid="routes">{children}</div>;
    },
    Route: function MockRoute() {
      return <div data-testid="route"></div>;
    }
  };
});

describe('App Component', () => {
  test('rend la structure correcte avec disableRouter=true', () => {
    const { container } = render(<App disableRouter={true} />);
    
    // Vérifier que la div a la classe App
    expect(container.firstChild).toHaveClass('App');
    
    // Vérifier que Header n'est pas présent
    expect(screen.queryByText('Header')).not.toBeInTheDocument();
  });

  test('inclut le Header quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que Header est rendu
    expect(screen.getByText('Header')).toBeInTheDocument();
    
    // Vérifier que le router est utilisé
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  test('utilise React.Fragment comme Wrapper quand disableRouter=true', () => {
    const { container } = render(<App disableRouter={true} />);
    
    // Quand on utilise Fragment, il n'y a pas de div supplémentaire
    // Le premier enfant du container devrait être directement la div avec className="App"
    expect(container.firstChild).toHaveClass('App');
  });

  test('utilise BrowserRouter comme Wrapper quand disableRouter=false', () => {
    render(<App disableRouter={false} />);
    
    // Vérifier que BrowserRouter est utilisé
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
  });
});