import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, BotIcon } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'consultant';
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

const OKRChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Complete conversation flow based on the provided conversation
  const conversationFlow = [
    {
      userInput: "crear okr para mi unidad",
      consultantResponse: {
        content: `¡Perfecto! 😊

Empecemos con lo esencial. Para ayudarte a construir tu OKR, necesito conocer los OKRs de tu unidad superior. ¿Podrías compartirlos en este formato?

Objetivo (O): 
KR1:
KR2: 
KR3:

📌 Recuerda que estos OKRs corresponden a áreas que definen la estrategia global, como Dirección General o Alta Gerencia.`,
        suggestions: [
          "¿Qué son los OKRs y cómo se construyen?",
          "¿Puedes darme un ejemplo de un buen OKR?",
          "¿Cómo me aseguro de que mis OKRs estén alineados con los de mi unidad superior?"
        ]
      }
    },
    {
      userInput: "attach",
      consultantResponse: {
        content: `¡Perfecto! Ya tengo el OKR principal de Attach.

Para ayudarte a construir tus propios OKRs alineados, necesito comprender un poco más del contexto estratégico que dio origen a ese OKR principal.

📌 ¿Podrías compartirme alguno de estos elementos?
• Un resumen ejecutivo de la estrategia anual o semestral
• Notas o acta de reuniones con los lideras.
• Principales desafíos organizacionales que buscan resolver con estos OKRs

Con esa información, podré ayudarte a asegurar que tus OKRs estén correctamente alineados a la visión de Attach.`,
        suggestions: []
      }
    },
    {
      userInput: "transcripción",
      consultantResponse: {
        content: `Gracias, con esto ya tengo un mejor entendimiento del contexto organizacional de Attach.

🔍 Ahora, para ayudarte de forma más precisa, necesito conocer mejor el funcionamiento de tu unidad dentro de la organización.

Voy a hacerte algunas preguntas breves, una por una. Si prefieres, también puedes compartirme un documento donde se describa la función de tu área. Lo que te sea más cómodo 😊`,
        suggestions: []
      }
    },
    {
      userInput: "coe innovación",
      consultantResponse: {
        content: `Gracias por compartirlo. Con esto tengo una mejor idea del enfoque y del impacto de tu unidad en la organización 💡

Ahora, una pregunta más para cerrar este bloque de entendimiento inicial:

📌 ¿Ya han trabajado antes con OKRs?`,
        suggestions: []
      }
    },
    {
      userInput: "sí cuatrimestres",
      consultantResponse: {
        content: `Gracias, ya tengo la información 🙌

Después de revisar tus OKRs anteriores, esto es lo que puedo concluir sobre tu unidad:
• Cumples un rol habilitador de procesos, personas y estructuras.
• Tienes una función transversal, enfocada en innovación y transformación organizacional.
• Tus KRs anteriores cubren una diversidad de focos: desde eficiencia operativa e IA, hasta cultura organizacional y marcos de gestión de proyectos.

✅ ¿Te parece acertado este diagnóstico?`,
        suggestions: []
      }
    },
    {
      userInput: "sí correcto",
      consultantResponse: {
        content: `Perfecto, gracias por confirmarlo.

Con este entendimiento, ya estamos listos para avanzar hacia la definición del Objetivo de tu unidad para el C3.

Recuerda esta estructura para redactarlo:
[Verbo de acción] + [qué quieres lograr de forma inspiradora] + [para qué o por qué es importante]

💡 Ejemplo:
"Impulsar el pensamiento estratégico en equipos clave para acelerar la transformación organizacional."

Tómate un momento para pensar en qué te gustaría que fuera tu foco principal este cuatrimestre.`,
        suggestions: [
          "Necesito ayuda para redactar el objetivo",
          "¿Puedes darme ejemplos de objetivos similares en CoEs?",
          "Ya tengo uno en mente, quiero compartirlo contigo"
        ]
      }
    },
    {
      userInput: "ya tengo uno en mente",
      consultantResponse: {
        content: `¡Genial! Adelante, compárteme el objetivo que tienes en mente.

Voy a ayudarte a validarlo y a pulirlo si es necesario, asegurando que esté:
• Enfocado en impacto y dirección estratégica
• Inspirador y accionable para tu equipo
• Bien alineado con el contexto organizacional de Attach y la evolución de tu CoE

Estoy listo para revisarlo contigo.`,
        suggestions: []
      }
    },
    {
      userInput: "objetivo calidad eficiencia",
      consultantResponse: {
        content: `Aquí tienes tu objetivo reformulado, construido con base en todo lo que me compartiste y alineado al OKR superior de Attach:

**Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa.**

✅ Diagnóstico: Alineado

📊 Evaluación frente al OKR Superior:
"Impulsar una evolución organizacional que eleve nuestro estándar operativo y acelere nuestro crecimiento."

**Análisis:**
• **Verbo ambicioso**: "Convertir" comunica intención transformadora y liderazgo estratégico ✅
• **Foco claro**: Se priorizan tres ejes: eficiencia, cultura y excelencia operativa ✅
• **Outcome organizacional**: Implica mejora estructural con resultados concretos ✅
• **Alineación estratégica**: Refleja contribución directa a la evolución organizacional ✅`,
        suggestions: [
          "Usar este objetivo para definir mis KRs ahora",
          "Hacer pequeños ajustes antes de pasar a los KRs",
          "Ver una versión alternativa para comparar enfoques"
        ]
      }
    },
    {
      userInput: "usar objetivo definir krs",
      consultantResponse: {
        content: `¡Perfecto! Vamos a trabajar con este objetivo:
"Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa."

Ahora definiremos tus Key Results (KRs), los resultados clave que medirán tu avance hacia este objetivo.

📌 Cómo construir un buen KR:
Cada KR debe expresar un cambio concreto y medible que quieras lograr durante el ciclo.

Usa esta fórmula:
[Verbo de acción] + [Métrica a mejorar] + de [Línea base] a [Meta]

💡 Ejemplo:
"Incrementar el índice de satisfacción interna de 4.2 a 4.6"

Recuerda:
• Necesitas mínimo 3 KRs para este objetivo
• Deben ser ambiciosos pero alcanzables
• Cada KR debe poder medirse claramente al final del ciclo

¿Quieres escribirme los KRs que ya tienes en mente?`,
        suggestions: [
          "Te comparto mis KRs para que los revises",
          "Muéstrame ejemplos de buenos KRs alineados a este objetivo",
          "Ayúdame a crearlos desde cero paso a paso"
        ]
      }
    },
    {
      userInput: "comparto krs",
      consultantResponse: {
        content: `Gracias por compartir tus KRs.

He realizado un análisis para identificar qué tan alineados están con tu objetivo y dónde podríamos mejorarlos para que sean medibles, claros y estratégicos.

📊 **Cuadro de análisis de tus KRs:**

**KR1: Aplicar IA en procesos internos** ✅ Alineado ❌ Falta métrica
**KR2: Talleres gestión de proyectos** ❌ No alineado ❌ Falta resultado medible  
**KR3: Documentar buenas prácticas** ❌ Limitado ❌ Acción táctica
**KR4: Plan Transformación Cultural** ✅ Alineado ❌ Falta claridad métrica

📌 **KRs sugeridos reformulados:**

1. **Reducir en [%] el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG**
2. **Incrementar el nivel promedio de madurez en Gestión de Proyectos de [%] a [%] según assessment institucional**
3. **Alcanzar un [%] de adopción efectiva del Framework ACIF en las unidades estratégicas**
4. **Lograr [%] de adopción del modelo de Transformación Cultural según índice institucional**

**Diagnóstico:** 2 KRs están bien alineados pero necesitan métricas claras.`,
        suggestions: [
          "Usar los KRs sugeridos y completar la información que falta",
          "Refinarlos contigo, pregunta por pregunta",
          "Ver ejemplos de KRs efectivos para este tipo de objetivo"
        ]
      }
    },
    {
      userInput: "refinar pregunta por pregunta",
      consultantResponse: {
        content: `¡Perfecto! Vamos a refinar tus KRs. Para dejar cada uno bien definido, necesito tu ayuda respondiendo estas preguntas clave.

**KR1: IA en procesos internos**
• ¿Qué procesos vas a intervenir?
• ¿En qué áreas?
• ¿Qué impacto esperas?
• ¿Cómo lo vas a medir?

**KR2: Capacitación en gestión de proyectos**
• ¿A quiénes capacitarás?
• ¿Qué enfoque usarás?
• ¿Cómo sabrás si se aplicó lo aprendido?

**KR3: Sistema de buenas prácticas**
• ¿Qué sistema usarás?
• ¿En cuántas áreas se aplicará?
• ¿Cómo medirás su adopción?

**KR4: Transformación cultural**
• ¿Cuántas iniciativas incluye el plan?
• ¿Qué refleja la adopción cultural?
• ¿Cómo la vas a evaluar?

Puedes responder por partes si gustas, estoy listo para leerte`,
        suggestions: []
      }
    },
    {
      userInput: "respuestas detalladas",
      consultantResponse: {
        content: `¡Gracias por compartir tus respuestas!

Con base en lo que me diste, he reformulado tus KRs para que tengan estructura clara, métricas y alineación directa con tu objetivo.

📊 **KRs Reformulados:**

**KR1:** Reducir en [%] el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG

**KR2:** Incrementar el nivel promedio de madurez en Gestión de Proyectos de [%] a [%] según assessment institucional

**KR3:** Alcanzar un [%] de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización

**KR4:** Lograr [%] de adopción del modelo de Transformación Cultural según índice de implementación institucional

**Diagnóstico:** Todos los KRs están alineados al objetivo, cuentan con estructura correcta y métrica definida.

Es importante completarlos con el porcentaje meta y el sistema de medición que usarás para el seguimiento.`,
        suggestions: [
          "Aplicar estos KRs y completar la información que falta",
          "Refinarlos contigo, uno por uno",
          "Ver ejemplos de KRs de alto impacto para este tipo de objetivo"
        ]
      }
    },
    {
      userInput: "aplicar krs completar",
      consultantResponse: {
        content: `Perfecto 👍. Vamos a completar estos KRs con los porcentajes meta y los sistemas de medición que usarás para darles seguimiento.

Compárteme la información que falta en cada uno:

**KR1:** Reducir en [%] el costo de los procesos clave mediante la implementación de iniciativas de inteligencia artificial, medido a través del indicador [nombre de la métrica o sistema de medición].

**KR2:** Incrementar el nivel de madurez en gestión de proyectos del [%] al [%], según los resultados del assessment institucional.

**KR3:** Alcanzar una adopción efectiva del Framework ACIF en al menos [%] de las unidades estratégicas de la organización, medida a través de su aplicación documentada y validada.

**KR4:** Lograr una adopción del modelo de Transformación Cultural de al menos [%], según [sistema de medición].`,
        suggestions: []
      }
    },
    {
      userInput: "krs finales",
      consultantResponse: {
        content: `Gracias por compartir la versión final de tus KRs 🙌.

Aquí tienes el análisis de diagnóstico:

📊 **KRs reformulados:**

**KR1:** Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG

**KR2:** Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment institucional

**KR3:** Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización

**KR4:** Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación institucional

**Diagnóstico:** ✅ Todos los KRs están alineados al objetivo, bien redactados y con métricas claras.

**Acción sugerida:** Puedes avanzar con estos KRs y empezar a mapear las iniciativas o acciones tácticas.`,
        suggestions: [
          "Aplicar estos KRs y pasar a definir las iniciativas",
          "Refinarlos un poco más para mi contexto operativo",
          "Ver un ejemplo de plan de iniciativas para este objetivo"
        ]
      }
    },
    {
      userInput: "aplicar krs definir iniciativas",
      consultantResponse: {
        content: `¡Felicitaciones! Tus OKRs están bien definidos y estratégicamente alineados 🎯.

**Objetivo:**
Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa.

**KRs finales:**

**KR1:** Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG

**KR2:** Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment institucional

**KR3:** Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización

**KR4:** Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación institucional

Ahora el siguiente paso es mapear tus iniciativas para asegurar que cada KR tenga acciones claras que lo impulsen.`,
        suggestions: [
          "Definir iniciativas para el KR1 de IA",
          "Mapear todas las iniciativas por KR",
          "Ver ejemplos de iniciativas exitosas"
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

    // Find matching response or provide default
    setTimeout(() => {
      const consultantResponse = findConsultantResponse(message, currentStep);
      setMessages(prev => [...prev, consultantResponse]);
      setCurrentStep(prev => prev + 1);
      setIsWaitingForResponse(false);
    }, 1000);
  };

  const findConsultantResponse = (userMessage: string, step: number): ChatMessage => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Match specific flows
    if (normalizedMessage.includes("crear okr") || step === 0) {
      return createConsultantMessage(conversationFlow[0].consultantResponse);
    }
    
    if (normalizedMessage.includes("attach") || step === 1) {
      return createConsultantMessage(conversationFlow[1].consultantResponse);
    }
    
    if (normalizedMessage.includes("transcripción") || step === 2) {
      return createConsultantMessage(conversationFlow[2].consultantResponse);
    }
    
    if (normalizedMessage.includes("coe") || normalizedMessage.includes("innovación") || step === 3) {
      return createConsultantMessage(conversationFlow[3].consultantResponse);
    }
    
    if (normalizedMessage.includes("sí") && normalizedMessage.includes("cuatrimestre") || step === 4) {
      return createConsultantMessage(conversationFlow[4].consultantResponse);
    }
    
    if (normalizedMessage.includes("correcto") || step === 5) {
      return createConsultantMessage(conversationFlow[5].consultantResponse);
    }
    
    if (normalizedMessage.includes("ya tengo") || step === 6) {
      return createConsultantMessage(conversationFlow[6].consultantResponse);
    }
    
    if (normalizedMessage.includes("asegurar") || normalizedMessage.includes("calidad") || step === 7) {
      return createConsultantMessage(conversationFlow[7].consultantResponse);
    }
    
    if (normalizedMessage.includes("usar") && normalizedMessage.includes("objetivo") || step === 8) {
      return createConsultantMessage(conversationFlow[8].consultantResponse);
    }
    
    if (normalizedMessage.includes("comparto") && normalizedMessage.includes("kr") || step === 9) {
      return createConsultantMessage(conversationFlow[9].consultantResponse);
    }
    
    if (normalizedMessage.includes("refinar") || step === 10) {
      return createConsultantMessage(conversationFlow[10].consultantResponse);
    }
    
    if (step === 11) {
      return createConsultantMessage(conversationFlow[11].consultantResponse);
    }
    
    if (normalizedMessage.includes("aplicar") && step === 12) {
      return createConsultantMessage(conversationFlow[12].consultantResponse);
    }
    
    if (step === 13) {
      return createConsultantMessage(conversationFlow[13].consultantResponse);
    }
    
    if (normalizedMessage.includes("iniciativas") || step === 14) {
      return createConsultantMessage(conversationFlow[14].consultantResponse);
    }

    // Default response
    return createConsultantMessage({
      content: "Gracias por tu respuesta. ¿Podrías proporcionarme más detalles para continuar con el desarrollo de tus OKRs?",
      suggestions: [
        "Necesito más contexto",
        "Continuar con el siguiente paso",
        "Ver un ejemplo"
      ]
    });
  };

  const createConsultantMessage = (response: { content: string; suggestions?: string[] }): ChatMessage => {
    return {
      id: (Date.now() + 1).toString(),
      type: 'consultant',
      content: response.content,
      suggestions: response.suggestions || [],
      timestamp: new Date()
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Start conversation automatically
  const startConversation = () => {
    if (messages.length === 0) {
      const initialMessage = createConsultantMessage(conversationFlow[0].consultantResponse);
      setMessages([initialMessage]);
      setCurrentStep(1);
    }
  };

  // Auto-start conversation when component mounts
  useEffect(() => {
    startConversation();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col h-[700px]">
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
      <div className="flex-1 overflow-y-auto space-y-6 mb-6">
        {messages.map((message) => (
          <div key={message.id} className="w-full">
            {message.type === 'consultant' ? (
              /* Bot Message - Full width, left aligned, no bubble */
              <div className="w-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <BotIcon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Suggestion Bubbles - Copilot Style */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ml-11 flex flex-wrap gap-2 mt-3">
                    {message.suggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700 transition-all duration-200 cursor-pointer hover:shadow-sm"
                        style={{
                          borderRadius: '20px',
                          backgroundColor: '#F5F5F5',
                          color: '#333'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E5E5E5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5F5F5';
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* User Message - Right aligned, with bubble */
              <div className="w-full flex justify-end">
                <div className="max-w-[80%] bg-blue-50 rounded-2xl px-4 py-3 border border-blue-100">
                  <div className="text-gray-900 text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isWaitingForResponse && (
          <div className="w-full">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                <BotIcon size={16} />
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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