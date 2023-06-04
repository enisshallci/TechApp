import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import '../../style/users.css'

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = async (userId) => {
    try {
      // Send DELETE request to the backend API
      await axios.delete(`/api/v1/auth/delete-user/${userId}`);
  
      toast.success("User Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="users">
              {users?.map((user) => (
                <div key={user._id} className="user-card">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
