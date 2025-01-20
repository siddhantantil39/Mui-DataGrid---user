import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import User from "../../types/User";
import { useEffect, useState } from "react";

const Details = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<Partial<User>>();
    
    useEffect(() => {
        if (!location.state?.user) {
            if(!id){
                setTimeout(()=>{
                    navigate('/');
                },1500)
            }
            //TODO: FETCH DATA
        }
        else{
            setUser(location.state?.user as Partial<User>);
        }
      }, [id, location]);
    
    if (!user?.id) {
        return <Box>No user data available. Fetching...</Box>;
    }


    return(
        <>
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>
            <Typography>ID: {user?.id}</Typography>
            <Typography>Name: {user?.firstName}</Typography>
            <Typography>Email: {user?.email}</Typography>
        </Box>
        </>
    )
}

export default Details;