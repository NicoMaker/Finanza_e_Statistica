# Cartella `data/`

Tutti i dati "fissi" del sito stanno qui in JSON, non più dentro i file JS.
Sono caricati da `js/core/data.js`; gli script che li usano partono da `js/core/boot.js`
(solo dopo che i JSON sono pronti). Per cambiare un valore basta modificare il JSON.

> Il sito va aperto da un server (Live Server, GitHub Pages…): aprendo `index.html` come file
> il browser blocca la lettura dei JSON e il sito mostra un messaggio d'errore.

| File | Contenuto |
|---|---|
| `config.json` | link dei loghi chiaro/scuro (header, intro, favicon), link bandiere (`{iso}`), API cambi (`{valuta}`) e valute principali |
| `borsa-robot.json` | parametri del robot: capitale iniziale/minimo, stop loss, finestra di acquisto, importo minimo, limiti di storico/diario, probabilità di attesa, intervalli (ms), messaggi di attesa |
| `borsa-titoli.json` | titoli negoziabili: `symbol`, `name`, `price` iniziale, `volatility` |
| `borsa-strategie.json` | le 3 strategie: `etichetta`, `name`, `desc`, `tags`, `maxPositions`, `cashTarget`, `buyThreshold` (% calo per comprare), `sellThreshold` (% guadagno per vendere), `tradeSize` (quota di capitale per operazione) |
| `nazioni.json` | nazioni: `iso` (bandiera), `nome`, `valuta` |
| `gruppi-home.json` | sezioni della home: `nome`, `icona`, `colore`, `schede` |
| `schede.json` | `home` (titolo e descrizione dell'intestazione) e `schede` (icona, colore, descrizione di ogni scheda) |
| `ricerca-opzioni.json` | voci della ricerca Ctrl+K: `scheda`, `titolo`, `descrizione`, `valori` (campi da impostare), `campo` (campo da evidenziare) |
| `bandiere-svg.json` | bandiere SVG dei tipi di ammortamento (fr, it, de, am) |
| `icone-form.json` | icone dei pulsanti segmentati dei form, per `scheda.campo` |
