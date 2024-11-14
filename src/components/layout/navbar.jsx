import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUsers, // Foreroom
  FaTree, // Family Tree
  FaDna, // DNA
  FaComments, // Chat
  FaShoppingCart, // Cart
  FaUser, // Profile
  FaCog, // Settings
  FaSignOutAlt, // Logout
} from "react-icons/fa";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showDropdown) setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".profile-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSidebar]);

  const { items } = useSelector((state) => state.cart);
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const NavLinks = () => (
    <div className="flex md:gap-8">
      <Link
        to="/foreroom"
        className="flex flex-row md:flex-col items-center gap-2 md:gap-1 hover:text-purple md:h-[50px] lg:h-[50px]"
      >
        <FaUsers className="w-6 h-6 md:h-[35px] md:w-[35px]" />
        <span className="md:text-sm">Foreroom</span>
      </Link>
      <Link
        to="/family_tree"
        className="flex flex-row md:flex-col items-center gap-2 md:gap-1 hover:text-purple md:h-[50px] lg:h-[50px]"
      >
        <FaTree className="w-6 h-6 md:h-[35px] md:w-[35px]" />
        <span className="md:text-sm">Family Tree</span>
      </Link>
      <Link
        to="/ecommerce"
        className="flex flex-row md:flex-col items-center gap-2 md:gap-1 hover:text-purple md:h-[50px] lg:h-[50px]"
      >
        <FaDna className="w-6 h-6 md:h-[35px] md:w-[35px]" />
        <span className="md:text-sm">DNA</span>
      </Link>
      <Link
        to="/chat"
        className="flex flex-row md:flex-col items-center gap-2 md:gap-1 hover:text-purple md:h-[50px] lg:h-[50px]"
      >
        <FaComments className="w-6 h-6 md:h-[35px] md:w-[35px]" />
        <span className="md:text-sm">Chat</span>
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex gap-6 items-center justify-between h-16 lg:h-[104px]">
          <Link
            to={isAuthenticated ? "/foreroom" : "/"}
            className="text-xl font-semibold"
          >
            <img
              src="/logo.svg"
              alt="logo"
              className="w-16 h-14 lg:w-[70px] lg:h-[56px]"
            />
          </Link>

          {/* Desktop Navigation - Changed to ml-auto for right alignment */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <NavLinks />
            </div>
          )}

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Cart - Always visible */}
                <Link
                  to="/cart"
                  className="hover:text-purple relative flex flex-col items-center gap-1 md:h-[50px] lg:h-[50px]"
                >
                  <FaShoppingCart className="w-6 h-6 md:h-[35px] md:w-[35px]" />
                  <span className="md:text-sm">Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* Profile Section */}
                <div className="profile-dropdown relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="profile"
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = <FaUserCircle size={50} />;
                        }}
                      />
                    ) : (
                      <FaUserCircle size={50} className="text-gray-600" />
                    )}
                    <div className="hidden md:flex items-center gap-1">
                      <span className="font-medium">
                        {user?.name || "User Name"}
                      </span>
                      <FaChevronDown
                        className={`transition-transform duration-200 ${
                          showDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleSidebar}
                  className="md:hidden focus:outline-none"
                >
                  <FaBars size={24} />
                </button>
              </>
            ) : (
              <>
                <Link to="/home" className="hover:underline">
                  Home
                </Link>
                <Link to="/aboutus" className="hover:underline">
                  About us
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg">
            <div className="p-4">
              <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-6 pt-2">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={40} className="text-gray-600" />
                )}
                <span className="font-medium">{user?.name || "User Name"}</span>
              </div>

              {/* Navigation Links - Now properly vertical */}
              <div className="flex flex-col space-y-4">
                <Link
                  to="/foreroom"
                  className="flex items-center gap-3 py-2 hover:text-purple"
                >
                  <FaUsers className="w-6 h-6" />
                  <span>Foreroom</span>
                </Link>
                <Link
                  to="/family_tree"
                  className="flex items-center gap-3 py-2 hover:text-purple"
                >
                  <FaTree className="w-6 h-6" />
                  <span>Family Tree</span>
                </Link>
                <Link
                  to="/ecommerce"
                  className="flex items-center gap-3 py-2 hover:text-purple"
                >
                  <FaDna className="w-6 h-6" />
                  <span>DNA</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center gap-3 py-2 hover:text-purple"
                >
                  <FaComments className="w-6 h-6" />
                  <span>Chat</span>
                </Link>
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 py-2 hover:text-purple"
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 py-2 hover:text-purple"
                  >
                    <FaCog className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Logout clicked");
                      setShowSidebar(false);
                    }}
                    className="flex items-center gap-3 w-full py-2 hover:text-purple"
                  >
                    <FaSignOutAlt className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dropdown */}
      {showDropdown && (
        <div className="container mx-auto">
          <div className="relative">
            <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden md:block border">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  console.log("Logout clicked");
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
