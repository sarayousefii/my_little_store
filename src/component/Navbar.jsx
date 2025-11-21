import { Disclosure } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import CustomNumeralNumericFormat from "./NumberFormat";
import { useSelector } from 'react-redux';
import { selectAll } from '../slices/cartSlice';

const Navbar = () => {
  const cart = useSelector(selectAll);

  return (
    <Disclosure
      as="nav"
      className="
        fixed top-0 w-full z-50 
        bg-white/60 backdrop-blur-md 
        border-b border-white/40 shadow-lg shadow-black/5
      "
    >
      <div className="px-8">
        <div className="relative flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center gap-3">
            <img alt="Logo" src={logo} className="h-8 w-auto" />
            <span className="text-gray-800 font-semibold text-lg tracking-tight">
              فروشگاه کوچک من
            </span>
          </Link>

          <div className="flex items-center">
            <Link to="/cart" className="relative group">
              <ShoppingCartIcon
                className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition"
              />

              {cart.length > 0 && (
                <div
                  className="
                    absolute -top-2 -right-2 text-xs font-bold
                    bg-black/80 text-white
                    rounded-full px-2 py-1
                    shadow-md shadow-black/30
                    backdrop-blur-sm
                  "
                >
                  <CustomNumeralNumericFormat value={cart.length} />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
