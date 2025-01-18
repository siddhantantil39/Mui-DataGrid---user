import Coordinates from "./Coordinates";

type Address = {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    coordinates: Coordinates;
};

export default Address;