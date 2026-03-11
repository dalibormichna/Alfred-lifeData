# Alfred-lifeData
Slouží ke sběru dat o financích a energiích z domácnosti a jejich vyhodnocování.
# MůjOS — Osobní datová platforma

> Lehká, soukromá, offline-first platforma pro správu osobních a rodinných dat.  
> Žádný cloud. Žádné předplatné. Vše ve vašem zařízení.

-----

## Co je MůjOS?

MůjOS je sada modulárních webových aplikací sdílejících společnou datovou vrstvu, exportní engine a jednotné uživatelské rozhraní. Funguje jako progresivní webová aplikace (PWA) — přidáte ji na plochu iPhonu a chová se jako nativní appka, bez App Store a bez poplatků.

Projekt vznikl z praktické potřeby nahradit roztříštěné Excel soubory a papírové záznamy jedním přehledným nástrojem dostupným vždy a všude — ale bez závislosti na externích službách.

-----

## Filozofie

|Princip                         |Popis                                                             |
|--------------------------------|------------------------------------------------------------------|
|**Offline first**               |Data žijí v zařízení, ne v cloudu. Aplikace funguje bez připojení.|
|**Žádný vendor lock-in**        |Export do standardních formátů (JSON, XLSX). Data jsou vždy vaše. |
|**Jedna platforma, více modulů**|Sdílená DB, sdílený export, jednotný design.                      |
|**Minimální závislosti**        |Jeden HTML soubor, žádný backend, žádná instalace.                |
|**Soukromí**                    |Na server se neodesílá nic. GitHub hostuje pouze kód, ne data.    |

-----

## Architektura

```
MůjOS (index.html)
│
├── UI Shell              — navigace, header, routing mezi moduly
│
├── Sdílená DB vrstva     — IndexedDB "mojos_db"
│   ├── investice         — object store
│   ├── ucetnictvi        — object store
│   ├── auto              — object store
│   ├── elektrina         — object store
│   ├── kondice           — object store
│   ├── activity_log      — sdílený log aktivit napříč moduly
│   └── settings          — globální nastavení
│
├── Globální API          — window.MojOS.*
│   ├── dbAdd / dbGet / dbPut / dbDelete / dbGetAll
│   ├── exportToExcel()   — multi-sheet XLSX export (SheetJS)
│   ├── exportToJSON()    — záloha / přenos mezi zařízeními
│   ├── importFromJSON()  — obnova / synchronizace
│   └── logActivity()     — zápis do sdíleného activity feedu
│
└── Moduly
    ├── 💰 Investice       — sledování investičních objemů, kvartální plány
    ├── 🏦 Účetnictví      — domácí příjmy a výdaje, kategorie
    ├── 🚗 Auto            — tankování, servis, STK, náklady na km
    ├── ⚡ Elektřina       — odečty elektroměru, spotřeba, tarify
    └── 🧠 Kondice         — denní záznamy psychické pohody
```

-----

## Moduly

### 💰 Investice

Sledování investičních objemů pro investičního poradce. Automatický výpočet settlement date (české fondy +3 dny, zahraniční +5 dní), rozdělení objemů solo vs. spoluzajištěné obchody, oddělení jednorázových a pravidelných investic, kvartální plán a jeho plnění.

### 🏦 Domácí účetnictví

Evidence příjmů a výdajů domácnosti s kategorizací. Měsíční přehledy, sledování rozpočtu, srovnání období.

### 🚗 Auto

Záznamy o tankování (spotřeba l/100 km), servisní historie, pojištění, STK, celkové náklady vlastnictví vozidla.

### ⚡ Elektřina

Pravidelné odečty elektroměru, výpočet spotřeby za období, srovnání s předchozími roky, sledování tarifu.

### 🧠 Kondice

Denní záznamy psychické pohody s hodnocením nálady, energií a poznámkami. Trend v čase, identifikace vzorců.

-----

## Synchronizace dat

Protože aplikace běží lokálně v prohlížeči, data nesdílí automaticky mezi zařízeními. Synchronizace probíhá ručně přes export/import:

```
iPhone  →  Export JSON  →  AirDrop / iCloud / Email  →  PC
PC      →  Import JSON  →  Sloučení dat  →  Hotovo
```

**Export** vytvoří jeden JSON soubor obsahující veškerá data ze všech modulů včetně časových razítek.

**Import** data sloučí — nevymaže existující záznamy, pouze doplní chybějící.

-----

## Technický stack

|Vrstva             |Technologie                                 |
|-------------------|--------------------------------------------|
|Aplikační shell    |HTML5, CSS3, vanilla JavaScript             |
|Lokální databáze   |IndexedDB (vestavěná v prohlížeči)          |
|Export tabulek     |SheetJS (XLSX) — načítá se pouze při exportu|
|Hosting            |GitHub Pages (HTTPS, zdarma)                |
|Instalace na iPhone|PWA — Safari → Přidat na plochu             |
|Synchronizace      |JSON export/import (manuální)               |

Žádný Node.js. Žádný backend. Žádná databáze na serveru.

-----

## Instalace

### Na iPhone (primární použití)

1. Otevřete `https://<váš-účet>.github.io/mojos/` v **Safari**
1. Klepněte na ikonu **Sdílet** (čtvereček se šipkou nahoru)
1. Vyberte **Přidat na plochu**
1. Pojmenujte appku a potvrďte
1. Ikona se objeví na ploše — spouštět jako normální appka

### Na počítači

Otevřete stejnou URL v libovolném prohlížeči. Data jsou oddělená od iPhonu (každý prohlížeč má vlastní IndexedDB).

-----

## Aktualizace

Jakákoli změna kódu nahraná na GitHub se projeví na iPhonu automaticky při příštím spuštění s připojením k internetu.

Data v IndexedDB zůstávají nedotčena — aktualizace kódu data nikdy nemaže.

-----

## Soukromí a bezpečnost

- **Žádná data se nikam neodesílají.** GitHub hostuje pouze HTML/JS/CSS soubory.
- **IndexedDB je izolovaná per-origin.** Data jsou dostupná pouze z vaší GitHub Pages domény.
- **Export JSON je nešifrovaný** — zacházejte s ním jako s citlivým souborem.
- Doporučení: export soubory ukládejte do iCloud Drive (šifrovaného) nebo chráněné složky.

-----

## Roadmap

- [x] Aplikační shell s navigací
- [x] Sdílená IndexedDB vrstva
- [x] Globální API pro moduly
- [x] Dashboard s přehledem
- [x] Activity log napříč moduly
- [ ] Modul Investice (přenos z existující appky)
- [ ] Modul Domácí účetnictví
- [ ] Modul Auto
- [ ] Modul Elektřina
- [ ] Modul Kondice
- [ ] JSON export / import (synchronizace)
- [ ] Multi-sheet XLSX export (všechny moduly najednou)
- [ ] Offline podpora (Service Worker)
- [ ] Tmavý / světlý režim

-----

## Struktura repozitáře

```
mojos/
└── index.html      — celá aplikace v jednom souboru
└── README.md       — tento dokument
```

-----

*MůjOS je osobní projekt. Není určen pro komerční distribuci.*
