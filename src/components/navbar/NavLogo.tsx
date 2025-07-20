import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NextfaangLogo from '@/assets/nextfaang-logo.svg?react';

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 cursor-pointer group">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3"
      >
        <NextfaangLogo className="h-10 w-auto" />
      </motion.div>
    </Link>
  );
};