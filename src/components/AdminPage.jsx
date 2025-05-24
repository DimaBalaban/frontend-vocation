import React, {useState, useEffect} from 'react';
import "../styles/HomePage.css";
import Modal from "./Modal";
import UserTable from "./UserTable";
import SearchBar from "./SearchBar";
import {toast} from "react-toastify";
import {TableContainer} from "@mui/material";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    // const [searchName, setSearchName] = useState("");
    // const [debouncedSearch, setDebouncedSearch] = useState("");

    const fetchFromAPI = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(options.headers || {}),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    };


    const fetchUsers = async (search = "") => {
        setLoading(true);
        try {
            const data = await fetchFromAPI(`http://127.0.0.1:8000/api/users-with-vacations?search=${search}`);
            setUsers(Array.isArray(data) ? data : Object.values(data));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setDebouncedSearch(searchName);
    //     }, 1000);
    //     return () => clearTimeout(timeout);
    // }, [searchName]);

    // useEffect(() => {
    //     fetchUsers(debouncedSearch);
    // }, [debouncedSearch]);
    //
    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, [users]);
    const handleSearch = () => {
        fetchUsers(searchValue);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await fetchFromAPI(`http://127.0.0.1:8000/api/users/${id}`, {method: "DELETE"});
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            // alert("Failed to delete user. Please try again");
            toast.error("Failed to delete user. Please try again", {
                style: {
                    width: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    height: 'auto',
                    fontSize: '18px',
                },
                progressStyle: {
                    height: '4px',
                    borderRadius: '0 0 8px 8px',
                },
                position: "top-center",
                autoClose: 6000,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedUser({name: '', email: '', country: '', entryDate: '', exitDate: ''});
        setIsModalOpen(true);
    };

    const handleSave = async (updatedUser) => {
        try {
            if (selectedUser?.id) {
                await fetchFromAPI(`http://127.0.0.1:8000/api/users/${selectedUser.id}`, {
                    method: "PUT",
                    body: JSON.stringify({name: updatedUser.name, email: updatedUser.email}),
                });

                await fetchFromAPI(`http://127.0.0.1:8000/api/users/${selectedUser.id}/update-vacation`, {
                    method: "PUT",
                    body: JSON.stringify({
                        country: updatedUser.country,
                        entryDate: updatedUser.entryDate,
                        exitDate: updatedUser.exitDate,
                    }),
                });

                setUsers((prevUsers) =>
                    prevUsers.map(user =>
                        user.id === selectedUser.id
                            ? {...user, ...updatedUser}
                            : user
                    )
                );
            } else {
                const newUser = await fetchFromAPI("http://127.0.0.1:8000/api/users", {
                    method: "POST",
                    body: JSON.stringify(updatedUser),
                });

                console.log("Create User:", newUser);

                setUsers((prevUsers) => [
                    {
                        ...newUser.user,
                        country: updatedUser.country || '',
                        entryDate: updatedUser.entryDate || '',
                        exitDate: updatedUser.exitDate || '',
                    },
                    ...prevUsers
                ]);
            }

            closeModal();
        } catch (error) {
            console.error("Failed to create/update user:", error);
            // alert("Failed to create/update user. Please try again");
            toast.error("Failed to create/update user. Please try again", {
                style: {
                    width: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    height: 'auto',
                    fontSize: '18px',
                },
                progressStyle: {
                    height: '4px',
                    borderRadius: '0 0 8px 8px',
                },
                position: "top-center",
                autoClose: 6000,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // const filterUser = users.filter(user =>
    //     user.name.toLowerCase().includes(searchName.toLowerCase())
    // );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <section>
                <h2>Clients</h2>

                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} onSearch={handleSearch}/>

                <UserTable users={users} onEdit={handleEdit} onRemove={handleRemove} onCreate={handleCreate}/>
                {/*<UserTable users={filterUser} onEdit={handleEdit} onRemove={handleRemove} onCreate={handleCreate}/>*/}
            </section>

            <Modal isOpen={isModalOpen} close={closeModal} user={selectedUser} setUser={setSelectedUser}
                   onSave={handleSave}/>
            <TableContainer/>
        </div>

    );
};

export default AdminPage;

