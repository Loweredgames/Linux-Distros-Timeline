// Dataset delle distribuzioni Linux per la timeline. / Dataset of Linux distributions for the timeline.
// Ogni oggetto rappresenta una distro con attributi di visualizzazione, date, colore e link. / Each object represents a distro with display attributes, dates, color, and link.

// Rolling release date / Data di rilascio rolling
const today = new Date();
const RollingRelease = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`; // Mette la data di oggi / set today's date

const distros = [
  {
      id: 'mcc',
      name: 'MCC Interim Linux',
      date: '01/02/1992',
      last_update: '04/11/1996',
      color: '#273941',
      url: 'https://en.wikipedia.org/wiki/MCC_Interim_Linux'
  },
  {
      id: 'sls',
      name: 'Softlanding Linux System (SLS)',
      date: '01/05/1992',
      last_update: '01/12/1994',
      color: '#2410db',
      url: 'https://en.wikipedia.org/wiki/Softlanding_Linux_System'
  },
  {
      id: 'slackware',
      name: 'Slackware Linux',
      logo: 'logos/slackware.png',
      date: '17/07/1993',
      last_update: '2/2/2022',
      parent: 'sls',
      color: '#546cb6',
      url: 'https://en.wikipedia.org/wiki/Slackware'
  },
  {
      id: 'debian',
      name: 'Debian',
      logo: 'logos/debian.png',
      date: '16/08/1993',
      last_update: '09/08/2025',
      color: '#d70a53',
      url: 'https://en.wikipedia.org/wiki/Debian'
  },
  {
      id: 'ubuntu',
      name: 'Ubuntu',
      date: '20/10/2004',
      last_update: '23/04/2026',
      parent: 'debian',
      color: '#774121',
      url: 'https://en.wikipedia.org/wiki/Ubuntu'
  },
  {
      id: 'ubuntu-studio',
      name: 'Ubuntu Studio',
      date: '10/05/2007',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#214677',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_Studio'
  },
  {
      id: 'edubuntu',
      name: 'Edubuntu',
      date: '13/11/2005',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#d60f0f',
      url: 'https://en.wikipedia.org/wiki/Edubuntu'
  },
  {
      id: 'gobuntu',
      name: 'Gobuntu',
      date: '18/10/2007',
      last_update: '01/06/2008',
      parent: 'ubuntu',
      color: '#df6400',
      url: 'https://en.wikipedia.org/wiki/Gobuntu'
  },
  {
      id: 'kubuntu',
      name: 'Kubuntu',
      date: '08/04/2005',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#4785cc',
      url: 'https://en.wikipedia.org/wiki/Kubuntu'
  },
  {
      id: 'lubuntu',
      name: 'Lubuntu',
      date: '30/10/2008',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#1a35ce',
      url: 'https://en.wikipedia.org/wiki/Lubuntu'
  },
  {
      id: 'mythbuntu',
      name: 'Mythbuntu',
      date: '22/10/2007',
      last_update: '20/04/2018',
      parent: 'ubuntu',
      color: '#c26d3c',
      url: 'https://en.wikipedia.org/wiki/Mythbuntu'
  },
  {
      id: 'ubuntu-budgie',
      name: 'Ubuntu Budgie',
      date: '25/04/2016',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#bdb6b6',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_Budgie'
  },
  {
      id: 'ubuntu-cinnamon',
      name: 'Ubuntu Cinnamon',
      date: '04/12/2019',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#aa7b60',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_Cinnamon'
  },
  {
      id: 'ubuntu-gnome',
      name: 'Ubuntu GNOME',
      date: '18/10/2012',
      last_update: '04/12/2017',
      parent: 'ubuntu',
      color: '#222488',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_GNOME'
  },
  {
      id: 'ubuntu-jeOS',
      name: 'Ubuntu JeOS',
      date: '30/10/2008',
      last_update: '18/10/2012',
      parent: 'ubuntu',
      color: '#302d2d',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_JeOS'
  },
  {
      id: 'ubuntu-kylin',
      name: 'Ubuntu Kylin',
      date: '25/04/2013',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#c2a25e',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_Kylin'
  },
  {
      id: 'ubuntu-mate',
      name: 'Ubuntu MATE',
      date: '23/10/2014',
      last_update: '07/10/2025',
      parent: 'ubuntu',
      color: '#88d62f',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_MATE'
  },
  {
      id: 'xubuntu',
      name: 'Xubuntu',
      date: '22/06/2006',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#2d65ff',
      url: 'https://en.wikipedia.org/wiki/Xubuntu'
  },
  {
      id: 'ubuntu-unity',
      name: 'Ubuntu Unity',
      date: '07/05/2020',
      last_update: '23/04/2026',
      parent: 'ubuntu',
      color: '#9a2fd8',
      url: 'https://en.wikipedia.org/wiki/Ubuntu_Unity'
  },
  {
      id: 'linux-mint',
      name: 'Linux Mint',
      date: '27/08/2006',
      last_update: '13/01/2026',
      parent: 'ubuntu',
      color: '#72a15f',
      url: 'https://en.wikipedia.org/wiki/Linux_Mint'
  },
  {
      id: 'pop_os',
      name: 'Pop!_OS',
      date: '27/10/2017',
      last_update: '11/12/2025',
      parent: 'ubuntu',
      color: '#50bcc9',
      url: 'https://en.wikipedia.org/wiki/Pop!_OS'
  },
  {
      id: 'linux-mint-de',
      name: 'Linux Mint Debian Edition',
      date: '01/01/2010',
      last_update: '14/10/2025',
      parent: 'debian',
      color: '#a16c5f',
      url: 'https://en.wikipedia.org/wiki/Linux_Mint'
  },
  {
      id: 'steamos-debian',
      name: 'SteamOS 1.0 - 2.0',
      date: '13/12/2013',
      last_update: '18/07/2019',
      parent: 'debian',
      color: '#271b1b',
      url: 'https://en.wikipedia.org/wiki/SteamOS'
  },
  {
      id: 'kde-neon',
      name: 'KDE Neon',
      date: '08/06/2016',
      last_update: '16/02/2026',
      parent: 'ubuntu',
      color: '#21b4a2',
      url: 'https://en.wikipedia.org/wiki/KDE_neon'
  },
  {
      id: 'solus-os',
      name: 'SolusOS',
      date: '09/05/2012',
      last_update: '25/10/2013',
      parent: 'debian',
      color: '#888888',
      url: 'https://distrowatch.com/table.php?distribution=solusos'
  },
  {
      id: 'evolve-os',
      name: 'Evolve OS',
      date: '20/02/2014',
      last_update: '27/12/2015',
      rename: 'solus',
      color: '#5f5f5f',
      url: 'https://en.wikipedia.org/wiki/Solus_(operating_system)'
  },
  {
      id: 'solus',
      name: 'Solus',
      date: '27/12/2015',
      last_update: '18/04/2026',
      color: '#5f5f5f',
      url: 'https://en.wikipedia.org/wiki/Solus_(operating_system)'
  },
  {
      id: 'redhat-linux',
      name: 'Red Hat Linux',
      logo: 'logos/redhat-linux.png',
      date: '13/05/1995',
      last_update: '31/03/2003',
      rename: 'redhat-enterprise-linux',
      color: '#ee0000',
      url: 'https://en.wikipedia.org/wiki/Red_Hat_Linux'
  },
  {
      id: 'redhat-enterprise-linux',
      name: 'Red Hat Enterprise Linux',
      logo: 'logos/redhat_enterprise_linux.png',
      date: '31/03/2003',
      last_update: '19/05/2026',
      parent: 'fedora-core',
      color: '#ee0000',
      url: 'https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux'
  },
  {
      id: 'fedora-core',
      name: 'Fedora Core',
      logo: 'logos/fedora.png',
      date: '04/11/2003',
      last_update: '31/07/2007',
      rename: 'fedora-linux',
      color: '#51a2da',
      url: 'https://en.wikipedia.org/wiki/Fedora_Linux'
  },
  {
      id: 'fedora-linux',
      name: 'Fedora Core',
      date: '31/07/2007',
      last_update: '28/04/2026',
      color: '#51a2da',
      url: 'https://en.wikipedia.org/wiki/Fedora_Linux'
  },
  {
      id: 'suse-linux',
      name: 'SUSE Linux',
      logo: 'logos/suse_linux.png',
      date: '01/03/1994',
      last_update: '07/12/2006',
      parent: 'slackware',
      rename: 'opensuse',
      color: '#7bc143',
      url: 'https://en.wikipedia.org/wiki/OpenSUSE'
  },
  {
      id: 'opensuse',
      name: 'openSUSE',
      logo: 'logos/opensuse.png',
      date: '07/12/2006',
      last_update: '01/10/2025',
      color: '#73ba25',
      url: 'https://en.wikipedia.org/wiki/OpenSUSE'
  },
  {
      id: 'arch-linux',
      name: 'Arch Linux',
      logo: 'logos/arch-linux.png',
      date: '11/03/2002',
      last_update: RollingRelease,
      color: '#1793d1',
      url: 'https://en.wikipedia.org/wiki/Arch_Linux'
  },
  {
      id: 'arch-linux-arm',
      name: 'Arch Linux ARM',
      date: '11/03/2002',
      last_update: RollingRelease,
      parent: 'arch-linux',
      color: '#17c5d1',
      url: 'https://en.wikipedia.org/wiki/Arch_Linux_ARM'
  },
  {
      id: 'endeavouros',
      name: 'EndeavourOS',
      date: '15/07/2019',
      last_update: '12/03/2026',
      parent: 'arch-linux',
      color: '#7f3ebe',
      url: 'https://en.wikipedia.org/wiki/EndeavourOS'
  },
  {
      id: 'manjaro',
      name: 'Manjaro',
      date: '10/07/2011',
      last_update: '05/01/2026',
      parent: 'arch-linux',
      color: '#35bfa4',
      url: 'https://en.wikipedia.org/wiki/Manjaro'
  },
  {
      id: 'steamos',
      name: 'SteamOS',
      date: '02/03/2022',
      last_update: '20/05/2026',
      parent: 'arch-linux',
      color: '#222222',
      url: 'https://en.wikipedia.org/wiki/SteamOS'
  },
  {
      id: 'android',
      name: 'Android',
      logo: 'logos/android.png',
      date: '23/03/2008',
      last_update: '10/06/2025',
      color: '#43a760',
      url: 'https://en.wikipedia.org/wiki/Android_(operating_system)'
  },
  {
      id: 'android-x86',
      name: 'Android-x86',
      date: '29/07/2009',
      last_update: '27/02/2020',
      parent: 'android',
      color: '#92ec3e',
      url: 'https://en.wikipedia.org/wiki/Android-x86'
  },

    // DRAFT: usare come bozza. / DRAFT: use as a draft entry.
  {
      id: 'draft',
      name: 'Draft Distro',
      logo: 'logos/draft.png',
      date: '01/01/1991',
      last_update: '01/01/2000',
      parent: null,
      rename: null,
      color: '#ffffff',
      url: 'https://wikipedia.com'
  },

    // TEMPLATE: Usa questo esempio per aggiungere o modificare le voci. / TEMPLATE: Use this example to add or edit entries.
  {
      id: 'template-id', // identificatore interno univoco / unique internal identifier
      name: 'Template Distro', // etichetta visualizzata / displayed label
      logo: 'logos/draft.png', // logo distros (meglio 72x72 px) / distro logo (best 72x72 px)
      date: '01/01/1991', // data precisa in formato europeo (GG/MM/AAAA) / exact date in European format (DD/MM/YYYY)
      last_update: '01/01/2000', // Ultimo aggiornamento / Last update
      parent: null, // id del genitore se fork, altrimenti null / parent id if fork/rename, otherwise null
      rename: null, // Opzionale: mettere rename solo se la distro è stata rinominata nella sua storia / Optional: Only set rename if the distro has been renamed in its history
      color: '#000000', // colore del nodo / node color
      url: 'https://wikipedia.com' // link di approfondimento / detail link
  }
];


// riferimenti agli elementi HTML/SVG / HTML/SVG element references
const svg = document.getElementById('timeline-svg');
const tooltip = document.getElementById('tooltip');
const wrap = document.getElementById('timeline-wrap');

// impostazioni generali del grafico / general chart settings
const yearMin = 1991;

// Calcolo finale della data nel grafico in maniera dinamica / dynamically calculate the final date in the chart
let dynamicYearMax = new Date().getFullYear();
distros.forEach(distro => {
    const releaseDate = distro.releaseDate;
    const updateDate = distro.updateDate;
    
    if (isValidDate(releaseDate)) {
        dynamicYearMax = Math.max(dynamicYearMax, releaseDate.getFullYear());
    }
    if (isValidDate(updateDate)) {
        dynamicYearMax = Math.max(dynamicYearMax, updateDate.getFullYear());
    }
});

// Imposta le voci delle distro / Sets distro entries
const yearMax = dynamicYearMax;
const years = Array.from({ length: yearMax - yearMin + 2 }, (_, i) => yearMin + i);

// Restituisce gli inizi di ogni mese compreso nel range / Returns the start date of each month within the range
function getMonthStarts(start, end) {
  const months = [];
  const date = new Date(start.getFullYear(), start.getMonth(), 1);
  if (date < start) date.setMonth(date.getMonth() + 1);
  while (date <= end) {
    months.push(new Date(date));
    date.setMonth(date.getMonth() + 1);
  }
  return months;
}

// Restituisce tutti i giorni compresi nel range / Returns every day within the range
function getDayStarts(start, end) {
  const days = [];
  const date = new Date(start);
  date.setHours(0, 0, 0, 0);
  while (date <= end) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Crea una singola linea verticale della griglia / Create a single vertical grid line
function createGridLine(x, y1, y2, className) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('x2', x);
  line.setAttribute('y1', y1);
  line.setAttribute('y2', y2);
  line.setAttribute('class', className);
  return line;
}

// larghezza e altezza dei nodi della timeline / width and height of timeline nodes
const nodeWidth = 230; // larghezza di ogni rettangolo nodo / node rectangle width
const nodeHeight = 56; // altezza di ogni rettangolo nodo / node rectangle height

// distanza orizzontale tra le linee degli anni / horizontal spacing between year grid lines
const yearStep = 2060; // più alto = anni più distanziati, più basso = più compressi / higher = more spread out years, lower = more compact

// margini attorno all'SVG / margins around the SVG
const marginLeft = 120; // spazio a sinistra prima del primo nodo/linea anno / left space before the first node/year line
const marginRight = 180; // spazio a destra dopo l'ultimo nodo / right space after the last node
const marginTop = 120; // spazio sopra la timeline / top space above the timeline
const marginBottom = 90; // spazio sotto la timeline / bottom space below the timeline

// spaziatura verticale / vertical spacing
const rowGap = 500; // distanza verticale tra famiglie (gruppi principali) / vertical distance between families (main groups)
const slotGap = 50; // distanza verticale tra nodi sovrapposti all'interno della stessa famiglia / vertical distance between overlapping nodes within the same family

// mappa le date precise sulla coordinata orizzontale dell'SVG
// map precise dates to the horizontal SVG coordinate
const startDate = new Date(yearMin, 0, 1);
const endDate = new Date(yearMax, 11, 31);
const msPerDay = 24 * 60 * 60 * 1000;
const totalDays = Math.round((endDate - startDate) / msPerDay);
const dayPx = ((years.length - 1) * yearStep) / totalDays;

function formatDateISO(iso) {
  // Converte una data ISO o europea in formato europeo DD/MM/YYYY
  // Convert an ISO or European date into European format DD/MM/YYYY
  const d = parseDistroDate(iso);
  if (!d || isNaN(d)) return iso || '';
  const day = `${d.getDate()}`.padStart(2, '0');
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseDistroDate(dateStr) {
  // legge una stringa data in formato europeo o ISO e restituisce un oggetto Date
  // parse a date string in European or ISO format and return a Date object
  if (!dateStr) return null;
  const euroMatch = /^([0-3]?\d)\/([0-1]?\d)\/(\d{4})$/.exec(dateStr);
  if (euroMatch) {
    const day = Number(euroMatch[1]);
    const month = Number(euroMatch[2]) - 1;
    const year = Number(euroMatch[3]);
    return new Date(year, month, day);
  }
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (isoMatch) {
    return new Date(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`);
  }
  return new Date(dateStr);
}

function isValidDate(date) {
  // verifica che l'oggetto Date sia valido e non NaN
  // check that the Date object is valid and not NaN

  return date instanceof Date && !Number.isNaN(date.getTime());
}

distros.forEach(distro => {
  distro.releaseDate = parseDistroDate(distro.date);
  distro.updateDate = parseDistroDate(distro.last_update);
});

// mappa dagli id ai dati delle distro per risolvere padri e relazioni / maps distro ids to data to resolve parent relationships
const idMap = new Map(distros.map(d => [d.id, d]));
const renamePredictorMap = new Map();
distros.forEach(d => {
  if (d.rename && idMap.has(d.rename)) {
    renamePredictorMap.set(d.rename, d.id);
  }
});

const familyMap = new Map();
const rowSlotCounts = new Map();

// risolve la famiglia di appartenenza risalendo ai padri successivi
// resolve the root family by walking parent links recursively
function resolveFamily(node) {
  if (renamePredictorMap.has(node.id)) {
    const oldNode = idMap.get(renamePredictorMap.get(node.id));
    if (oldNode) return resolveFamily(oldNode);
  }
  if (!node.parent) return node.id;
  const parent = idMap.get(node.parent);
  if (!parent) return node.id;
  return resolveFamily(parent);
}

// raggruppa le distro per famiglia principale / group distros by top-level family
distros.forEach(d => {
  const family = resolveFamily(d);
  if (!familyMap.has(family)) {
    familyMap.set(family, []);
  }
  familyMap.get(family).push(d);
});

const families = Array.from(familyMap.keys());
const columns = new Map();
families.forEach((family, index) => {
  columns.set(family, index);
});

// organizza le distro per riga in base alla famiglia principale
// organize distros into rows according to their main family
const rowNodes = new Map();
distros.forEach(node => {
  const row = columns.get(resolveFamily(node));
  if (!rowNodes.has(row)) rowNodes.set(row, []);
  rowNodes.get(row).push(node);
});

// calcola il layer verticale per evitare sovrapposizioni
// compute vertical layers to avoid overlapping nodes on the same row
const slotIndex = new Map();
const overlapPadding = 18;
rowNodes.forEach((nodes, row) => {
  const layers = [];
      // usa solo la data precisa fornita in node.date
      // use only the precise date given in node.date
  nodes
    .map(node => {
      const nodeDate = parseDistroDate(node.date);
      const daysFromStart = Math.round((nodeDate - startDate) / msPerDay);
      const x = marginLeft + daysFromStart * dayPx;

      // Calcola la fine reale del nodo sull'asse X, includendo la linea del last_update / Calculate the real end of the node on the X axis, including the last_update line
      let endX = x + nodeWidth;
      const updateDate = parseDistroDate(node.last_update);
      if (isValidDate(updateDate) && updateDate > nodeDate) {
         const updateX = marginLeft + Math.round((updateDate - startDate) / msPerDay) * dayPx;
         endX = Math.max(endX, updateX + (nodeWidth * 0.5));
      }

      return { node, x, endX };
    })
    .sort((a, b) => a.x - b.x)
    .forEach(({ node, x, endX }) => {
      const renameParentId = renamePredictorMap.get(node.id);
      const isRename = !!renameParentId;
      let layer;

      // SE È UN RENAME: Eredita forzatamente lo stesso identico slot/layer della distro precedente / IF IT'S A RENAME: Forcefully inherits the exact same slot/layer as the previous distro
      if (isRename && slotIndex.has(renameParentId)) {
        layer = slotIndex.get(renameParentId);
      } else {
        // ALTRIMENTI (Fork o Radice): Cerca il primo slot libero disponibile / ELSE (Fork or Root): Search for the first available free slot
        layer = !node.parent ? 0 : 2;
        while (true) {
          const collision = (layers[layer] || []).some(prev => {
            return !(prev.endX + overlapPadding < x || endX + overlapPadding < prev.x);
          });
          if (!collision) break;
          layer += 2; // Se c'è collisione, scende di 2 livelli / If there is a collision, it goes down 2 levels
        }
      }

      if (!layers[layer]) layers[layer] = [];
      layers[layer].push({ x, endX, id: node.id });
      slotIndex.set(node.id, layer);
      rowSlotCounts.set(row, Math.max(rowSlotCounts.get(row) || 0, layer + 1));
    });
});

const familyRowHeights = families.map((family) => {
  const row = columns.get(family);
  const slots = rowSlotCounts.get(row) || 1;
  return rowGap + (slots - 1) * slotGap;
});

const rowYOffsets = new Map();
let currentY = marginTop;
families.forEach((family, index) => {
  const row = columns.get(family);
  rowYOffsets.set(row, currentY);
  currentY += familyRowHeights[index];
});

const width = marginLeft + (years.length - 1) * yearStep + nodeWidth + marginRight;
const height = currentY + nodeHeight + marginBottom;

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);

// definizioni SVG condivise per frecce e marker
// shared SVG definitions for arrows and markers
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
defs.innerHTML = `
  <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="8" orient="auto">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
  </marker>
`;
svg.appendChild(defs);

const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
background.setAttribute('x', 0);
background.setAttribute('y', 0);
background.setAttribute('width', width);
background.setAttribute('height', height);
background.setAttribute('fill', 'transparent');
background.style.cursor = 'grab';
svg.appendChild(background);

// disegna le linee annuali e le etichette sullo sfondo
// draw annual grid lines and year labels in the background
const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.appendChild(gridGroup);
let monthGridPath = null;
let dayGridPath = null;

years.forEach(year => {
  const yearDate = new Date(year, 0, 1);
  const x = marginLeft + Math.round((yearDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;

  // Disegna la linea nell'esatta posizione di inizio anno (x) / Draw the line at the exact position of the beginning of the year (x)
  gridGroup.appendChild(createGridLine(x, marginTop - 20, height - marginBottom + 20, 'grid-line'));

  // Calcola la posizione dell'anno successivo per trovare il centro / Calculate the position of the next year to find the center
  const nextYearDate = new Date(year + 1, 0, 1);
  const nextX = marginLeft + Math.round((nextYearDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;
  const textX = (x + nextX) / 2; // Questo è il punto esattamente a metà tra le due linee dell'anno / This is the point exactly halfway between the two year lines

  const topLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  topLabel.setAttribute('x', textX);
  topLabel.setAttribute('y', marginTop - 40);
  topLabel.setAttribute('class', 'year-label');
  topLabel.setAttribute('text-anchor', 'middle');
  topLabel.textContent = year;
  gridGroup.appendChild(topLabel);

  const bottomLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  bottomLabel.setAttribute('x', textX);
  bottomLabel.setAttribute('y', height - marginBottom + 34);
  bottomLabel.setAttribute('class', 'year-label');
  bottomLabel.setAttribute('text-anchor', 'middle');
  bottomLabel.textContent = year;
  gridGroup.appendChild(bottomLabel);
});

// Disegna le linee mensili e giornaliere usando path aggregati per ridurre il DOM / Draw month/day lines as aggregated paths to keep DOM count low
const monthStarts = getMonthStarts(startDate, endDate);
const yearXPositions = new Set(years.map(year => {
  const yearDate = new Date(year, 0, 1);
  return marginLeft + Math.round((yearDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;
}));
const monthPathX = new Set();
const monthPathParts = [];
const monthTop = marginTop - 14;
const monthBottom = height - marginBottom + 14;
monthStarts.forEach(monthDate => {
  if (monthDate.getMonth() === 0) return; // Skip January because year line already exists
  const x = marginLeft + Math.round((monthDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;
  if (yearXPositions.has(x) || monthPathX.has(x)) return; // Evita sovrapposizioni con linee anno e duplicati X / Avoid overlaps with year lines and duplicate X values
  monthPathX.add(x);
  monthPathParts.push(`M ${x} ${monthTop} L ${x} ${monthBottom}`);
});
if (monthPathParts.length) {
  const monthPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  monthPath.setAttribute('d', monthPathParts.join(' '));
  monthPath.setAttribute('class', 'month-grid-line');
  gridGroup.appendChild(monthPath);
  monthGridPath = monthPath;
}

const dayStarts = getDayStarts(startDate, endDate);
const dayPathX = new Set();
const dayPathParts = [];
const dayTop = marginTop - 8;
const dayBottom = height - marginBottom + 8;
dayStarts.forEach(dayDate => {
  if (dayDate.getDate() === 1) return; // Skip first-of-month lines so month/year boundaries remain distinct
  const x = marginLeft + Math.round((dayDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;
  if (yearXPositions.has(x) || monthPathX.has(x) || dayPathX.has(x)) return; // Evita sovrapposizioni con anni, mesi e duplicati X / Avoid overlaps with years, months, and duplicate X values
  dayPathX.add(x);
  dayPathParts.push(`M ${x} ${dayTop} L ${x} ${dayBottom}`);
});
if (dayPathParts.length) {
  const dayPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dayPath.setAttribute('d', dayPathParts.join(' '));
  dayPath.setAttribute('class', 'day-grid-line');
  gridGroup.appendChild(dayPath);
  dayGridPath = dayPath;
}

// gruppi SVG per nodi e collegamenti
// SVG groups for update ranges, nodes, and relationship links
const updateGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.appendChild(updateGroup);
const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.appendChild(nodeGroup);
const linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.insertBefore(linkGroup, nodeGroup);

const nodePositions = new Map();
// nodePositions memorizza le coordinate di ogni nodo per tracciare i collegamenti padre-figlio
// nodePositions stores each node's coordinates for drawing parent-child links
distros.forEach(node => {
  const row = columns.get(resolveFamily(node));
  const nodeDate = node.releaseDate;
  const daysFromStart = Math.round((nodeDate - startDate) / msPerDay);
  const x = marginLeft + daysFromStart * dayPx;
  const extraRow = slotIndex.get(node.id) || 0;
  const y = rowYOffsets.get(row) + extraRow * slotGap;

  // salva la posizione del nodo per disegnare le linee dopo
  nodePositions.set(node.id, { x, y });

  const updateDate = isValidDate(node.updateDate) ? node.updateDate : null;
  // se last_update è valido e successivo alla data di rilascio, disegna il range di aggiornamento
  // if last_update is valid and later than the release date, draw the update range
  if (updateDate && updateDate > nodeDate) {
    const updateX = marginLeft + Math.round((updateDate - startDate) / msPerDay) * dayPx;
    const rangeStart = x + nodeWidth * 0.5;
    const rangeEnd = updateX + nodeWidth * 0.5;
    const updateLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    updateLine.setAttribute('x1', Math.min(rangeStart, rangeEnd));
    updateLine.setAttribute('x2', Math.max(rangeStart, rangeEnd));
    updateLine.setAttribute('y1', y + nodeHeight * 0.5);
    updateLine.setAttribute('y2', y + nodeHeight * 0.5);
    updateLine.setAttribute('class', 'update-range');
    updateLine.setAttribute('stroke', node.color);
    updateGroup.appendChild(updateLine);

    const updateDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    updateDot.setAttribute('cx', rangeEnd);
    updateDot.setAttribute('cy', y + nodeHeight * 0.5);
    updateDot.setAttribute('r', 4);
    updateDot.setAttribute('class', 'update-endpoint');
    updateDot.setAttribute('fill', node.color);
    updateGroup.appendChild(updateDot);
  }

  // crea il gruppo SVG rappresentante il nodo della distro
  // create the SVG group representing the distro node
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('data-id', node.id);
  group.style.cursor = 'pointer';

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('rx', 14);
  rect.setAttribute('ry', 14);
  rect.setAttribute('width', nodeWidth);
  rect.setAttribute('height', nodeHeight);
  rect.setAttribute('fill', node.color);
  rect.setAttribute('opacity', '1');
  rect.setAttribute('stroke', 'rgba(255,255,255,0.12)');
  rect.setAttribute('stroke-width', '1');
  group.appendChild(rect);

  if (node.logo) {
    const logoSize = 36;
    const logoX = x + 12;
    const logoY = y + (nodeHeight - logoSize) / 2;
    const logoBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    logoBg.setAttribute('x', logoX - 2);
    logoBg.setAttribute('y', logoY - 2);
    logoBg.setAttribute('width', logoSize + 4);
    logoBg.setAttribute('height', logoSize + 4);
    logoBg.setAttribute('rx', 10);
    logoBg.setAttribute('fill', 'rgba(255,255,255,0.18)');
    logoBg.setAttribute('stroke', 'rgba(255,255,255,0.6)');
    logoBg.setAttribute('stroke-width', '1');
    group.appendChild(logoBg);

    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttribute('x', logoX);
    image.setAttribute('y', logoY);
    image.setAttribute('width', logoSize);
    image.setAttribute('height', logoSize);
    image.setAttribute('href', node.logo);
    image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    group.appendChild(image);
  }

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const textOffset = node.logo ? 12 + 36 + 10 : 16;
  text.setAttribute('x', x + textOffset);
  text.setAttribute('y', y + 34);
  text.setAttribute('class', 'node-text');
  text.textContent = node.name;
  group.appendChild(text);

  group.addEventListener('pointerenter', event => {
    const parent = node.parent ? idMap.get(node.parent)?.name ?? 'Sconosciuto' : 'None';
    const dateStr = node.date;
    const lastUpdate = node.last_update ? `<br><span>Last update: ${formatDateISO(node.last_update)}</span>` : '';
    tooltip.innerHTML = `<strong>${node.name}</strong><span>Date: ${formatDateISO(dateStr)}</span>${lastUpdate}<br><span>Fork: ${parent}</span>`;
    tooltip.classList.add('visible');

    const wrapRect = wrap.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();
    tooltip.style.left = `${groupRect.left + groupRect.width / 2 - wrapRect.left}px`;
    tooltip.style.top = `${groupRect.top - wrapRect.top}px`;
  });
  // previene la propagazione per evitare di attivare il pannello di drag se il nodo viene cliccato. / prevent propagation to avoid starting panning when clicking on a node.
  group.addEventListener('pointerdown', event => {
    event.stopPropagation();
  });
  group.addEventListener('pointermove', () => {
    const wrapRect = wrap.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();
    tooltip.style.left = `${groupRect.left + groupRect.width / 2 - wrapRect.left}px`;
    tooltip.style.top = `${groupRect.top - wrapRect.top}px`;
  });

  group.addEventListener('pointerleave', () => {
    tooltip.classList.remove('visible');
  });

  if (node.url) {
    group.addEventListener('click', () => {
      window.open(node.url, '_blank');
    });
  }

  nodeGroup.appendChild(group);
});

// disegna le linee che collegano padre e fork/rename
// draw curves that link parent distros to child forks or renames
function drawCurveLink(source, target) {
  const startX = source.x + nodeWidth;
  const startY = source.y + nodeHeight * 0.5;
  const endX = target.x;
  const endY = target.y + nodeHeight * 0.5;
  const deltaX = Math.max(80, (endX - startX) / 2);
  const controlX1 = startX + deltaX;
  const controlY1 = startY;
  const controlX2 = endX - deltaX;
  const controlY2 = endY;
  
  // definiamo una curva di Bézier per rendere le linee più leggibili
  // define a Bézier curve to make the connection lines more readable
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${startX} ${startY} C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${endX} ${endY}`);
  path.setAttribute('class', 'link-path');
  path.setAttribute('marker-end', 'url(#arrowhead)');
  linkGroup.appendChild(path);
}

distros.forEach(node => {
  if (node.parent) {
    const source = nodePositions.get(node.parent);
    const target = nodePositions.get(node.id);
    if (source && target) drawCurveLink(source, target);
  }
  
  const renameParentId = renamePredictorMap.get(node.id);
  if (renameParentId) {
    const source = nodePositions.get(renameParentId);
    const target = nodePositions.get(node.id);
    if (source && target) drawCurveLink(source, target);
  }
});

// Set variabili / Set variables
let isDragging = false;
let lastX = 0;
let lastY = 0;
let viewX = 0;
let viewY = 0;
let scale = 1;
let rafPending = false;
let ignoreScrollEvents = false;
let scrollTimeout = null;
// pinch-to-zoom state for touch / stato pinch-to-zoom per i touch
let pinchActive = false;
let pinchStartDist = 0;
let pinchStartScale = 1;

// Gestisce il rendering tramite requestAnimationFrame per ottimizzare le prestazioni / Handles rendering via requestAnimationFrame to optimize performance
function queueRender(source) {
  if (rafPending) return;
  rafPending = true;
  
  requestAnimationFrame(() => {
    rafPending = false;
    
    const shouldResize = source !== 'pan' && source !== 'scroll';
    if (shouldResize) {
      // Aggiorna le dimensioni SVG solo quando lo zoom o il contenuto cambiano / Update SVG size only when zoom or content-relative changes occur
      svg.style.width = `${Math.ceil(width * scale)}px`;
      svg.style.height = `${Math.ceil(height * scale)}px`;
      svg.style.maxWidth = 'none';
      svg.style.minWidth = `${Math.ceil(width * scale)}px`;
      svg.style.transform = '';
      updateGridVisibility();
    }
    
    // Aggiorna la posizione dello scroll se non proviene da un evento scroll / Updates scroll position if the source is not a scroll event
    if (wrap && source !== 'scroll') {
      ignoreScrollEvents = true;
      clearTimeout(scrollTimeout);
      
      wrap.scrollLeft = viewX;
      wrap.scrollTop = viewY;
      
      scrollTimeout = setTimeout(() => {
        ignoreScrollEvents = false;
      }, 60);
    }
  });
}

// Limita le coordinate della vista ai bordi del contenitore / Clamps view coordinates to container boundaries
function clampViewXY() {
  if (!wrap) return;
  
  const maxScrollX = Math.max(0, (width * scale) - wrap.clientWidth);
  const maxScrollY = Math.max(0, (height * scale) - wrap.clientHeight);
  
  viewX = Math.max(0, Math.min(viewX, maxScrollX));
  viewY = Math.max(0, Math.min(viewY, maxScrollY));
}

// Limita il fattore di scala tra 0.1 e 5.2 / Clamps the scale factor between 0.1 and 5.2
function clampScale(value) {
  return Math.min(5.2, Math.max(0.1, value));
}

// Regola la visibilità delle linee di griglia in base allo zoom
// Adjust grid line visibility based on zoom level
function updateGridVisibility() {
  if (monthGridPath) {
    const showMonths = scale >= 0.18;
    monthGridPath.setAttribute('display', showMonths ? 'inline' : 'none');
  }
  if (dayGridPath) {
    const showDays = scale >= 0.65;
    dayGridPath.setAttribute('display', showDays ? 'inline' : 'none');
  }
}

// Gestisce lo zoom della timeline rispetto a un punto focale / Handles timeline zooming relative to a focal point
function zoomTimeline(factor, focusX, focusY) {
  const newScale = clampScale(scale * factor);
  if (newScale === scale) return;
  
  const rect = wrap.getBoundingClientRect();
  
  const offsetX = typeof focusX === 'number' ? focusX - rect.left : rect.width / 2;
  const offsetY = typeof focusY === 'number' ? focusY - rect.top : rect.height / 2;
  
  const ratio = newScale / scale;
  
  viewX = (viewX + offsetX) * ratio - offsetX;
  viewY = (viewY + offsetY) * ratio - offsetY;
  
  scale = newScale;
  clampViewXY();
  queueRender('zoom');
}

// Sposta la vista (pan) in base ai delta x e y / Pans the view based on delta x and y
function panTimeline(dx, dy) {
  viewX += dx;
  viewY += dy;
  clampViewXY();
  queueRender('pan');
}

// Resetta la scala e la posizione della vista / Resets scale and view position
function resetView() {
  scale = 1;
  viewX = 0;
  viewY = 0;
  queueRender('reset');
}

// Adatta la vista per far entrare tutto il contenuto / Fits the view to show all content
function fitView() {
  scale = Math.min(1, Math.min(wrap.clientWidth / width, wrap.clientHeight / height));
  viewX = 0;
  viewY = 0;
  queueRender('fit');
}

// Setup dei pulsanti di controllo / Control buttons setup
const resetViewButton = document.getElementById('reset-view');
const fitViewButton = document.getElementById('fit-view');

resetViewButton?.addEventListener('click', () => resetView());
fitViewButton?.addEventListener('click', () => fitView());

// Valori di zoom regolabili in un punto solo / User-tweakable zoom values in one place
const zoomStepIn = 1.15;   // fattore usato per ingrandire con + / factor used when zooming in with +
const zoomStepOut = 3;  // fattore usato per ridurre con - / factor used when zooming out with -
const wheelZoomIn = 1.08;  // fattore usato per la rotella in avanti / factor used when scrolling wheel forward
const wheelZoomOut = 0.92; // fattore usato per la rotella indietro / factor used when scrolling wheel backward

// Gestione dei comandi da tastiera / Keyboard shortcuts handling
window.addEventListener('keydown', event => {
  if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName)) return;
  switch (event.key) {
    case 'ArrowLeft':  event.preventDefault(); panTimeline(-120, 0); break;
    case 'ArrowRight': event.preventDefault(); panTimeline(120, 0); break;
    case 'ArrowUp':    event.preventDefault(); panTimeline(0, -120); break;
    case 'ArrowDown':  event.preventDefault(); panTimeline(0, 120); break;
    case '+':
    case '=':          event.preventDefault(); zoomTimeline(zoomStepIn); break;
    case '-':          event.preventDefault(); zoomTimeline(zoomStepOut); break;
    case '0':          event.preventDefault(); resetView(); break;
  }
});

// Inizia l'azione di trascinamento (drag) / Starts dragging action
function startDrag(event) {
  if (event.target.closest && event.target.closest('g[data-id]')) return;
  
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
  
  const tracker = event.currentTarget;
  try { tracker.setPointerCapture(event.pointerId); } catch (e) {}
  tracker.style.cursor = 'grabbing';
  event.preventDefault();
}

// Gestisce il movimento durante il trascinamento / Handles movement during dragging
function moveDrag(event) {
  if (!isDragging) return;
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  lastX = event.clientX;
  lastY = event.clientY;

  // Regola leggermente la sensibilità del pan per i touch in modo da risultare più naturale sui dispositivi mobili / Slightly adjust pan sensitivity for touch input to feel more natural on mobile
  const isTouch = event.pointerType === 'touch' || event.pointerType === 'pen';
  const touchMultiplier = isTouch ? 1.2 : 1;
  viewX -= dx * touchMultiplier;
  viewY -= dy * touchMultiplier;
  
  clampViewXY();
  queueRender('pointer');
}

// Termina l'azione di trascinamento / Ends dragging action
function stopDrag(event) {
  if (!isDragging) return;
  isDragging = false;
  const tracker = event.currentTarget;
  try { tracker.releasePointerCapture(event.pointerId); } catch (e) {}
  tracker.style.cursor = 'grab';
}

// Setup eventi puntatore / Pointer events setup
svg.style.cursor = 'grab';
svg.addEventListener('pointerdown', startDrag);
svg.addEventListener('pointermove', moveDrag);
svg.addEventListener('pointerup', stopDrag);
svg.addEventListener('pointercancel', stopDrag);

// Gestione dello scroll manuale del contenitore / Handles manual scroll of the container
wrap.addEventListener('scroll', () => {

  if (isDragging || ignoreScrollEvents) return;
  
  viewX = wrap.scrollLeft;
  viewY = wrap.scrollTop;
  
  clampViewXY();
  queueRender('scroll');
});

// Gestione dello zoom tramite rotella del mouse / Handles zooming via mouse wheel
wrap.addEventListener('wheel', event => {
  event.preventDefault();
  const factor = event.deltaY > 0 ? wheelZoomOut : wheelZoomIn;
  zoomTimeline(factor, event.clientX, event.clientY);
}, { passive: false });

// Helper: distanza tra due touch / Helper: distance between two touches
function touchDistance(t1, t2) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.hypot(dx, dy);
}

// Helper: midpoint between two touches / Helper: punto medio tra due touch
function touchMidpoint(t1, t2) {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2
  };
}

// Pinch-to-zoom handling for touch devices / Gestione pinch-to-zoom per dispositivi touch
wrap.addEventListener('touchstart', (e) => {
  if (e.touches && e.touches.length === 2) {
    pinchActive = true;
    pinchStartDist = touchDistance(e.touches[0], e.touches[1]);
    pinchStartScale = scale;
    e.preventDefault();
  }
}, { passive: false });

wrap.addEventListener('touchmove', (e) => {
  if (pinchActive && e.touches && e.touches.length === 2) {
    const newDist = touchDistance(e.touches[0], e.touches[1]);
    if (pinchStartDist <= 0) return;
    const desiredScale = clampScale(pinchStartScale * (newDist / pinchStartDist));
    const factor = desiredScale / scale;
    const mid = touchMidpoint(e.touches[0], e.touches[1]);
    zoomTimeline(factor, mid.x, mid.y);
    e.preventDefault();
  }
}, { passive: false });

wrap.addEventListener('touchend', (e) => {
  if (!e.touches || e.touches.length < 2) {
    pinchActive = false;
    pinchStartDist = 0;
  }
});

// Gestione del ridimensionamento finestra / Handles window resize
window.addEventListener('resize', () => {
  clampViewXY();
  queueRender('resize');
});

// Rendering iniziale / Initial rendering
queueRender('init');

// Dopo il caricamento della pagina, effettua un fit delicato in modo che gli utenti mobile vedano il contenuto della timeline / After the page loads, do a gentle fit so mobile users see the timeline content
window.addEventListener('load', () => {
  // piccolo ritardo per permettere al layout di stabilizzarsi / small delay to allow layout to stabilise
  setTimeout(() => {
    try { fitView(); } catch (e) { /* ignore */ }
  }, 150);
});
