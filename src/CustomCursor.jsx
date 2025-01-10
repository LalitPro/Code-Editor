import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const style = {
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "400px",
    borderRadius: "50% 22% 40% 80%",
    filter: " blur(100px)",
    background: "linear-gradient(#43d9ad, #4d5bce)",
    opacity: 0.4,
    zIndex: 2,
  };

  const variants = {
    default: {
      x: mousePosition.x - 200,
      y: mousePosition.y - 200,
    },
  };

  const animate = {
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
  };

  return (
    <motion.div
      className={`fixed top-10 left-10`}
      style={style}
      variants={variants}
      //tried setting animate={animate} but didn't work
      animate="default"
      transition={{
        duration: 0.1,
        ease: "linear",
        repeat: 0,
        type: "spring",
        stiffness: 80,
      }}
    ></motion.div>
  );
};

export default CustomCursor;
