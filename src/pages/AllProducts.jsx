import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import { fetchAllProducts } from '../services/products';
import { isSupabaseConfigured } from '../lib/supabaseClient';

function detailPath(product) {
  const typeSlug =
    product.type && String(product.type).trim() !== ''
      ? product.type
      : 'catalog';
  return `/accessories/${encodeURIComponent(typeSlug)}/${encodeURIComponent(String(product.id))}`;
}

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchAllProducts().then(({ data, error: err }) => {
      if (cancelled) return;
      setLoading(false);
      if (err) {
        setError(err);
        setProducts([]);
      } else {
        setProducts(data);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#514747] mb-2 font-[Inter]">
          All products
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Everything currently in the catalog ({products.length} {products.length === 1 ? 'item' : 'items'}).
        </p>

        {error && (
          <p className="mb-8 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error.message}
          </p>
        )}

        {!error && products.length === 0 && (
          <p className="text-gray-500">No products in the database yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <button
              type="button"
              key={product.id}
              onClick={() => navigate(detailPath(product))}
              className="text-left border cursor-pointer shadow-sm hover:shadow-lg transition duration-300 rounded-none bg-white"
            >
              <div className="relative w-full h-72 bg-gray-100">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 px-4 text-center">
                    No image
                  </div>
                )}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-[#514747] text-white text-xs px-3 py-1 rounded-full shadow">
                    {product.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg text-[#212121] line-clamp-2">{product.name}</h2>
                {product.size && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Size: </span>
                    <span className="line-clamp-2">{product.size}</span>
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
