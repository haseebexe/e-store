import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { href: "#", label: "Facebook", icon: FaFacebookF },
    { href: "#", label: "X", icon: FaXTwitter },
    { href: "#", label: "Instagram", icon: FaInstagram },
    { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        {/* TOP GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* LOGO + ABOUT */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="https://dummyimage.com/40x40/000/fff&text=E"
                alt="logo"
                className="h-10 w-10 rounded-full"
              />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                E-Store
              </h3>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted partner for quality products. Shop with confidence and
              enjoy seamless delivery experience.
            </p>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">All Products</a></li>
              <li><a href="#" className="hover:text-primary">Categories</a></li>
              <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary">Best Sellers</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Returns</a></li>
              <li><a href="#" className="hover:text-primary">Shipping Info</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 dark:border-slate-800 md:flex-row">
          
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} E-Store. All rights reserved.
          </p>

          <ul className="flex items-center gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition hover:bg-primary hover:text-white"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;