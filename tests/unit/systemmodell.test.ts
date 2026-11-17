/**
 * Systemmodell-Snapshot: Zerlegung in Style, Inhalt, Script (CR-022)
 * @author andreas@siglochconsulting.de
 */

import { describe, test, expect } from 'vitest';
import { splitSystemmodell, systemmodell } from '../../src/lib/systemmodell';

describe('splitSystemmodell am echten Snapshot', () => {
  test('liefert Titel, Design-Style, alle zwölf Abschnitte und das Render-Script', () => {
    expect(systemmodell.title).toBe('Das Systemmodell in Bildern');
    expect(systemmodell.css).toContain('--font-display');
    expect(systemmodell.body.startsWith('<div class="wrap">')).toBe(true);
    expect(systemmodell.body.match(/<section class="bs"/g)).toHaveLength(12);
    expect(systemmodell.script).toContain("getElementById('map')");
    expect(systemmodell.body).not.toContain('<script');
  });

  test('enthält keine Google-Fonts-Einbindung mehr', () => {
    expect(systemmodell.css + systemmodell.body).not.toContain('fonts.googleapis');
  });
});

describe('splitSystemmodell an Fehlerfällen', () => {
  const ok =
    '<title>T</title><style>a{}</style><style>:root{--font-display:x}</style>' +
    '<div class="wrap">X</div><script>run()</script>';

  test('zerlegt eine minimale Seite', () => {
    expect(splitSystemmodell(ok)).toEqual({
      title: 'T',
      css: ':root{--font-display:x}',
      body: '<div class="wrap">X</div>',
      script: 'run()',
    });
  });

  test('bricht ab, wenn der Inhalt fehlt', () => {
    expect(() => splitSystemmodell(ok.replace('class="wrap"', 'class="x"'))).toThrow(/nicht gefunden/);
  });

  test('bricht ab bei externer Ressource im Inhalt', () => {
    const ext = ok.replace('X</div>', 'X<link href="https://fonts.googleapis.com/css2"></div>');
    expect(() => splitSystemmodell(ext)).toThrow(/DSGVO/);
  });
});
