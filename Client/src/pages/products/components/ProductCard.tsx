import { useState } from 'react';
import type { Product } from '../services/ProductService';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // Colores aleatorios ~ Creditos: ChatGPT
  const stockColors = [
    'bg-green-100 text-green-800 border-green-200',
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-orange-100 text-orange-800 border-orange-200'
  ];
  const colorClass = stockColors[product.id % stockColors.length];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-0 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-xs font-medium border ${colorClass}`}>
          {product.stock} disponibles
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} reseñas)</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
          <button className="bg-black text-white px-6 py-2.5 rounded-2xl font-medium hover:bg-gray-800 transition-colors text-sm">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;