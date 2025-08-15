import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, Send } from "lucide-react";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "Crear OKR trimestral",
    "Alinear objetivos del equipo",
    "Revisar progreso actual",
    "Definir métricas clave"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center space-y-8">
      {/* Main Question */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-6">
          ¿Qué OKR deseas trabajar hoy?
        </h2>
        
        {/* Quick Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white hover:bg-hover-surface text-brand-secondary cursor-pointer transition-smooth px-4 py-2 rounded-full border border-border-light shadow-subtle"
              onClick={() => setInputValue(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Input */}
      <div className="w-full max-w-2xl relative">
        <div className="relative bg-white rounded-full shadow-neumorphic hover:shadow-neumorphic-hover transition-smooth">
          <div className="flex items-center p-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-12 w-12 text-brand-muted hover:text-brand-secondary hover:bg-hover-surface"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe tu objetivo o pregunta sobre OKRs..."
              className="flex-1 border-0 bg-transparent text-base lg:text-lg placeholder:text-brand-muted focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-12 w-12 text-brand-muted hover:text-brand-secondary hover:bg-hover-surface"
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