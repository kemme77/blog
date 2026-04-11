# Kemme's-Blog

## Designer-Notes

- Farben: Erd-Töne (Schwarz, Weiss, Braun, Grün, Grau)
- Hintergrund: neutral (schwarz-weiss), dark-mode kompatibel
- Vordergrund: Natur-Elemente (grün (bevorzugt), grau, braun/beige)

- Home: Landing Page
- Seiten: 1. Career, 2. Hobbies, 3. Travel, 4. Profile

- Career: Aktueller Stand oben zusammengefasst, darunter Blog Einträge zu Updates
- Hobbies: Aktueller Stand oben zusammengefasst, darunter Blog Einträge zu Updates
- Travel: Reine Blog Beiträge mit Fotos, Bewertung, Reiseroute. Ausblick kommende Reisen
- Profile: Reine Infoseite, keine Blogs, Links zu Social Media

- Sprache: Englisch

- UI Komponenten von Shadcn UI

- Suchfunktion nur für Blogbeiträge

- Blog-Posts sind anklickbar, eigene Seite zum Post öffnet sich, automatisches Datum wann erstellt und wann geändert

- Login Funktion zum Erstellen, Bearbeiten und Löschen der Blog-Posts

- Auth.js + Prisma Adapter eingebaut
- User- und Session-Modelle ergänzt
- Admin-Login auf DB-User umgestellt
- Rollenmodell (Admin) hinzugefügt
- Rate Limiting 

Next Steps:

- Erstellen von Accounts

Phase 1: Stabilität und Security zuerst

Rate Limiting auf einen robusteren Store umstellen, idealerweise Redis oder DB-basiert, damit Neustarts und mehrere Instanzen kein Problem sind.
IP-Erkennung sauber aus Request-Headern ableiten statt auf einen Platzhalter zu setzen.
Login-Versuche protokollieren, aber ohne sensible Daten im Log.
Secrets und Credentials vollständig auditieren, damit keine echten Werte mehr in README, Beispiel-Dateien oder Code landen.
Session-Strategie finalisieren und auf das gewünschte Verhalten festziehen.
Schutz für Admin-Routen und Delete-/Update-Aktionen noch einmal gegenprüfen.
Ergebnis: belastbare Basis für echte Nutzung, weniger Überraschungen bei Deployments.
Phase 2: Content-Workflow verbessern

Draft-Status für Posts einführen, damit Inhalte vorbereitet und erst später veröffentlicht werden können.
Slug-Generierung automatisieren und kollisionssicher machen.
Bessere Editiermaske für Posts bauen, vor allem für längere Inhalte.
Bild-Handling ausbauen, damit Uploads statt Platzhalterbilder möglich sind.
Tags, Route, Rating und Kategorie im Formular klarer strukturieren.
Vorlagen für häufige Post-Typen anlegen, etwa Karriere, Reise, Hobbys.
Ergebnis: deutlich besserer Admin-Workflow, weniger manuelle Pflege.
Phase 3: UX und Layout schärfen

Navigation klarer machen, besonders auf Mobile.
Aktive Zustände und Seitenkontext sichtbarer darstellen.
Karten, Abstände und Typografie auf Übersichtsseiten einheitlicher machen.
Empty States und Ladezustände ergänzen.
Suchseite verbessern, damit Ergebnisse besser gefiltert und visuell verständlicher werden.
Detailseiten stärker gliedern, damit Text, Metadaten und Medien sauberer getrennt sind.
Ergebnis: Website wirkt reifer, ruhiger und klarer bedienbar.
Phase 4: Sichtbarkeit und SEO

Sitemap und robots.txt prüfen oder ergänzen.
Open-Graph- und Meta-Daten pro Seite sauber ausspielen.
RSS-Feed hinzufügen.
Suchmaschinenfreundliche Seitenstruktur finalisieren.
Interne Verlinkung zwischen Posts, Kategorien und Profil stärken.
Ergebnis: bessere Auffindbarkeit und professionellerer Außenauftritt.
Phase 5: Performance und Qualität

Bilder weiter optimieren, vor allem Größen, sizes und Priorisierung.
Unnötige Re-Renders und doppelten Datenzugriff reduzieren.
Testabdeckung für Auth, CRUD und zentrale Flows ergänzen.
Fehlerzustände und Validierung systematisch absichern.
Optional: Monitoring oder einfache Telemetrie für Produktionsfehler.
Ergebnis: stabilere Anwendung mit besserer Wartbarkeit.