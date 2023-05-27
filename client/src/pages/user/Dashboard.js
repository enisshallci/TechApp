import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;