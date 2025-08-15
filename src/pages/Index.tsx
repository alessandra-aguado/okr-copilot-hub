import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import okrPattern from "@/assets/okr-pattern.png";

const Index = () => {
  return (
    <div 
      className="min-h-screen gradient-brand flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url(${okrPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 pointer-events-none" />
      
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 relative z-10">
        <ChatInterface />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
