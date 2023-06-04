import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Layout/Header";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const [auth] = useAuth();

  const getWishlist = async () => {
    try {
      const { data } = await axios.get(`/api/v1/wishlist/get-wishlist`);
      setWishlist(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getWishlist();
  }, [auth?.token]);
  const handleDeleteFromWishlist = async (wishlistId, productId) => {
    try {
      const response = await axios.delete(`/api/v1/wishlist/${wishlistId}/${productId}`);
  
      console.log(response.data);
      toast.success("Product Successfully removed from Wishlist");

      getWishlist()
      // Handle success response
  
    } catch (error) {
      console.log('Failed to delete product from wishlist', error);
      // Handle error response
    }
  };

  return (
    <Layout title={"Wishlist"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            {wishlist.length > 0 ? (
              <ul className="list-group">
                <h4>Products:</h4>
                {wishlist.map((w) => (
                  <li key={w._id} className="list-group-item">
                    <ul className="list-group">
                      {w.products.map((product) => (
                        <li key={product._id} className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-2">
                              {product.photo && (
                                <img
                                  src={`/api/v1/products/product-photo/${product._id}`}
                                  className="card-img-top"
                                  alt={product.name}
                                />
                              )}
                            </div>
                            <div className="col-10">
                              <h5>{product.name}</h5>
                              <p>{product.description}</p>
                              <button className="btn btn-danger" onClick={()=> {handleDeleteFromWishlist(w._id, product._id)}}>Delete</button>

                            </div>

                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the wishlist.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
