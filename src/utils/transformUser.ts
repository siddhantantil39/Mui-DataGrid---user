import User from "../types/User";

const transformUser = (data: unknown) => {

    if (!Array.isArray(data)) {
        throw new Error("Data must be an array to transform");
    };
    
    const transformedData: User[] = data.map((item: any) => ({
        id: item.id.toString(),
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        age: item.age, 
        email: item.email || "",
        role: item.role,
        ssn: item.ssn,
        gender: item.gender,
        phone: item.phone || "",
        username: item.username || "",
        image: item.image,
        address: {
          address: item.address?.address || "",
          city: item.address?.city || "",
          state: item.address?.state || "",
          postalCode: item.address?.postalCode || "",
          coordinates: {
            lat: item.address?.coordinates?.lat || "0",
            lng: item.address?.coordinates?.lng || "0",
          },
        },
      }));

      return transformedData;

};

export default transformUser;