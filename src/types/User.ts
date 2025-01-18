import Address from "./Address";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    role: string;
    ssn: string;
    gender: string;
    phone: string;
    username: string;
    image: string;
    address: Address;
};

export default User;