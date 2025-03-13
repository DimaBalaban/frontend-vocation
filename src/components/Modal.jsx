import React from 'react';
import "../styles/Modal.css"

const Modal = ({ isOpen, close, user, setUser, onSave }) => {

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(user);
        close();
    };

    const handleInputChange = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{user ? "Edit user" : "Create user"}</h2>
                <form>
                    <label>Name:
                        <input
                            type="text"
                            value={user?.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </label>
                    <label>Email:
                        <input
                            type="email"
                            value={user?.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </label>
                    <label>Country:
                        <input
                            type="text"
                            value={user?.country || ''}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                        />
                    </label>
                    <label>Entry Date:
                        <input
                            type="date"
                            value={user?.entryDate || ''}
                            onChange={(e) => handleInputChange('entryDate', e.target.value)}
                        />
                    </label>
                    <label>Exit Date:
                        <input
                            type="date"
                            value={user?.exitDate || ''}
                            onChange={(e) => handleInputChange('exitDate', e.target.value)}
                        />
                    </label>
                </form>
                <button onClick={close}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default Modal;
