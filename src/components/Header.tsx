import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-3">
            <Target className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-semibold text-primary">
              OKR Consultant
            </h1>
          </div>
          
          {/* Auth Button */}
          <Button 
            variant="outline" 
            className="rounded-full px-6"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;