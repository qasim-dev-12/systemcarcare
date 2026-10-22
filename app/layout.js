import "./legacy-chrome.css";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";
import Preamble from "./components/Preamble";
import CarouselEnhancer from "./components/CarouselEnhancer";
import HeroTilt from "./components/HeroTilt";
import ScrollReveal from "./components/ScrollReveal";

export const metadata = {
  metadataBase: new URL("https://systemxcarcare.com"),
  title: "System X Car Care",
  description:
    "An independent workshop in Al Quoz, Dubai Industrial Area, Dubai.",
  icons: {
    icon: [
      { url: "/favicon4dfb.ico", sizes: "48x48" },
      { url: "/wp-content/uploads/2023/10/cropped-FAV-32x32.webp", sizes: "32x32" },
      { url: "/wp-content/uploads/2023/10/cropped-FAV-192x192.webp", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="wp-singular wp-custom-logo wp-embed-responsive wp-theme-astra ehf-footer ehf-template-astra ehf-stylesheet-astra ast-desktop ast-page-builder-template astra-4.13.6 group-blog ast-single-post ast-replace-site-logo-transparent ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-442 elementor-page">
        <link
          rel="stylesheet"
          href="/_next-legacy/static/chunks/02tb7kep6xs21150a.css"
          precedence="next"
        />
        <Preamble />
        <div id="page" className="hfeed site">
          <Header />
          {children}
          <Footer />
        </div>
        <FloatingWidgets />
        <CarouselEnhancer />
        <HeroTilt />
        <ScrollReveal />
      </body>
    </html>
  );
}
