import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

const FloatingImage = ({ src, alt, width, height, className }) => {
  const [direction, ] = useState({
    vertical: Math.random() > 0.5 ? 1 : -1,
    horizontal: Math.random() > 0.5 ? 1 : -1,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      const newX =
        (clientX / window.innerWidth - 0.5) * 20 * direction.horizontal;
      const newY =
        (clientY / window.innerHeight - 0.5) * 20 * direction.vertical;

      x.set(newX);
      y.set(newY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [direction.horizontal, direction.vertical, x, y]);

  return (
    <motion.div
      style={{ x, y }}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.div>
  );
};

export default FloatingImage;
