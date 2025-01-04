import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LuLayers } from "react-icons/lu";
import { IoLogoAndroid } from "react-icons/io";
import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function HomePage() {
  const gradientRef = useRef();
  const headerRef = useRef();
  const contentRef = useRef();
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

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    tl.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      clearProps: "all",
    }).from(
      gradientRef.current,
      {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        clearProps: "all",
      },
      "-=0.5"
    );

    // Mouse follow effect
    let mouseTimeout;
    const handleMouseMove = (e) => {
      if (mouseTimeout) {
        window.cancelAnimationFrame(mouseTimeout);
      }

      mouseTimeout = window.requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        gsap.to(gradientRef.current, {
          x: clientX - window.innerWidth / 2,
          y: clientY - window.innerHeight / 2,
          duration: 2,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) {
        window.cancelAnimationFrame(mouseTimeout);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D1117] text-white overflow-hidden">
      {/* Gradient Background */}
      <div
        ref={gradientRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, purple, orange, green, blue)",
        }}
      />

      {/* Navbar */}
      <nav
        ref={headerRef}
        className="relative z-10 px-6 md:px-12 py-6 flex items-center justify-between backdrop-blur-sm border-b border-gray-800/50"
      >
        <a
          href="/"
          className="text-2xl font-bold mb-4 md:mb-0 flex items-center gap-2"
        >
          <LuLayers />
          AnkiEditor
        </a>

        <div className="hidden space-y-4 md:space-y-0 md:space-x-8 md:flex flex-col md:flex-row items-center">
          <a href="/features" className="hover:text-blue-400 transition-colors">
            Features
          </a>
          <a href="/docs" className="hover:text-blue-400 transition-colors">
            Docs
          </a>
          <a
            href="/docs"
            className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
        </div>

        <IoMdMenu
          onClick={() => setIsMobileShowMenu(!isMobileShowMenu)}
          className="block text-2xl hover:scale-125 duration-150 md:hidden"
        />
      </nav>

      {/* Mobile Menu */}
      {isMobileShowMenu && (
        <div className="w-60 duration-75 ease-in-out rounded-3xl -mr-5 flex flex-col items-end pr-20 py-20 ml-20 bg-zinc-900 h-screen fixed top-0 right-0 bg-black/50 backdrop-blur-sm z-50">
          <IoMdMenu
            onClick={() => setIsMobileShowMenu(!isMobileShowMenu)}
            className="block mb-10 text-center text-5xl hover:scale-125 duration-150 md:hidden"
          />
          <div className="flex flex-col items-center justify-center gap-5">
            <a
              href="/features"
              className="hover:text-blue-400 text-2xl transition-colors"
            >
              Features
            </a>
            <a
              href="/docs"
              className="hover:text-blue-400 text-2xl transition-colors"
            >
              Docs
            </a>
            <a
              href="/docs"
              className="hover:text-blue-400 text-2xl transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12"
      >
        <h1 className="text-5xl md:text-8xl font-bold text-center mb-6 leading-tight">
          The ANKI Code Editor
        </h1>

        <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-12 font-mono">
          Built to make you extraordinarily productive,
          <br />
          AnkiEditor is the best way to code on Mobile.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <a
            href="./ankieditor.apk"
            download="AnkiEditor.apk"
            className="group bg-white/10 backdrop-blur px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/20"
          >
            <IoLogoAndroid className="text-2xl" />
            DOWNLOAD FOR ANDROID
          </a>

          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=X7RVmRd09zk"
            className="group px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            WATCH DEMO
          </a>
        </div>

        {/* Code Editor Preview */}
        <div className="mt-16 w-full max-w-6xl mx-auto rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-black/30 backdrop-blur p-2 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Tab Menu */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {Object.entries(previewData).map(([key, { icon, title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    ${
                      activeTab === key
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {icon}
                  <span className="text-sm hidden md:block">{title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl p-4 md:p-8">
            <div className="h-[200px] md:h-[700px] w-full">
              <img
                src={previewData[activeTab].image}
                alt={`${previewData[activeTab].title} Preview`}
                className="w-full object-cover rounded-md transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <p>
          Anki Code is best code editor for mobile which gives you free
          subdomain and hosting free code editor
        </p>
      </main>
    </div>
  );
}

export default HomePage;
