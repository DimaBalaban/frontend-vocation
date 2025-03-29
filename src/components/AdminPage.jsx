import React, {useState, useEffect} from 'react';
import "../styles/HomePage.css";
import Modal from "./Modal";
import UserTable from "./UserTable";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchFromAPI("http://127.0.0.1:8000/api/users-with-vacations");
                setUsers(Array.isArray(data) ? data : Object.values(data));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await fetchFromAPI(`http://127.0.0.1:8000/api/users/${id}`, {method: "DELETE"});
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            alert("Failed to delete user. Please try again");
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
            alert("Failed to create/update user. Please try again");
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <section>
                <h2>Clients</h2>
                <UserTable users={users} onEdit={handleEdit} onRemove={handleRemove} onCreate={handleCreate}/>
            </section>

            <Modal isOpen={isModalOpen} close={closeModal} user={selectedUser} setUser={setSelectedUser}
                   onSave={handleSave}/>
        </div>
    );
};

export default AdminPage;

// const AdminPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//
//
//     const fetchFromAPI = async (url, options) => {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }
//         return await response.json();
//     };
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 console.log("Making request to API...");
//                 const data = await fetchFromAPI("http://127.0.0.1:8000/api/users-with-vacations");
//                 console.log("Received data:", data);
//                 setUsers(Array.isArray(data) ? data : Object.values(data));
//             } catch (error) {
//                 console.error("Error fetching users with vacations", error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchUsers();
//     }, []);
//
//     const handleRemove = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this user?")) {
//             return;
//         }
//         try {
//             await fetchFromAPI(`http://127.0.0.1:8000/api/users/${id}`, {
//                 method: "DELETE",
//             });
//             setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             alert("Failed to delete user. Please try again");
//         }
//     };
//
//     const handleEdit = (user) => {
//         setSelectedUser(user);
//         setIsModalOpen(true);
//     };
//
//     const handleCreate = () => {
//         setSelectedUser({
//             name: '',
//             email: '',
//             country: '',
//             entryDate: '',
//             exitDate: '',
//         });
//         setIsModalOpen(true);
//     };
//
//     const handleSave = async (updatedUser) => {
//         console.log("Saving user with data:", updatedUser);
//
//         try {
//
//             if (selectedUser.id) {
//                 const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${selectedUser.id}`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         name: updatedUser.name,
//                         email: updatedUser.email,
//
//                     }),
//                 });
//
//                 if (!userResponse.ok) {
//                     throw new Error(`Failed to update user: ${userResponse.status}`);
//                 }
//
//                 const vacationResponse = await fetch(`http://127.0.0.1:8000/api/users/${selectedUser.id}/update-vacation`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         country: updatedUser.country,
//                         entryDate: updatedUser.entryDate,
//                         exitDate: updatedUser.exitDate,
//                     }),
//                 });
//
//                 if (!vacationResponse.ok) {
//                     throw new Error(`Failed to update vacation: ${vacationResponse.status}`);
//                 }
//
//                 setUsers((prevUsers) => prevUsers.map(user => user.id === selectedUser.id ? updatedUser : user));
//             } else {
//                 const response = await fetch(`http://127.0.0.1:8000/api/users`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(updatedUser),
//                 });
//
//                 if (!response.ok) {
//                     throw new Error(`Failed to create user: ${response.status}`);
//                 }
//
//                 const newUser = await response.json();
//
//                 setUsers((prevUsers) => [newUser, ...prevUsers]);
//             }
//
//             closeModal();
//         } catch (error) {
//             console.error("Error saving user:", error);
//             alert("Failed to create/update user. Please try again");
//         }
//     };
//
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedUser(null);
//     };
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <section>
//                 <h2>Clients</h2>
//                 <button className="create-button" onClick={handleCreate}>Create</button>
//
//                 <table className="client-order">
//                     <thead>
//                     <tr className="client-order-items">
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Country</th>
//                         <th>Entry Date</th>
//                         <th>Exit Date</th>
//                         <th>Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {users.length > 0 ? (
//                         users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.country || "N/A"}</td>
//                                 <td className="client-order-items-load-enter">{user.entryDate || "N/A"}</td>
//                                 <td className="client-order-items-load-exit">{user.exitDate || "N/A"}</td>
//                                 <td className="client-order-items-load-button">
//                                     <button onClick={() => handleEdit(user)}>Edit</button>
//                                     <button onClick={() => handleRemove(user.id)}>Remove</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6">No users available</td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </table>
//             </section>
//
//             <Modal
//                 isOpen={isModalOpen}
//                 close={closeModal}
//                 user={selectedUser}
//                 setUser={setSelectedUser}
//                 onSave={handleSave}
//             />
//         </div>
//     );
// };
//
// export default AdminPage;


