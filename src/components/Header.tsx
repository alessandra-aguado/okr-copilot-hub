import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-[18px] h-[18px] bg-[#0078D4] rounded-full flex items-center justify-center">
              <Target className="h-3 w-3 text-white" />
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