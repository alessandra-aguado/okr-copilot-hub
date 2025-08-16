import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, FileText, Paperclip } from 'lucide-react';

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
    userInput: "Los OKRs de unidad superior con los que me debo alinear son los de mi empresa, Attach. Aquí te los comparto: O: Impulsar una evolución organizacional que eleve nuestro estándar operativo y acelere nuestro crecimiento. KR1: Aumentar la satisfacción promedio del cliente de 4.1 a 4.5 KR2: Elevar la rentabilidad promedio de cuentas y proyectos Alliance de 32% a 37% KR3: Incrementar el índice de productividad global (IPG) de 1.17 a 1.5 KR4: Evolucionar la madurez de los CoEs en 15%, según el assessment del modelo operativo organizacional.",
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

Puedes responder por partes si gustas, estoy listo para leerte`,
      suggestions: []
    }
  },
  {
    userInput: "1.Estamos aplicando IA en procesos de gestión de reportes",
    consultantResponse: {
      content: `¡Gracias por compartir tus respuestas!

Con base en lo que me diste, he reformulado tus KR's para que tengan estructura clara, métricas y alineación directa con tu objetivo.

📊 Panel de Análisis – KR's reformulados

KR's Reformulados:

1. Reducir en [%] el costo de procesos clave mediante iniciativas de IA, reflejado en el [sistema de medición].

2. Incrementar el nivel promedio de madurez en Gestión de Proyectos de [%] a [%] según assessment institucional.

3. Alcanzar un [%] de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización.

4. Lograr [%] de adopción del modelo de Transformación Cultural según [sistema de medición].

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

Comparteme la información que falta en cada uno:

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

1. Reducir en 10% el costo de procesos clave mediante iniciativas de IA, reflejado en el IPG.

2. Incrementar el nivel promedio de madurez en Gestión de Proyectos de 20% a 40% según assessment institucional.

3. Alcanzar un 90% de adopción efectiva del Framework ACIF en las unidades estratégicas de la organización.

4. Lograr 70% de adopción del modelo de Transformación Cultural según índice de implementación institucional.

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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [conversationStep, setConversationStep] = useState(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with first message
  useEffect(() => {
    if (conversationStep === 0) {
      const firstMessage: ChatMessage = {
        id: '1',
        type: 'consultant',
        content: conversationFlow[0].consultantResponse.content,
        suggestions: conversationFlow[0].consultantResponse.suggestions,
        timestamp: new Date()
      };
      setMessages([firstMessage]);
      setIsWaitingForInput(true);
    }
  }, [conversationStep]);

  const handleSendMessage = (content: string) => {
    if (!content.trim() && attachedFiles.length === 0) return;

    // Create user message with file attachments
    let messageContent = content;
    if (attachedFiles.length > 0) {
      const fileList = attachedFiles.map(file => `[📄 ${file.name}]`).join(' ');
      messageContent = content ? `${content}\n${fileList}` : fileList;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);

    // Check conversation flow and respond accordingly
    const currentFlow = conversationFlow[conversationStep];
    if (currentFlow && content.toLowerCase().includes(currentFlow.userInput.toLowerCase())) {
      // Move to next step
      if (conversationStep < conversationFlow.length - 1) {
        setTimeout(() => {
          const nextStep = conversationStep + 1;
          const consultantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'consultant',
            content: conversationFlow[nextStep].consultantResponse.content,
            suggestions: conversationFlow[nextStep].consultantResponse.suggestions,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, consultantMessage]);
          setConversationStep(nextStep);
        }, 1000);
      }
    } else {
      // Handle other inputs with generic response
      setTimeout(() => {
        const consultantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'consultant',
          content: "Entiendo. ¿Podrías proporcionarme más detalles para poder ayudarte mejor?",
          suggestions: [],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, consultantMessage]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground mb-2">OKR Consultant</h1>
        <p 
          className="text-muted-foreground font-normal" 
          style={{ 
            fontSize: '16px', 
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 400 
          }}
        >
          Tu asistente especializado en la construcción de OKRs estratégicos
        </p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Message */}
              <div
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[65%] ${
                    message.type === 'user'
                      ? 'bg-[#E0F2FE] text-foreground rounded-xl px-4 py-3'
                      : 'bg-background text-foreground'
                  }`}
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: message.type === 'user' ? '1.5' : '1.6'
                  }}
                >
                  <div className="whitespace-pre-wrap text-foreground">
                    {message.content}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {message.type === 'consultant' && message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {message.suggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-foreground border-transparent rounded-[20px]"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '15px',
                        padding: '10px 16px'
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        {/* File attachments preview */}
        {attachedFiles.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-3 max-w-[800px] mx-auto w-[90%]">
          <button
            onClick={handleFileAttach}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje…"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              className="pr-12 py-3 min-h-[44px] rounded-[22px] border-[#E5E7EB] bg-background focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '15px'
              }}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#3B82F6] hover:text-[#2563EB] transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        />
      </div>
    </div>
  );
};

export default OKRChatInterface;