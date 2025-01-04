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
        className="relative z-10 flex items-center justify-center px-6 py-6 border-b md:px-12 md:ustify-between backdrop-blur-sm border-gray-800/50"
      >
        <a
          href="/"
          className="flex items-center gap-2 mb-4 text-2xl font-bold text-center md:mb-0"
        >
          <LuLayers />
          AnkiEditor
        </a>

        <div className="flex-col items-center hidden space-y-4 md:space-y-0 md:space-x-8 md:flex md:flex-row">
          <a href="/features" className="transition-colors hover:text-blue-400">
            Features
          </a>
          <a href="/docs" className="transition-colors hover:text-blue-400">
            Docs
          </a>
          <a
            href="/docs"
            className="px-6 py-2 transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>

        <IoMdMenu
          onClick={() => setIsMobileShowMenu(!isMobileShowMenu)}
          className="fixed top-0 right-0 block text-2xl duration-150 m-7 hover:scale-125 md:hidden"
        />
      </nav>

      {/* Mobile Menu */}
      {isMobileShowMenu && (
        <div className="fixed top-0 right-0 z-50 flex flex-col items-end h-screen py-20 pr-20 ml-20 -mr-5 duration-75 ease-in-out w-60 rounded-3xl bg-zinc-900 bg-black/50 backdrop-blur-sm">
          <IoMdMenu
            onClick={() => setIsMobileShowMenu(!isMobileShowMenu)}
            className="absolute top-0 left-0 block text-2xl duration-150 m-7 hover:scale-125 md:hidden"
          />
          <div className="flex flex-col items-start justify-center gap-7">
            <a
              href="/features"
              className="text-2xl transition-colors border-b-2 hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="/docs"
              className="text-2xl transition-colors border-b-2 hover:text-blue-400"
            >
              Docs
            </a>
            <a
              href="/docs"
              className="text-2xl transition-colors border-b-2 hover:text-blue-400"
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
        <h1 className="mb-6 text-5xl font-bold leading-tight text-center md:text-8xl">
          The ANKI Code Editor
        </h1>

        <p className="max-w-2xl mb-12 font-mono text-lg text-center text-gray-400 md:text-xl">
          Built to make you extraordinarily productive,
          <br />
          AnkiEditor is the best way to code on Mobile.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <a
            href="./ankieditor.apk"
            download="AnkiEditor.apk"
            className="flex items-center gap-2 px-6 py-3 transition-colors border rounded-lg group bg-white/10 backdrop-blur hover:bg-white/20 border-white/20"
          >
            <IoLogoAndroid className="text-2xl" />
            DOWNLOAD FOR ANDROID
          </a>

          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=X7RVmRd09zk"
            className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg group hover:bg-white/10"
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
        <div className="w-full max-w-6xl mx-auto mt-16 overflow-hidden border border-gray-800 rounded-lg">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    ${
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
            <div className="h-[200px] md:h-[700px] w-full">
              <img
                src={previewData[activeTab].image}
                alt={`${previewData[activeTab].title} Preview`}
                className="object-cover w-full transition-opacity duration-300 rounded-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <p className="max-w-2xl mb-12 font-mono text-lg text-center text-gray-400 md:text-xl">
          Anki Code is an excellent mobile code editor that stands out for its
          unique features. It provides users with a free subdomain and hosting,
          making it an ideal choice for developers who want to code and deploy
          projects directly from their mobile devices without incurring
          additional costs. This combination of convenience and functionality
          makes Anki Code one of the best code editors for mobile users.
        </p>
      </main>
    </div>
  );
}

export default HomePage;
