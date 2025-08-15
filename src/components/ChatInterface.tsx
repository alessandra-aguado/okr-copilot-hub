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
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center space-y-8">
      {/* Main Question - Apple Style */}
      <div className="text-center space-y-4">
        <Search className="h-12 w-12 text-primary mx-auto mb-6" />
        <h1 className="text-adaptive-title text-primary tracking-tight">
          ¿Qué OKR deseas trabajar hoy?
        </h1>
        <p className="text-adaptive-subtitle text-secondary">
          Define, alinea y mide.
        </p>
      </div>

      {/* Main Input - Central Focus */}
      <div className="w-full max-w-2xl">
        <div className="card-float shadow-apple">
          <div className="flex items-center p-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted hover:text-primary hover:bg-hover-surface hover-scale"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe tu objetivo o pregunta sobre OKRs..."
              className="flex-1 border-0 bg-transparent text-base lg:text-lg placeholder:text-muted focus-visible:ring-0 focus-visible:ring-offset-0 h-12 focus-apple"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted hover:text-primary hover:bg-hover-surface hover-scale"
            >
              {inputValue ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Suggestions - Below Input */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="card-float cursor-pointer px-4 py-2 text-sm font-medium transition-smooth hover:shadow-hover hover-scale"
            onClick={() => setInputValue(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        <Button 
          variant="outline" 
          className="shadow-apple hover-scale"
          size="lg"
        >
          Crear OKR
        </Button>
        <Button 
          variant="outline" 
          className="shadow-apple hover-scale"
          size="lg"
        >
          Alinear
        </Button>
        <Button 
          variant="outline" 
          className="shadow-apple hover-scale"
          size="lg"
        >
          Revisar
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;