import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
  Leaf,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

function Cart({ cart, removeFromCart, clearCart, handleMpesaCheckout, updateQuantity }) {  // Changed from CartPage to Cart
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 200, duration: '3-5 business days' },
    { id: 'express', name: 'Express Delivery', price: 500, duration: '1-2 business days' },
    { id: 'same-day', name: 'Same Day Delivery', price: 800, duration: 'Same day (Nairobi only)' },
  ];

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'APEX10') {
        setCouponApplied(true);
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const calculateDiscount = () => {
    if (couponApplied) {
      return cartTotal * 0.1; // 10% discount
    }
    return 0;
  };

  const calculateShipping = () => {
    const option = shippingOptions.find(opt => opt.id === selectedShipping);
    return option ? option.price : 0;
  };

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  
  const calculateTotal = () => {
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    return cartTotal - discount + shipping;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-emerald-200 rounded-3xl p-12 shadow-lg">
            <div className="inline-flex p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full border border-emerald-200 mb-6">
              <ShoppingBag size={64} className="text-emerald-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to add amazing products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 shadow-md"
              >
                <ShoppingBag size={20} />
                Start Shopping
              </Link>
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white border border-emerald-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-emerald-500 hover:shadow-md transition-all shadow-sm"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <Link 
                to="/shop"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors mb-2"
              >
                <ArrowLeft size={20} />
                Continue Shopping
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">
                You have <span className="font-bold text-emerald-600">{cart.length}</span> item{cart.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <button 
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-200 text-gray-700 rounded-xl hover:border-red-500 hover:text-red-600 transition-colors shadow-sm"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-emerald-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-white to-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <ShoppingBag className="text-emerald-600" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Cart Items</h2>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-emerald-100">
                {cart.map((item, index) => (
                  <div key={index} className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 flex items-center justify-center flex-shrink-0">
                        <Leaf className="text-emerald-400" size={28} />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-emerald-600">
                                KES {item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                  KES {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-emerald-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity && updateQuantity(index, Math.max(1, (item.quantity || 1) - 1))}
                                className="p-2 hover:bg-emerald-50 transition-colors"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                <Minus size={18} className="text-gray-600" />
                              </button>
                              <span className="px-4 py-2 text-gray-800 font-medium min-w-[40px] text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity && updateQuantity(index, (item.quantity || 1) + 1)}
                                className="p-2 hover:bg-emerald-50 transition-colors"
                              >
                                <Plus size={18} className="text-gray-600" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Item Total</div>
                            <div className="text-xl font-bold text-emerald-600">
                              KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-gray-700 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all shadow-sm"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-sm">
                {/* Summary Header */}
                <div className="p-6 border-b border-emerald-100">
                  <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
                </div>

                {/* Summary Details */}
                <div className="p-6 space-y-6">
                  {/* Coupon Code */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Coupon Code</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg text-gray-800 focus:outline-none focus:border-emerald-500 text-sm shadow-sm"
                        disabled={couponApplied}
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon || couponApplied}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          couponApplied
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-md hover:shadow-emerald-200'
                        } ${isApplyingCoupon ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isApplyingCoupon ? 'Applying...' : couponApplied ? 'Applied!' : 'Apply'}
                      </button>
                    </div>
                    {couponApplied && (
                      <div className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
                        <CheckCircle size={14} />
                        <span>10% discount applied (APEX10)</span>
                      </div>
                    )}
                  </div>

                  {/* Shipping Options */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedShipping === option.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-emerald-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={selectedShipping === option.id}
                              onChange={(e) => setSelectedShipping(e.target.value)}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                              <div className="font-medium text-gray-800">{option.name}</div>
                              <div className="text-sm text-gray-500">{option.duration}</div>
                            </div>
                          </div>
                          <div className="font-bold text-emerald-600">KES {option.price.toLocaleString()}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="space-y-3 pt-6 border-t border-emerald-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-medium">KES {cartTotal.toLocaleString()}</span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount (10%)</span>
                        <span className="font-medium">-KES {calculateDiscount().toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium">KES {calculateShipping().toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-emerald-100">
                      <span>Total Amount</span>
                      <span>KES {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleMpesaCheckout}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-md text-lg"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Payment Methods */}
                  <div className="text-center pt-4 border-t border-emerald-100">
                    <div className="text-sm text-gray-500 mb-2">We accept</div>
                    <div className="flex justify-center gap-4">
                      <div className="text-lg font-bold text-gray-400">MPESA</div>
                      <div className="text-lg font-bold text-gray-400">VISA</div>
                      <div className="text-lg font-bold text-gray-400">MasterCard</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Package className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Free Returns</div>
                    <div className="text-sm text-gray-500">30-day return policy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Shield className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Secure Payment</div>
                    <div className="text-sm text-gray-500">Your data is protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Truck className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Fast Delivery</div>
                    <div className="text-sm text-gray-500">Across Kenya</div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 mt-0.5" size={18} />
                  <div className="text-sm text-yellow-700">
                    <div className="font-medium mb-1">Important Notice</div>
                    <div>Prices are in Kenyan Shillings (KES). All taxes included. Free shipping on orders over KES 5,000.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;  // Changed from CartPage to Cart