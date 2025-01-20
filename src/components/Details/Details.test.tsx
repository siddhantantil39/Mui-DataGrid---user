import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";
import  useFetch  from "../../hooks/useFetch";
import User from "../../types/User";

jest.mock("../../hooks/useFetch");

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

const mockUser: Partial<User> = {
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
};

describe("Details Component", () => {
    it("renders user details from location state", () => {
        render(
            <MemoryRouter initialEntries={[{ state: { user: mockUser } }]}>
                <Routes>
                    <Route path="/" element={<Details />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("User Details")).toBeInTheDocument();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("Name: John")).toBeInTheDocument();
        expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    });

    // it("fetches and renders user details when no location state", async () => {
    //     mockUseFetch.mockReturnValue({
    //         data: { user: mockUser } as any,
    //         error: null,
    //         loading: false,
    //     });

    //     render(
    //         <MemoryRouter initialEntries={["/user/1"]}>
    //             <Routes>
    //                 <Route path="/user/:id" element={<Details />} />
    //             </Routes>
    //         </MemoryRouter>
    //     );

    //     await waitFor(() => {
    //         expect(screen.getByText("User Details")).toBeInTheDocument();
    //         expect(screen.getByText("ID: 1")).toBeInTheDocument();
    //         expect(screen.getByText("Name: John")).toBeInTheDocument();
    //         expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    //     });
    // });

    it("redirects when no user data is available", async () => {
        mockUseFetch.mockReturnValue({
            data: null,
            error: null,
            loading: false,
        });

        render(
            <MemoryRouter initialEntries={["/user/1"]}>
                <Routes>
                    <Route path="/user/:id" element={<Details />} />
                    <Route path="/" element={<div></div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("No user data available. Redirecting...")).toBeInTheDocument();
        });
    });
});