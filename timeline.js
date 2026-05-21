const distros = [
    { 
        id: 'test1',
        name: 'Test',
        logo: '',
        date: '30/01/1991',
        parent: null,
        color: '#000000',
        url: 'https://en.wikipedia.org/wiki/AlmaLinux'
    },
    { 
        id: 'test2',
        name: 'Test',
        logo: '',
        date: '30/01/2001',
        parent: 'test1',
        color: '#000000',
        url: 'https://en.wikipedia.org/wiki/AlmaLinux'
        
    },


    // TEMPLATE: Usa questo esempio per aggiungere o modificare le voci.
    {
        id: 'template-id', // identificatore interno univoco
        name: 'Template Distro', // etichetta visualizzata
        logo: 'logos/draft.png', // logo distros (meglio 72x72 px, renderizzato a 36x36 px; il file deve esistere)
        date: '01/01/1991', // data precisa in formato europeo (GG/MM/AAAA)
        parent: null, // id del genitore se fork/rename, altrimenti null
        relation: 'rename', // opzionale: 'rename' se cambio nome, altrimenti fork
        color: '#000000', // colore del nodo
        url: 'https://wiki...' // link di approfondimento
    }
];

// riferimenti agli elementi HTML/SVG
const svg = document.getElementById('timeline-svg');
const tooltip = document.getElementById('tooltip');
const wrap = document.getElementById('timeline-wrap');

// impostazioni generali del grafico
const yearMin = 1991;
const yearMax = new Date().getFullYear();
const years = Array.from({ length: yearMax - yearMin + 1 }, (_, i) => yearMin + i);
const nodeWidth = 220;
const nodeHeight = 56;
const yearStep = 265;
const marginLeft = 120;
const marginRight = 180;
const marginTop = 120;
const marginBottom = 90;
const rowGap = 125;
const panSpeed = 1.7;

// mappa le date precise sulla coordinata orizzontale dell'SVG
const startDate = new Date(yearMin, 0, 1);
const endDate = new Date(yearMax, 11, 31);
const msPerDay = 24 * 60 * 60 * 1000;
const totalDays = Math.round((endDate - startDate) / msPerDay);
const dayPx = ((years.length - 1) * yearStep) / totalDays;

function formatDateISO(iso) {
  // Converte una data ISO o europea in formato europeo DD/MM/YYYY
  const d = parseDistroDate(iso);
  if (!d || isNaN(d)) return iso || '';
  const day = `${d.getDate()}`.padStart(2, '0');
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseDistroDate(dateStr) {
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

// mappa dagli id ai dati delle distro per risolvere padri e relazioni
const idMap = new Map(distros.map(d => [d.id, d]));
const familyMap = new Map();

// risolve la famiglia di appartenenza risalendo ai padri successivi
function resolveFamily(node) {
  if (!node.parent) return node.id;
  const parent = idMap.get(node.parent);
  if (!parent) return node.id;
  return resolveFamily(parent);
}

// raggruppa le distro per famiglia principale
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
const rowNodes = new Map();
distros.forEach(node => {
  const row = columns.get(resolveFamily(node));
  if (!rowNodes.has(row)) rowNodes.set(row, []);
  rowNodes.get(row).push(node);
});

// calcola il layer verticale per evitare sovrapposizioni
const slotIndex = new Map();
let maxSlots = 1;
const overlapPadding = 18;
rowNodes.forEach(nodes => {
  const layers = [];
  nodes
    .map(node => {
      // usa solo la data precisa fornita in node.date
      const nodeDate = parseDistroDate(node.date);
      const daysFromStart = Math.round((nodeDate - startDate) / msPerDay);
      return { node, x: marginLeft + daysFromStart * dayPx };
    })
    .sort((a, b) => a.x - b.x)
    .forEach(({ node, x }) => {
      // se la distro è un rename rimane sulla stessa riga,
      // altrimenti (fork) parte dal layer inferiore
      const isRename = node.parent && node.relation === 'rename';
      let layer = isRename ? 0 : 1;
      if (!node.parent) layer = 0;
      while (true) {
        const collision = (layers[layer] || []).some(prev => {
          return !(prev.x + nodeWidth + overlapPadding < x || x + nodeWidth + overlapPadding < prev.x);
        });
        if (!collision) break;
        layer += 1;
      }
      if (!layers[layer]) layers[layer] = [];
      layers[layer].push({ x, id: node.id });
      slotIndex.set(node.id, layer);
      maxSlots = Math.max(maxSlots, layer + 1);
    });
});

const slotGap = 70;
const familyRowHeight = rowGap + (maxSlots - 1) * slotGap;
const width = marginLeft + (years.length - 1) * yearStep + nodeWidth + marginRight;
const height = marginTop + families.length * familyRowHeight + nodeHeight + marginBottom;

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg.setAttribute('width', width);
svg.setAttribute('height', height);

// definizioni SVG condivise per frecce e marker
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
const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.appendChild(gridGroup);

years.forEach((year, index) => {
  const yearDate = new Date(year, 0, 1);
  const x = marginLeft + Math.round((yearDate - startDate) / msPerDay) * dayPx + nodeWidth * 0.5;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x);
  line.setAttribute('x2', x);
  line.setAttribute('y1', marginTop - 20);
  line.setAttribute('y2', height - marginBottom + 20);
  line.setAttribute('class', 'grid-line');
  gridGroup.appendChild(line);

  const topLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  topLabel.setAttribute('x', x);
  topLabel.setAttribute('y', marginTop - 40);
  topLabel.setAttribute('class', 'year-label');
  topLabel.textContent = year;
  gridGroup.appendChild(topLabel);

  const bottomLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  bottomLabel.setAttribute('x', x);
  bottomLabel.setAttribute('y', height - marginBottom + 34);
  bottomLabel.setAttribute('class', 'year-label');
  bottomLabel.textContent = year;
  gridGroup.appendChild(bottomLabel);
});

const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
axis.setAttribute('x1', marginLeft - 30);
axis.setAttribute('x2', width - marginRight + 10);
axis.setAttribute('y1', height - marginBottom + 10);
axis.setAttribute('y2', height - marginBottom + 10);
axis.setAttribute('class', 'axis-line');
svg.appendChild(axis);

// gruppi SVG per nodi e collegamenti
const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.appendChild(nodeGroup);
const linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svg.insertBefore(linkGroup, nodeGroup);

const nodePositions = new Map();

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
    const parent = node.parent ? idMap.get(node.parent)?.name ?? 'Sconosciuto' : 'Nessuno';
    const dateStr = node.date;
    tooltip.innerHTML = `<strong>${node.name}</strong><span>Data: ${formatDateISO(dateStr)}</span><br><span>Genitore: ${parent}</span>`;
    tooltip.classList.add('visible');
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
distros.forEach(node => {
  if (!node.parent) return;
  const source = nodePositions.get(node.parent);
  const target = nodePositions.get(node.id);
  if (!source || !target) return;

  const startX = source.x + nodeWidth;
  const startY = source.y + nodeHeight * 0.5;
  const endX = target.x;
  const endY = target.y + nodeHeight * 0.5;
  const deltaX = Math.max(80, (endX - startX) / 2);
  const deltaY = (endY - startY) * 0.3;
  const controlX1 = startX + deltaX;
  const controlY1 = startY;
  const controlX2 = endX - deltaX;
  const controlY2 = endY;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${startX} ${startY} C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${endX} ${endY}`);
  path.setAttribute('class', 'link-path');
  path.setAttribute('marker-end', 'url(#arrowhead)');
  linkGroup.appendChild(path);
});

let isDragging = false;
let lastX = 0;
let lastY = 0;
let viewX = 0;
let viewY = 0;
let scale = 1;
let isSyncingScroll = false;

// aggiorna il viewBox dell'SVG in base a pan e zoom
function updateViewBox() {
  const w = width / scale;
  const h = height / scale;
  const x = viewX / scale;
  const y = viewY / scale;
  svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
}

// limita la vista ai bordi del grafico per non oltrepassare l'SVG
function clampViewXY() {
  const viewW = width / scale;
  const viewH = height / scale;
  const maxViewX = Math.max(0, width - viewW);
  const maxViewY = Math.max(0, height - viewH);
  let vbX = viewX / scale;
  let vbY = viewY / scale;
  vbX = Math.max(0, Math.min(vbX, maxViewX));
  vbY = Math.max(0, Math.min(vbY, maxViewY));
  viewX = vbX * scale;
  viewY = vbY * scale;
}

function setWrapScrollFromView() {
  if (!wrap) return;
  isSyncingScroll = true;
  wrap.scrollLeft = viewX / scale;
  wrap.scrollTop = viewY / scale;
  // attende il termine dello scroll nativo prima di riabilitare la sincronizzazione
  setTimeout(() => { isSyncingScroll = false; }, 0);
}

function setViewFromWrapScroll() {
  if (!wrap) return;
  viewX = wrap.scrollLeft * scale;
  viewY = wrap.scrollTop * scale;
  clampViewXY();
  updateViewBox();
}

// panning con il drag del mouse sullo sfondo
background.addEventListener('pointerdown', event => {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
  background.setPointerCapture(event.pointerId);
  background.style.cursor = 'grabbing';
});

background.addEventListener('pointermove', event => {
  if (!isDragging) return;
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  lastX = event.clientX;
  lastY = event.clientY;
  viewX -= dx * panSpeed;
  viewY -= dy * panSpeed;
  clampViewXY();
  updateViewBox();
  setWrapScrollFromView();
});

background.addEventListener('pointerup', event => {
  isDragging = false;
  background.releasePointerCapture(event.pointerId);
  background.style.cursor = 'grab';
});

// Improved panning: start drag from anywhere on the SVG (including nodes)
// panning anche trascinando direttamente l'SVG
svg.style.cursor = 'grab';
svg.addEventListener('pointerdown', event => {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
  try { svg.setPointerCapture(event.pointerId); } catch (e) {}
  svg.style.cursor = 'grabbing';
  // prevent default to avoid accidental text selection
  event.preventDefault();
});

svg.addEventListener('pointermove', event => {
  if (!isDragging) return;
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  lastX = event.clientX;
  lastY = event.clientY;
  viewX -= dx * panSpeed;
  viewY -= dy * panSpeed;
  clampViewXY();
  updateViewBox();
  setWrapScrollFromView();
});

svg.addEventListener('pointerup', event => {
  isDragging = false;
  try { svg.releasePointerCapture(event.pointerId); } catch (e) {}
  svg.style.cursor = 'grab';
});

svg.addEventListener('pointercancel', event => {
  isDragging = false;
  try { svg.releasePointerCapture(event.pointerId); } catch (e) {}
  svg.style.cursor = 'grab';
});

// sincronizza lo scroll nativo del contenitore con il viewBox
wrap.addEventListener('scroll', (e) => {
  if (isSyncingScroll) return;
  setViewFromWrapScroll();
});

// zoom con rotellina del mouse, manteniendo il punto centrale del cursore
wrap.addEventListener('wheel', event => {
  event.preventDefault();
  const factor = event.deltaY > 0 ? 0.92 : 1.08;
  const newScale = Math.min(2.8, Math.max(0.8, scale * factor));
  const rect = svg.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  const dx = (offsetX / scale) * (newScale - scale);
  const dy = (offsetY / scale) * (newScale - scale);
  scale = newScale;
  viewX += dx;
  viewY += dy;
  clampViewXY();
  updateViewBox();
  setWrapScrollFromView();
}, { passive: false });

// adatta la larghezza dell'SVG al ridimensionamento della finestra
window.addEventListener('resize', () => {
  const container = wrap.getBoundingClientRect();
  if (container.width < width) {
    svg.style.width = `${width}px`;
  } else {
    svg.style.width = '100%';
  }
});
