import CartItems from "../components/cart/cartItems";
import CartSummary from "../components/cart/cartSummary";

function Cart() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartItems />
        </div>
        <div className="sticky lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

export default Cart;
