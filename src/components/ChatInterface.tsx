import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MicrophoneIcon, SendIconWithBackground } from "@/components/icons/CustomIcons";

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "Crear OKR para mi unidad",
    "Alinear objetivos del equipo", 
    "Revisar progreso actual"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center space-y-6">
      {/* Main Question - Apple Style */}
      <div className="text-center space-y-3">
        <h1 className="text-adaptive-title gradient-text tracking-tight">
          ¿Qué OKR deseas trabajar hoy?
        </h1>
        <p className="text-adaptive-subtitle text-secondary" style={{ 
          color: '#999999', 
          fontSize: '16px',
          marginTop: '8px' 
        }}>
          Define, alinea y mide.
        </p>
      </div>

      {/* Main Input - Central Focus with Apple-style shadow */}
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-soft border border-transparent bg-gradient-to-r from-[#00D6C4] to-[#0180E7] p-[1px]">
          <div className="bg-white rounded-2xl">
            <div className="flex items-center p-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 hover:bg-hover-surface hover-scale flex items-center justify-center"
                style={{ color: '#999999' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}
              >
                <PlusIcon size={20} />
              </Button>
              
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe tu objetivo o pregunta sobre OKRs..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 focus-apple"
                style={{ 
                  color: '#1C1C1E',
                  fontSize: '14px',
                  fontFamily: 'Open Sans',
                  fontWeight: '400'
                }}
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 hover:bg-hover-surface hover-scale flex items-center justify-center"
                style={{ color: '#999999' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}
              >
                {inputValue ? <SendIconWithBackground size={32} /> : <MicrophoneIcon size={20} />}
              </Button>
            </div>
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