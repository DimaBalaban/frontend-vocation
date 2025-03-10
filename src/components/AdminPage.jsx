import React, {useState, useEffect} from 'react';
import "../styles/HomePage.css";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Making request to API...");
                const response = await fetch("http://127.0.0.1:8000/api/users-with-vacations");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Received data:", data);

                // const usersArray = Object.values(data);
                // console.log("Converted data to array:", usersArray);
                const usersArray = Array.isArray(data) ? data : Object.values(data);

                // if (Array.isArray(usersArray)) {
                //     setUsers(usersArray);
                // } else {
                //     console.log("No valid users data", data);
                //     setUsers([]);
                // }
                setUsers(usersArray)
            } catch (error) {
                console.error("Error fetching users with vacations", error);
                setError(error.message);
                // setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.status}`);
            }
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <section>
                <h2>Clients</h2>
                <table className="client-order">
                    <thead>
                    <tr className="client-order-items">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Entry Date</th>
                        <th>Exit Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            // console.log("User data:", user);
                            // return (
                    // {users.length > 0 ? (
                    //     users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.country || "N/A"}</td>
                                <td className="client-order-items-load-enter">{user.entryDate || "N/A"}</td>
                                <td className="client-order-items-load-exit">{user.exitDate || "N/A"}</td>
                                <td className="client-order-items-load-button">
                                    <button onClick={() => (user.id)}>Edit</button>
                                    <button onClick={() => (user.id)}>Create</button>
                                    <button onClick={() => handleRemove(user.id)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No users available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </div>
    )
        ;
};

export default AdminPage;


