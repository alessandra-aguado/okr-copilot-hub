import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-card">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            {/* Isotipo space reserved */}
            <div className="w-[32px] h-[32px] bg-gradient-to-r from-[#00D6C4] to-[#0180E7] rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h1 className="logo-text">
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