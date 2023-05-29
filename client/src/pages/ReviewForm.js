import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ReviewForm = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { productId } = useParams();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the review object
    const review = {
      product: props.productId,
      rating,
      comment,
    };

    try {
      // Send the review to the API
      const response = await axios.post("/api/v1/products/review", review);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Review Form</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;