---
title: 'Summer School #2: Observations on Ontology'
description: 'Die "Lesbarkeit" einer Ontologie beeinflusst die Qualität der KI-Ergebnisse erheblich. Was bedeutet Lesbarkeit für eine KI?'
pubDate: 2024-07-25
author: 'Andreas Sigloch'
image: '/images/1723390289485.jpeg'
tags: ['Summer School', 'KI', 'Ontology', 'Systems Engineering']
series: 'Summer School'
draft: false
linkedinStatus: 'published'
---

## Die Erkenntnis

If you want to use an AI to create, modify or question data, **an ontology is crucial**.

But I was surprised by the impact of the ontology's **"readability"** for getting good results from my conversations with the AI.

## Was bedeutet "Lesbarkeit"?

### 1. Komplexität der Struktur

Your frequently used data objects should have **dedicated Nodes** instead of working with combinations of nodes & properties or attributes.

### 2. Selbsterklärende Namen

The data objects should have **self-explaining names**. The closer the names are to natural language, the better the translation to a formal database request.

## Warum funktioniert das?

My best guess: The AI (ChatGPT) is specifically trained on handling **natural language**.

So if it is readable for humans, it is readable for AI as well.

Plus: Overwriting the impact of the AI's training data with your own complex ontology plus rules might be like swimming against the stream.

---

*I am happy to discuss and share my prompts: [Contact](/#kontakt)*
