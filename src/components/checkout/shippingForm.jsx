import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShippingDetails, setStep } from "../../store/checkoutSlice";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

const phoneRegExp = /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/;

const shippingSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Required")
    .min(5, "Must be at least 5 characters")
    .matches(
      /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/,
      "Must include first and last name",
    ),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required"),
  address: Yup.string().required("Required").min(10, "Address is too short"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipCode: Yup.string()
    .required("Required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
});

function ShippingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Get all countries on component mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      // Get full names instead of codes for better display
      const selectedCountry = Country.getCountryByCode(values.country);
      const selectedState = State.getStateByCodeAndCountry(
        values.state,
        values.country,
      );

      const enrichedValues = {
        ...values,
        countryName: selectedCountry?.name,
        stateName: selectedState?.name,
      };

      dispatch(setShippingDetails(enrichedValues));
      dispatch(setStep(2));
    },
  });

  // Update states when country changes
  useEffect(() => {
    if (formik.values.country) {
      const countryStates = State.getStatesOfCountry(formik.values.country);
      setStates(countryStates);
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
      setCities([]);
    }
  }, [formik.values.country]);

  // Update cities when state changes
  useEffect(() => {
    if (formik.values.state && formik.values.country) {
      const stateCities = City.getCitiesOfState(
        formik.values.country,
        formik.values.state,
      );
      setCities(stateCities);
      formik.setFieldValue("city", "");
    }
  }, [formik.values.state]);

  const getError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-red-500 text-sm mt-1">
        {formik.errors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...formik.getFieldProps("fullName")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
            placeholder="John Smith"
          />
          {getError("fullName")}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...formik.getFieldProps("email")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
            placeholder="john@example.com"
          />
          {getError("email")}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            {...formik.getFieldProps("phone")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
            placeholder="123-456-7890"
          />
          {getError("phone")}
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            {...formik.getFieldProps("address")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
            placeholder="1234 Main St"
          />
          {getError("address")}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            {...formik.getFieldProps("country")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          {getError("country")}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            {...formik.getFieldProps("state")}
            disabled={!formik.values.country}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple disabled:bg-gray-100"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {getError("state")}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select
            {...formik.getFieldProps("city")}
            disabled={!formik.values.state}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple disabled:bg-gray-100"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {getError("city")}
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            {...formik.getFieldProps("zipCode")}
            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-purple"
            placeholder="12345"
          />
          {getError("zipCode")}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="px-6 py-2 border border-purple text-purple rounded-md hover:bg-purple hover:text-white transition-colors"
        >
          Back to Cart
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}

export default ShippingForm;
