import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const loc = useLocation();
  return (
    <motion.div
      key={loc.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
