import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useNavItems } from "@/router/nav";
import LoginPage from "@/pages/login-page";
import AppLayout from "@/layouts/app";
import { AnimatePresence, motion } from "framer-motion";

const Router = () => {
  const location = useLocation();
  const navItems = useNavItems();
  const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<LoginPage />} />

        {navItems.map((item) =>
          item.protected ? (
            <Route
              key={item.href}
              path={item.href}
              element={
                <AppLayout>
                  <motion.div
                    variants={pageTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="h-[93vh] w-full overflow-y-scroll"
                  >
                    <item.component />
                    <Toaster />
                  </motion.div>
                </AppLayout>
              }
            />
          ) : (
            <Route
              key={item.href}
              path={item.href}
              element={<item.component />}
            />
          )
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
