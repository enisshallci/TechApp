import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminWishlist = () => {
  const [wishlists, setWishlists] = useState([]);

  const getWishlists = async () => {
    try {
      const { data } = await axios.get("/api/v1/wishlist/allwishlist");
      setWishlists(data.wishlists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlists();
  }, []);

  return (
    <Layout title={"All Wishlists Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Wishlists</h1>
          {wishlists.map((wishlist, index) => (
            <div className="border shadow" key={wishlist._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{wishlist.name}</td>
                    <td>{wishlist.description}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {wishlist.products.map((product) => (
                  <div className="row mb-2 p-3 card flex-row" key={product._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/products/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{product.name}</p>
                      <p>{product.description.substring(0, 30)}</p>
                      <p>Price: {product.price}</p>
                      {/* Add additional product details as needed */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminWishlist;
