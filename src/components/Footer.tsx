const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <p className="text-sm text-secondary">
            © 2024 OKR Consultant. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <a 
              href="/terms" 
              className="text-sm text-secondary hover:text-primary transition-colors underline underline-offset-4"
            >
              Términos de uso
            </a>
            <a 
              href="/privacy" 
              className="text-sm text-secondary hover:text-primary transition-colors underline underline-offset-4"
            >
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;