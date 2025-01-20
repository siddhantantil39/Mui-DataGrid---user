import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Grid from './Grid';
import { BrowserRouter } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { UserArrayResponse } from './Grid';

// Mock the useFetch hook
jest.mock('../../hooks/useFetch');

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe('Grid Component', () => {
    test('renders loading state', () => {
        mockUseFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <Grid />
            </BrowserRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders error state', () => {
        const errorMessage = 'Failed to fetch data';
        mockUseFetch.mockReturnValue({
            data: null,
            loading: false,
            error: new Error(errorMessage),
        });

        render(
            <BrowserRouter>
                <Grid />
            </BrowserRouter>
        );

        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    test('renders data grid with users', () => {
        const users: UserArrayResponse = {
            users: [
                {
                    id: "1", firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 30, role: 'Admin', ssn: '123-45-6789',
                    gender: '',
                    phone: '',
                    username: '',
                    image: '',
                    address: {
                        address: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        coordinates: {
                            lat: 0,
                            lng: 0
                        }
                    }
                },
                {
                    id: "2", firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', age: 25, role: 'User', ssn: '987-65-4321',
                    gender: '',
                    phone: '',
                    username: '',
                    image: '',
                    address: {
                        address: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        coordinates: {
                            lat: 0,
                            lng: 0
                        }
                    }
                },

            ],
            total: 2
        };

        mockUseFetch.mockReturnValue({
            data: users,
            loading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <Grid />
            </BrowserRouter>
        );

        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
    });
});