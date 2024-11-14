function AuthLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row md:py-[60px] py-[40px] lg:py-[90px] xl:[13]">
      {/* Form Section */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-4 md:p-8 order-1 lg:order-1">
        {children}
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[55%] order-2 lg:order-2 flex items-center justify-center">
        <div className="w-full h-full">
          <img
            src="/onboarding.png"
            alt="Auth background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
