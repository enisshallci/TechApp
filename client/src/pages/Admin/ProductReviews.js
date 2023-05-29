import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StarRating = ({ rating }) => {
  const starStyle = {
    color: '#f8ce0b',
  };
  const filledStars = Math.floor(rating); // Number of filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
  const unfilledStars = 5 - filledStars - (hasHalfStar ? 1 : 0); // Number of unfilled stars

  const renderFilledStars = () => {
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i className="fas fa-star" style={starStyle} key={i}></i>);
    }

    return stars;
  };

  const renderUnfilledStars = () => {
    const stars = [];

    for (let i = 0; i < unfilledStars; i++) {
      stars.push(<i className="far fa-star" style={starStyle} key={filledStars + i}></i>);
    }

    return stars;
  };

  return (
    <div className="star-rating">
      {renderFilledStars()}
      {hasHalfStar && <i className="fas fa-star-half-alt" style={starStyle}></i>}
      {renderUnfilledStars()}
    </div>
  );
};

const ProductReviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const productId = props.productId; // Specify the desired product ID

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/v1/products/get-reviews');
      const { reviews } = response.data;
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = () => {
    const filteredReviews = reviews.filter((review) => review.product === productId);
    const totalReviews = filteredReviews.length;

    if (totalReviews === 0) {
      return 0; // No reviews yet
    }

    const totalRatings = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / totalReviews;

    return averageRating;
  };

  return (
    <div>
      {/* <h2>Product Reviews</h2> */}
      <StarRating rating={calculateAverageRating()} />
    </div>
  );
};

export default ProductReviews;
