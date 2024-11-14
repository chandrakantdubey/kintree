// LoginFlow.jsx
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../store/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Helmet } from "react-helmet-async";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const forgotSchema = Yup.object().shape({
  contact: Yup.string().required("Contact information is required"),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const resetSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function LoginFlow() {
  const [step, setStep] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderStep = () => {
    switch (step) {
      case "login":
        return <LoginForm onForgotPassword={() => setStep("forgot")} />;
      case "forgot":
        return <ForgotPasswordForm onOtpSent={() => setStep("otp")} />;
      case "otp":
        return <OTPForm onVerified={() => setStep("reset")} />;
      case "reset":
        return <ResetPasswordForm onReset={() => setStep("login")} />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Kintree | Login</title>
      </Helmet>
      <div className="min-h-screen bg-brand flex">
        <div className="w-[45%] flex items-center justify-center">
          {renderStep()}
        </div>
        <div className="w-[55%]">
          <img
            src="/auth-image.jpg"
            alt="Auth background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

const LoginForm = ({ onForgotPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(setAuth({ email: values.email }));
      navigate("/ecommerce");
    },
  });

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded-md placeholder-placeholder"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-2 border rounded-md placeholder-placeholder"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-purple text-sm"
        >
          Forgot Password?
        </button>
        <button
          type="submit"
          className="w-full bg-purple text-white py-2 rounded-md hover:bg-opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// Similar structure for SignupFlow.jsx
function SignupFlow() {
  const [usePhone, setUsePhone] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    contact: usePhone
      ? Yup.string().required("Phone number is required")
      : Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      contact: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(setAuth({ email: values.contact }));
      navigate("/ecommerce");
    },
  });

  return (
    <div className="min-h-screen bg-brand flex">
      <div className="w-[45%] flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {usePhone ? (
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <PhoneInput
                  country={"us"}
                  value={formik.values.contact}
                  onChange={(phone) => formik.setFieldValue("contact", phone)}
                  containerClass="w-full"
                  inputClass="w-full p-2 border rounded-md placeholder-placeholder"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="contact"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact}
                  className="w-full p-2 border rounded-md placeholder-placeholder"
                  placeholder="Enter your email"
                />
              </div>
            )}
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.contact}
              </div>
            )}
            <button
              type="button"
              onClick={() => setUsePhone(!usePhone)}
              className="text-purple text-sm"
            >
              Use {usePhone ? "email" : "phone"} instead
            </button>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full p-2 border rounded-md placeholder-placeholder"
                placeholder="Create password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple text-white py-2 rounded-md hover:bg-opacity-90"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="w-[55%]">
        <img
          src="/auth-image.jpg"
          alt="Auth background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export { LoginFlow, SignupFlow };