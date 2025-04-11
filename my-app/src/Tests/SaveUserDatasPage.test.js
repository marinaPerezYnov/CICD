import React from 'react';
import { render, screen } from '@testing-library/react';
import SaveUserDatasPage from '../Pages/SaveUserDatasPage';

// Mock du composant Form
jest.mock('../Component/Form', () => () => <div data-testid="form">Mocked Form</div>);

describe('SaveUserDatasPage Component', () => {
  test('should render without crashing', () => {
    render(<SaveUserDatasPage />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByText(/Mocked Form/i)).toBeInTheDocument();
  });

  test('should render the ToastContainer', () => {
    render(<SaveUserDatasPage />);
    const toastContainer = screen.getByRole('region', { name: /notifications/i }); // Vérifie l'élément ARIA
    expect(toastContainer).toBeInTheDocument();
  });

  test('should render the container with correct styles', () => {
    render(<SaveUserDatasPage />);
    const container = screen.getByTestId('save-datas-form-page-container'); // Trouve le conteneur parent
    expect(container).toHaveStyle({
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  });
});