import { Button } from "@/components/ui/button";
const Header = () => {
  return <header className="w-full flex justify-between items-center p-6 lg:px-12">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="font-bold text-lg text-slate-950">O</span>
        </div>
        <h1 className="font-semibold text-xl tracking-tight text-slate-800">
          OKR Consultant
        </h1>
      </div>
      
      <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 transition-smooth rounded-full px-6 text-slate-950">
        Iniciar sesión
      </Button>
    </header>;
};
export default Header;