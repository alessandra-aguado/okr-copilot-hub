import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SendIcon, UserIcon, BotIcon } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'consultant';
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

interface AnalysisTable {
  headers: string[];
  rows: Array<{
    element: string;
    evaluation: string;
    aligned: string;
    wellWritten: string;
    observation: string;
  }>;
}

const OKRChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const chatFlow = [
    {
      trigger: "crear okr para mi unidad",
      response: {
        content: `¡Perfecto! 😊

Empecemos con lo esencial. Para ayudarte a construir tu OKR, necesito conocer los OKRs de tu unidad superior. ¿Podrías compartirlos en este formato?

**Objetivo (O):**
**KR1:**
**KR2:**
**KR3:**

📌 Recuerda que estos OKRs corresponden a áreas que definen la estrategia global, como Dirección General o Alta Gerencia.`,
        suggestions: [
          "¿Qué son los OKRs y cómo se construyen?",
          "¿Puedes darme un ejemplo de un buen OKR?",
          "¿Cómo me aseguro de que mis OKRs estén alineados con los de mi unidad superior?"
        ]
      }
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsWaitingForResponse(true);

    // Simulate consultant response
    setTimeout(() => {
      const consultantResponse = generateConsultantResponse(message);
      setMessages(prev => [...prev, consultantResponse]);
      setIsWaitingForResponse(false);
    }, 1500);
  };

  const generateConsultantResponse = (userMessage: string): ChatMessage => {
    // Simple flow logic - in real implementation this would be more sophisticated
    if (userMessage.toLowerCase().includes("crear okr para mi unidad")) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'consultant',
        content: `¡Perfecto! 😊

Empecemos con lo esencial. Para ayudarte a construir tu OKR, necesito conocer los OKRs de tu unidad superior. ¿Podrías compartirlos en este formato?

**Objetivo (O):**
**KR1:**
**KR2:**
**KR3:**

📌 Recuerda que estos OKRs corresponden a áreas que definen la estrategia global, como Dirección General o Alta Gerencia.`,
        suggestions: [
          "¿Qué son los OKRs y cómo se construyen?",
          "¿Puedes darme un ejemplo de un buen OKR?",
          "¿Cómo me aseguro de que mis OKRs estén alineados con los de mi unidad superior?"
        ],
        timestamp: new Date()
      };
    }

    if (userMessage.toLowerCase().includes("attach")) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'consultant',
        content: `¡Perfecto! Ya tengo el OKR principal de Attach.

Para ayudarte a construir tus propios OKRs alineados, necesito comprender un poco más del contexto estratégico que dio origen a ese OKR principal.

📌 ¿Podrías compartirme alguno de estos elementos?
• Un resumen ejecutivo de la estrategia anual o semestral
• Notas o acta de reuniones con los líderes
• Principales desafíos organizacionales que buscan resolver con estos OKRs

Con esa información, podré ayudarte a asegurar que tus OKRs estén correctamente alineados a la visión de Attach.`,
        timestamp: new Date()
      };
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      type: 'consultant',
      content: `Gracias por compartir esa información. Déjame ayudarte a continuar con el proceso de construcción de tus OKRs.

¿Podrías proporcionarme más detalles sobre tu unidad y su función dentro de la organización?`,
      suggestions: [
        "Necesito más contexto sobre mi rol",
        "¿Cómo defino un objetivo efectivo?",
        "Quiero ver ejemplos de KRs bien estructurados"
      ],
      timestamp: new Date()
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col h-[600px]">
      {/* Header */}
      <div className="text-center space-y-3 mb-6">
        <h1 className="text-adaptive-title gradient-text tracking-tight">
          OKR Consultant
        </h1>
        <p className="text-adaptive-subtitle text-secondary">
          Te ayudo a construir OKRs estratégicos y alineados
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        {messages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BotIcon className="mx-auto mb-3 h-12 w-12" />
            <p>¡Hola! Soy tu consultor OKR. Escribe "crear okr para mi unidad" para comenzar.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {message.type === 'user' ? <UserIcon size={16} /> : <BotIcon size={16} />}
              </div>
              
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-50 text-gray-900'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs opacity-70 mb-2">Burbujas de texto estilo Copilot:</p>
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="mr-2 mb-2 text-xs h-8 bg-white/10 border-white/20 hover:bg-white/20"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isWaitingForResponse && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              <BotIcon size={16} />
            </div>
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu respuesta aquí..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isWaitingForResponse}
            size="sm"
            className="rounded-full px-4"
          >
            <SendIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OKRChatInterface;