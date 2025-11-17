import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  image_url?: string;
  description?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    console.log('Product ID from URL:', id); // Debug log
    if (id) {
      fetchProduct(id);
    } else {
      setError('Product ID is missing.');
      setLoading(false);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await getProduct(productId);
      console.log('Product API Response:', response.data); // Debug log
      
      // Handle different possible response structures
      if (response.data.success) {
        // Try different possible response structures
        const productData = response.data.data?.product || response.data.data || response.data;
        if (productData && productData.id) {
          setProduct(productData);
        } else {
          console.error('Product data structure unexpected:', productData);
          setError('Product data format is invalid.');
        }
      } else {
        const errorMsg = response.data.message || response.data.error || 'Failed to load product.';
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error('Product fetch error:', err);
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error ||
        err.message ||
        'Failed to load product. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
    }
  };

  const handleImageError = () => {
    console.log('Image failed to load for product:', product?.id, 'URL:', product?.image);
    setImageError(true);
  };

  // Try multiple possible image field names
  const imageUrl = product?.image || product?.imageUrl || product?.image_url;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || (!loading && !product)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-col space-y-4">
            <div className="text-red-600 text-lg">
              {error || 'Product not found.'}
            </div>
            <div className="text-sm text-gray-500">
              {id && `Product ID: ${id}`}
            </div>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/products')}
          className="mb-6"
        >
          ← Back to Products
        </Button>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
              {product.description && (
                <p className="text-gray-600 mb-6">{product.description}</p>
              )}
              <Button onClick={handleAddToCart} className="w-full text-black bg-gray-200 hover:bg-gray-300">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

