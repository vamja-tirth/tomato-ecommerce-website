import React, { useEffect, useState, useCallback } from 'react'
import './Users.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Users = ({ url }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`);
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                toast.error("Error fetching users");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching users");
        }
    }, [url]);

    useEffect(() => {
        const loadUsers = async () => {
            await fetchUsers();
        }
        loadUsers();
    }, [fetchUsers])

    return (
        <div className='users add flex-col'>
            <div className="users-header">
                <p>Registered Users List</p>
                <div className="total-users">
                    Total Users: <span>{users.length}</span>
                </div>
            </div>
            <div className="users-list">
                <div className="users-list-format title">
                    <b>#</b>
                    <b>Name</b>
                    <b>Email</b>
                    <b>ID</b>
                </div>
                {users.map((user, index) => {
                    return (
                        <div key={index} className='users-list-format'>
                            <p>{index + 1}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p className="user-id">{user._id}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users
