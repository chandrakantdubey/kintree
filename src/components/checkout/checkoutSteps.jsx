import { useSelector } from "react-redux";

function CheckoutSteps() {
  const { step } = useSelector((state) => state.checkout);

  const steps = [
    { number: 1, title: "Shipping" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Confirmation" },
  ];

  return (
    <div className="mb-8 print-hidden">
      <div className="flex justify-between">
        {steps.map((s) => (
          <div
            key={s.number}
            className={`flex-1 text-center relative ${
              step >= s.number ? "text-purple" : "text-gray-400"
            }`}
          >
            <div className="flex items-center justify-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= s.number
                    ? "border-purple bg-purple text-white"
                    : "border-gray-300"
                }`}
              >
                {s.number}
              </div>
            </div>
            <div className="mt-2 text-sm font-medium">{s.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutSteps;
