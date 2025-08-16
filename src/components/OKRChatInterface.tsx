import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Send, FileText, Bot, User, Paperclip } from 'lucide-react';


interface ChatMessage {
  id: string;
  type: 'user' | 'consultant';
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

const conversationFlow = [
  {
    userInput: "crear okr",
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
    userInput: "Los OKRs de unidad superior con los que me debo alinear son los de mi empresa, Attach.",
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
    userInput: "Tengo la transcripción de la reunión",
    consultantResponse: {
      content: `Gracias, con esto ya tengo un mejor entendimiento del contexto organizacional de Attach.

🔍 Ahora, para ayudarte de forma más precisa, necesito conocer mejor el funcionamiento de tu unidad dentro de la organización.

Voy a hacerte algunas preguntas breves, una por una. Si prefieres, también puedes compartirme un documento donde se describa la función de tu área. Lo que te sea más cómodo 😊`,
      suggestions: []
    }
  },
  {
    userInput: "Soy líder del CoE de Innovación",
    consultantResponse: {
      content: `Gracias por compartirlo. Con esto tengo una mejor idea del enfoque y del impacto de tu unidad en la organización 💡

Ahora, una pregunta más para cerrar este bloque de entendimiento inicial:

📌 ¿Ya han trabajado antes con OKRs?`,
      suggestions: []
    }
  },
  {
    userInput: "Sí, en mi unidad trabajamos con OKRs por cuatrimestres",
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
    userInput: "Sí, es correcto",
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
    userInput: "Ya tengo uno en mente",
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
    userInput: "Asegurar la mejora de procesos internos y externos con calidad e innovación para ser más eficientes",
    consultantResponse: {
      content: `Gracias por compartirlo. Veamos juntos cómo se siente este objetivo frente a lo que busca la organización en este cuatrimestre.

Partiendo del OKR superior de Attach:
"Impulsar una evolución organizacional que eleve nuestro estándar operativo y acelere nuestro crecimiento."

Tu objetivo actual tiene buenas intenciones, pero hay algunas oportunidades claras de mejora. Aquí te comparto un pequeño análisis para que lo revisemos juntos:

—-----
Elemento | Evaluación | ¿Está alineado? | Observación
Verbo genérico | "Asegurar" es seguro, pero no inspira ni comunica ambición transformadora. | ❌ No | Podrías usar un verbo como "Impulsar", "Transformar" o "Potenciar" para reforzar el sentido estratégico.
Foco poco claro | Se mezclan muchos conceptos (procesos, calidad, innovación, eficiencia) sin una dirección única. | ⚠️ Parcial | Falta priorización: ¿qué es lo más importante para este cuatrimestre? ¿Dónde estará tu mayor impacto?
Sin outcome tangible | No menciona un resultado observable ni medible. | ❌ No | Recordá que un buen objetivo inspira, pero también apunta a un cambio visible. ¿Qué se espera lograr exactamente?
Alineación estratégica | Se conecta levemente con los temas de eficiencia, pero no con transformación ni madurez. | ⚠️ Parcial | Hay que reforzar el vínculo con los grandes focos de Attach, como evolución organizacional, productividad o madurez de los CoEs.
—-----

📌 ¿Qué se puede mejorar?
Reformular el objetivo con un verbo ambicioso, un foco más claro y un resultado más concreto e inspirador.

💡 Objetivo sugerido:
"Potenciar la innovación para transformar la organización con foco en eficiencia y cultura."

👇 ¿Cómo quieres seguir?`,
      suggestions: [
        "Sí, me gusta. Quiero usar el objetivo sugerido.",
        "Quiero mejorar el mío con tu ayuda, paso a paso.",
        "¿Tienes más ejemplos de objetivos para CoEs de innovación?"
      ]
    }
  },
  {
    userInput: "Quiero mejorar el mío con tu ayuda, paso a paso",
    consultantResponse: {
      content: `¡Perfecto! Vamos a trabajarlo juntos.

Te haré algunas preguntas clave para clarificar y enfocar tu objetivo.

Con tus respuestas generaré una propuesta personalizada, más clara, estratégica y alineada a la visión de Attach.

1. Claridad e impacto
¿Qué significa exactamente "asegurar calidad y eficiencia" en el contexto específico de tu unidad?

2. Alcance de procesos
Cuando dices "procesos internos y externos", ¿a cuáles te refieres concretamente?

3. Rol de la innovación
¿Por qué consideras la innovación como el mecanismo principal para lograr esa mejora?

4. Liderazgo y transformación
¿Tu unidad lidera iniciativas estructurales que impactan a otras áreas o incluso al modelo organizacional?

Cuando termines de responder, usaré tus respuestas para reformular tu objetivo con mejor enfoque estratégico y conexión directa al OKR superior.`,
      suggestions: []
    }
  },
  {
    userInput: "1.Desde mi unidad impartimos entrenamiento",
    consultantResponse: {
      content: `Gracias por la claridad de tus respuestas 🙌.

Con esto puedo ver que:
• Tu unidad capacita y habilita a otras áreas para generar resultados con calidad y eficiencia.
• Tienes impacto tanto en procesos internos como en entregas para clientes externos.
• Usas la innovación como palanca de rediseño de procesos para mejoras sostenibles, apoyada en IA, metodologías ágiles y análisis de datos.
• Lideras iniciativas que transforman la cultura y madurez operativa a nivel organizacional.

Con este material, ya puedo ayudarte a reformular tu objetivo para que sea más ambicioso, claro y alineado con el propósito de Attach.`,
      suggestions: [
        "Muéstrame mi objetivo reformulado directamente",
        "Quiero ver 2 versiones alternativas de mi objetivo reformulado para comparar",
        "Prefiero que lo construyamos juntos, paso a paso"
      ]
    }
  },
  {
    userInput: "Muéstrame mi objetivo reformulado directamente",
    consultantResponse: {
      content: `Aquí tienes tu objetivo reformulado, construido con base en todo lo que me compartiste y alineado al OKR superior de Attach:

Transformar la forma en que operamos mediante innovación estratégica, priorizando eficiencia y cultura como ejes clave.

✅ Diagnóstico: Alineado

📊 Evaluación frente al OKR Superior:
"Impulsar una evolución organizacional que eleve nuestro estándar operativo y acelere nuestro crecimiento."

Elemento | Evaluación | ¿Está alineado con el objetivo? | ¿Está alineado con los KR's superiores? | ¿Está bien redactado? | Observación
Verbo ambicioso | "Transformar" proyecta liderazgo, iniciativa y propósito estratégico. | ✅ Sí | ✅ Sí | ✅ Sí | Comunica intención de cambio profundo, alineado con la evolución organizacional y la mejora de estándares.
Foco claro y jerarquizado | Se priorizan explícitamente la eficiencia y la cultura como ejes de impacto. | ✅ Sí | ✅ Sí | ✅ Sí | Conecta con los KR's de productividad, madurez y satisfacción del cliente, reforzando el foco estratégico.
Outcome organizacional | El objetivo implica un cambio en la forma de operar con resultados tangibles en la organización. | ✅ Sí | ✅ Sí | ✅ Sí | Aporta a la consecución de los KR's de rentabilidad, productividad y madurez organizacional.
Alineación estratégica | Refleja contribución directa a la evolución organizacional, potenciando crecimiento y madurez. | ✅ Sí | ✅ Sí | ✅ Sí | Relación directa con el objetivo superior y KR's, asegurando coherencia entre la innovación y los resultados esperados.

📌 Acción validada:
Tu objetivo está alineado al propósito organizacional y comunica un impacto estratégico claro.`,
      suggestions: [
        "Sí, lo apruebo como objetivo final",
        "Quiero ajustar algunas palabras o el enfoque",
        "Muéstrame una versión alternativa para comparar"
      ]
    }
  },
  {
    userInput: "Quiero ajustar algunas palabras o el enfoque",
    consultantResponse: {
      content: `¡Perfecto! Ahora cuéntame un poco más:

¿Quieres darme ideas clave o un nuevo borrador para que lo revisemos juntos?

Puedo ayudarte a validarlo y, si es necesario, mejorarlo usando criterios de alineación estratégica, claridad de impacto y foco en resultados.`,
      suggestions: []
    }
  },
  {
    userInput: "Convertir la innovación organizacional en motor de eficiencia",
    consultantResponse: {
      content: `Aquí tienes tu objetivo reformulado, construido con base en todo lo que me compartiste y alineado al OKR superior de Attach:

Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa.

✅ Diagnóstico: Alineado

📊 Evaluación frente al OKR Superior:
"Impulsar una evolución organizacional que eleve nuestro estándar operativo y acelere nuestro crecimiento."

Elemento | Evaluación | ¿Está alineado con el objetivo? | ¿Está alineado con los KR's superiores? | ¿Está bien redactado? | Observación
Verbo ambicioso | "Convertir" comunica intención transformadora, liderazgo activo y visión estratégica. | ✅ Sí | ✅ Sí | ✅ Sí | El verbo impulsa acción y cambio, alineado con la evolución organizacional y la mejora de estándares.
Foco claro y jerarquizado | Se priorizan explícitamente tres ejes de impacto: eficiencia, cultura y excelencia operativa, con una lógica progresiva de valor. | ✅ Sí | ✅ Sí | ✅ Sí | Los tres ejes se conectan con los KR's superiores: eficiencia (IPG), cultura (madurez CoEs) y operatividad (rentabilidad y satisfacción del cliente).
Outcome organizacional | El objetivo implica una mejora estructural en la forma de operar, con resultados concretos que impactan transversalmente a la organización. | ✅ Sí | ✅ Sí | ✅ Sí | Conecta con los KR's de productividad, madurez y satisfacción, asegurando impacto transversal.
Alineación estratégica | Refleja cómo la innovación se convierte en habilitador del crecimiento organizacional, en línea con el objetivo superior de evolución y escala. | ✅ Sí | ✅ Sí | ✅ Sí | Relación directa con el objetivo y KR's superiores; la innovación es el medio para alcanzar mayor satisfacción, rentabilidad y productividad.

Acción validada:
Este objetivo cumple con los criterios de claridad, alineación estratégica y enfoque en resultados tangibles.`,
      suggestions: [
        "Usar este objetivo para definir mis KR's ahora",
        "Hacer pequeños ajustes antes de pasar a los KR's",
        "Ver una versión alternativa para comparar enfoques"
      ]
    }
  },
  {
    userInput: "Usar este objetivo para definir mis KR's ahora",
    consultantResponse: {
      content: `¡Perfecto! Vamos a trabajar con este objetivo:
"Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa."

Ahora definiremos tus Key Results (KR's), los resultados clave que medirán tu avance hacia este objetivo.

📌 Cómo construir un buen KR:
Cada KR debe expresar un cambio concreto y medible que quieras lograr durante el ciclo.

Usa esta fórmula:
[Verbo de acción] + [Métrica a mejorar] + de [Línea base] a [Meta]

💡 Ejemplo:
"Incrementar el índice de satisfacción interna de 4.2 a 4.6"

Recuerda:
• Necesitas mínimo 3 KRs para este objetivo.
• Deben ser ambiciosos pero alcanzables.
• Cada KR debe poder medirse claramente al final del ciclo.

¿Quieres escribirme los KR's que ya tienes en mente?

Puedo ayudarte a afinarlos, validarlos o reformularlos para que estén totalmente alineados con tu objetivo y con el OKR superior.`,
      suggestions: [
        "Te comparto mis KR's para que los revises",
        "Muéstrame ejemplos de buenos KR's alineados a este objetivo",
        "Ayúdame a crearlos desde cero paso a paso"
      ]
    }
  },
  {
    userInput: "Te comparto mis KR's para que los revises",
    consultantResponse: {
      content: `¡Perfecto! 

Compárteme tus Key Results (KR's) y los revisaré uno por uno.

Voy a evaluarlos según estos criterios:
• Claridad → Que sea fácil de entender y comunicar.
• Medición → Que tenga métricas o indicadores claros.
• Alineación → Que conecte directamente con tu objetivo y con el OKR superior de Attach.
• Ambición realista → Que sea retador pero alcanzable en el ciclo.`,
      suggestions: []
    }
  },
  {
    userInput: "Estos son mis KR's",
    consultantResponse: {
      content: `Gracias por compartir tus KR's.

He realizado un análisis para identificar qué tan alineados están con tu objetivo y dónde podríamos mejorarlos para que sean medibles, claros y estratégicos.

📊 Cuadro de análisis de tus KR's

KR | Redacción actual | ¿Está alineado al objetivo? | ¿Está bien redactado? | Observación
KR1 | Aplicar IA en procesos internos de toda la organización | ✅ Sí | ❌ No | Alineado al enfoque de innovación y eficiencia, pero le falta línea base, métrica y meta.
KR2 | Realizar talleres sobre gestión de proyectos para reforzar habilidades blandas del equipo | ❌ No | ❌ No | No se conecta con el objetivo estratégico ni plantea un resultado medible.
KR3 | Documentar buenas prácticas de gestión en las áreas operativas | ❌ No | ❌ No | Acción táctica y limitada. No impulsa innovación ni transformación transversal.
KR4 | Ejecutar el plan de Transformación Cultural alineado al compromiso con el CEO | ✅ Sí | ❌ No | Buen alineamiento estratégico (cultura y liderazgo), pero es vago: falta claridad sobre qué se medirá y en qué nivel.

📌 KR's sugeridos (con espacios para completar):

1. Aplicar soluciones de IA en [procesos internos clave] de [toda la organización / unidades específicas], con una mejora de [tipo de resultado esperado: eficiencia, reducción de tiempos, etc.] de [X]% a [Y]% al cierre del ciclo.
🔍 Falta definir: procesos específicos, unidad/es, indicador medible, línea base y meta.

2. Capacitar a [grupo objetivo: líderes de proyecto / equipos clave] en [gestión de proyectos / metodología específica], elevando el nivel de adopción de prácticas innovadoras de [X]% a [Y]% según [fuente de medición].
🔍 Falta definir: grupo objetivo, tema concreto de la capacitación, cómo se medirá la adopción y metas numéricas.

3. Implementar un sistema de gestión del conocimiento para centralizar y aplicar buenas prácticas de gestión en [X]% de las áreas operativas, elevando su nivel de madurez operativa de [X]% a [Y]% según [instrumento de evaluación].
🔍 Falta definir: tipo de sistema o mecanismo, número de áreas, criterio de madurez y método de medición.

4. Ejecutar el plan de transformación cultural alineado al compromiso con el CEO, alcanzando un nivel de cumplimiento de [X]% en iniciativas clave y una adopción cultural de [Y]% medida mediante [instrumento: encuesta, evaluación interna, etc.].
🔍 Falta definir: % de cumplimiento, % de adopción y el instrumento de medición.

Diagnóstico rápido:
• 2 KR's están bien alineados, pero necesitan precisión y métricas claras.
• 2 KR's requieren reorientar el enfoque para reflejar mejor su impacto organizacional.

¿Cómo quieres avanzar a partir de aquí?`,
      suggestions: [
        "Usar los KR's sugeridos y completar la información que falta",
        "Refinarlos contigo, pregunta por pregunta",
        "Ver ejemplos de KR's efectivos para este tipo de objetivo"
      ]
    }
  },
  {
    userInput: "Refinarlos contigo, pregunta por pregunta",
    consultantResponse: {
      content: `¡Perfecto! Vamos a refinar tus KR's. Para dejar cada uno bien definido, necesito tu ayuda respondiendo estas preguntas clave.

KR1: IA en procesos internos
• ¿Qué procesos vas a intervenir?
• ¿En qué áreas?
• ¿Qué impacto esperas?
• ¿Cómo lo vas a medir?

KR2: Capacitación en gestión de proyectos
• ¿A quiénes capacitarás?
• ¿Qué enfoque usarás?
• ¿Cómo sabrás si se aplicó lo aprendido?

KR3: Sistema de buenas prácticas
• ¿Qué sistema usarás?
• ¿En cuántas áreas se aplicará?
• ¿Cómo medirás su adopción?

KR4: Transformación cultural
• ¿Cuántas iniciativas incluye el plan?
• ¿Qué refleja la adopción cultural?
• ¿Cómo la vas a evaluar?

Puedes responder por partes si gustas, estoy listo para leerte 📝`,
      suggestions: []
    }
  },
  {
    userInput: "1.Estamos aplicando IA en procesos de gestión",
    consultantResponse: {
      content: `¡Gracias por compartir tus respuestas!

Con base en lo que me diste, he reformulado tus KR's para que tengan estructura clara, métricas y alineación directa con tu objetivo.

📊 Panel de Análisis – KR's reformulados

KR's Reformulados:

Reducir en [%] el costo de procesos clave mediante iniciativas de IA, reflejado en el [sistema de medición].

Incrementar el nivel promedio de madurez en Gestión de Proyectos de [%] a [%] según assessment institucional.

Alcanzar un [%] de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización.

Lograr [%] de adopción del modelo de Transformación Cultural según [sistema de medición].

Diagnóstico

KR | Redacción actual | ¿Alineado? | ¿Bien redactado? | Observación
KR1 | Reducir en [%] el costo de procesos clave mediante iniciativas de IA, reflejado en el [sistema...] | ✅ Sí | ✅ Sí | Estructura completa con métrica y sistema de medición.
KR2 | Incrementar el nivel promedio de madurez en Gestión de Proyectos de [%] a [%] según assessment... | ✅ Sí | ✅ Sí | Mide la evolución de madurez con referencia clara al assessment institucional.
KR3 | Alcanzar un [%] de adopción efectiva del Framework ACIF en las unidades estratégicas | ✅ Sí | ✅ Sí | Meta clara y alineada al objetivo estratégico. Puede especificar fuente de medición.
KR4 | Lograr [%] de adopción del modelo de Transformación Cultural según [sistema de medición] | ✅ Sí | ✅ Sí | Alineado al enfoque cultural. Sistema de medición definido.

Acción validada:
Puedes avanzar con estos KR's, ya que están alineados al objetivo, cuentan con estructura correcta y métrica definida. Esto te permitirá mapear las iniciativas y acciones tácticas necesarias.

Es importante completarlos con el porcentaje meta y el sistema de medición que usarás para el seguimiento.`,
      suggestions: [
        "Aplicar estos KR's y completar la información que falta",
        "Refinarlos contigo, uno por uno",
        "Ver ejemplos de KR's de alto impacto para este tipo de objetivo"
      ]
    }
  },
  {
    userInput: "Aplicar estos KR's y completar la información que falta",
    consultantResponse: {
      content: `Perfecto 👍. Vamos a completar estos KR's con los porcentajes meta y los sistemas de medición que usarás para darles seguimiento.

Compárteme la información que falta en cada uno:

KR1: Reducir en [%] el costo de los procesos clave mediante la implementación de iniciativas de inteligencia artificial, medido a través del indicador [nombre de la métrica o sistema de medición].

KR 2: Incrementar el nivel de madurez en gestión de proyectos del [%] al [%], según los resultados del assessment institucional.

KR3: Alcanzar una adopción efectiva del Framework ACIF en al menos [%] de las unidades estratégicas de la organización, medida a través de su aplicación documentada y validada.

KR4: Lograr una adopción del modelo de Transformación Cultural de al menos [%], según [sistema de medición].`,
      suggestions: []
    }
  },
  {
    userInput: "Le hice algunas mejoras",
    consultantResponse: {
      content: `Gracias por compartir la versión final de tus KR's 🙌.

Aquí tienes el análisis de diagnóstico:

📊 Panel de Análisis – KR's reformulados

KR's reformulados:

Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG.

Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment institucional.

Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización.

Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación institucional.

Diagnóstico

KR | Redacción actual | ¿Alineado al objetivo? | ¿Bien redactado? | Observación
KR1 | Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG | ✅ Sí | ✅ Sí | Alineado al enfoque de innovación y eficiencia. Tiene métrica, meta y unidad de medida clara (IPG). Muy bien estructurado.
KR2 | Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment... | ✅ Sí | ✅ Sí | Redacción clara, medible y con línea base. Apunta a profesionalización del equipo, aportando a la capacidad operativa.
KR3 | Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la org. | ✅ Sí | ✅ Sí | Tiene meta concreta y foco estratégico. Podría precisar el instrumento de medición, pero es suficientemente claro para ejecución.
KR4 | Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación... | ✅ Sí | ✅ Sí | Está alineado al eje cultural del objetivo. Tiene métrica y fuente. Bien redactado y con propósito claro.

Acción sugerida:
Puedes avanzar con estos KR's y empezar a mapear las iniciativas o acciones tácticas.`,
      suggestions: [
        "Aplicar estos KR's y pasar a definir las iniciativas",
        "Refinarlos un poco más para mi contexto operativo",
        "Ver un ejemplo de plan de iniciativas para este objetivo"
      ]
    }
  },
  {
    userInput: "Aplicar estos KR's y pasar a definir las iniciativas",
    consultantResponse: {
      content: `¡Felicitaciones! Tus OKR's están bien definidos y estratégicamente alineados 🎯.

Objetivo:
Convertir la innovación organizacional en motor de eficiencia, evolución cultural y excelencia operativa.

KR's finales:

KR1: Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG.

KR2: Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment institucional.

KR3: Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización.

KR4: Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación institucional.

Ahora el siguiente paso es mapear tus iniciativas para asegurar que cada KR tenga acciones claras que lo impulsen.`,
      suggestions: []
    }
  }
];

const OKRChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const findConsultantResponse = (userMessage: string, step: number): ChatMessage => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Use step-based logic to follow the conversation flow
    if (step < conversationFlow.length) {
      // Step 0: User clicks "crear okr"
      if (step === 0 && normalizedMessage.includes("crear okr")) {
        return createConsultantMessage(conversationFlow[0].consultantResponse);
      }
      
      // Step 1: User provides OKRs from Attach
      if (step === 1 && (normalizedMessage.includes("attach") || 
           normalizedMessage.includes("impulsar una evolución") ||
           normalizedMessage.includes("aumentar la satisfacción") ||
           normalizedMessage.includes("elevar la rentabilidad") ||
           normalizedMessage.includes("incrementar el índice") ||
           normalizedMessage.includes("evolucionar la madurez"))) {
        return createConsultantMessage(conversationFlow[1].consultantResponse);
      }
      
      // Step 2: User mentions transcription
      if (step === 2 && (normalizedMessage.includes("transcripción") || 
           normalizedMessage.includes("transcripcion") ||
           normalizedMessage.includes("tengo la transcripción"))) {
        return createConsultantMessage(conversationFlow[2].consultantResponse);
      }
      
      // Step 3: User describes their role
      if (step === 3 && (normalizedMessage.includes("líder") || 
           normalizedMessage.includes("lider") ||
           normalizedMessage.includes("coe") ||
           normalizedMessage.includes("innovación") ||
           normalizedMessage.includes("innovacion"))) {
        return createConsultantMessage(conversationFlow[3].consultantResponse);
      }
      
      // Step 4: User confirms OKR experience
      if (step === 4 && (normalizedMessage.includes("sí") || 
           normalizedMessage.includes("si") ||
           normalizedMessage.includes("cuatrimestres"))) {
        return createConsultantMessage(conversationFlow[4].consultantResponse);
      }
      
      // Step 5: User confirms diagnosis
      if (step === 5 && (normalizedMessage.includes("correcto") || 
           normalizedMessage.includes("sí") ||
           normalizedMessage.includes("si"))) {
        return createConsultantMessage(conversationFlow[5].consultantResponse);
      }
      
      // Step 6: User says they have objective in mind
      if (step === 6 && normalizedMessage.includes("ya tengo uno en mente")) {
        return createConsultantMessage(conversationFlow[6].consultantResponse);
      }
      
      // Step 7: User shares initial objective
      if (step === 7 && (normalizedMessage.includes("asegurar") && 
           normalizedMessage.includes("procesos internos"))) {
        return createConsultantMessage(conversationFlow[7].consultantResponse);
      }
      
      // Step 8: User wants to improve step by step
      if (step === 8 && normalizedMessage.includes("paso a paso")) {
        return createConsultantMessage(conversationFlow[8].consultantResponse);
      }
      
      // Step 9: User answers detailed questions
      if (step === 9 && normalizedMessage.includes("desde mi unidad")) {
        return createConsultantMessage(conversationFlow[9].consultantResponse);
      }
      
      // Step 10: User wants direct reformulation
      if (step === 10 && normalizedMessage.includes("directamente")) {
        return createConsultantMessage(conversationFlow[10].consultantResponse);
      }
      
      // Step 11: User wants to adjust
      if (step === 11 && normalizedMessage.includes("ajustar")) {
        return createConsultantMessage(conversationFlow[11].consultantResponse);
      }
      
      // Step 12: User provides new objective
      if (step === 12 && normalizedMessage.includes("convertir la innovación")) {
        return createConsultantMessage(conversationFlow[12].consultantResponse);
      }
      
      // Step 13: User wants to define KRs
      if (step === 13 && normalizedMessage.includes("definir mis kr")) {
        return createConsultantMessage(conversationFlow[13].consultantResponse);
      }
      
      // Step 14: User wants to share KRs
      if (step === 14 && normalizedMessage.includes("comparto mis kr")) {
        return createConsultantMessage(conversationFlow[14].consultantResponse);
      }
      
      // Step 15: User shares KRs
      if (step === 15 && normalizedMessage.includes("estos son mis kr")) {
        return createConsultantMessage(conversationFlow[15].consultantResponse);
      }
      
      // Step 16: User wants to refine question by question
      if (step === 16 && normalizedMessage.includes("pregunta por pregunta")) {
        return createConsultantMessage(conversationFlow[16].consultantResponse);
      }
      
      // Step 17: User answers KR questions
      if (step === 17 && normalizedMessage.includes("estamos aplicando ia")) {
        return createConsultantMessage(conversationFlow[17].consultantResponse);
      }
      
      // Step 18: User wants to apply KRs and complete info
      if (step === 18 && normalizedMessage.includes("completar la información")) {
        return createConsultantMessage(conversationFlow[18].consultantResponse);
      }
      
      // Step 19: User shares final KRs
      if (step === 19 && normalizedMessage.includes("le hice algunas mejoras")) {
        return createConsultantMessage(conversationFlow[19].consultantResponse);
      }
      
      // Step 20: User wants to define initiatives
      if (step === 20 && normalizedMessage.includes("definir las iniciativas")) {
        return createConsultantMessage(conversationFlow[20].consultantResponse);
      }
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

  const createConsultantMessage = (response: any): ChatMessage => {
    return {
      id: Date.now().toString(),
      type: 'consultant',
      content: response.content,
      suggestions: response.suggestions || [],
      timestamp: new Date()
    };
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const consultantResponse = findConsultantResponse(message, currentStep);
      setMessages(prev => [...prev, consultantResponse]);
      setCurrentStep(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleStartConversation = () => {
    handleSendMessage("crear okr");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Consultor de OKRs</h2>
            <p className="text-xs text-muted-foreground">Especialista en metodología OKR</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-white">
        <div className="space-y-2 max-w-none">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¡Hola! Soy tu consultor de OKRs
                </h3>
                <p className="text-muted-foreground mb-6">
                  Te ayudo a crear OKRs alineados y efectivos para tu unidad. 
                  Empecemos construyendo tu OKR paso a paso.
                </p>
                <Button onClick={handleStartConversation} className="mb-4">
                  Crear OKR para mi unidad
                </Button>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={message.id} className="mb-2">
              {message.type === 'user' ? (
                // User Message - Right aligned with light blue background
                <div className="flex justify-end">
                  <div 
                    className="max-w-[65%] rounded-xl p-3 mb-2"
                    style={{
                      backgroundColor: '#E0F2FE',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#111827',
                      lineHeight: '1.5'
                    }}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ) : (
                // Bot Message - Left aligned, full width, white background
                <div className="w-full">
                  <div 
                    className="w-full bg-white p-0 mb-2"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#111827',
                      lineHeight: '1.6'
                    }}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  
                  {/* Suggestion Bubbles - Copilot style */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-3 mb-4">
                      {message.suggestions.map((suggestion, suggestionIndex) => (
                        <button
                          key={suggestionIndex}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="transition-colors duration-200"
                          style={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: '20px',
                            padding: '10px 16px',
                            fontSize: '15px',
                            color: '#111827',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'Open Sans, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E7EB';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F3F4F6';
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="w-full">
              <div 
                className="w-full bg-white p-0 mb-2"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#111827',
                  lineHeight: '1.6'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Fixed Input Area at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[800px] relative">
            <div className="flex items-center gap-2">
              {/* Paperclip Icon for Attachments */}
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => {
                  // File attachment functionality placeholder
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.doc,.docx';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      handleSendMessage(`📄 PDF - ${file.name}`);
                    }
                  };
                  input.click();
                }}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full min-h-[44px] border-gray-300 resize-none focus:ring-blue-500 focus:border-blue-500"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '22px',
                    padding: '12px 50px 12px 16px',
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '15px',
                    color: '#111827',
                    outline: 'none'
                  }}
                  placeholder="Escribe tu mensaje aquí..."
                />
                
                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 transition-colors duration-200"
                  style={{
                    color: !inputValue.trim() || isLoading ? '#9CA3AF' : '#3B82F6'
                  }}
                  onMouseEnter={(e) => {
                    if (!(!inputValue.trim() || isLoading)) {
                      e.currentTarget.style.color = '#2563EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(!inputValue.trim() || isLoading)) {
                      e.currentTarget.style.color = '#3B82F6';
                    }
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer to account for fixed input */}
      <div className="h-20"></div>
    </div>
  );
};

export default OKRChatInterface;