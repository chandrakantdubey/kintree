import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const subtotal = total;
  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const finalTotal = subtotal + shipping + tax;

  const handleCheckout = () => {
    // Navigate to checkout page or handle checkout logic
    console.log("Proceeding to checkout");
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-purple text-white py-3 rounded-md hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/ecommerce")}
            className="w-full border border-purple text-purple py-3 rounded-md hover:bg-purple hover:text-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        {items.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <div className="text-sm text-gray-600">
              <p>• {items.length} different items</p>
              <p>
                • {items.reduce((sum, item) => sum + item.quantity, 0)} total
                items
              </p>
              <p>• Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
