import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByType } from '../services/products';
import { isSupabaseConfigured } from '../lib/supabaseClient';

const SORT_OPTIONS = [
  { label: 'Best Selling', value: 'best' },
  { label: 'Alphabetically, A-Z', value: 'az' },
  { label: 'Alphabetically, Z-A', value: 'za' }
];

const ITEMS_PER_PAGE = 3;
const PRICE_SLIDER_MAX = 5000;

const sortProductList = (list, method) => {
  const sorted = [...list];
  switch (method) {
    case 'az': return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'za': return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default: return sorted;
  }
};

const AccessoryDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('best');
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const dropdownRef = useRef();
  const observer = useRef();

  const COLORS = [...new Set(allProducts.map((p) => p.color).filter(Boolean))].sort();
  const SIZES = [...new Set(allProducts.map((p) => p.size).filter(Boolean))].sort();

  const [filters, setFilters] = useState({
    inStock: [],
    price: [0, PRICE_SLIDER_MAX],
    color: [],
    size: []
  });

  const [tempFilters, setTempFilters] = useState(filters);

const applyFilters = () => {
  const { inStock, price, color, size } = tempFilters;
  const isEmpty =
    inStock.length === 0 &&
    color.length === 0 &&
    size.length === 0 &&
    price[0] === 0 &&
    price[1] === PRICE_SLIDER_MAX;

  if (isEmpty) {
   
    clearFilters();
  } else {
    setFilters(tempFilters);
    setProducts([]);
    setPage(1);
    setShowDropdown(false);
  }
};


const clearFilters = () => {
  const reset = { inStock: [], price: [0, PRICE_SLIDER_MAX], color: [], size: [] };
  setTempFilters(reset);
  setFilters(reset);
  setProducts([]);
  setPage(1);
  setShowDropdown(false);
};
useEffect(() => {
  const { inStock, price, color, size } = tempFilters;
  const isAllEmpty =
    inStock.length === 0 &&
    color.length === 0 &&
    size.length === 0 &&
    price[0] === 0 &&
    price[1] === PRICE_SLIDER_MAX;

  if (isAllEmpty && showDropdown) {
    clearFilters();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mirroring original filter panel behavior
}, [tempFilters]);

  useEffect(() => {
    let cancelled = false;
    if (!type) return;
    setListError(null);
    setAllProducts([]);
    setPage(1);
    setProducts([]);
    if (!isSupabaseConfigured) {
      setLoading(false);
      setAllProducts([]);
      setListError(new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'));
      return;
    }
    setLoading(true);
    fetchProductsByType(type).then(({ data, error }) => {
      if (cancelled) return;
      setLoading(false);
      if (error) {
        setListError(error);
        setAllProducts([]);
      } else {
        setAllProducts(data);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [type]);

  const fetchProductPage = useCallback(
    (pageNum, reset = false) => {
      const filtered = sortProductList(
        allProducts.filter((p) => {
          const inStockMatch =
            filters.inStock.length === 0 ||
            filters.inStock.includes(p.inStock ? 'in' : 'out');
          const priceMatch =
            p.price >= filters.price[0] && p.price <= filters.price[1];
          const colorMatch =
            filters.color.length === 0 || filters.color.includes(p.color);
          const sizeMatch =
            filters.size.length === 0 || filters.size.includes(p.size);
          return inStockMatch && priceMatch && colorMatch && sizeMatch;
        }),
        sortOption
      );
      const newSlice = filtered.slice(
        (pageNum - 1) * ITEMS_PER_PAGE,
        pageNum * ITEMS_PER_PAGE
      );
      setProducts((prev) => (reset ? newSlice : [...prev, ...newSlice]));
      setHasMore(pageNum * ITEMS_PER_PAGE < filtered.length);
    },
    [allProducts, filters, sortOption]
  );

  useEffect(() => {
    if (page === 1) {
      setProducts([]);
      fetchProductPage(1, true);
    } else {
      fetchProductPage(page, false);
    }
  }, [page, filters, sortOption, allProducts, fetchProductPage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const selectedSortLabel = SORT_OPTIONS.find(opt => opt.value === sortOption)?.label || 'Sort By';

  return (
    <div className=" px-10 pb-10">
      <div className="flex gap-4 items-center mb-6 relative z-20" ref={dropdownRef}>
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }} className="border px-4 py-2 rounded bg-white shadow text-sm flex items-center gap-1">
            Filter <RiArrowDownSLine />
          </button>
          {showDropdown && (
            <div className="absolute left-10 bg-white border shadow-lg mt-2 px-6 py-4 z-10 rounded-lg text-sm w-[90vw] max-w-5xl">
              <div className="flex justify-between pb-2 text-gray-800 font-medium text-sm">
                <div className="w-1/4">Availability</div>
                <div className="w-1/4">Price</div>
                <div className="w-1/4">Color</div>
                <div className="w-1/4">Size</div>
              </div>
              <hr className="border-t border-gray-200 mb-4" />
              <div className="flex justify-between gap-4">
                <div className="w-1/4">
                  <button className="underline text-xs mb-2 block" onClick={() => setTempFilters(prev => ({ ...prev, inStock: [] }))}>Reset</button>
                  <div className="mt-2">
                    <label><input type="checkbox" checked={tempFilters.inStock.includes('in')} onChange={(e) => {
                      setTempFilters(prev => ({ ...prev, inStock: e.target.checked ? [...prev.inStock, 'in'] : prev.inStock.filter(i => i !== 'in') }));
                    }} /> In stock</label><br />
                    <label><input type="checkbox" checked={tempFilters.inStock.includes('out')} onChange={(e) => {
                      setTempFilters(prev => ({ ...prev, inStock: e.target.checked ? [...prev.inStock, 'out'] : prev.inStock.filter(i => i !== 'out') }));
                    }} /> Out of stock</label>
                  </div>
                </div>
                <div className="w-1/4">
                  <button className="underline text-xs mb-2 block" onClick={() => setTempFilters(prev => ({ ...prev, price: [0, PRICE_SLIDER_MAX] }))}>Reset</button>
                  <div className="mt-2">
                    <input type="range" min="0" max={PRICE_SLIDER_MAX} value={tempFilters.price[1]} onChange={(e) => setTempFilters(prev => ({ ...prev, price: [0, parseFloat(e.target.value)] }))} />
                    <div>Price: ${tempFilters.price[0]} - ${tempFilters.price[1]}</div>
                  </div>
                </div>
                <div className="w-1/4">
                  <button className="underline text-xs mb-2" onClick={() => setTempFilters(prev => ({ ...prev, color: [] }))}>Reset</button>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map(c => (
                      <button key={c} className={`w-6 h-6 rounded-full border-2 ${tempFilters.color.includes(c) ? 'border-black' : 'border-gray-300'}`} style={{ backgroundColor: c }}
                        onClick={() => {
                          setTempFilters(prev => ({
                            ...prev,
                            color: prev.color.includes(c) ? prev.color.filter(col => col !== c) : [...prev.color, c]
                          }));
                        }} />
                    ))}
                  </div>
                </div>
                <div className="w-1/4">
                  <button className="underline text-xs mb-2" onClick={() => setTempFilters(prev => ({ ...prev, size: [] }))}>Reset</button>
                  {SIZES.map(size => (
                    <label className="block" key={size}>
                      <input type="checkbox" checked={tempFilters.size.includes(size)} onChange={(e) => {
                        setTempFilters(prev => ({
                          ...prev,
                          size: e.target.checked ? [...prev.size, size] : prev.size.filter(s => s !== size)
                        }));
                      }} /> {size}
                    </label>
                  ))}
                </div>
              </div>
              <hr className="border-t border-gray-200 mt-6 mb-4" />
              <div className="flex justify-between items-center">
                <button className="bg-[#212121] text-white px-6 py-2 rounded" onClick={applyFilters}>Apply</button>
                <button className="underline text-sm" onClick={clearFilters}>Clear</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="border px-4 py-2 rounded bg-white shadow text-sm flex items-center gap-1">
            {selectedSortLabel} <RiArrowDownSLine />
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 bg-white border shadow-lg mt-2 w-48 z-10 rounded text-sm">
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${sortOption === option.value ? 'font-semibold text-green-500' : ''}`}
                  onClick={() => {
                    setSortOption(option.value);
                    setShowSortDropdown(false);
                    setProducts([]);
                    setPage(1);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {listError && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {listError.message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div onClick={() => navigate(`/accessories/${type}/${encodeURIComponent(String(product.id))}`)} key={product.id} ref={isLast ? lastProductRef : null} className="border  cursor-pointer  shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-full h-72 bg-gray-100 mb-4 overflow-hidden">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 px-4 text-center">
                    No image
                  </div>
                )}
              </div>
            <div className='p-4'>
                <h3 className="font-semibold text-lg">{product.name}</h3>
             <p className="text-sm text-gray-500 mt-1">
  <span className="font-semibold text-sm">Size: </span>{product.size}
</p>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !listError && allProducts.length === 0 && type && (
        <p className="text-center text-gray-600 mt-10 max-w-md mx-auto">
          No products in this category yet. Try another category in the sidebar, or{' '}
          <button type="button" className="text-pink-600 underline" onClick={() => navigate('/products')}>
            view all products
          </button>
          .
        </p>
      )}

      {loading && (
       <Loader/>
      )}

      {!hasMore && !loading && products.length > 0 && (
        <p className="text-center text-gray-400 mt-6">You’ve reached the end.</p>
      )}
    </div>
  );
};

export default AccessoryDetail;