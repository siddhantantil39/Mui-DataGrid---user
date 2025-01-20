import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFetch, { MethodType, RequestProps } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import User from '../../types/User';
import { useNavigate } from 'react-router-dom';
import transformUser from '../../utils/transformUser';

export type UserArrayResponse = {
    users: User[];
    total: number;
}


const Grid = () => {
    const [rows, setRows] = useState<User[]>([]);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
    const [totalRows, setTotalRows] = useState(0);

    const navigate = useNavigate();
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'image',
          headerName: 'Image',
          width: 150,
          renderCell: (params) => (
            <img src={params.row.image} alt="user-image" width="50" height="50" />
          )
        },
        { field: 'age', headerName: 'Age', width: 100, valueFormatter: (value) => `${value} years`  },
        { field: 'details',
          headerName: 'Details', 
          width: 250,
          renderCell: (params) => (
            <Link
                sx={{ fontWeight: 'bold'}}
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
    const url = `https://dummyjson.com/users?skip=${paginationModel.page*paginationModel.pageSize}&limit=${paginationModel.pageSize}`;
    // const url = `http://localhost:8081/api/user?page=${paginationModel.page}&size=${paginationModel.pageSize}`;

    const request : RequestProps = {url: url, method: requestMethod};

    const { data, loading, error } = useFetch<UserArrayResponse>(request);

    useEffect(() => {
        if (data && Array.isArray(data.users)) {
            setRows(transformUser(data.users));
            setTotalRows(data.total);
            console.log(data.users)
          }
      }, [data]);

      const handlePaginationModelChange = (newModel: { pageSize: number; page: number; }) => {
        setPaginationModel(newModel);
      };


    if(error) {
        return <Box>Error: {error.message}</Box>;
    }

    return(
        <>
            <Typography variant='h1' sx={{ padding: '1rem', textAlign: 'initial'}}>Users</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{' & .MuiDataGrid-cell': {
                            color: "white",
                            }
                        }}
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    paginationMode="server"
                    rowCount={totalRows}
                    onPaginationModelChange={handlePaginationModelChange}
                    loading={loading}
                    disableColumnFilter
                    disableColumnSorting
                    
                />
            </Box>
        </>
    )
}

export default Grid;