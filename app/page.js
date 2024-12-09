
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    const interval = setInterval(fetchProducts, 10000); 
    return () => clearInterval(interval);
  }, []);

  const handleFilter = (category) => {
    setCategory(category);
    const filtered = category ? products.filter(product => product.category === category) : products;
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <button onClick={() => handleFilter('')}>All</button>
        <button onClick={() => handleFilter('Electronics')}>Electronics</button>
        <button onClick={() => handleFilter('Home Appliances')}>Home Appliances</button>
        <button onClick={() => handleFilter('Fashion')}>Fashion</button>
        <button onClick={() => handleFilter('Fitness')}>Fitness</button>
      </div>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div>
                <strong>{product.name}</strong> - ${product.price} - {product.category}
                <div>
                  <span>Rating: {product.ratings.average} / 5</span>
                </div>
                <div>
                  <em>{product.description}</em>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}