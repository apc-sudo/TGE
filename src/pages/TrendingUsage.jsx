import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchTrendingProducts } from '../services/products';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { useAccessoryCategories } from '../hooks/useAccessoryCategories.js';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/accessories/${encodeURIComponent(product.type)}/${encodeURIComponent(String(product.id))}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative h-64 w-full">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No image
          </div>
        )}
        <span className="absolute top-3 left-3 bg-[#ff416c] text-white text-xs px-3 py-1 rounded-full shadow">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#514747] mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <button className="bg-[#514747] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#3d3535] transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const TrendingUsage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { categories } = useAccessoryCategories();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    if (!isSupabaseConfigured) {
      setProducts([]);
      setError(new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'));
      setLoading(false);
      return;
    }
    fetchTrendingProducts().then(({ data, error }) => {
      if (cancelled) return;
      setLoading(false);
      if (error) {
        setError(error);
        setProducts([]);
      } else {
        setProducts(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            image: p.image,
            category: p.category || 'Products',
            type: p.type,
          }))
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    if (selectedCategory === 'all') {
      const categoryGroups = {};
      products.forEach(p => {
        const cat = p.category || 'Other';
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(p);
      });

      const limited = [];
      Object.values(categoryGroups).forEach(group => {
        limited.push(...group.slice(0, 2));
      });
      return limited;
    }

    const selectedCatLower = selectedCategory.toLowerCase().replace(/s$/, '');
    const filtered = products.filter(p => {
      const productCat = (p.category || '').toLowerCase();
      return productCat === selectedCatLower ||
        productCat === selectedCatLower + 's' ||
        productCat.includes(selectedCatLower) ||
        selectedCatLower.includes(productCat.replace(/s$/, ''));
    });

    if (filtered.length === 0) {
      const fallback = products.slice(0, 2);
      return fallback;
    }

    return filtered.slice(0, 2);
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-[#d6c2aa] pt-24">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-16 bg-[#d6c2aa]">

      {/* Content */}
      <div className="relative z-10">
        {error && (
          <div className="max-w-2xl mx-auto px-6 pt-28">
            <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error.message}
            </p>
          </div>
        )}

        {/* Heading */}
        <div className="text-center pt-32 pb-16">
          <h1 className="text-6xl font-bold font-[Inter] text-[#000000] mb-4"
            style={{ fontSize: '80px' }}
          >
            Trending{" "}
            <span className="font-['Dancing_Script',cursive] text-[#000000]">
              Products
            </span>
          </h1>
          <p className="text-4xl font-['Dancing_Script',cursive] text-[#000000] max-w-4xl mx-auto px-4">
            Discover our most popular fashion apparels loved by customers worldwide
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-white bg-opacity-90 rounded-full px-6 py-3 shadow-lg w-full max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${selectedCategory === 'all' ? 'bg-[#514747] text-white' : 'bg-transparent text-[#514747] hover:bg-[#514747] hover:text-white border border-[#514747]'}`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${selectedCategory === cat.label ? 'bg-[#514747] text-white' : 'bg-transparent text-[#514747] hover:bg-[#514747] hover:text-white border border-[#514747]'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white bg-opacity-90 rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold font-[Inter] text-[#514747] mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We create custom apparels tailored to your brand's unique style and requirements.
            </p>
            <button className="bg-[#514747] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3d3535] transition-colors">
              Request Custom Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingUsage;
