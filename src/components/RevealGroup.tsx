"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Children } from "react";

export default function RevealGroup({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8">
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
