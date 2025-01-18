import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFetch, { MethodType, RequestProps } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import User from '../../types/User';



const Grid = () => {
    const [rows, setRows] = useState<User[]>([]);
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
      ];
    
    const requestMethod: MethodType = "GET";
    const url = "https://dummyjson.com/users";
    const request : RequestProps = {url: url, method: requestMethod};

    const { data, loading, error } = useFetch(request);

    useEffect(() => {
        if (data) {
          setRows(data);
        }
      }, [data]);

    if(loading){
        return <Box>Loading</Box>;
    }
    if(error) {
        return <Box>Error: {error.message}</Box>;
    }

    console.log(rows)



    return(
        <>
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
                />
            </Box>
        </>
    )
}

export default Grid;