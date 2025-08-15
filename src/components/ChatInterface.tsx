import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, Send, Search } from "lucide-react";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "Crear OKR para mi unidad",
    "Alinear objetivos del equipo", 
    "Revisar progreso actual"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center space-y-8">
      {/* Main Question - Apple Style */}
      <div className="text-center space-y-3">
        <Search className="h-8 w-8 text-primary mx-auto mb-4" />
        <h1 className="text-adaptive-title text-primary tracking-tight">
          ¿Qué OKR deseas trabajar hoy?
        </h1>
        <p className="text-adaptive-subtitle text-secondary">
          Define, alinea y mide.
        </p>
      </div>

      {/* Main Input - Central Focus with Apple-style shadow */}
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-apple-input">
          <div className="flex items-center p-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-muted hover:text-primary hover:bg-hover-surface hover-scale"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe tu objetivo o pregunta sobre OKRs..."
              className="flex-1 border-0 bg-transparent text-sm lg:text-base placeholder:text-placeholder focus-visible:ring-0 focus-visible:ring-offset-0 h-10 focus-apple"
              style={{ 
                color: '#1C1C1E',
                fontSize: '16px'
              }}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 text-muted hover:text-primary hover:bg-hover-surface hover-scale"
            >
              {inputValue ? <Send className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Suggestions - Below Input */}
      <div className="botonera-okr">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="botonera-okr-button"
            onClick={() => setInputValue(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

    </div>
  );
};

export default ChatInterface;