// Dataset delle distribuzioni Linux per la timeline.
// Dataset of Linux distributions for the timeline.
// Ogni oggetto rappresenta una distro con attributi di visualizzazione, date, colore e link.
// Each object represents a distro with display attributes, dates, color, and link.
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
      last_update: '24/05/2026', // Today
      color: '#1793d1',
      url: 'https://en.wikipedia.org/wiki/Arch_Linux'
  },
  {
      id: 'arch-linux-arm',
      name: 'Arch Linux ARM',
      date: '11/03/2002',
      last_update: '24/05/2026', // Today
      parent: 'arch-linux',
      color: '#17c5d1',
      url: 'https://en.wikipedia.org/wiki/Arch_Linux_ARM'
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
      last_update: '01/01/2030', // Ultimo aggiornamento / Last update
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
    const releaseDate = parseDistroDate(distro.date);
    const updateDate = parseDistroDate(distro.last_update);
    
    if (isValidDate(releaseDate)) {
        dynamicYearMax = Math.max(dynamicYearMax, releaseDate.getFullYear());
    }
    if (isValidDate(updateDate)) {
        dynamicYearMax = Math.max(dynamicYearMax, updateDate.getFullYear());
    }
});

const yearMax = dynamicYearMax;
const years = Array.from({ length: yearMax - yearMin + 1 }, (_, i) => yearMin + i);
const nodeWidth = 230;
const nodeHeight = 56;
const yearStep = 265;
const marginLeft = 120;
const marginRight = 180;
const marginTop = 120;
const marginBottom = 90;
const rowGap = 125;
const panSpeed = 1.8;

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

// mappa dagli id ai dati delle distro per risolvere padri e relazioni
const idMap = new Map(distros.map(d => [d.id, d]));
const renamePredictorMap = new Map();
distros.forEach(d => {
  if (d.rename && idMap.has(d.rename)) {
    renamePredictorMap.set(d.rename, d.id);
  }
});

const familyMap = new Map();

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
let maxSlots = 1;
const overlapPadding = 18;
rowNodes.forEach(nodes => {
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
        // ALTRIMENTI (Fork o Radice): Cerca il primo slot libero disponibile / // ELSE (Fork or Root): Search for the first available free slot
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
      maxSlots = Math.max(maxSlots, layer + 1);
    });
});

const slotGap = 70;
const familyRowHeight = rowGap + (maxSlots - 1) * slotGap;
// familyRowHeight determina la distanza tra le righe di famiglie diverse
// familyRowHeight determines the vertical spacing between different family rows
const width = marginLeft + (years.length - 1) * yearStep + nodeWidth + marginRight;
const height = marginTop + families.length * familyRowHeight + nodeHeight + marginBottom;

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

years.forEach(year => {
  const yearDate = new Date(year, 0, 1);
  const x = marginLeft + Math.round((yearDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;

  // Disegna la linea nell'esatta posizione di inizio anno (x) / Draw the line at the exact position of the beginning of the year (x)
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('x2', x);
  line.setAttribute('y1', marginTop - 20);
  line.setAttribute('y2', height - marginBottom + 20);
  line.setAttribute('class', 'grid-line');
  gridGroup.appendChild(line);

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
  // usa solo la data precisa fornita in node.date
  const nodeDate = parseDistroDate(node.date);
  const daysFromStart = Math.round((nodeDate - startDate) / msPerDay);
  const x = marginLeft + daysFromStart * dayPx;
  const extraRow = slotIndex.get(node.id) || 0;
  const y = marginTop + row * familyRowHeight + extraRow * slotGap;

  // salva la posizione del nodo per disegnare le linee dopo
  nodePositions.set(node.id, { x, y });

  const rawUpdateDate = parseDistroDate(node.last_update);
  const updateDate = isValidDate(rawUpdateDate) ? rawUpdateDate : null;
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
  rect.setAttribute('opacity', '0.96');
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
  });
  // previene la propagazione per evitare di attivare il pannello di drag se il nodo viene cliccato
  // prevent propagation to avoid starting panning when clicking on a node
  group.addEventListener('pointerdown', event => {
    event.stopPropagation();
  });
  group.addEventListener('pointermove', event => {
    const wrapRect = wrap.getBoundingClientRect();
    tooltip.style.left = `${event.clientX - wrapRect.left}px`;
    tooltip.style.top = `${event.clientY - wrapRect.top}px`;
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

// Gestisce il rendering tramite requestAnimationFrame per ottimizzare le prestazioni / Handles rendering via requestAnimationFrame to optimize performance
function queueRender(source) {
  if (rafPending) return;
  rafPending = true;
  
  requestAnimationFrame(() => {
    rafPending = false;
    
    
    svg.style.width = `${width * scale}px`;
    svg.style.height = `${height * scale}px`;
    
    
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    // Aggiorna la posizione dello scroll se non proviene da un evento scroll / Updates scroll position if the source is not a scroll event
    if (wrap && source !== 'scroll') {
      void wrap.scrollHeight; 
      void wrap.scrollWidth;

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
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const resetViewButton = document.getElementById('reset-view');
const fitViewButton = document.getElementById('fit-view');

zoomInButton?.addEventListener('click', () => zoomTimeline(1.15));
zoomOutButton?.addEventListener('click', () => zoomTimeline(0.85));
resetViewButton?.addEventListener('click', () => resetView());
fitViewButton?.addEventListener('click', () => fitView());

// Gestione dei comandi da tastiera / Keyboard shortcuts handling
window.addEventListener('keydown', event => {
  if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName)) return;
  switch (event.key) {
    case 'ArrowLeft':  event.preventDefault(); panTimeline(-120, 0); break;
    case 'ArrowRight': event.preventDefault(); panTimeline(120, 0); break;
    case 'ArrowUp':    event.preventDefault(); panTimeline(0, -120); break;
    case 'ArrowDown':  event.preventDefault(); panTimeline(0, 120); break;
    case '+':
    case '=':          event.preventDefault(); zoomTimeline(1.15); break;
    case '-':          event.preventDefault(); zoomTimeline(0.85); break;
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

  viewX -= dx;
  viewY -= dy;
  
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
  const factor = event.deltaY > 0 ? 0.92 : 1.08;
  zoomTimeline(factor, event.clientX, event.clientY);
}, { passive: false });

// Gestione del ridimensionamento finestra / Handles window resize
window.addEventListener('resize', () => {
  clampViewXY();
  queueRender('resize');
});

// Rendering iniziale / Initial rendering
queueRender('init');
