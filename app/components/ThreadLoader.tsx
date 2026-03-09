"use client";

import { motion } from "framer-motion";

export default function ThreadLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      <div className="flex flex-col items-center gap-6">

        <motion.div
          className="h-[2px] bg-white"
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white tracking-widest text-sm"
        >
          WEAVING THE STORE...
        </motion.p>

      </div>

    </div>
  );
}