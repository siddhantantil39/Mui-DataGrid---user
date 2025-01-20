import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFetch, { MethodType, RequestProps } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import User from '../../types/User';
import { useNavigate } from 'react-router-dom';
import transformUser from '../../utils/transformUser';

export type UserArrayResponse = {
    users: User[];
}


const Grid = () => {
    const [rows, setRows] = useState<User[]>([]);
    const navigate = useNavigate();
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 400 },
        { field: 'details',
          headerName: 'Details', 
          width: 300,
          renderCell: (params) => (
            <Link 
                component="button"
                underline='hover'
                onClick={() => {
                    navigate(`/details/${params.row.id}`, {
                        state: {
                            user: params.row
                        }
                    })
                }}
            >
                Details
            </Link>
          )
        }
      ];
    
    const requestMethod: MethodType = "GET";
    const url = "https://dummyjson.com/users";
    const request : RequestProps = {url: url, method: requestMethod};

    const { data, loading, error } = useFetch<UserArrayResponse>(request);

    useEffect(() => {
        if (data && Array.isArray(data.users)) {
            setRows(transformUser(data.users));
          }
      }, [data]);

    if(loading){
        return <Box>
            <CircularProgress size={150}/>
        </Box>;
    }
    if(error) {
        return <Box>Error: {error.message}</Box>;
    }


    return(
        <>
            <Typography variant='h1' sx={{ padding: '1rem', textAlign: 'initial'}}>Users</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    // loading={loading}
                />
            </Box>
        </>
    )
}

export default Grid;