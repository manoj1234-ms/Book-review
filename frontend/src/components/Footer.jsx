import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/praveen-89",
      label: "GitHub"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/praveen-gupta-6757a928b",
      label: "LinkedIn"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:praveen.strange0@gmail.com",
      label: "Email"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Praveen Gupta
            </h3>
            <p className="text-background/70 leading-relaxed">
              AI & Full-Stack Developer passionate about creating innovative tech solutions. 
              Let's build something amazing together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-background/70 hover:text-accent transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 mb-4">
              <p className="text-background/70 text-sm">praveen.strange0@gmail.com</p>
              <p className="text-background/70 text-sm">+91 8924928266</p>
              <p className="text-background/70 text-sm">Haridwar, Uttarakhand</p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-accent transition-smooth"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/70 text-sm">
              © {currentYear} Praveen Gupta. All rights reserved.
            </p>
            <p className="text-background/70 text-sm flex items-center">
              Made with <Heart size={16} className="mx-1 text-accent" /> and lots of coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;