const Footer = () => {
  return (
    <footer className="w-full text-center py-6 px-6">
      <div className="text-sm text-brand-muted space-x-6">
        <a 
          href="#" 
          className="hover:text-brand-secondary transition-smooth"
        >
          Términos de uso
        </a>
        <span>•</span>
        <a 
          href="#" 
          className="hover:text-brand-secondary transition-smooth"
        >
          Política de privacidad
        </a>
      </div>
    </footer>
  );
};

export default Footer;