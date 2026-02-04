import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Filter,
  Search,
  Star,
  ShoppingCart,
  Package
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        // Handle both response formats
        const productsData = response.data.data || response.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to empty array instead of fallback data
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const addToCart = async (product) => {
    // Check if user is logged in
    const token = localStorage.getItem('apex_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/${product.id}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        alert(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Shop Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200 mb-6">
            <ShoppingBag className="text-emerald-600" size={20} />
            <span className="text-emerald-600 font-medium">APEX MERCHANDISE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Developer</span>{' '}
            <span className="text-emerald-600">Essentials</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium tech apparel and accessories designed for developers, by developers.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${selectedCategory === category
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-emerald-200 text-gray-700 hover:border-emerald-500'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-emerald-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-800 font-bold">{product.rating || 4.5}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-emerald-600">
                    KES {product.price?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;