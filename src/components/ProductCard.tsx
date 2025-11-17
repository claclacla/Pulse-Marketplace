import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  image_url?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  // Try multiple possible image field names
  const imageUrl = product.image || product.imageUrl || product.image_url;
  
  const handleImageError = () => {
    console.log('Image failed to load for product:', product.id, 'URL:', imageUrl);
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-square bg-gray-200">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

