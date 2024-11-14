import { useSelector } from "react-redux";
import CheckoutSteps from "../components/checkout/checkoutSteps";
import ShippingForm from "../components/checkout/shippingForm";
import PaymentForm from "../components/checkout/paymentForm";
import OrderConfirmation from "../components/checkout/orderConfirmation";

function Checkout() {
  const { step } = useSelector((state) => state.checkout);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShippingForm />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <OrderConfirmation />;
      default:
        return <ShippingForm />;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 print-hidden">Checkout</h1>
        <CheckoutSteps />
        {renderStep()}
      </div>
    </div>
  );
}

export default Checkout;
