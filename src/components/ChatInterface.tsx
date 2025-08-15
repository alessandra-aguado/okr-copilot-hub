import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, Send, Search } from "lucide-react";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "Crear OKR trimestral",
    "Alinear objetivos del equipo", 
    "Revisar progreso actual"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center space-4">
      {/* Main Question */}
      <div className="text-center space-y-6 mb-8">
        <div className="space-y-2">
          <Search className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            ¿Qué OKR deseas trabajar hoy?
          </h2>
          <p className="text-lg text-secondary">
            Define, alinea y mide.
          </p>
        </div>
        
        {/* Quick Suggestions */}
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="card-float cursor-pointer px-4 py-2 text-sm font-medium transition-smooth hover:shadow-hover"
              onClick={() => setInputValue(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Input */}
      <div className="w-full max-w-2xl">
        <div className="card-float">
          <div className="flex items-center p-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted hover:text-primary hover:bg-hover-surface"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe tu objetivo o pregunta sobre OKRs..."
              className="flex-1 border-0 bg-transparent text-base lg:text-lg placeholder:text-muted focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted hover:text-primary hover:bg-hover-surface"
            >
              {inputValue ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;