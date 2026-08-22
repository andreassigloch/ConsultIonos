/**
 * graphcode-Demo (City People Mover) — Metadaten der statischen Demo
 * @author andreas@siglochconsulting.de
 *
 * Quelle der Dokumente: graphcodedemo/docs/views/*.md (aus dem Modell generiert,
 * nicht von Hand geschrieben). Kopiert nach src/data/graphcode-demo/.
 * Stand: graphcode 0.17.0, Modell-Snapshot vom 22.08.2026.
 */

export interface DemoDoc {
  /** Dateiname ohne .md in src/data/graphcode-demo/ = URL-Segment */
  slug: string;
  /** Deutscher Titel für Navigation und Seitenkopf */
  title: string;
  /** Was in dem Dokument steht, ein Satz */
  summary: string;
}

/** Die 15 aus dem Modell gedruckten Dokumente, in Lesereihenfolge. */
export const demoDocs: DemoDoc[] = [
  { slug: 'srs', title: 'Anforderungsspezifikation (SRS)', summary: 'Alle 64 Anforderungen unter dem Element, das sie erfüllt — Akteure, Anwendungsfälle, Funktionen, Bausteine.' },
  { slug: 'conops', title: 'Betriebskonzept (ConOps)', summary: 'Betriebsarten, Nutzergruppen, Szenarien und Randbedingungen des Systems.' },
  { slug: 'architecture', title: 'Architektur und Allokation (SDD)', summary: 'Welche Funktion in welchem Baustein sitzt — sieben Bausteine, 24 Funktionen.' },
  { slug: 'icd', title: 'Schnittstellendokument (ICD)', summary: '32 Datenflüsse mit Protokoll, Format und beiden Enden.' },
  { slug: 'nfr', title: 'NFR-Register', summary: 'Sechs nicht-funktionale Anforderungen mit Budget und dem Test, der sie prüft.' },
  { slug: 'rtm', title: 'Anforderungs-Test-Matrix (RTM)', summary: 'Jede Anforderung mit dem Test, der sie widerlegen würde — und den Lücken.' },
  { slug: 'testconcept', title: 'Testkonzept', summary: 'Testpyramide über 41 Tests — und die berechnete Lücke: 0 von 44 Funktionsverbindungen integrationsgetestet.' },
  { slug: 'testmatrix', title: 'Testmatrix (VCRM)', summary: 'Nachweisverfahren je Anforderung und Ergebnisstand je Test — durchweg offen.' },
  { slug: 'intplan', title: 'Integrations- und Testplan', summary: 'Leer — entsteht erst mit dem Implementierungsplan.' },
  { slug: 'implplan', title: 'Implementierungsplan', summary: 'Leer — Arbeitspakete werden erst zum Implementierungsstart aus dem Modell geschnitten.' },
  { slug: 'fmea', title: 'FMEA (Risikoanalyse)', summary: '16 Fehlermodi mit Schwere, Auftreten, Entdeckung, RPZ und Gegenmaßnahme.' },
  { slug: 'trade', title: 'Trade Study', summary: 'Leer — im Konzeptstand ist noch keine Entwurfsentscheidung mit verworfener Alternative im Modell.' },
  { slug: 'changelog', title: 'Änderungsprotokoll', summary: 'Leer — 0 Änderungsanträge, nach Meilenstein gruppiert.' },
  { slug: 'cr-list', title: 'Change-Request-Liste', summary: 'Leer — kein Änderungsantrag im Modell.' },
  { slug: 'references', title: 'Elementverzeichnis', summary: 'Alle 219 Einträge mit ihren Verknüpfungen — das Modell als Nachschlagewerk.' },
];

/** Aus dem Modell-Snapshot gezählt (docs/graph/graphcodedemo.graph.json). */
export const demoStats = {
  elements: 219,
  traces: 402,
  byType: [
    { label: 'System', count: 1 },
    { label: 'Anwendungsfälle', count: 7 },
    { label: 'Akteure', count: 4 },
    { label: 'Wirkketten', count: 7 },
    { label: 'Funktionen', count: 24 },
    { label: 'Bausteine', count: 7 },
    { label: 'Datenflüsse', count: 32 },
    { label: 'Datenformate', count: 32 },
    { label: 'Anforderungen', count: 64 },
    { label: 'Tests', count: 41 },
  ],
  risks: 16,
  tests: 41,
  testsWithResult: 0,
  gatesPassed: 3,
  gatesTotal: 8,
  elementsWithErrors: 0,
  graphcodeVersion: '0.17.0',
  snapshotDate: '22.08.2026',
};
