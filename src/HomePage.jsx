import { useState } from "react";
import { motion } from "framer-motion";
import { LuLayers } from "react-icons/lu";
import { IoLogoAndroid } from "react-icons/io";
import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import CustomCursor from "./CustomCursor";

function HomePage() {
  const [activeTab, setActiveTab] = useState("html");
  const [isMobileShowMenu, setIsMobileShowMenu] = useState(false);

  const previewData = {
    html: {
      icon: <FaHtml5 className="text-[#E44D26] text-2xl" />,
      title: "HTML",
      image: "./html.jpg",
    },
    css: {
      icon: <FaCss3Alt className="text-[#264DE4] text-2xl" />,
      title: "CSS",
      image: "./css.jpg",
    },
    js: {
      icon: <FaJs className="text-[#F7DF1E] text-2xl" />,
      title: "JavaScript",
      image: "./js.jpg",
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0D1117] text-white overflow-hidden">
      {/* Fixed Gradient Background */}
      <CustomCursor />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30 blur-[120px] z-[-1]"
        style={{
          background:
            "radial-gradient(circle at center, purple, orange, green, blue)",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center px-6 py-6 border-b md:justify-between md:px-12 border-gray-800/50 backdrop-blur-sm"
      >
        <a
          href="/"
          className="flex items-center gap-2 mb-4 text-2xl font-bold text-center md:mb-0"
        >
          <LuLayers />
          AnkiEditor
        </a>

        <div className="hidden md:flex md:flex-row md:space-x-8">
          <a href="/features" className="transition-colors hover:text-blue-400">
            Features
          </a>
          <a href="/docs" className="transition-colors hover:text-blue-400">
            Docs
          </a>
          <a
            href="/get-started"
            className="px-6 py-2 transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>

        <IoMdMenu
          onClick={() => setIsMobileShowMenu(!isMobileShowMenu)}
          className="fixed top-0 right-0 block text-2xl m-7 md:hidden"
        />
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileShowMenu && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 z-50 flex flex-col items-center w-64 h-full p-8 bg-zinc-900/90 backdrop-blur-lg"
        >
          <IoMdMenu
            onClick={() => setIsMobileShowMenu(false)}
            className="absolute text-3xl cursor-pointer top-4 right-4"
          />
          <div className="flex flex-col gap-6 mt-10">
            <a href="/features" className="text-xl hover:text-blue-400">
              Features
            </a>
            <a href="/docs" className="text-xl hover:text-blue-400">
              Docs
            </a>
            <a href="/get-started" className="text-xl hover:text-blue-400">
              Get Started
            </a>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 text-5xl font-bold text-center md:text-8xl"
        >
          The ANKI Code Editor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-12 font-mono text-lg text-center text-gray-400 md:text-xl"
        >
          Built to make you extraordinarily productive, AnkiEditor is the best
          way to code on Mobile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 md:flex-row"
        >
          <a
            href="./ankieditor.apk"
            download="AnkiEditor.apk"
            className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg bg-white/10 hover:bg-white/20"
          >
            <IoLogoAndroid className="text-2xl" />
            DOWNLOAD FOR ANDROID
          </a>
          <a
            href="https://www.youtube.com/watch?v=X7RVmRd09zk"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg hover:bg-white/10"
          >
            WATCH DEMO
          </a>
        </motion.div>

        {/* Code Editor Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto mt-16 overflow-hidden border border-gray-800 rounded-lg"
        >
          <div className="flex items-center justify-between p-2 bg-black/30 backdrop-blur">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            {/* Tab Menu */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {Object.entries(previewData).map(([key, { icon, title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === key
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {icon}
                  <span className="hidden text-sm md:block">{title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-black/20 backdrop-blur-xl md:p-8">
            <motion.img
              key={activeTab}
              src={previewData[activeTab].image}
              alt={`${previewData[activeTab].title} Preview`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="object-cover w-full rounded-md"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl my-12 font-mono text-lg text-center text-gray-400 md:text-xl"
        >
          Anki Code is an excellent mobile code editor that stands out for its
          unique features. It provides users with a free subdomain and hosting,
          making it an ideal choice for developers who want to code and deploy
          projects directly from their mobile devices without incurring
          additional costs.
        </motion.p>
      </main>
    </div>
  );
}

export default HomePage;
