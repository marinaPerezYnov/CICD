import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import AdminPage from '../Pages/AdminPage';

// Mock axios
jest.mock('axios');

// Mock console.log et console.error pour éviter la pollution des logs de test
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('AdminPage Component', () => {
  const mockUsers = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      date_naissance: '1990-01-01',
      pays: 'France',
      ville: 'Paris',
      code_postal: '75001',
      nombre_achat: 5
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      date_naissance: '1985-05-15',
      pays: 'France',
      ville: 'Lyon',
      code_postal: '69001',
      nombre_achat: 3
    }
  ];

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore console mocks
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test('affiche un message d\'erreur si non connecté', async () => {
    // Pas de token dans localStorage
    render(<AdminPage />);
    
    expect(screen.getByText('Accès refusé')).toBeInTheDocument();
    expect(screen.getByText('Vous devez vous connecter pour accéder à cette page')).toBeInTheDocument();
  });

  test('affiche un message d\'erreur si non admin', async () => {
    // Token dans localStorage mais utilisateur non admin
    localStorage.setItem('admin_token', 'fake-token');
    
    axios.get.mockRejectedValueOnce({ 
      response: { status: 401 }
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/me', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
    
    expect(screen.getByText('Accès refusé')).toBeInTheDocument();
    expect(screen.getByText("Vous devez être administrateur pour accéder à cette page")).toBeInTheDocument();
  });

  test('affiche la liste des utilisateurs pour un admin', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/users', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
    
    expect(screen.getByText('Gestion des utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('2 utilisateur(s) enregistré(s)')).toBeInTheDocument();
    
    // Vérifie que les noms des utilisateurs sont affichés
    expect(screen.getByText('Dupont')).toBeInTheDocument();
    expect(screen.getByText('Martin')).toBeInTheDocument();
  });

  test('gère l\'erreur lors du chargement des utilisateurs', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock pour /admin/me
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.reject(new Error('Erreur de chargement'));
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/users', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
    
    // Vérifie que le message d'erreur s'affiche
    expect(screen.getByText('Erreur lors du chargement des utilisateurs')).toBeInTheDocument();
  });

  test('permet de sélectionner et désélectionner des utilisateurs', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock des différentes requêtes
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
    
    // Sélectionne le premier utilisateur
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Vérifie que le bouton de suppression affiche le bon nombre
    expect(screen.getByText('🗑️ Supprimer (1)')).toBeInTheDocument();
    
    // Désélectionne le premier utilisateur
    fireEvent.click(checkboxes[0]);
    
    // Vérifie que le bouton de suppression est désactivé
    const deleteButton = screen.getByText('🗑️ Supprimer (0)');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
  });

  test('permet de supprimer des utilisateurs sélectionnés', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock des différentes requêtes
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    axios.delete.mockResolvedValueOnce({ data: { message: 'Utilisateurs supprimés avec succès' } });
    
    // Mock window.confirm pour éviter le dialogue de confirmation
    window.confirm = jest.fn(() => true);
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
    
    // Sélectionne le premier utilisateur
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Clique sur le bouton supprimer
    fireEvent.click(screen.getByText('🗑️ Supprimer (1)'));
    
    // Vérifie que la confirmation a été demandée
    expect(window.confirm).toHaveBeenCalledWith('Confirmer la suppression des utilisateurs sélectionnés ?');
    
    // Vérifie que la requête DELETE a été appelée avec les bons paramètres
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:8000/admin/users',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer fake-token'
          }),
          data: { ids: [1] }
        })
      );
    });
    
    // Vérifie que le message de succès s'affiche
    expect(screen.getByText('Utilisateurs supprimés avec succès')).toBeInTheDocument();
  });

  test('gère l\'annulation de la suppression d\'utilisateurs', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock des différentes requêtes
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    // Mock window.confirm pour simuler l'annulation
    window.confirm = jest.fn(() => false);
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
    
    // Sélectionne le premier utilisateur
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Clique sur le bouton supprimer
    fireEvent.click(screen.getByText('🗑️ Supprimer (1)'));
    
    // Vérifie que la confirmation a été demandée
    expect(window.confirm).toHaveBeenCalledWith('Confirmer la suppression des utilisateurs sélectionnés ?');
    
    // Vérifie que la requête DELETE n'a PAS été appelée
    expect(axios.delete).not.toHaveBeenCalled();
  });

  test('gère l\'erreur lors de la suppression d\'utilisateurs', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock des différentes requêtes
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    // Mock de l'erreur lors de la suppression
    axios.delete.mockRejectedValueOnce(new Error('Erreur de suppression'));
    
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
    
    // Sélectionne le premier utilisateur
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    // Clique sur le bouton supprimer
    fireEvent.click(screen.getByText('🗑️ Supprimer (1)'));
    
    // Vérifie que la requête DELETE a été appelée
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
    
    // Vérifie que le message d'erreur s'affiche
    expect(screen.getByText('Erreur lors de la suppression des utilisateurs')).toBeInTheDocument();
  });

  test('permet d\'étendre et réduire les détails d\'un utilisateur', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Dupont')).toBeInTheDocument();
    });
    
    // Les détails complets ne sont pas visibles initialement
    expect(screen.queryByText(/Code postal:/i)).not.toBeInTheDocument();
  
    // Clique sur le bouton d'expansion
    const expandButtons = screen.getAllByText('▼');
    fireEvent.click(expandButtons[0]);
    
    // Vérifie que les détails sont maintenant visibles en utilisant un sélecteur plus flexible
    // Au lieu de chercher le texte exact, on utilise une expression régulière
    expect(screen.getByText(/Code postal:.*75001/i)).toBeInTheDocument();
  
    // Clique à nouveau pour réduire
    const collapseButtons = screen.getAllByText('▲');
    fireEvent.click(collapseButtons[0]);
    
    // Vérifie que les détails ne sont plus visibles
    await waitFor(() => {
        expect(screen.queryByText(/Code postal:/i)).not.toBeInTheDocument();
    });
  });

  test('ferme les messages d\'alerte', async () => {
    // Token dans localStorage et utilisateur admin
    localStorage.setItem('admin_token', 'fake-token');
    
    // Mock des différentes requêtes
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: true, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.reject(new Error('Erreur de chargement'));
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des utilisateurs')).toBeInTheDocument();
    });
    
    // Clique sur le bouton de fermeture de l'alerte
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Vérifie que le message a disparu
    expect(screen.queryByText('Erreur lors du chargement des utilisateurs')).not.toBeInTheDocument();
  });

  test('vérifie que fetchUsers est appelé quand isAdmin change à true', async () => {
    // Token dans localStorage
    localStorage.setItem('admin_token', 'fake-token');
    
    // Premier appel pour /admin/me retourne isAdmin: false
    let isAdminValue = false;
    
    axios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8000/admin/me') {
        return Promise.resolve({ data: { isAdmin: isAdminValue, email: 'admin@example.com' } });
      } else if (url === 'http://localhost:8000/admin/users') {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.reject(new Error('URL non reconnue dans le test'));
    });
    
    const { rerender } = render(<AdminPage />);
    
    // Attendre que le premier rendu soit terminé
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/me', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
    
    // Réinitialiser le mock pour pouvoir suivre les appels suivants
    axios.get.mockClear();
    // Changer isAdmin à true pour le prochain appel
    isAdminValue = true;
    
    // Force un re-rendu qui déclenchera le useEffect
    rerender(<AdminPage />);
    
  
    // Vérifier d'abord que /admin/me est appelé
    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/me', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
    
    // Puis vérifier que /admin/users est appelé après que isAdmin devienne true
    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/admin/users', 
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } }));
    });
  });
});