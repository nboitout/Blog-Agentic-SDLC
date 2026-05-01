---
pageClass: interactive-page
aside: false
---

<div class="page-eyebrow-pill">Cursul 03 · Interactiv</div>

# Context Engineering — Banda transportoare

La fiecare schimb, întreaga conversație este retrimisă modelului de la zero. Token-urile de intrare cresc liniar la fiecare turn — astfel **costul cumulat crește pătratic** odată cu lungimea conversației. Acest widget face curba vizibilă și permite compararea modului standard cu cel cu context engineering.

<ConveyorBelt />

---

## Cum se citește acest widget

**Context buffer (stânga):** fiecare bloc reprezintă un schimb adăugat în istoricul conversației. System prompt-ul este întotdeauna la bază.

**Pachetul de pe bandă:** la fiecare turn, întregul context acumulat este trimis procesorului. Observați cum pachetul crește — mai multe token-uri transportate de fiecare dată.

**Procesor:** modelul care primește contextul complet. Numărul de token-uri afișat este ceea ce plătiți ca *intrare* pentru acel turn.

**Multiplicatorul de cost:** cât de mult mai scump este turn-ul curent față de primul. La turn-ul 10 cu setările implicite, este deja ~2,7×. Costul cumulat ajunge atunci la ~5× față de ce ar percepe un model cu cost fix.

**Modul Engineered:** activează un compresor între buffer și procesor, care limitează contextul la ultimele 3 turn-uri, simulând un management deliberat al contextului. Curba verde rămâne plată indiferent cât durează conversația.

**Testați:** setați token-uri/turn la **8.000** (realist pentru sesiuni agentice cu apeluri de instrumente) și observați cum fereastra se umple până la turn-ul 4. Activați apoi modul Engineered.

---

## Compacting vs. context engineering

Cele două concepte sunt legate, dar distincte. Diferența contează: fiecare rezolvă o problemă diferită.

### Compacting — funcționalitatea integrată Anthropic

Când o conversație Claude se apropie de limita ferestrei de context, Claude rezumă automat porțiunea cea mai veche într-o reprezentare compactă, apoi continuă. Această funcționalitate este:

- **Reactivă** — declanșată când fereastra se umple, nu conform programului dumneavoastră
- **Grosieră** — rezumă blocuri întregi de istoric în mod uniform
- **Necontrolată** — nu alegeți ce se comprimă și cum
- **Cu cost propriu** — turn-ul de rezumare consumă el însuși token-uri și costă bani

Compacting-ul rezolvă problema **depășirii ferestrei**: menține conversația activă dincolo de punctul în care istoricul brut ar depăși limita de context.

Nu rezolvă *însă* problema formei costului — parabola pe care o vedeți în widget.

### Context engineering — proactiv, deliberat, chirurgical

Context engineering este practica de a modela intenționat ce intră în fereastra de context *înainte* ca aceasta să devină o problemă. Dumneavoastră decideți:

- **Ce rămâne verbatim** — turn-urile recente care poartă starea curentă a sarcinii
- **Ce se comprimă** — turn-urile anterioare distilate într-un rezumat
- **Ce se elimină complet** — turn-urile care nu mai sunt cauzal relevante pentru următorul răspuns
- **Ce se reformatează** — un fir de depanare de 10 turn-uri transformat într-un obiect de stare structurat de 200 de token-uri

Modul „Engineered" al widget-ului este un model simplificat al acestei ultime abordări: limitează contextul la ultimele 3 turn-uri în loc să crească fără restricții. Tehnicile reale merg mai departe:

| Tehnică | Ce face | Economie de token-uri |
|---|---|---|
| **Scindarea conversației** | Pornire chat nou — parabola se resetează la zero | Reset complet |
| **Rezumare la cerere** | Solicitați modelului să comprime istoricul, porniți un chat nou cu rezumatul | 60–80% |
| **Extragerea stării** | Distilați conversația într-un obiect structurat — `{ rezolvat: [...], sarcina_curenta: "...", restrictii: [...] }` | 90–95% |
| **Retenție selectivă** | Păstrați doar turn-urile cauzal relevante pentru următorul răspuns | Variabil |
| **Memorie externă** | Mutați faptele din fereastra de context într-un sistem de retrieval, injectați doar ce este necesar per turn | Cost de transport aproape zero |

Diferența esențială față de compacting:

> **Compacting** = automat, reactiv, grosier (rezumă turn-urile vechi când fereastra se umple)
>
> **Context engineering** = intenționat, selectiv, chirurgical — controlat de dumneavoastră, la momentul ales, la granularitatea dorită

---

## Economia abonamentelor: calculul pragului de rentabilitate

Dacă abonamentul dumneavoastră lunar este de 20 $ — câte turn-uri consecutive pe zi poate absorbi lab-ul înainte de a pierde bani pe sesiunea dumneavoastră?

**Venit per utilizator per zi:**

$$20\ \$ \div 30 = 0{,}667\ \text{\$/zi}$$

**Formula costului cumulat de intrare** (Sonnet 4.6, intrare la 3 \$/1M token-uri):

$$\text{Cost}(N) = \frac{3 \cdot \left(N \cdot S + P \cdot \frac{N(N+1)}{2}\right)}{10^6}$$

unde $S$ = token-uri system prompt, $P$ = token-uri adăugate per turn (utilizator + asistent), $N$ = număr de turn-uri.

Egalând costul cu 0,667 \$ și rezolvând pentru N, obținem numărul de turn-uri la prag. Variabila critică este dimensiunea reală a system prompt-ului. Widget-ul utilizează 6.000 de token-uri — dar un system prompt real claude.ai (definiții de instrumente, sistem de memorie, reguli de formatare, instrucțiuni de căutare) este mult mai mare. System prompt-ul acestei conversații este probabil între 15.000 și 25.000 de token-uri.

| Dimensiune system prompt | Turn-uri/zi la prag | Ajustat pentru ~50% marjă |
|---|---|---|
| 6k token-uri (implicit widget) | ~12 turn-uri | ~18 turn-uri |
| 15k token-uri (realist) | ~9 turn-uri | ~14 turn-uri |
| 25k token-uri (tooling intensiv) | ~7 turn-uri | ~11 turn-uri |

**Trei concluzii:**

**Prima — modelul funcționează doar pentru că majoritatea utilizatorilor nu se apropie de acest prag.** Utilizatorul median trimite 3–5 mesaje pe zi. Utilizatorii intensivi sunt subvenționați de cei cu utilizare redusă. Abonamentul este un pariu actuarial pe distribuția utilizării.

**A doua — pornirea unui chat nou este context engineering gratuit.** O sesiune lungă de N turn-uri costă echivalentul N² în token-uri de intrare. Două sesiuni de N/2 turn-uri fiecare costă jumătate — parabola se resetează la zero. Nu există nicio justificare tehnică pentru a menține o singură conversație deschisă pentru sarcini fără legătură între ele.

**A treia — fereastra glisantă de ~44k token-uri pe 5 ore nu este arbitrară.** Este aproximativ rata limită care menține costul așteptat per utilizator sub venitul din abonament, presupunând un mix mediu de utilizatori ușori și intensivi. Această limită este un gardian actuarial, nu tehnic.

**Implicația incomodă:** interesul lab-ului și al dumneavoastră sunt perfect aliniate — amândoi doriți un context mai scurt, mai dens, mai bine structurat. Context engineering nu este un truc de optimizare. Este o consecință directă a modului în care funcționează atenția transformer și a structurii economice a abonamentelor.

---

*Înapoi la [Cursul 03 — Context Engineering](/ro/lectures/lecture-03-context-engineering/)*
