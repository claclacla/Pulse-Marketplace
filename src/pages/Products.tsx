import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProducts();
      console.log('Products API Response:', response.data); // Debug log
      if (response.data.success) {
        const productsList = response.data.data.products || [];
        console.log('Products list:', productsList);
        console.log('First product sample:', productsList[0]); // Debug log to see structure
        setProducts(productsList);
      } else {
        setError('Failed to load products.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Failed to load products. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

