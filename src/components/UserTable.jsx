import React from "react"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box} from "@mui/material";

const UserTable = ({users, onCreate, onEdit, onRemove}) => {
    return (
        <TableContainer component={Paper}>
            <Box display="flex" justifyContent="flex-end" marginRight={16} p={1}>
                <Button variant="outlined" color="primary"
                        onClick={onCreate}>Create</Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: "#f5f5f5"}}>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Entry Date</TableCell>
                        <TableCell>Exit Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TableRow key={user.id} sx={{"&:nth-of-type(even)": {backgroundColor: "#f5f5f5"}}}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.country || "N/A"}</TableCell>
                                <TableCell>{user.entryDate || "N/A"}</TableCell>
                                <TableCell>{user.exitDate || "N/A"}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary"
                                            onClick={() => onEdit(user)}>Edit</Button>
                                    <Button variant="outlined" color="secondary"
                                            onClick={() => onRemove(user.id)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No Users available
                            </TableCell>

                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
};


export default UserTable