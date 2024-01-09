### Indice template modello analisi

1\. Introduzione **fatta**  
2\. Sistema corrente **fatto**  
3\. Sistema proposto **fatto**  
3.1 Panoramica (obiettivi del sistema) **fatta**  
3.2 Requisiti funzionali **fatta**  
3.3 Requisiti non funzionali **fatta**  
3.4 Vincoli (“Pseudo requisiti”) **fatta**  
3.5 Modelli del sistema  
3.5.1 Utenti del sistema (descrizione degli utenti, dei ruoli e del contesto di utilizzo) **da fare**  
3.5.2 Scenari (con descrizione degli utenti, dei ruoli e del contesto di utilizzo)  **turista: fatta**  
3.5.3 Modello casi d’uso **turista: fatta**  
3.5.4 Modello ad oggetti   
3.5.4.1 Dizionario dei dati   
3.5.4.2 Diagrammi delle classi  
3.5.5 Modelli dinamici  
3.5.6 Interfaccia utente (vedi file “indice_template_interfaccia_utente.docx”)   
4\. Glossario

**Indice documento di progettazione**

1.  Introduzione  
    1.1 Scopo del sistema  
    1.2 Obiettivi di progettazione  
    1.3 Definizioni, acronimi e abbreviazioni  
    1.4 Riferimenti  
    1.5 Panoramica
2.  Sistema corrente  
3.  Sistema proposto  
    3.1 Panoramica  
    3.2 Decomposizione del sistema  
    3.3 Hardware/Software mappig  
    3.4 Gestione dei dati persistenti  
    3.5 Controllo accessi e sicurezza  
    3.6 Decisioni sul flusso di controllo globale  
    3.7 Condizioni limite
4.  Servizi del sottosistema
5.  Glossario

# 1\. INTRODUZIONE

Organizzare un itinerario di  viaggio implica l'uso di molteplici siti e applicazioni, per la gestione dei posto da visitare, per vedere cosa offre la città interessata, scoprire cosa c'è da vedere, prenotare ristoranti, musei, controllare le email per le prenotazioni ecc... Questo può diventare molto stressante sopratutto se si è in viaggio molti giorni. Tripper viene incontro a questo tipo di esigenze, riunire in una sola piattaforma tutto ciò di cui il turista ha bisogno, dalla creazione di un'itinerario alla gestione delle prenotazioni.

# 2\. SISTEMA CORRENTE

La scoperta dei requisiti e il conseguente sviluppo del sistema introdotto parte da zero e non si basa su sistemi precedentemente esistenti. Si parla quindi di Greenfield Engineering.

# 3\. SISTEMA PROPOSTO

## 3.1 PANORAMICA

Il sistema TRIPPER rappresenta una piattaforma progettata per mettere in comunicazione i turisti con le attività turistiche registrate, permettendo ai turisti di avere una panoramica delle città che visitano e gestire i propri itinerari e le proprie prenotazioni e alle attività turistiche di farsi conoscere in modo semplice e offrire i loro servizi e poter offrire la possibilità di una sponsorizzazione sulla piattaforma. Tripper è diviso in vari portali ognuno costruito e progettato per soddisfare le esigenze dalla categoria di attività a cui il proprio portale è rivolto.

## 3.2 REQUISITI FUNZIONALI

Di seguito vengono riportati i requisiti funzionali che ogni tipo di attore può fare.

- **Turisti:**
    
    - possono cercare le città da visitare.
    - visualizzare su una mappa i luoghi da visitare e le loro informazioni.
    - creare itinerari di viaggio e salvarli sul proprio dispositivo e in cloud.
    - visualizzare gli itinerari salvati.
    - registrarsi alla piattaforma con email e password.
    - aggiungere tappe personalizzate.
    - gli itinerari devono poter gestire più giorni per uno stesso viaggio.
    - prenotare i vari servizi legati alle attività presenti su tripper.
    - gestione prenotazione e ticket.
- **ristoratori:**
    
    - registrazione sulla piattaforma.
    - attivazione / disattivazione sponsorizzazione.
    - aggiungere / modificare il menu.
    - gestione delle prenotazioni tramite il portale ristoratori
- **enti espositivi:**
    
    - registrazione sulla piattaforma.
    - attivazione / disattivazione sponsorizzazione.
    - aggiungere / modificare il prezzo d'ingresso.
    - aggiungere in evidenza una nuova mostra.
    - vendita dei ticket tramite tramite il portale turisti.
- **parchi divertimenti :**
    
    - registrazione sulla piattaforma.
    - attivazione / disattivazione sponsorizzazione.
    - aggiungere / modificare il prezzo d'ingresso.
    - vendita dei ticket tramite tramite il portale turisti.
- **istituzioni zoologiche :**
    
    - registrazione sulla piattaforma.
    - attivazione / disattivazione sponsorizzazione.
    - aggiungere / modificare il prezzo d'ingresso.
    - vendita dei ticket tramite tramite il portale turisti.
    - aggiungere e modificare la calendarizzazione degli spettaccoli/eventi.

&nbsp;

## 3.3 REQUISITI NON FUNZIONALI

- autentificazione a due fattori per turisti e attività.
- affidabilità dei dati forniti in tempo reale in caso di modifica.
- conservazione sicura e affidabile degli itinerari in cloud.
- sicurezza dei dati bancari.

&nbsp;

# 3.4 VINCOLI

\- tutti i portali devono essere disponibili sia su desktop che per mobile.

&nbsp;

# **3.5 MODELLI DEL SISTEMA**

## **3.5.1 UTENTI DEL SISTEMA**

- **turista :** il turista userà l'app per organizzare i propri viaggi , l'accesso e l'utilizzo al portale turistico sarà completamente gratuito ma potrà salvare l'itinerario ed effettuare prenotazioni solo se registrato. La pianificazione dell'itinerario deve poter avvenire anche se l'utente non è registrato, così da fare da esca agli utenti del portale turista che non sono registrati ma hanno già pianificato il proprio itinerario  invitandoli alla registrazione per sbloccare le altre funzionalità sopracitate. Il turista dovrà pagare un costo aggiuntivo di transazione al momento della prenotazione di una tappa sul proprio itinerario avvenuto tramite il portale turista.
- **enti espositivi:**
- **parchi divertimenti:**
- **zoo e acquari:**

&nbsp;

## 3.5.2 SCENARI

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME SCENARIO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">creazioneItinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista nella home page utilizza il caso d'uso creaItinerarioVuoto.</li><li class="jop-noMdConv">il portale porterà il turista su una nuova pagina e caricherà una mappa della città da visitare e un itinerario vuoto con le date selezionate.</li><li class="jop-noMdConv">il turista può scegliere che giorno dell'itinerario pianificare che viene aperto.</li><li class="jop-noMdConv">sceglie che tipo di attività visualizzare.</li><li class="jop-noMdConv">vengono caricate sulla pagina le attività del tipo scelto.</li><li class="jop-noMdConv">attraverso il caso d'uso infoAttività può informarsi sull'attività selezionata e la sua posizione sulla mappa.</li><li class="jop-noMdConv">il turista utilizza il caso d'uso aggiuntaTappa o aggiuntaTappaPersonalizzata per aggiungere una nuova tappa al giorno aperto.</li><li class="jop-noMdConv">l'attività viene aggiunta all'itinerario diventando una tappa.</li><li class="jop-noMdConv">il turista ripete i passi 3-8 fino&nbsp; quando non è soddisfatto del suo itinerario</li><li class="jop-noMdConv">utilizzerà il caso d'uso salvaItinerario, se non è loggato gli verrà chiesta prima la registrazione sul portale con il caso d'uso registrazioneTurista.</li></ol></td></tr></tbody></table>

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME SCENARIO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">visualizzaItinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista dalla home page seleziona "i miei itinerari".</li><li class="jop-noMdConv">il portale sposta il turista su una nuova pagina e caricherà una lista degli itinerari salvati e le prenotazioni fatte e i loro stato.</li><li class="jop-noMdConv">il turista apre la sezione per aprire un itinerario e visualizzarne le tappe.</li></ol></td></tr></tbody></table>

&nbsp;

&nbsp;

## 3.5.3 MODELLO CASI D'USO

<table border="1" style="width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><p>creaItinerarioVuoto.</p></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><p>turista</p></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere nella home page</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">inserisce il nome della città da visitare nel campo di ricerca</li><li class="jop-noMdConv">seleziona le date in cui visiterà la città</li><li class="jop-noMdConv">preme invio</li><li class="jop-noMdConv">il portale turisti porterà il turista sulla pagina di creazione itinerari</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">il turista viene portato sulla pagina per creare un nuovo itinerario o riceve un messaggio di errore</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere connessi ad internet&nbsp;</td></tr></tbody></table>

&nbsp;

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">infoAttività</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">sulla pagina devono esserci delle attività</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista scegli l'attività che gli interessa</li><li class="jop-noMdConv">preme sul tasto "dove sono"</li><li class="jop-noMdConv">il posto viene centrato e zommato sulla mappa</li><li class="jop-noMdConv">il turista clicca sul marker del posto scelto</li><li class="jop-noMdConv">viene aperto un popup con le informazioni dell'attività</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">il popup viene caricato in modo corretto</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">connessione ad internet presente</td></tr></tbody></table>

&nbsp;

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">aggiuntaTappa</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">sulla pagina devono esserci delle attività, il giorno in cui aggiungere l'attività deve essere aperto&nbsp;</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista selezione l'attività che vuol aggiungere al suo itinerario</li><li class="jop-noMdConv">trascina l'attività nel giorno aperto</li><li class="jop-noMdConv">lascia l'attività</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">l'attività viene aggiunta all'itinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"></td></tr></tbody></table>

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">aggiuntaTappaPersonalizzata</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">il giorno in cui aggiungere l'attività deve essere aperto&nbsp;</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista preme sul pulsante per aggiungere la tappa</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">la tappa viene aggiunta all'itinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"></td></tr></tbody></table>

&nbsp;

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">salvaItinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere loggati sul portale turistico e aver creato l'itinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista preme il tasto salva.</li><li class="jop-noMdConv">il portale salverà l'itinerario sull'account del turista</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">l'itinerario è stato correttamente salvato.</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere connessi ad internet.</td></tr></tbody></table>

&nbsp;

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">salvaItinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere loggati sul portale turistico e aver creato l'itinerario</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista preme il tasto salva.</li><li class="jop-noMdConv">il portale salverà l'itinerario sull'account del turista</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">l'itinerario è stato correttamente salvato.</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere connessi ad internet.</td></tr></tbody></table>

&nbsp;

&nbsp;

<table border="1" style="border-collapse: collapse; width: 100.04%;" class="jop-noMdConv"><tbody class="jop-noMdConv"><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">NOME CASO D'USO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">registrazioneTurista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">ATTORI PRINCIPALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">turista</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONE D'INGRESSO</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">avere il portale turista aperto</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">FLUSSO DI EVENTI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv"><ol class="jop-noMdConv"><li class="jop-noMdConv">il turista naviga nella sezione della registrazione</li><li class="jop-noMdConv">compila i campi di registrazione inserendo email, nome, cognome password e i dati della carta di credito.</li><li class="jop-noMdConv">preme su registra</li></ol></td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI D'USCITA</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">il turista è stato registrato</td></tr><tr class="jop-noMdConv"><td style="width: 46.8972%;" class="jop-noMdConv"><strong class="jop-noMdConv">CONDIZIONI SPECIALI</strong></td><td style="width: 46.8972%;" class="jop-noMdConv">essere connessi ad internet.</td></tr></tbody></table>

&nbsp;

## 3.5.4 MODELLO AD OGGETTI

Il modello a oggetti permette di descrivere il sistema in termini di classi di oggetti  quindi, in questo paragrafo verranno presentate le astrazioni del sistema che permettono agli ai turisti e attività di usare la piattaforma.

&nbsp;

### 3.5.4.1 DIZIONARIO DEI DATI

**elenco oggetti entity**

|     |     |
| --- | --- |
| TURISTA | l'utente che una volta registrato potrà creare e salvare itinerari e gestire le prenotazioni che effettua alle varie attività tramite il portale turista. |
| RISTORATORE | l'utente che possiede un ristorante o un fast food ed è registrato al proprio portale. |
| ENTE ESPOSITIVE | l'utente che possiede un museo, una mostra o una galleria d'arte ed è registrato al proprio portale. |
| PARCO DIVERTIMENTI | l'utente che possiede un parco divertimento o un parco acquatico o un parco a tema ed è registrato al proprio portale. |
| ISTITUZIONI ZOOLOGICHE | l'utente che possiede uno zoo, un acquario ed è registrato al proprio portale.. |
| PORTALE | client destinato ad una precisa tipologia di attori e utenti. Ogni attore avrà un portale dedicato. |

&nbsp;

### **elenco oggetti boundary**

camilla

&nbsp;

### **elenco oggetti controll**

camilla

&nbsp;

### **3.5.4.2 DIAGRAMMA DELLE CLASSI**

tutti assieme

**Diagramma degli stati turista:**

![digramma stati turista.png](../_resources/digramma%20stati%20turista.png)

&nbsp;

## **3.5.5 MODELLI DINAMICI**

ho bisogno di cami

# 4 GLOSSARIO

- portale : client dedicato ad uno specifico attore.
- attività : tutti gli attori che non sono turisti sono definite attività commerciali, un'attività.
- tappa : attività giunta dal turista al proprio itinerario. la tappa è formata dal posto da visitare e  ora decisa dall'utente.
- tappa personalizzata : textbox libera che il turista può aggiungere come tappa al proprio itinerario e ora decisa dall'utente.
- enti espositivi : attori che nella vita reale rappresentano musei, gallerie d'arte, mostre.
- istituzioni zoologiche :  attori che nella vita reale rappresentano zoo, acquari, zoo-safari o fattorie didattiche.
- ticket : biglietto d'ingresso acquistato dal turista e venduto da una tappa come documento d'ingresso necessario per accedere al servizio prenotato.
- itinerario vuoto : itinerario appena creato dal portale turista con le informazioni di viaggio immesse dal turista
- itinerario pianificato : itinerario contenente le tappe del turista.
- itinerario salvato : itinerario pianificato salvato sul proprio account dal turista.
- dati di viaggi : composto dal nome della città da visitare e dal range di date che l'utente ha deciso di spendere in quella città.
- aperto : definisce lo stato di un elemento come modificabile dall'utente.

&nbsp;