
// Timeline data: facile da modificare. Ogni elemento può avere:
// id: identificatore unico
// name: nome della distro
// start: anno di inizio
// end: anno di fine (null se ancora attiva)
// parent: id della distro madre (null se root)
// color: colore opzionale per la linea
// lane: opzionale, numero intero per forzare la lane verticale
// flow: opzionale, chiave per raggruppare distro nello stesso "flusso"
const distros = [
    {
        id: 'unix',
        name: 'Unix (context)',
        start: 1970,
		end: null,
        parent: null, color: '#7c7cff',
        url: null
    },
    {
        id: 'debian',
        name: 'Debian',
		start: 1993,
		end: null,
		parent: null,
		color: '#ff7b72',
		url: 'https://www.debian.org/'
	},
    {
		id: 'test',
		name: 'Test OS',
		start: 1980,
		end: null,
		parent: 'template',
		color: '#fb00ffff',
		url: null
	},
	// Template
	{
		id: 'template',
		name: 'Template OS',
		start: 2000,
		end: 2050,
		parent: null,
		color: '#ffffffff',
		url: null
	},
];

// Configuration
const cfg = {
	padding: {top: 80, bottom: 80, left: 60, right: 60},
	laneHeight: 28, // vertical spacing per lane
	yearsAbove: true,
	yearsBelow: true,
	yearStep: 1
};

// zoom limits (configurable)
cfg.zoom = { min: 0.6, max: 2.5 };

function buildTimeline(containerId = 'timeline-container'){
	const container = document.getElementById(containerId);
	container.innerHTML = '';

	// find year range
	const years = distros.flatMap(d => [d.start, d.end]).filter(y => y != null);
	const minYear = Math.min(...years) - 1;
	const maxYear = Math.max(...years) + 1;

		// use container width so SVG internal units map to displayed pixels (more readable on small screens)
		const width = Math.max(600, container.clientWidth || 800);
		const height = Math.max(400, (distros.length * cfg.laneHeight) + cfg.padding.top + cfg.padding.bottom);

	// create SVG
	const svgNS = 'http://www.w3.org/2000/svg';
		const svg = document.createElementNS(svgNS,'svg');
		svg.setAttribute('class','timeline');
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

		// create a viewport group for pan/zoom
		const viewport = document.createElementNS(svgNS,'g');
		viewport.setAttribute('id','viewport');
		svg.appendChild(viewport);

	// scales
	const yearsSpan = maxYear - minYear;
	const xForYear = y => cfg.padding.left + ((y - minYear) / yearsSpan) * (width - cfg.padding.left - cfg.padding.right);

		// assign lanes (vertical positions) with interval scheduling
		// prefer parent's lane+1 if possible, otherwise earliest free lane
		const lanes = {};
		const laneEnds = []; // array of last end year per lane

		const items = distros.map(d => ({...d, s: d.start, e: d.end || maxYear}));
		// sort by start ascending, so earlier distros get lower lanes
		items.sort((a,b)=> a.s - b.s || (a.e - b.e));

			// determine flow for each item (inherit from parent if not provided)
			const byId = Object.fromEntries(distros.map(d=>[d.id,d]));
			function getFlowKey(d){
				if(d.flow) return d.flow;
				if(d.parent && byId[d.parent]) return getFlowKey(byId[d.parent]);
				return d.id; // default flow is itself
			}
			items.forEach(it => it.flowKey = getFlowKey(it));

			// try to keep same flow items in nearby lanes
			const flowBase = {}; // flowKey -> base lane index
				function assignLanes(){
					items.forEach(d => {
						const s = d.s, e = d.e;
						const flow = d.flowKey;
						// if lane explicitly provided, use/allocate it
						if(d.lane != null){
							const forced = d.lane;
							while(laneEnds.length <= forced) laneEnds.push(-Infinity);
							lanes[d.id] = forced;
							laneEnds[forced] = Math.max(laneEnds[forced], e);
							if(flowBase[flow] == null) flowBase[flow] = forced;
							return;
						}

						let assigned = -1;
						if(flowBase[flow] != null){
							// try lanes starting at flow base
							for(let i = flowBase[flow]; i < laneEnds.length; i++){
								if(s > laneEnds[i]){ assigned = i; break; }
							}
						}
						if(assigned === -1){
							// prefer parent's lane region if parent exists
							if(d.parent && lanes[d.parent] != null){
								const pref = lanes[d.parent] + 1;
								for(let i = pref; i < laneEnds.length; i++){
									if(s > laneEnds[i]){ assigned = i; break; }
								}
								if(assigned === -1){
									const pLane = lanes[d.parent];
									if(s > laneEnds[pLane]) assigned = pLane;
								}
							}
						}
						if(assigned === -1){
							for(let i=0;i<laneEnds.length;i++){
								if(s > laneEnds[i]){ assigned = i; break; }
							}
						}
						if(assigned === -1){
							assigned = laneEnds.length;
							laneEnds.push(-Infinity);
						}
						lanes[d.id] = assigned;
						laneEnds[assigned] = Math.max(laneEnds[assigned], e);
						if(flowBase[flow] == null) flowBase[flow] = assigned;
					});
				}
				assignLanes();

		// compute vertical centering for lanes
		const lanesCount = laneEnds.length;
		const availableY = height - cfg.padding.top - cfg.padding.bottom;
		const usedY = Math.max(0, (lanesCount - 1) * cfg.laneHeight);
		const extraTop = Math.max(0, (availableY - usedY) / 2);
		const topBase = cfg.padding.top + extraTop;

		// dynamic years group (rendered by renderYears so we can refresh on zoom/pan)
		const yearGroup = document.createElementNS(svgNS,'g');
		yearGroup.setAttribute('class','years');
		viewport.appendChild(yearGroup);

		function renderYears(transformK){
			// clear
			yearGroup.innerHTML = '';
			// compute pixel-per-year at current scale
			const pxPerYear = ((width - cfg.padding.left - cfg.padding.right) / (maxYear - minYear)) * (transformK || 1);
			// choose step so that ticks are ~60-120px apart
			let step = 1;
			if(pxPerYear < 6) step = 10;
			else if(pxPerYear < 12) step = 5;
			else if(pxPerYear < 30) step = 2;
			else step = 1;

			for(let y = minYear; y <= maxYear; y += step){
				const x = xForYear(y);
				// small top and bottom ticks instead of full-height separators
				const tickTop = document.createElementNS(svgNS,'line');
				tickTop.setAttribute('x1', x);
				tickTop.setAttribute('x2', x);
				tickTop.setAttribute('y1', topBase - 20);
				tickTop.setAttribute('y2', topBase - 8);
				const tickBot = document.createElementNS(svgNS,'line');
				tickBot.setAttribute('x1', x);
				tickBot.setAttribute('x2', x);
				tickBot.setAttribute('y1', height - cfg.padding.bottom + 8 - extraTop);
				tickBot.setAttribute('y2', height - cfg.padding.bottom + 20 - extraTop);
				if(y % 10 === 0){
					tickTop.setAttribute('class','year-tick-decade');
					tickBot.setAttribute('class','year-tick-decade');
				} else {
					tickTop.setAttribute('class','year-tick');
					tickBot.setAttribute('class','year-tick');
				}
				yearGroup.appendChild(tickTop);
				yearGroup.appendChild(tickBot);

				if(cfg.yearsAbove){
					const t = document.createElementNS(svgNS,'text');
					t.setAttribute('x',x);
					t.setAttribute('y', topBase - 28);
					t.setAttribute('text-anchor','middle');
					t.setAttribute('class','year-label');
					t.textContent = y;
					yearGroup.appendChild(t);
				}
				if(cfg.yearsBelow){
					const t2 = document.createElementNS(svgNS,'text');
					t2.setAttribute('x',x);
					t2.setAttribute('y',height - cfg.padding.bottom + 36 - extraTop);
					t2.setAttribute('text-anchor','middle');
					t2.setAttribute('class','year-label');
					t2.textContent = y;
					yearGroup.appendChild(t2);
				}
			}
		}

	// draw distro lines
		const linesGroup = document.createElementNS(svgNS,'g');
		linesGroup.setAttribute('class','distros');
		// separate group for labels so they can be rendered on top of everything
		const labelsGroup = document.createElementNS(svgNS,'g');
		labelsGroup.setAttribute('class','labels');

	// helper for tooltip (createTooltip will ensure a single global tooltip)
	const tooltip = createTooltip();

	distros.forEach(d => {
		const lane = lanes[d.id];
		const y = topBase + lane * cfg.laneHeight;
		const xStart = xForYear(d.start);
		const xEnd = xForYear(d.end || maxYear);

		// path: simple rectangle/line representing life
		const path = document.createElementNS(svgNS,'path');
		const h = 10;
		path.setAttribute('d', `M ${xStart} ${y-h} L ${xEnd} ${y-h}`);
		path.setAttribute('stroke', d.color || '#89b4f8');
		path.setAttribute('stroke-width','6');
		path.setAttribute('stroke-linecap','round');
		path.setAttribute('fill','none');
		linesGroup.appendChild(path);

		// label group
		const g = document.createElementNS(svgNS,'g');
		g.setAttribute('class','distro-box');
		// measure rect height first and position label above the line (not overlapping)
		const rectHeight = 26;
		const gap = 4; // space between line and label (small gap to avoid overlap)
		const labelY = y - h - rectHeight - gap;
		g.setAttribute('transform', `translate(${xStart}, ${labelY})`);
		// store preferred Y for later collision layout
		g.dataset.prefY = String(labelY);

				const rect = document.createElementNS(svgNS,'rect');
				// rectHeight already defined above
				rect.setAttribute('x',0);
				rect.setAttribute('y',0);
				rect.setAttribute('rx',6);
				rect.setAttribute('ry',6);
				// temporary width, will be adjusted to text width
				rect.setAttribute('width', 100);
				rect.setAttribute('height', rectHeight);
				rect.setAttribute('fill', 'rgba(7,20,35,0.9)');
				rect.setAttribute('stroke', 'rgba(255,255,255,0.06)');
				rect.setAttribute('pointer-events', 'none');
				g.appendChild(rect);

				const text = document.createElementNS(svgNS,'text');
				text.setAttribute('x',8);
				// use middle baseline so vertical position is stable
				text.setAttribute('dominant-baseline','middle');
				text.setAttribute('y', rectHeight/2);
				text.setAttribute('class','distro-label');
				// force font size to stabilize measurements
				text.setAttribute('font-size','14');
				text.setAttribute('font-family','Inter, system-ui, Arial, sans-serif');
				// explicit fill/stroke to ensure contrast even if external CSS doesn't apply
				text.setAttribute('fill', '#f8fafc');
				text.setAttribute('stroke', 'rgba(0,0,0,0.85)');
				text.setAttribute('stroke-width', '2');
				text.setAttribute('stroke-linejoin', 'round');
				text.setAttribute('paint-order', 'stroke');
				text.textContent = d.name;
				g.appendChild(text);

				// save geometry info for later adjustments
				g.dataset.xstart = String(xStart);
				g.dataset.xend = String(xEnd);

				// append label group to labelsGroup so labels sit on top
				labelsGroup.appendChild(g);


				// single click: focus only. double-click: open site if available (or alert)
				g.addEventListener('click', (ev)=>{
					const targetX = xStart;
					const targetY = y - h;
					focusOn(targetX, targetY, 1.6);
				});
				g.addEventListener('dblclick', (ev)=>{
					if(d.url){
						window.open(d.url, '_blank');
					} else {
						if(d.end && d.end < (new Date()).getFullYear()){
							alert(`${d.name} sembra non avere un sito attivo (fine: ${d.end}).`);
						} else {
							alert(`${d.name} non ha un sito registrato.`);
						}
					}
				});

		// event handlers for tooltip
		g.addEventListener('mouseenter', (ev)=>{
				let txt = `${d.name} — ${d.start}${d.end? '–'+d.end:''}`;
				if(d.url) txt += `\n${d.url}`;
				showTooltip(tooltip, txt);
		});
		g.addEventListener('mousemove', (ev)=>{
			moveTooltip(tooltip, ev.clientX, ev.clientY);
		});
		g.addEventListener('mouseleave', ()=>{ hideTooltip(tooltip); });

	// draw connection to parent as a curve
		if(d.parent){
			const p = distros.find(x=>x.id===d.parent);
			if(p){
			// parent point at the child's start year (fork point)
			const childStartYear = d.start;
			const px = xForYear(childStartYear);
		const py = topBase + lanes[p.id]*cfg.laneHeight - 10;
			// if parent doesn't span to that year, fallback to parent's end or start
			const parentStartX = xForYear(p.start);
			const parentEndX = xForYear(p.end || p.start);
			// clamp px between parent's available span
			const clampedPx = Math.max(Math.min(px, parentEndX), parentStartX);
			const sx = xStart + 6;
		const sy = y - 10;
				// cubic bezier curve
				const curve = document.createElementNS(svgNS,'path');
			const cx1 = clampedPx + (sx - clampedPx) * 0.4;
			const cx2 = clampedPx + (sx - clampedPx) * 0.6;
			const dAttr = `M ${clampedPx} ${py} C ${cx1} ${py} ${cx2} ${sy} ${sx} ${sy}`;
				curve.setAttribute('d', dAttr);
				curve.setAttribute('stroke', d.color || '#89b4f8');
				curve.setAttribute('stroke-width','2.5');
				curve.setAttribute('fill','none');
				curve.setAttribute('stroke-linecap','round');
				curve.setAttribute('opacity','0.9');
				linesGroup.appendChild(curve);

				// marker on parent at fork point
				const marker = document.createElementNS(svgNS,'circle');
				marker.setAttribute('cx', clampedPx);
				marker.setAttribute('cy', py);
				marker.setAttribute('r', 3.5);
				marker.setAttribute('fill', d.color || '#89b4f8');
				marker.setAttribute('opacity', '0.95');
				linesGroup.appendChild(marker);
				}
			}
		});

		// append groups after building all distros so labels are on top
		viewport.appendChild(linesGroup);
		viewport.appendChild(labelsGroup);
		container.appendChild(svg);

		// pan & zoom state
		let transform = {x:0,y:0,k:1};
		const setTransform = (t)=>{
			// clamp scale
			const k = Math.max(cfg.zoom.min, Math.min(cfg.zoom.max, t.k));
			// clamp translation so content stays visible
			const clamped = clampTransform(t.x, t.y, k);
			transform = {x: clamped.x, y: clamped.y, k: clamped.k};
			viewport.setAttribute('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
			renderYears(transform.k);
		};

		// clamp transform so the viewport content bbox remains visible within svg viewport
		function clampTransform(tx, ty, k){
			try{
				const bbox = viewport.getBBox();
				const vw = svg.clientWidth;
				const vh = svg.clientHeight;
				const contentW = (bbox.x + bbox.width) * k - bbox.x * k; // bbox.width * k
				const contentH = (bbox.y + bbox.height) * k - bbox.y * k; // bbox.height * k
				const minTx = vw - (bbox.x + bbox.width) * k; // align right
				const maxTx = - bbox.x * k; // align left
				const minTy = vh - (bbox.y + bbox.height) * k;
				const maxTy = - bbox.y * k;
				let newTx = tx;
				let newTy = ty;
				if(minTx > maxTx){
					// content smaller than viewport — center it
					newTx = (vw - bbox.width * k) / 2 - bbox.x * k;
				}else{
					newTx = Math.max(minTx, Math.min(maxTx, tx));
				}
				if(minTy > maxTy){
					newTy = (vh - bbox.height * k) / 2 - bbox.y * k;
				}else{
					newTy = Math.max(minTy, Math.min(maxTy, ty));
				}
				return {x: newTx, y: newTy, k};
			}catch(e){
				// if bbox not available yet, just return requested transform clamped by zoom
				return {x: tx, y: ty, k};
			}
		}

		// focus on an SVG point (cx,cy) with a target scale k
		function focusOn(cx, cy, targetK = 1.6){
			// compute target transform so that (cx,cy) moves to center of svg
			const svgRect = svg.getBoundingClientRect();
			// clamp requested scale to allowed range
			const k = Math.max(cfg.zoom.min, Math.min(cfg.zoom.max, targetK));
			const x = svgRect.left + svg.clientWidth/2 - cx * k;
			const y = svgRect.top + svg.clientHeight/2 - cy * k;
			// convert back to viewport coordinates (we store transform.x/y in screen pixels)
			setTransform({x, y, k});
		}

		// simple zoom to point
		function zoomAt(pointX, pointY, scaleFactor){
			// convert screen point to svg coords
			const svgRect = svg.getBoundingClientRect();
			const cx = (pointX - svgRect.left - transform.x) / transform.k;
			const cy = (pointY - svgRect.top - transform.y) / transform.k;
			// compute requested new scale and clamp it
			const requested = transform.k * scaleFactor;
			const newK = Math.max(cfg.zoom.min, Math.min(cfg.zoom.max, requested));
			const nx = pointX - svgRect.left - cx * newK;
			const ny = pointY - svgRect.top - cy * newK;
			setTransform({x: nx, y: ny, k: newK});
		}

		// wheel zoom
		svg.addEventListener('wheel', (ev)=>{
			ev.preventDefault();
			const delta = ev.deltaY > 0 ? 0.9 : 1.1;
			zoomAt(ev.clientX, ev.clientY, delta);
		}, {passive:false});

		// pan via mouse drag (re-enabled) — uses setTransform so clamping applies
		let dragging = false, last = null;
		svg.addEventListener('pointerdown', (ev)=>{ dragging = true; last = {x:ev.clientX, y:ev.clientY}; svg.setPointerCapture && svg.setPointerCapture(ev.pointerId); svg.style.cursor='grabbing'; });
		window.addEventListener('pointermove', (ev)=>{ if(!dragging) return; const dx = ev.clientX - last.x; const dy = ev.clientY - last.y; last = {x:ev.clientX, y:ev.clientY}; setTransform({x: transform.x + dx, y: transform.y + dy, k: transform.k}); });
		window.addEventListener('pointerup', (ev)=>{ if(dragging && svg.releasePointerCapture) try{ svg.releasePointerCapture(ev.pointerId);}catch(e){} dragging=false; last=null; svg.style.cursor='default'; });

			// After SVG is in the DOM, run label layout to avoid overlaps, then fit
			setTimeout(()=>{
				layoutLabels(svg, cfg.laneHeight, cfg.padding.top);
				fitToScreen(svg, viewport, setTransform);
				// ensure labels sized after fit and after fonts load
				setTimeout(()=> adjustLabelSizes(svg), 120);
				setTimeout(()=> adjustLabelSizes(svg), 600);
			}, 80);

	// legend
	const legend = document.createElement('div');
	legend.className = 'legend';
	const uniqueColors = [...new Map(distros.map(d=>[d.color,d.color])).values()];
	uniqueColors.forEach(c=>{
		const it = document.createElement('div'); it.className='item';
		const sw = document.createElement('div'); sw.className='sw'; sw.style.background=c||'#ccc';
		it.appendChild(sw);
		const t = document.createElement('div'); t.textContent = c || '';
		it.appendChild(t);
		legend.appendChild(it);
	});
	container.appendChild(legend);
}

// layout labels to avoid horizontal overlaps: simple greedy strategy
function layoutLabels(svg, laneHeight, paddingTop){
	const labels = Array.from(svg.querySelectorAll('g.distro-box'));
	// compute initial bboxes
	const placed = [];
	labels.forEach(g=>{
		// read current transform x and preferred y
		const tx = g.getAttribute('transform');
		const match = /translate\(([^,]+),\s*([^\)]+)\)/.exec(tx);
		let x = 0, y = 0;
		if(match){ x = parseFloat(match[1]); y = parseFloat(match[2]); }
		// ensure content measurable by forcing a small opacity if needed
		const bbox = g.getBBox();
		// start from preferred y
		let baseY = parseFloat(g.dataset.prefY || y);
		let tries = 0;
		const step = Math.max(10, laneHeight/2);
		let placedBox;
		while(true){
			// apply temporary transform to compute bbox at candidate position
			g.setAttribute('transform', `translate(${x}, ${baseY})`);
			const b = g.getBBox();
			const intersects = placed.some(p=>{
				// simple axis-aligned overlap test with padding
				const pad = 6;
				return !(b.x + b.width + pad < p.x || b.x > p.x + p.width + pad || b.y + b.height + pad < p.y || b.y > p.y + p.height + pad);
			});
			if(!intersects) { placed.push(b); placedBox = b; break; }
			// try shifting down, then up alternately
			tries++;
			if(tries % 2 === 1) baseY = baseY + step * Math.ceil(tries/2);
			else baseY = (parseFloat(g.dataset.prefY || y)) - step * Math.ceil(tries/2);
			// stop condition
			if(tries > 10) { placed.push(b); placedBox = b; break; }
		}
	});
}

// Regola le dimensioni dei rettangoli delle etichette in base al testo misurato
function adjustLabelSizes(svg){
	const labels = Array.from(svg.querySelectorAll('g.distro-box'));
	labels.forEach(g=>{
		try{
			const rect = g.querySelector('rect');
			const text = g.querySelector('text');
			const xStart = parseFloat(g.dataset.xstart || 0);
			const xEnd = parseFloat(g.dataset.xend || 0);
			const textLen = text.getComputedTextLength ? text.getComputedTextLength() : text.getBBox().width;
			const desired = Math.ceil(textLen + 16);
			const available = Math.max(80, Math.floor(xEnd - xStart - 6));
			const finalW = Math.max(80, Math.min(desired, Math.min(400, available)));
			rect.setAttribute('width', finalW);
			// clamp position
			let tx = xStart;
			if(tx + finalW > xEnd - 4) tx = Math.max( Number(svg.getAttribute('viewBox').split(' ')[0]) + cfg.padding.left, xEnd - finalW - 4);
			if(tx < cfg.padding.left) tx = cfg.padding.left;
			// keep same Y and update stored preferred Y to reflect final placement
			const ty = parseFloat(g.dataset.prefY || 0);
			g.setAttribute('transform', `translate(${tx}, ${ty})`);
			g.dataset.prefY = String(ty);
		}catch(e){/* noop */}
	});
}

// Fit viewport so all content fits inside container
function fitToScreen(svg, viewport, setTransform){
	const svgRect = svg.getBoundingClientRect();
	// bbox of viewport children
	const bbox = viewport.getBBox();
	const scaleX = svg.clientWidth / (bbox.width + 40);
	const scaleY = svg.clientHeight / (bbox.height + 40);
		let k = Math.max(0.2, Math.min(5, Math.min(scaleX, scaleY)));
		// clamp to configured zoom limits
		k = Math.max(cfg.zoom.min, Math.min(cfg.zoom.max, k));
	// center
		const x = (svg.clientWidth - bbox.width * k) / 2 - bbox.x * k;
		const y = (svg.clientHeight - bbox.height * k) / 2 - bbox.y * k;
		setTransform({x,y,k});
	// after transform, recompute label layout (they are in svg coords)
	setTimeout(()=> layoutLabels(svg, 28, 80), 60);
}

function createTooltip(){
	// reuse existing tooltip if present
	const existing = document.querySelector('.tooltip');
	if(existing) return existing;
	const t = document.createElement('div');
	t.className = 'tooltip';
	// allow newlines and wrapping
	t.style.whiteSpace = 'pre-wrap';
	document.body.appendChild(t);
	return t;
}
function showTooltip(el, text){ el.style.display='block'; el.textContent=text; }
function moveTooltip(el,x,y){ el.style.left=(x+14)+'px'; el.style.top=(y+14)+'px'; }
function hideTooltip(el){ el.style.display='none'; }

// inizializza al caricamento
window.addEventListener('load', ()=> buildTimeline());
