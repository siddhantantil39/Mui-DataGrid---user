import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import User from "../../types/User";
import { useEffect, useState } from "react";
import useFetch, { MethodType, RequestProps } from "../../hooks/useFetch";
import transformUser from "../../utils/transformUser";

type UserResponse = {
    user: User;
};

const Details = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<Partial<User>>();

    if(!location.state?.user && id) {
                const requestMethod: MethodType = "GET";
                const url = `https://dummyjson.com/user/${id}`;
                const request: RequestProps = { url: url, method: requestMethod };
                const { data } =  useFetch<UserResponse>(request);
                if (data) {
                    setUser(transformUser([data.user])[0]);
                }
        }


    useEffect(() => {
        if(location.state?.user) {
            setUser(location.state.user as Partial<User>);
        } 
        else {
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    }, [location]);

    if (!user?.id) {
        return <Box>No user data available. Redirecting...</Box>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>
            <Typography>ID: {user?.id}</Typography>
            <Typography>Name: {user?.firstName}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Button
                sx={{ marginTop: 2, borderRadius: 5, color: "black", backgroundColor: "white" }}
                variant="contained"
                onClick={() => {
                    navigate("/");
                }}
            >Go Back</Button>
        </Box>
        
    );
};

export default Details;
