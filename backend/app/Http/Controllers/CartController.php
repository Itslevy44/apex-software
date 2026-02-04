<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display the user's cart.
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $items = CartItem::where('cart_id', $cart->id)->with('product')->get();

            return response()->json([
                'success' => true,
                'data' => $items
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add a product to the cart.
     */
    public function add(Request $request, $productId)
    {
        try {
            $user = Auth::user();
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $product = Product::findOrFail($productId);

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->first();

            if ($cartItem) {
                $cartItem->increment('quantity', $request->quantity ?? 1);
            } else {
                $cartItem = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $productId,
                    'quantity' => $request->quantity ?? 1
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Product added to cart',
                'data' => $cartItem->load('product')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add to cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cart item quantity.
     */
    public function updateQuantity(Request $request, $productId)
    {
        try {
            $user = Auth::user();
            $cart = Cart::where('user_id', $user->id)->firstOrFail();

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->firstOrFail();

            if ($request->quantity <= 0) {
                $cartItem->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Item removed from cart'
                ]);
            }

            $cartItem->update(['quantity' => $request->quantity]);

            return response()->json([
                'success' => true,
                'message' => 'Cart updated',
                'data' => $cartItem->load('product')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove a product from the cart.
     */
    public function remove($productId)
    {
        try {
            $user = Auth::user();
            $cart = Cart::where('user_id', $user->id)->firstOrFail();

            CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item removed from cart'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove from cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clear the cart.
     */
    public function clear()
    {
        try {
            $user = Auth::user();
            $cart = Cart::where('user_id', $user->id)->first();

            if ($cart) {
                CartItem::where('cart_id', $cart->id)->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'Cart cleared'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
