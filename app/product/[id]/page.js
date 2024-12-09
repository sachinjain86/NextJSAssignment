
'use client'; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { use } from 'react'; 

const ProductDetails = ({ params }) => {
  const unwrappedParams = use(params); 
  const { id } = unwrappedParams; 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/products/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]); 

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      
      <h2>Features</h2>
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <h2>Ratings</h2>
      <p><strong>Average Rating:</strong> {product.ratings.average} / 5</p>
      <h3>Reviews</h3>
      <ul>
        {product.ratings.reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating})
          </li>
        ))}
      </ul>

      <Link href="/">Back to Product List</Link>
    </div>
  );
};

export default ProductDetails;