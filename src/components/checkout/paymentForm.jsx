import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails, setStep } from "../../store/checkoutSlice";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import {
  formatCardNumber,
  formatExpiryDate,
  getCardType,
} from "../../utils/cardValidation";

const paymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Required")
    .min(15, "Invalid card number")
    .max(19, "Invalid card number"),
  cardName: Yup.string()
    .required("Required")
    .min(5, "Enter full name as shown on card"),
  expiry: Yup.string()
    .required("Required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date")
    .test("expiry", "Card has expired", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }),
  cvv: Yup.string()
    .required("Required")
    .matches(/^\d{3,4}$/, "Invalid CVV"),
});

function PaymentForm() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const { shippingDetails } = useSelector((state) => state.checkout);
  const [cardType, setCardType] = useState("");

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      dispatch(setPaymentDetails({ ...values, cardType }));
      dispatch(setStep(3));
    },
  });

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCardNumber(value);
    formik.setFieldValue("cardNumber", formattedValue);
    setCardType(getCardType(value));
  };

  const handleExpiryChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatExpiryDate(value);
    formik.setFieldValue("expiry", formattedValue);
  };

  const getError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-red-500 text-sm mt-1">
        {formik.errors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment Form */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formik.values.cardNumber}
                onChange={handleCardNumberChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple pr-12"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              {cardType && (
                <div className="absolute right-3 top-2.5">
                  <img
                    src={`/card-icons/${cardType}.svg`}
                    alt={cardType}
                    className="h-6"
                  />
                </div>
              )}
            </div>
            {getError("cardNumber")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Name on Card
            </label>
            <input
              type="text"
              {...formik.getFieldProps("cardName")}
              className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
              placeholder="John Smith"
            />
            {getError("cardName")}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={formik.values.expiry}
                onChange={handleExpiryChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
                placeholder="MM/YY"
                maxLength="5"
              />
              {getError("expiry")}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                {...formik.getFieldProps("cvv")}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
                placeholder="123"
                maxLength="4"
              />
              {getError("cvv")}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => dispatch(setStep(1))}
              className="px-6 py-2 border border-purple text-purple rounded-md hover:bg-purple hover:text-white transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Complete Order
            </button>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${(total + 10 + total * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
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
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
