import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersPage from '../Pages/UsersPage';

// Mock du composant ListUsers
jest.mock('../Component/ListUsers', () => () => <div data-testid="list-users">Mocked ListUsers</div>);

describe('UsersPage Component', () => {
    test('should render without crashing', () => {
        render(<UsersPage />);
        expect(screen.getByTestId('list-users')).toBeInTheDocument();
      });
    
      test('should render the container with correct styles', () => {
        render(<UsersPage />);
        const container = screen.getByTestId('users-page-container'); // Cible directement le conteneur principal
        expect(container).toHaveStyle({
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
        });
      });
});
