import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../../store/checkoutSlice";
import { clearCart } from "../../store/cartSlice";

function OrderConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingDetails, paymentDetails } = useSelector(
    (state) => state.checkout,
  );
  const { items, total } = useSelector((state) => state.cart);

  // Generate order number
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
  const estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString();

  // Clear cart and checkout data when navigating away
  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
      dispatch(clearCart());
    };
  }, [dispatch]);

  const handleContinueShopping = () => {
    navigate("/ecommerce");
  };

  const subtotal = total;
  const shipping = 10;
  const tax = total * 0.1;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Order Success Header */}
      <div className="text-center mb-8 receipt-header">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">
          Thank you for your purchase. We'll send you a confirmation email
          shortly.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 order-details">
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Order Number</h3>
              <p className="text-gray-600">{orderNumber}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold">Estimated Delivery</h3>
              <p className="text-gray-600">{estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6 order-items">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div className="text-sm text-gray-600">
              <p>{shippingDetails.fullName}</p>
              <p>{shippingDetails.address}</p>
              <p>
                {shippingDetails.city}, {shippingDetails.stateName}
              </p>
              <p>
                {shippingDetails.countryName} {shippingDetails.zipCode}
              </p>
              <p>{shippingDetails.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <img
                  src={`/card-icons/${paymentDetails.cardType}.svg`}
                  alt={paymentDetails.cardType}
                  className="h-6"
                />
                <span>
                  {paymentDetails.cardType.charAt(0).toUpperCase() +
                    paymentDetails.cardType.slice(1)}{" "}
                  ending in
                  {paymentDetails.cardNumber.slice(-4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="font-semibold mb-4">What's Next?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">Order Confirmation Email</h4>
              <p className="text-sm text-gray-600">
                You'll receive an email at {shippingDetails.email} with your
                order confirmation and receipt.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">Shipping Updates</h4>
              <p className="text-sm text-gray-600">
                We'll notify you when your order ships and provide tracking
                information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 print-hidden">
        <button
          onClick={handleContinueShopping}
          className="px-6 py-2 bg-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 border border-purple text-purple rounded-md hover:bg-purple hover:text-white transition-colors print-hidden"
        >
          Print Receipt
        </button>
      </div>

      {/* Add a receipt footer */}
      <div className="receipt-footer print-my-4">
        <p>Thank you for your purchase!</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
