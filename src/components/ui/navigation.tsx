import { ArrowUp } from "lucide-react";
import { personalInfo, navLinks, sectionVisibility, navSocialLinks } from "@/data/portfolio";
import { useState, useMemo, useCallback, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";

// TK Logo SVG Component
export const TKLogo = memo(({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 512 256"
    className={className}
  >
    <path fill="currentColor" d="M0 0h192v64H0V0Z" />
    <path fill="currentColor" d="M64 64h64v192H64V64Z" />
    <path fill="currentColor" d="M256 0h64v256h-64V0Z" />
    <path fill="currentColor" d="M320 64h64V0h64v128h-64V64h-64Z" />
    <path fill="currentColor" d="M320 128h64v64h64v64h-64v-64h-64v-64Z" />
  </svg>
));

TKLogo.displayName = "TKLogo";

// Two-line Hamburger Icon Component
const MenuIcon = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 md:hidden"
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-1" : ""
        }`}
    />
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-1" : ""
        }`}
    />
  </button>
));

MenuIcon.displayName = "MenuIcon";
interface HeaderProps {
  isScrolled: boolean;
}

export const Header = ({ isScrolled }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Filter nav links based on section visibility
  const visibleNavLinks = useMemo(() => {
    return navLinks.filter(link => {
      const path = link.href.replace("/", "");
      const sectionId = path === "" ? "hero" : path;
      return sectionVisibility[sectionId as keyof typeof sectionVisibility] !== false;
    });
  }, []);

  const isLinkActive = useCallback((link: typeof navLinks[0]) => {
    if (link.href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(link.href);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Social items for footer - use navSocialLinks from unified contactLinks
  const socialItems = useMemo(() =>
    navSocialLinks.map(link => ({ label: link.label, link: link.href }))
    , []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
        {/* Floating pill container - Oska style */}
        <div className={`max-w-4xl mx-auto transition-all duration-300 ${isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border border-border"
          : "bg-card/80 backdrop-blur-sm border border-border/50"
          } rounded-full px-2 py-2`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-primary hover:opacity-80 transition-opacity pl-4" aria-label="Talha Kashif Hassan - Home">
              <TKLogo className="h-6 w-auto" />
            </Link>

            {/* Desktop Nav - Center */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleNavLinks.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <a
                href={`mailto:${personalInfo.email}?subject=Project%20Inquiry`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                Contact Me
              </a>
            </div>

            {/* Mobile: Two-line Menu Button */}
            <div className="md:hidden mr-2 text-foreground">
              <MenuIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Fullscreen Overlay with Staggered Animation */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Background overlay */}
        <div
          className={`absolute inset-0 bg-background transition-transform duration-500 ease-out origin-right ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        />

        {/* Close button */}
        <button
          className={`absolute top-6 right-6 p-3 text-foreground hover:text-primary transition-all z-10 ${isMobileMenuOpen ? "opacity-100 delay-300" : "opacity-0"
            }`}
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rotate-45 -translate-y-1/2" />
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current -rotate-45 -translate-y-1/2" />
          </div>
        </button>

        {/* Menu Content - with safe area insets for notched devices */}
        <nav
          className="relative z-10 flex flex-col justify-center h-full px-8 py-20"
          style={{
            paddingTop: 'max(5rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(5rem, env(safe-area-inset-bottom, 0px))',
            paddingLeft: 'max(2rem, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(2rem, env(safe-area-inset-right, 0px))'
          }}
        >
          {/* Navigation Links with Stagger Animation */}
          <div className="space-y-2">
            {visibleNavLinks.map((link, index) => {
              const isActive = isLinkActive(link);
              return (
                <div
                  key={link.label}
                  className={`overflow-hidden transition-all duration-500 ${isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${150 + index * 75}ms` : "0ms"
                  }}
                >
                  <Link
                    to={link.href}
                    className={`block text-4xl sm:text-5xl font-bold tracking-tight py-2 transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="inline-block">
                      {link.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Contact Button */}
          <div
            className={`mt-10 transition-all duration-500 ${isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${150 + visibleNavLinks.length * 75}ms` : "0ms"
            }}
          >
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium"
              onClick={closeMobileMenu}
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          {socialItems.length > 0 ? (
            <div
              className={`mt-auto pt-8 transition-all duration-500 ${isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${200 + visibleNavLinks.length * 75}ms` : "0ms"
              }}
            >
              <p className="text-sm text-primary font-medium uppercase tracking-wide mb-3">
                Socials
              </p>
              <div className="flex gap-6">
                {socialItems.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors text-lg font-medium"
                    onClick={closeMobileMenu}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </>
  );
};

// Scroll to Top Button
export const ScrollToTop = memo(({ visible, onClick }: { visible: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    aria-label="Scroll to top"
  >
    <ArrowUp className="w-5 h-5" />
  </button>
));

ScrollToTop.displayName = "ScrollToTop";
