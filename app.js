/* OCR H573 revision site — app logic */

/* PROGRESS STATE (localStorage) */
const STORAGE_KEY = 'h573_progress_v1';
const DEFAULT_STATE = { studied: {}, bookmarks: {}, hiddenThesis: false, notes: {}, filter: 'all', theme: 'light', studyDays: {}, quizScore: { correct: 0, total: 0 } };
let STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw){
    const parsed = JSON.parse(raw);
    STATE = Object.assign({}, DEFAULT_STATE, parsed);
    STATE.studied = STATE.studied || {};
    STATE.bookmarks = STATE.bookmarks || {};
    STATE.notes = STATE.notes || {};
    STATE.filter = STATE.filter || 'all';
    STATE.theme = STATE.theme || 'light';
    STATE.studyDays = STATE.studyDays || {};
    STATE.quizScore = STATE.quizScore || { correct: 0, total: 0 };
  }
} catch(e){}

function todayKey(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function recordStudyToday(){ STATE.studyDays[todayKey()] = true; saveState(); }
function computeStreak(){
  const days = Object.keys(STATE.studyDays || {}).sort().reverse();
  if (!days.length) return 0;
  const today = todayKey();
  const yesterday = (function(){
    const d = new Date(); d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  })();
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 0;
  let cursor = new Date();
  if (days[0] === yesterday) cursor.setDate(cursor.getDate() - 1);
  for (let i = 0; i < 365; i++){
    const key = cursor.getFullYear() + '-' + String(cursor.getMonth()+1).padStart(2,'0') + '-' + String(cursor.getDate()).padStart(2,'0');
    if (STATE.studyDays[key]) streak++;
    else break;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function topicsStudiedToday(){
  const today = todayKey();
  let count = 0;
  Object.keys(STATE.studied).forEach(function(k){
    const ts = STATE.studied[k];
    if (typeof ts !== 'number') return;
    const d = new Date(ts);
    const dk = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    if (dk === today) count++;
  });
  return count;
}
function updateStreakDisplay(){
  const el = document.getElementById('streak-display');
  if (!el) return;
  document.getElementById('streak-num').textContent = computeStreak();
  document.getElementById('today-num').textContent = topicsStudiedToday();
}

/* Spaced-repetition status for a topic */
function topicDueStatus(paperId, topicId){
  const k = topicKey(paperId, topicId);
  const ts = STATE.studied[k];
  if (typeof ts !== 'number') return { state: 'never', label: 'New', days: null };
  const daysSince = Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
  if (daysSince < 4) return { state: 'fresh', label: 'Studied ' + (daysSince === 0 ? 'today' : daysSince + 'd ago'), days: daysSince };
  if (daysSince < 14) return { state: 'due', label: 'Due (' + daysSince + 'd ago)', days: daysSince };
  return { state: 'overdue', label: 'Overdue (' + daysSince + 'd ago)', days: daysSince };
}

/* THEME */
function applyTheme(){
  document.body.classList.toggle('dark', STATE.theme === 'dark');
}
function saveState(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); } catch(e){}
}
function topicKey(paperId, topicId){ return paperId + ':' + topicId; }

/* TOAST */
function toast(msg, type){
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast ' + (type || '');
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(function(){ el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; }, 1600);
  setTimeout(function(){ el.remove(); }, 2000);
}

function stripHtml(s){ return (s || '').replace(/<[^>]+>/g, ''); }

/* SCHOLAR INDEX — built from all topics, maps surname → appearances */
const SCHOLAR_INDEX = {};
function canonicalScholarKey(name){
  return name.replace(/\([^)]*\)/g, '').trim().toLowerCase();
}
function buildScholarIndex(){
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){
      (t.scholars || []).forEach(function(s){
        const key = canonicalScholarKey(s.name);
        if (!SCHOLAR_INDEX[key]){
          SCHOLAR_INDEX[key] = { displayName: s.name, appearances: [] };
        }
        SCHOLAR_INDEX[key].appearances.push({
          paper: p,
          topicId: t.id,
          topicTitle: stripHtml(t.title),
          position: s.pos
        });
      });
    });
  });
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function openScholar(key){
  const entry = SCHOLAR_INDEX[key];
  if (!entry) return;
  document.getElementById('scholar-modal-name').textContent = entry.displayName;
  document.getElementById('scholar-modal-sub').textContent = entry.appearances.length + ' appearance' + (entry.appearances.length === 1 ? '' : 's') + ' across the specification';
  const groups = { '01': [], '02': [], '03': [] };
  entry.appearances.forEach(function(a){ groups[a.paper].push(a); });
  let html = '';
  ['01','02','03'].forEach(function(p){
    if (!groups[p].length) return;
    html += '<div class="sr-section">Paper ' + p + ' &middot; ' + stripHtml(CONTENT[p].title) + '</div>';
    groups[p].forEach(function(a){
      html += '<div class="sr-item" data-paper="' + a.paper + '" data-target="' + a.topicId + '">' +
        '<div class="sr-meta">' + a.topicTitle + '</div>' +
        '<div class="sr-snippet" style="margin-top:0.3rem;color:var(--ink);font-size:0.88rem;line-height:1.55">' + escapeHtml(a.position) + '</div></div>';
    });
  });
  document.getElementById('scholar-modal-body').innerHTML = html;
  document.querySelectorAll('#scholar-modal-body .sr-item').forEach(function(it){
    it.addEventListener('click', function(){
      closeScholar();
      navigateToResult(it);
    });
  });
  document.getElementById('scholar-modal').classList.add('active');
}
function closeScholar(){ document.getElementById('scholar-modal').classList.remove('active'); }

function renderPaper(paperId){
  if (paperId === '07') return (typeof renderGizmo === 'function') ? renderGizmo() : null;
  const paper = CONTENT[paperId];
  if (!paper) return;
  if (paperId === '04') return renderCraft(paper);
  if (paperId === '05') return renderReference(paper);
  if (paperId === '06') return renderMarker(paper);
  return renderTopicPaper(paperId, paper);
}

function renderTopicPaper(paperId, paper){
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  let html = '<section class="paper-section active" data-paper="' + paperId + '">' +
    '<div class="paper-intro"><div class="eyebrow">' + paper.code + ' &middot; Paper ' + paperId + '</div>' +
    '<h1>' + paper.title + '</h1><p class="lede">' + paper.intro + '</p></div>';
  paper.topics.forEach(function(t, i){
    const num = String(i + 1).padStart(2, '0');
    const tkey = topicKey(paperId, t.id);
    const isStudied = !!STATE.studied[tkey];
    const isBookmarked = !!STATE.bookmarks[tkey];
    const hiddenCls = STATE.hiddenThesis ? ' hidden' : '';
    const stateCls = (isStudied ? ' is-studied' : '') + (isBookmarked ? ' is-bookmarked' : '');
    html += '<article class="topic' + stateCls + '" id="' + t.id + '">' +
      '<header class="topic-header"><div class="topic-num">&sect; ' + num + '</div>' +
      '<div class="topic-title-block"><h2>' + t.title + '</h2>' +
      '<div class="spec-tags">' + t.spec.map(function(s){ return '<span class="spec-tag">' + s + '</span>'; }).join('') + '</div>' +
      (function(){
        const due = topicDueStatus(paperId, t.id);
        return '<div class="topic-meta-row"><span class="topic-due-pill ' + due.state + '">' + due.label + '</span></div>';
      })() +
      '</div>' +
      '<div class="topic-actions">' +
        '<button class="t-action ' + (isStudied ? 'studied' : '') + '" data-action="studied" data-key="' + tkey + '"><span class="ico">✓</span><span>' + (isStudied ? 'Studied' : 'Mark studied') + '</span></button>' +
        '<button class="t-action ' + (isBookmarked ? 'bookmarked' : '') + '" data-action="bookmark" data-key="' + tkey + '"><span class="ico">★</span><span>' + (isBookmarked ? 'Bookmarked' : 'Bookmark') + '</span></button>' +
      '</div>' +
      '</header>' +
      '<p class="orientation">' + t.orientation + '</p>' +
      '<div class="ao-grid">' +
        '<div class="ao"><div class="ao-label">AO1 <small>Knowledge &amp; Understanding</small></div>' + t.ao1 + '</div>' +
        '<div class="ao"><div class="ao-label">AO2 <small>Evaluation &amp; Argument</small></div>' + t.ao2 + '</div>' +
      '</div>' +
      '<div class="thesis' + hiddenCls + '">' +
      '<div class="thesis-label">The A&#9733; line &middot; commit to this</div>' +
      '<div class="thesis-line">' + t.thesis.line + '</div>' +
      '<div class="thesis-unpacking">' + t.thesis.unpacking + '</div>' +
      '<div class="thesis-prompt">Test yourself first &mdash; what verdict would you commit to?</div>' +
      '<div class="thesis-actions"><button class="thesis-reveal" data-action="toggle-thesis">' + (STATE.hiddenThesis ? 'Reveal A&#9733; line' : 'Hide for recall') + '</button></div>' +
      '</div>';
    if (t.scholars && t.scholars.length){
      html += '<div class="scholar-list"><div class="scholar-list-label">Scholar bank &middot; <small style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);font-style:italic;font-family:var(--body)">click a name to see where else they appear</small></div>';
      t.scholars.forEach(function(s){
        const key = canonicalScholarKey(s.name);
        html += '<div class="scholar-item"><span class="scholar-name scholar-clickable" data-scholar-key="' + key + '">' + s.name + '</span><span>' + s.pos + '</span></div>';
      });
      html += '</div>';
    }
    html += '<div class="extras"><blockquote class="quote">&ldquo;' + t.quote.text + '&rdquo;<cite>' + t.quote.cite + '</cite></blockquote>' +
      '<div class="exam-prompt">' + t.exam + '</div></div>';

    /* Synoptic suggestions: shared-scholar overlap with other topics */
    const suggestions = computeSynopticSuggestions(paperId, t);
    if (suggestions.length){
      html += '<div class="synoptic-suggest"><div class="synoptic-suggest-label">Synoptic links &middot; topics that share scholars with this one</div><div class="synoptic-list">';
      suggestions.forEach(function(s){
        html += '<a class="synoptic-card" href="#" data-jump-paper="' + s.paper + '" data-jump-topic="' + s.topicId + '"><span class="synoptic-card-title">' + s.title + '</span><span class="synoptic-card-meta">P' + s.paper + ' &middot; ' + s.shared + ' shared</span></a>';
      });
      html += '</div></div>';
    }

    /* Per-topic notes */
    const noteVal = (STATE.notes[tkey] || '').replace(/</g, '&lt;');
    html += '<div class="topic-notes"><div class="topic-notes-label"><span>Your notes</span><span class="topic-notes-saved" id="ns-' + tkey.replace(/:/g, '_') + '"></span></div>' +
      '<textarea data-notes-key="' + tkey + '" placeholder="Add your own notes, mnemonics, examples — saved automatically.">' + noteVal + '</textarea></div>';

    html += '</article>';
  });
  html += '</section>';
  main.innerHTML = html;
  toc.innerHTML = paper.topics.map(function(t){
    const tk = topicKey(paperId, t.id);
    const cls = (STATE.studied[tk] ? 'is-studied ' : '') + (STATE.bookmarks[tk] ? 'is-bookmarked' : '');
    const pip = STATE.studied[tk] ? '<span class="toc-pip studied"></span>' : (STATE.bookmarks[tk] ? '<span class="toc-pip bookmarked"></span>' : '');
    return '<li><a class="' + cls.trim() + '" href="#' + t.id + '">' + stripHtml(t.title) + pip + '</a></li>';
  }).join('');
  updateProgressBar(paperId);
  applyFilter();
  setupScrollSpy('.topic');
  wireTopicActions(paperId);
  wireSynopticJumps();
  wireNotes();
  wireScholarClicks();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* Compute topics that share scholars with the given topic.
   Sorted by shared count, top 5, excluding the topic itself. */
function computeSynopticSuggestions(paperId, topic){
  if (!topic.scholars || !topic.scholars.length) return [];
  const sourceKeys = {};
  topic.scholars.forEach(function(s){ sourceKeys[canonicalScholarKey(s.name)] = true; });
  const results = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){
      if (p === paperId && t.id === topic.id) return;
      let shared = 0;
      (t.scholars || []).forEach(function(s){
        if (sourceKeys[canonicalScholarKey(s.name)]) shared++;
      });
      if (shared >= 2) results.push({ paper: p, topicId: t.id, title: stripHtml(t.title), shared: shared });
    });
  });
  results.sort(function(a, b){ return b.shared - a.shared; });
  return results.slice(0, 5);
}

function wireSynopticJumps(){
  document.querySelectorAll('.synoptic-card[data-jump-topic]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      const targetPaper = el.dataset.jumpPaper;
      const targetTopic = el.dataset.jumpTopic;
      const activeTab = document.querySelector('.paper-tab[aria-selected="true"]');
      if (activeTab && activeTab.dataset.paper !== targetPaper){
        document.querySelectorAll('.paper-tab').forEach(function(x){ x.setAttribute('aria-selected', x.dataset.paper === targetPaper ? 'true' : 'false'); });
        renderPaper(targetPaper);
        setTimeout(function(){
          const tgt = document.getElementById(targetTopic);
          if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const tgt = document.getElementById(targetTopic);
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function wireNotes(){
  document.querySelectorAll('textarea[data-notes-key]').forEach(function(ta){
    let timer = null;
    ta.addEventListener('input', function(){
      if (timer) clearTimeout(timer);
      const key = ta.dataset.notesKey;
      const savedEl = document.getElementById('ns-' + key.replace(/:/g, '_'));
      if (savedEl) savedEl.textContent = '';
      timer = setTimeout(function(){
        if (ta.value.trim()){
          STATE.notes[key] = ta.value;
        } else {
          delete STATE.notes[key];
        }
        saveState();
        if (savedEl) savedEl.textContent = 'saved';
        setTimeout(function(){ if (savedEl) savedEl.textContent = ''; }, 1500);
      }, 500);
    });
  });
}

/* Apply current filter to body via class */
function applyFilter(){
  document.body.classList.remove('filter-studied', 'filter-bookmarked', 'filter-unstudied');
  if (STATE.filter && STATE.filter !== 'all'){
    document.body.classList.add('filter-' + STATE.filter);
  }
  document.querySelectorAll('.filter-pill').forEach(function(p){
    p.classList.toggle('active', p.dataset.filter === STATE.filter);
  });
}

function updateProgressBar(paperId){
  const paper = CONTENT[paperId];
  const wrap = document.getElementById('toc-progress');
  const tools = document.getElementById('toc-tools');
  if (!paper.topics){ wrap.style.display = 'none'; tools.style.display = 'none'; return; }
  wrap.style.display = 'block';
  tools.style.display = 'block';
  const total = paper.topics.length;
  const done = paper.topics.filter(function(t){ return STATE.studied[topicKey(paperId, t.id)]; }).length;
  document.getElementById('prog-text').innerHTML = '<b>' + done + '</b>/' + total;
  document.getElementById('prog-fill').style.width = (total ? Math.round(done / total * 100) : 0) + '%';
  document.getElementById('prog-reset').onclick = function(){
    if (!confirm('Reset studied/bookmark progress for Paper ' + paperId + '?')) return;
    paper.topics.forEach(function(t){
      const k = topicKey(paperId, t.id);
      delete STATE.studied[k];
      delete STATE.bookmarks[k];
    });
    saveState();
    toast('Paper ' + paperId + ' progress reset');
    renderPaper(paperId);
  };
}

function wireTopicActions(paperId){
  document.querySelectorAll('.t-action').forEach(function(b){
    b.addEventListener('click', function(){
      const action = b.dataset.action;
      const key = b.dataset.key;
      const store = action === 'studied' ? STATE.studied : STATE.bookmarks;
      if (store[key]){
        delete store[key];
        toast(action === 'studied' ? 'Removed from studied' : 'Bookmark removed');
      } else {
        store[key] = Date.now();
        if (action === 'studied') recordStudyToday();
        toast(action === 'studied' ? 'Marked as studied' : 'Bookmarked', 'success');
      }
      saveState();
      updateStreakDisplay();
      const scrollY = window.scrollY;
      renderPaper(paperId);
      window.scrollTo(0, scrollY);
    });
  });
  document.querySelectorAll('.thesis-reveal').forEach(function(b){
    b.addEventListener('click', function(){
      STATE.hiddenThesis = !STATE.hiddenThesis;
      saveState();
      const scrollY = window.scrollY;
      renderPaper(paperId);
      window.scrollTo(0, scrollY);
      toast(STATE.hiddenThesis ? 'Thesis lines hidden for recall' : 'Thesis lines revealed');
    });
  });
}

function wireScholarClicks(){
  document.querySelectorAll('.scholar-clickable').forEach(function(el){
    el.style.cursor = 'pointer';
    el.style.textDecoration = 'underline';
    el.style.textDecorationStyle = 'dotted';
    el.style.textUnderlineOffset = '3px';
    el.addEventListener('click', function(){ openScholar(el.dataset.scholarKey); });
  });
}

function renderCraft(paper){
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  document.getElementById('toc-progress').style.display = 'none';
  document.getElementById('toc-tools').style.display = 'none';
  let html = '<section class="paper-section active" data-paper="04">' +
    '<div class="paper-intro craft-intro"><div class="eyebrow">' + paper.code + '</div>' +
    '<h1>' + paper.title + '</h1><p class="lede">' + paper.intro + '</p></div>';
  paper.sections.forEach(function(s, i){
    const num = String(i + 1).padStart(2, '0');
    html += '<article class="craft-section" id="' + s.id + '">' +
      '<header class="craft-head"><div class="craft-num">&sect; ' + num + '</div>' +
      '<h2 class="craft-title">' + s.title + '</h2></header>' + s.html + '</article>';
  });
  html += '</section>';
  main.innerHTML = html;
  toc.innerHTML = paper.sections.map(function(s){
    return '<li><a href="#' + s.id + '">' + stripHtml(s.title) + '</a></li>';
  }).join('');
  setupScrollSpy('.craft-section');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderReference(paper){
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  document.getElementById('toc-progress').style.display = 'none';
  document.getElementById('toc-tools').style.display = 'none';
  let html = '<section class="paper-section active" data-paper="05">' +
    '<div class="paper-intro ref-intro"><div class="eyebrow">' + paper.code + '</div>' +
    '<h1>' + paper.title + '</h1><p class="lede">' + paper.intro + '</p></div>';
  paper.sections.forEach(function(s, i){
    const num = String(i + 1).padStart(2, '0');
    html += '<article class="ref-section" id="' + s.id + '">' +
      '<header class="ref-head"><div class="ref-num">&sect; ' + num + '</div>' +
      '<h2 class="ref-title">' + s.title + '</h2></header>';
    if (s.kind === 'glossary') html += renderGlossary(s);
    else if (s.kind === 'timeline') html += renderTimeline(s);
    else if (s.kind === 'comparisons') html += renderComparisons();
    html += '</article>';
  });
  html += '</section>';
  main.innerHTML = html;
  toc.innerHTML = paper.sections.map(function(s){
    return '<li><a href="#' + s.id + '">' + stripHtml(s.title) + '</a></li>';
  }).join('');
  setupGlossary();
  setupScrollSpy('.ref-section');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderGlossary(s){
  const letters = Array.from(new Set(s.items.map(function(i){ return i.term[0].toUpperCase(); }))).sort();
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let html = '<p class="ref-desc">Technical terms across the H573 specification. Filter by letter or search.</p>' +
    '<div class="gloss-filter"><input type="text" class="gloss-search" id="gloss-search" placeholder="Filter terms..." /></div>' +
    '<div class="gloss-letters" id="gloss-letters"><button class="gloss-letter active" data-letter="">All</button>';
  allLetters.forEach(function(L){
    const has = letters.indexOf(L) >= 0;
    html += '<button class="gloss-letter" data-letter="' + L + '"' + (has ? '' : ' disabled') + '>' + L + '</button>';
  });
  html += '</div><div class="gloss-list" id="gloss-list">';
  s.items.forEach(function(item){
    html += '<div class="gloss-item" data-term="' + item.term.toLowerCase() + '" data-letter="' + item.term[0].toUpperCase() + '">' +
      '<div class="gloss-term"><span>' + item.term + '</span><span class="gp">' + item.paper + '</span></div>' +
      '<div class="gloss-def">' + item.def + '</div></div>';
  });
  html += '</div><div class="gloss-empty" id="gloss-empty" style="display:none">No terms match.</div>';
  return html;
}

function renderComparisons(){
  let html = '<p class="ref-desc">Side-by-side comparisons of rival theories and thinkers across the H573 specification. Use them to drill the contrasts examiners reward.</p>';
  (typeof COMPARISONS !== 'undefined' ? COMPARISONS : []).forEach(function(c){
    html += '<div class="cmp-table-wrap" id="cmp-' + c.id + '">' +
      '<h3 class="cmp-title"><span>' + c.title + '</span><span class="cmp-paper">' + c.paper + '</span></h3>' +
      '<table class="cmp-table"><thead><tr>' +
      c.headers.map(function(h){ return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      c.rows.map(function(r){
        return '<tr>' + r.map(function(cell){ return '<td>' + cell + '</td>'; }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>';
  });
  return html;
}

function renderTimeline(s){
  let html = '<p class="ref-desc">Chronology of thinkers named in the H573 specification.</p>';
  s.entries.forEach(function(era){
    html += '<div class="tl-era"><h3>' + era.era + '</h3><div class="tl-thinkers">';
    era.thinkers.forEach(function(t){
      html += '<div class="tl-thinker"><div class="tl-name">' + t.name + '</div>' +
        '<div class="tl-dates">' + t.dates + '</div>' +
        '<div class="tl-contribution">' + t.contribution + '</div></div>';
    });
    html += '</div></div>';
  });
  return html;
}

function setupGlossary(){
  const gs = document.getElementById('gloss-search');
  if (!gs) return;
  let activeLetter = '';
  const items = document.querySelectorAll('.gloss-item');
  const empty = document.getElementById('gloss-empty');
  function applyFilter(){
    const q = gs.value.toLowerCase().trim();
    let shown = 0;
    items.forEach(function(it){
      const term = it.dataset.term;
      const matchQ = !q || term.indexOf(q) >= 0 || it.textContent.toLowerCase().indexOf(q) >= 0;
      const matchL = !activeLetter || it.dataset.letter === activeLetter;
      const visible = matchQ && matchL;
      it.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });
    empty.style.display = shown === 0 ? 'block' : 'none';
  }
  gs.addEventListener('input', applyFilter);
  document.querySelectorAll('.gloss-letter').forEach(function(b){
    b.addEventListener('click', function(){
      if (b.disabled) return;
      document.querySelectorAll('.gloss-letter').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      activeLetter = b.dataset.letter;
      applyFilter();
    });
  });
}

/* ESSAY MARKER */
const MARKER_STATE = { ao1Level: null, ao1Pos: null, ao2Level: null, ao2Pos: null };

function renderMarker(paper){
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  document.getElementById('toc-progress').style.display = 'none';
  document.getElementById('toc-tools').style.display = 'none';
  main.innerHTML = '<section class="paper-section active" data-paper="06">' +
    '<div class="paper-intro practice-intro"><div class="eyebrow">' + paper.code + '</div>' +
    '<h1>' + paper.title + '</h1><p class="lede">' + paper.intro + '</p></div>' +
    '<div class="marker-grid">' +
      '<div class="marker-left">' +
        '<input type="text" class="marker-q-input" id="mk-q" placeholder="The exam question (e.g. \'Natural law provides a reliable method...\')">' +
        '<textarea id="mk-essay" placeholder="Paste your essay here. The tool will analyse it and update the levels as you type."></textarea>' +
        '<div class="marker-controls">' +
          '<button class="primary" id="mk-reanalyse">Re-analyse</button>' +
          '<button id="mk-clear">Clear</button>' +
        '</div>' +
      '</div>' +
      '<div class="marker-rubric" id="mk-rubric">' +
        '<div class="rubric-empty">Paste an essay on the left (50+ words) to see the OCR levels-of-response mark scheme.</div>' +
      '</div>' +
    '</div></section>';
  toc.innerHTML = '<li><a href="#" onclick="return false">Essay marker</a></li>';
  const essay = document.getElementById('mk-essay');
  const q = document.getElementById('mk-q');
  let timer = null;
  function debounceAnalyse(){
    if (timer) clearTimeout(timer);
    timer = setTimeout(analyse, 250);
  }
  essay.addEventListener('input', debounceAnalyse);
  q.addEventListener('input', debounceAnalyse);
  document.getElementById('mk-reanalyse').addEventListener('click', analyse);
  document.getElementById('mk-clear').addEventListener('click', function(){
    essay.value = '';
    q.value = '';
    MARKER_STATE.ao1Level = MARKER_STATE.ao2Level = MARKER_STATE.ao1Pos = MARKER_STATE.ao2Pos = null;
    analyse();
  });
  function analyse(){
    const detected = detectInEssay(essay.value, q.value);
    const marks = computeMarks(detected);
    drawRubric(detected, marks);
  }
  analyse();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function detectInEssay(essay, question){
  if (!essay || essay.trim().length < 50){
    return { wordCount: 0, paragraphs: 0, scholars: [], technicalTerms: [], counterMoves: [], thesisMarkers: [], verdictMarkers: [], evaluationMarkers: [], hasIntro: false, hasConclusion: false, questionTermsHit: 0, questionTermTotal: 0, topicSentenceFocus: 0, embeddedEvaluation: 0, dialecticalPairs: 0 };
  }
  const text = essay.trim();
  const lower = text.toLowerCase();
  const wordCount = (text.match(/\S+/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter(function(p){ return p.trim().length > 30; });
  const paraCount = paragraphs.length;
  const scholars = [];
  const seenSch = {};
  SCHOLAR_LIST.forEach(function(name){
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b');
    if (re.test(text) && !seenSch[name]){ seenSch[name] = 1; scholars.push(name); }
  });
  function detectIn(list){
    return list.filter(function(p){ return lower.indexOf(p.toLowerCase()) >= 0; });
  }
  const technicalTerms = detectIn(TECHNICAL_TERMS);
  const counterMoves = detectIn(COUNTER_MOVES);
  const thesisMarkers = detectIn(THESIS_MARKERS);
  const verdictMarkers = detectIn(VERDICT_MARKERS);
  const evaluationMarkers = detectIn(EVALUATION_MARKERS);
  const stopwords = ['that','this','these','those','what','which','when','where','with','from','about','only','more','most','than','then','will','have','been','were','being','they','their','there','some','such','also','make','best','because','rather','still','show','prove','should','might','could','would','must','reliable','approach','useful','discuss','assess','evaluate','critically','extent'];
  const qWords = (question.toLowerCase().match(/[a-z]+/g) || []);
  const qTerms = [];
  qWords.forEach(function(w){ if (w.length >= 4 && stopwords.indexOf(w) < 0 && qTerms.indexOf(w) < 0) qTerms.push(w); });
  const questionTermsHit = qTerms.filter(function(t){ return lower.indexOf(t) >= 0; }).length;
  const firstPara = paragraphs[0] || '';
  const lastPara = paragraphs[paraCount - 1] || '';
  const hasIntro = firstPara.length > 100 && THESIS_MARKERS.some(function(m){ return firstPara.toLowerCase().indexOf(m) >= 0; });
  const hasConclusion = lastPara.length > 80 && VERDICT_MARKERS.some(function(m){ return lastPara.toLowerCase().indexOf(m) >= 0; });
  const bodyParas = paragraphs.slice(1, Math.max(1, paraCount - 1));
  let dialecticalPairs = 0, evaluationParas = 0, topicFocus = 0;
  bodyParas.forEach(function(p){
    const pl = p.toLowerCase();
    if (COUNTER_MOVES.some(function(m){ return pl.indexOf(m) >= 0; }) && p.length > 250) dialecticalPairs++;
    if (EVALUATION_MARKERS.some(function(m){ return pl.indexOf(m) >= 0; })) evaluationParas++;
    const firstSentence = (p.match(/^[^.!?]+[.!?]/) || [p.substring(0, 200)])[0].toLowerCase();
    const qHit = qTerms.filter(function(t){ return firstSentence.indexOf(t) >= 0; }).length;
    const stance = ['fails','succeeds','works','argues','rejects','supports','undermines','objects','challenges','defends','however','although','strength','weakness','convincing'];
    const hasStance = stance.some(function(s){ return firstSentence.indexOf(s) >= 0; });
    if (qHit >= 1 || hasStance) topicFocus++;
  });
  const bodyCount = bodyParas.length || 1;
  return {
    wordCount: wordCount, paragraphs: paraCount, scholars: scholars,
    technicalTerms: technicalTerms, counterMoves: counterMoves,
    thesisMarkers: thesisMarkers, verdictMarkers: verdictMarkers,
    evaluationMarkers: evaluationMarkers,
    hasIntro: hasIntro, hasConclusion: hasConclusion,
    questionTermsHit: questionTermsHit, questionTermTotal: qTerms.length,
    dialecticalPairs: dialecticalPairs,
    embeddedEvaluation: evaluationParas / bodyCount,
    topicSentenceFocus: topicFocus / bodyCount
  };
}

function suggestAO1(d){
  if (d.wordCount === 0) return 1;
  const breadth = Math.min(4, d.scholars.length);
  const depth = Math.min(4, d.technicalTerms.length);
  const len = d.wordCount < 200 ? 0 : d.wordCount < 300 ? 1 : d.wordCount < 450 ? 2 : d.wordCount < 600 ? 3 : 4;
  const qc = d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal;
  const tsf = d.topicSentenceFocus;
  const focus = Math.round((qc * 0.3 + tsf * 0.7) * 4);
  let total = breadth + depth + len + focus;
  if (d.wordCount >= 500 && tsf < 0.25) total -= 4;
  if (total >= 16) return 6;
  if (total >= 13) return 5;
  if (total >= 10) return 4;
  if (total >= 7) return 3;
  if (total >= 4) return 2;
  return 1;
}

function suggestAO2(d){
  if (d.wordCount === 0) return 1;
  let structure = 0;
  if (d.hasIntro) structure++;
  if (d.thesisMarkers.length >= 2) structure++;
  if (d.hasConclusion) structure++;
  if (d.verdictMarkers.length >= 2) structure++;
  const sustained = Math.round(d.embeddedEvaluation * 5);
  const dialogue = Math.min(4, d.dialecticalPairs * 2);
  const qc = d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal;
  const tsf = d.topicSentenceFocus;
  const focus = Math.round((qc * 0.3 + tsf * 0.7) * 3);
  let total = structure + sustained + dialogue + focus;
  if (d.wordCount >= 500 && tsf < 0.25) total -= 4;
  let level;
  if (total >= 16) level = 6;
  else if (total >= 13) level = 5;
  else if (total >= 10) level = 4;
  else if (total >= 7) level = 3;
  else if (total >= 4) level = 2;
  else level = 1;
  const lengthFloor = d.wordCount < 150 ? 1 : d.wordCount < 250 ? 2 : d.wordCount < 350 ? 3 : d.wordCount < 500 ? 4 : d.wordCount < 650 ? 5 : 6;
  return Math.min(level, lengthFloor);
}

function markInLevel(level, pos, levels){
  const r = levels[level].range;
  const lo = r[0], hi = r[1];
  const span = hi - lo;
  if (span === 0) return lo;
  if (span === 1) return pos <= 1 ? lo : hi;
  if (span === 2) {
    if (pos === 0) return lo;
    if (pos >= 2) return hi;
    return lo + 1;
  }
  return Math.min(hi, Math.max(lo, lo + pos));
}

function computeMarks(d){
  const autoAO1 = suggestAO1(d);
  const autoAO2 = suggestAO2(d);
  const ao1L = MARKER_STATE.ao1Level != null ? MARKER_STATE.ao1Level : autoAO1;
  const ao2L = MARKER_STATE.ao2Level != null ? MARKER_STATE.ao2Level : autoAO2;
  const ao1P = MARKER_STATE.ao1Pos != null ? MARKER_STATE.ao1Pos : 2;
  const ao2P = MARKER_STATE.ao2Pos != null ? MARKER_STATE.ao2Pos : 2;
  const ao1Mark = markInLevel(ao1L, ao1P, AO1_LEVELS);
  const ao2Mark = markInLevel(ao2L, ao2P, AO2_LEVELS);
  return { ao1L: ao1L, ao2L: ao2L, ao1P: ao1P, ao2P: ao2P, ao1Mark: ao1Mark, ao2Mark: ao2Mark, total: ao1Mark + ao2Mark, autoAO1: autoAO1, autoAO2: autoAO2 };
}

function getGrade(mark){
  if (mark >= 34) return 'A*';
  if (mark >= 29) return 'A';
  if (mark >= 24) return 'B';
  if (mark >= 18) return 'C';
  if (mark >= 13) return 'D';
  if (mark >= 8) return 'E';
  return 'U';
}

function drawRubric(d, m){
  const rubric = document.getElementById('mk-rubric');
  if (!d || d.wordCount === 0){
    rubric.innerHTML = '<div class="rubric-empty">Paste an essay on the left (50+ words) to see the OCR levels-of-response mark scheme.</div>';
    return;
  }
  const grade = getGrade(m.total);
  const gradeClass = grade === 'A*' ? 'astar' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : grade === 'C' ? 'c' : 'c';
  function aoBlock(key, aoTitle, mark, level, pos, max, levels, autoLevel){
    const r = levels[level].range;
    const positions = ['Bottom of L'+level, 'Just enough', 'Slight inconsistency', 'Top of L'+level];
    let html = '<div class="lor-section ' + (key === 'ao2' ? 'ao2' : '') + '">' +
      '<div class="lor-head"><div><span class="lor-ao-label">' + key.toUpperCase() + '</span>' +
      '<span class="lor-ao-title">' + aoTitle + '</span></div>' +
      '<div><span class="lor-mark">' + mark + '</span><span class="lor-mark-max">/' + max + '</span></div></div>' +
      '<div class="lor-row-label">Level</div><div class="lor-levels">';
    for (let L = 6; L >= 1; L--){
      const r2 = levels[L].range;
      html += '<button class="lor-level ' + (L === level ? 'active' : '') + '" data-ao="' + key + '" data-setlevel="' + L + '" title="' + levels[L].label + ': ' + r2[0] + '-' + r2[1] + '">' + L + '</button>';
    }
    html += '</div><div class="lor-current"><strong>L' + level + ': ' + levels[level].label + '</strong> &middot; ' + r[0] + '-' + r[1] + ' marks</div>' +
      '<div class="lor-desc">' + levels[level].desc + '</div>' +
      '<div class="lor-row-label">Within level</div><div class="lor-positions">';
    for (let p = 0; p < 4; p++){
      html += '<button class="lor-pos ' + (p === pos ? 'active' : '') + '" data-ao="' + key + '" data-setpos="' + p + '">' + positions[p] + '</button>';
    }
    html += '</div></div>';
    return html;
  }
  let html = '<div class="rubric-grade"><div class="rubric-grade-num ' + gradeClass + '">' + m.total + '<small>/40</small></div>' +
    '<div class="rubric-grade-band">Grade ' + grade + '</div>' +
    '<div class="rubric-grade-score">AO1 L' + m.ao1L + ' (' + m.ao1Mark + '/16) &middot; AO2 L' + m.ao2L + ' (' + m.ao2Mark + '/24)</div></div>' +
    '<div class="lor-explainer">Marked using OCR\'s levels-of-response grid. Auto-suggested levels in italic; click any level to override based on your read of the descriptors.</div>' +
    aoBlock('ao1', 'Knowledge &amp; Understanding', m.ao1Mark, m.ao1L, m.ao1P, 16, AO1_LEVELS, m.autoAO1) +
    aoBlock('ao2', 'Analysis &amp; Evaluation', m.ao2Mark, m.ao2L, m.ao2P, 24, AO2_LEVELS, m.autoAO2);
  if (d.scholars.length){
    html += '<div class="detected-list"><div class="detected-list-label">Scholars detected (' + d.scholars.length + ')</div><div class="detected-tags">';
    d.scholars.forEach(function(s){ html += '<span class="detected-tag">' + s + '</span>'; });
    html += '</div></div>';
  }
  if (d.technicalTerms.length){
    html += '<div class="detected-list"><div class="detected-list-label">Technical vocabulary (' + d.technicalTerms.length + ')</div><div class="detected-tags">';
    d.technicalTerms.slice(0, 14).forEach(function(t){ html += '<span class="detected-tag tech">' + t + '</span>'; });
    html += '</div></div>';
  }
  rubric.innerHTML = html;
  rubric.querySelectorAll('.lor-level').forEach(function(b){
    b.addEventListener('click', function(){
      const ao = b.dataset.ao;
      const L = parseInt(b.dataset.setlevel);
      if (ao === 'ao1'){ MARKER_STATE.ao1Level = L; MARKER_STATE.ao1Pos = null; }
      else { MARKER_STATE.ao2Level = L; MARKER_STATE.ao2Pos = null; }
      drawRubric(d, computeMarks(d));
    });
  });
  rubric.querySelectorAll('.lor-pos').forEach(function(b){
    b.addEventListener('click', function(){
      const ao = b.dataset.ao;
      const p = parseInt(b.dataset.setpos);
      if (ao === 'ao1') MARKER_STATE.ao1Pos = p;
      else MARKER_STATE.ao2Pos = p;
      drawRubric(d, computeMarks(d));
    });
  });
}

function setupScrollSpy(selector){
  const links = document.querySelectorAll('.toc a');
  const items = document.querySelectorAll(selector);
  links.forEach(function(link){
    link.addEventListener('click', function(e){
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        links.forEach(function(l){ l.classList.toggle('active', l === link); });
      }
    });
  });
  if (!items.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        const id = e.target.id;
        links.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href') === '#' + id); });
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  items.forEach(function(t){ obs.observe(t); });
}

document.querySelectorAll('.paper-tab').forEach(function(tab){
  tab.addEventListener('click', function(){
    document.querySelectorAll('.paper-tab').forEach(function(t){ t.setAttribute('aria-selected', 'false'); });
    tab.setAttribute('aria-selected', 'true');
    renderPaper(tab.dataset.paper);
  });
});

let searchIndex = [];
let searchResults = [];
let searchSelectedIdx = 0;

function buildSearchIndex(){
  searchIndex = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t, i){
      const scholarText = (t.scholars || []).map(function(s){ return s.name + ' ' + s.pos; }).join(' ');
      searchIndex.push({
        paper: p, topicId: t.id, num: i + 1,
        title: stripHtml(t.title),
        body: [stripHtml(t.title), t.spec.join(' '), t.orientation, stripHtml(t.ao1), stripHtml(t.ao2), stripHtml(t.thesis.line), stripHtml(t.thesis.unpacking), t.quote.text + ' ' + t.quote.cite, t.exam, scholarText].join(' ').toLowerCase(),
        snippet: t.orientation, kind: 'topic'
      });
    });
  });
  (CONTENT['04'].sections || []).forEach(function(s, i){
    searchIndex.push({ paper: '04', topicId: s.id, num: i+1, title: stripHtml(s.title), body: stripHtml(s.html).toLowerCase(), snippet: stripHtml(s.html).slice(0, 200), kind: 'craft' });
  });
  const gloss = (CONTENT['05'].sections || []).find(function(s){ return s.kind === 'glossary'; });
  if (gloss) gloss.items.forEach(function(it){
    searchIndex.push({ paper: '05', topicId: 'glossary', title: it.term, body: (it.term + ' ' + it.def).toLowerCase(), snippet: it.def, kind: 'gloss' });
  });
}

function searchQuery(q){
  if (!q || q.length < 2) return [];
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = [];
  searchIndex.forEach(function(item){
    let score = 0;
    terms.forEach(function(term){
      if (item.title.toLowerCase().indexOf(term) >= 0) score += 10;
      if (item.body.indexOf(term) >= 0) score += 1;
    });
    if (score > 0) scored.push({ item: item, score: score });
  });
  scored.sort(function(a, b){ return b.score - a.score; });
  return scored.slice(0, 30).map(function(s){ return s.item; });
}

function highlightSnippet(text, q){
  if (!text) return '';
  const terms = q.toLowerCase().split(/\s+/).filter(function(t){ return t.length >= 2; });
  let firstIdx = -1;
  terms.forEach(function(t){
    const i = text.toLowerCase().indexOf(t);
    if (i >= 0 && (firstIdx === -1 || i < firstIdx)) firstIdx = i;
  });
  let snippet = text;
  if (firstIdx > 60) snippet = '...' + text.slice(firstIdx - 50);
  snippet = snippet.slice(0, 200);
  terms.forEach(function(t){
    const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    snippet = snippet.replace(re, '<mark>$1</mark>');
  });
  return snippet + (text.length > 200 ? '...' : '');
}

function renderSearchResults(q){
  searchResults = searchQuery(q);
  searchSelectedIdx = 0;
  const el = document.getElementById('search-results');
  if (!q || q.length < 2){
    el.innerHTML = '<div class="search-empty">Type at least 2 characters.</div>';
    return;
  }
  if (!searchResults.length){
    el.innerHTML = '<div class="search-empty">No matches for "' + q + '".</div>';
    return;
  }
  const groups = { '01': [], '02': [], '03': [], '04': [], '05': [] };
  searchResults.forEach(function(r){ if (groups[r.paper]) groups[r.paper].push(r); });
  let html = '';
  let idx = 0;
  function addGroup(label, list){
    if (!list.length) return;
    html += '<div class="sr-section">' + label + '</div>';
    list.forEach(function(r){
      html += '<div class="sr-item" data-idx="' + idx + '" data-paper="' + r.paper + '" data-target="' + r.topicId + '">' +
        '<div class="sr-meta">&sect; ' + (r.num ? String(r.num).padStart(2, '0') : r.kind) + '</div>' +
        '<div class="sr-title">' + r.title + '</div>' +
        '<div class="sr-snippet">' + highlightSnippet(r.snippet, q) + '</div></div>';
      idx++;
    });
  }
  addGroup('Paper 01 - Philosophy of Religion', groups['01']);
  addGroup('Paper 02 - Religion & Ethics', groups['02']);
  addGroup('Paper 03 - Christian Thought', groups['03']);
  addGroup('Craft', groups['04']);
  addGroup('Glossary', groups['05']);
  el.innerHTML = html;
  updateSearchSelection();
  el.querySelectorAll('.sr-item').forEach(function(it){
    it.addEventListener('click', function(){ navigateToResult(it); });
  });
}

function navigateToResult(it){
  const paperId = it.dataset.paper;
  const target = it.dataset.target;
  document.querySelectorAll('.paper-tab').forEach(function(t){
    t.setAttribute('aria-selected', t.dataset.paper === paperId ? 'true' : 'false');
  });
  renderPaper(paperId);
  closeSearch();
  setTimeout(function(){
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function updateSearchSelection(){
  const items = document.querySelectorAll('.sr-item');
  items.forEach(function(it, i){ it.classList.toggle('selected', i === searchSelectedIdx); });
  if (items[searchSelectedIdx]) items[searchSelectedIdx].scrollIntoView({ block: 'nearest' });
}

function openSearch(){
  document.getElementById('search-modal').classList.add('active');
  const inp = document.getElementById('search-input');
  inp.value = '';
  inp.focus();
  renderSearchResults('');
}
function closeSearch(){
  document.getElementById('search-modal').classList.remove('active');
}

document.getElementById('open-search').addEventListener('click', openSearch);
document.getElementById('search-close').addEventListener('click', closeSearch);
document.getElementById('scholar-close').addEventListener('click', closeScholar);
document.getElementById('scholar-modal').addEventListener('click', function(e){
  if (e.target.id === 'scholar-modal') closeScholar();
});
document.getElementById('search-input').addEventListener('input', function(e){ renderSearchResults(e.target.value); });
document.getElementById('search-modal').addEventListener('click', function(e){
  if (e.target.id === 'search-modal') closeSearch();
});

document.addEventListener('keydown', function(e){
  const inField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
  const modal = document.getElementById('search-modal');
  const scholarModal = document.getElementById('scholar-modal');
  const flashModal = document.getElementById('flash-modal');
  const essayModal = document.getElementById('essay-modal');
  if (scholarModal.classList.contains('active')){
    if (e.key === 'Escape') closeScholar();
    return;
  }
  if (flashModal.classList.contains('active')){
    if (e.key === 'Escape') flashModal.classList.remove('active');
    else if (e.key === 'ArrowRight' || e.key === 'Enter'){ e.preventDefault(); showFlash(FLASH_IDX + 1); }
    else if (e.key === 'ArrowLeft'){ e.preventDefault(); showFlash(FLASH_IDX - 1); }
    else if (e.key === ' '){ e.preventDefault(); document.getElementById('flash-reveal').click(); }
    return;
  }
  if (essayModal.classList.contains('active')){
    if (e.key === 'Escape') essayModal.classList.remove('active');
    return;
  }
  const quizModal = document.getElementById('quiz-modal');
  if (quizModal.classList.contains('active')){
    if (e.key === 'Escape') quizModal.classList.remove('active');
    return;
  }
  const ppModal = document.getElementById('past-papers-modal');
  if (ppModal.classList.contains('active')){
    if (e.key === 'Escape') ppModal.classList.remove('active');
    return;
  }
  const modalOpen = modal.classList.contains('active');
  if (modalOpen){
    if (e.key === 'Escape') closeSearch();
    else if (e.key === 'ArrowDown'){
      e.preventDefault();
      if (searchResults.length){ searchSelectedIdx = Math.min(searchSelectedIdx + 1, searchResults.length - 1); updateSearchSelection(); }
    } else if (e.key === 'ArrowUp'){
      e.preventDefault();
      if (searchResults.length){ searchSelectedIdx = Math.max(searchSelectedIdx - 1, 0); updateSearchSelection(); }
    } else if (e.key === 'Enter'){
      e.preventDefault();
      const items = document.querySelectorAll('.sr-item');
      if (items[searchSelectedIdx]) navigateToResult(items[searchSelectedIdx]);
    }
    return;
  }
  if (inField) return;
  if (e.key === '/' && !e.metaKey && !e.ctrlKey){ e.preventDefault(); openSearch(); }
  else if ((e.metaKey || e.ctrlKey) && e.key === 'k'){ e.preventDefault(); openSearch(); }
  else if (['1','2','3','4','5','6'].indexOf(e.key) >= 0){
    e.preventDefault();
    const paperId = '0' + e.key;
    const tab = document.querySelector('.paper-tab[data-paper="' + paperId + '"]');
    if (tab) tab.click();
  }
  else if (e.key === 'j' || e.key === 'k'){
    const items = document.querySelectorAll('.topic, .craft-section, .ref-section');
    if (!items.length) return;
    const scrollY = window.scrollY;
    let targetIdx = -1;
    if (e.key === 'j'){
      for (let i = 0; i < items.length; i++){
        if (items[i].getBoundingClientRect().top + window.scrollY > scrollY + 100){ targetIdx = i; break; }
      }
    } else {
      for (let i = items.length - 1; i >= 0; i--){
        if (items[i].getBoundingClientRect().top + window.scrollY < scrollY - 5){ targetIdx = i; break; }
      }
    }
    if (targetIdx >= 0){
      e.preventDefault();
      items[targetIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  else if (e.key === 'h'){
    /* mark current visible topic as studied */
    const items = document.querySelectorAll('.topic');
    let visible = null;
    items.forEach(function(it){
      const r = it.getBoundingClientRect();
      if (r.top >= -50 && r.top < window.innerHeight / 2 && !visible) visible = it;
    });
    if (visible){
      const btn = visible.querySelector('.t-action[data-action="studied"]');
      if (btn) btn.click();
    }
  }
});

/* ===== FILTER PILLS ===== */
document.querySelectorAll('.filter-pill').forEach(function(p){
  p.addEventListener('click', function(){
    STATE.filter = p.dataset.filter;
    saveState();
    applyFilter();
    toast(STATE.filter === 'all' ? 'Showing all topics' : 'Filtered: ' + p.textContent.trim());
  });
});

/* ===== RANDOM TOPIC ===== */
document.getElementById('tool-random').addEventListener('click', function(){
  const all = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){ all.push({ paper: p, topic: t }); });
  });
  if (!all.length) return;
  const pick = all[Math.floor(Math.random() * all.length)];
  const activeTab = document.querySelector('.paper-tab[aria-selected="true"]');
  if (!activeTab || activeTab.dataset.paper !== pick.paper){
    document.querySelectorAll('.paper-tab').forEach(function(x){ x.setAttribute('aria-selected', x.dataset.paper === pick.paper ? 'true' : 'false'); });
    renderPaper(pick.paper);
    setTimeout(function(){
      const el = document.getElementById(pick.topic.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    const el = document.getElementById(pick.topic.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  toast('Random: ' + stripHtml(pick.topic.title));
});

/* ===== FLASHCARDS ===== */
let FLASH_QUOTES = [];
let FLASH_IDX = 0;
function buildFlashDeck(){
  FLASH_QUOTES = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){
      if (t.quote && t.quote.text){
        FLASH_QUOTES.push({ paper: p, topicId: t.id, topicTitle: stripHtml(t.title), text: t.quote.text, cite: t.quote.cite });
      }
    });
  });
  /* shuffle */
  for (let i = FLASH_QUOTES.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = FLASH_QUOTES[i]; FLASH_QUOTES[i] = FLASH_QUOTES[j]; FLASH_QUOTES[j] = tmp;
  }
}
function showFlash(idx){
  if (!FLASH_QUOTES.length) buildFlashDeck();
  if (!FLASH_QUOTES.length) return;
  FLASH_IDX = ((idx % FLASH_QUOTES.length) + FLASH_QUOTES.length) % FLASH_QUOTES.length;
  const q = FLASH_QUOTES[FLASH_IDX];
  document.getElementById('flash-body').innerHTML =
    '<div class="flash-prompt">Quote</div>' +
    '<div class="flash-q">&ldquo;' + q.text + '&rdquo;</div>' +
    '<div class="flash-source" id="flash-source"><div class="src-cite">— ' + q.cite + '</div><div class="src-topic">Paper ' + q.paper + ' &middot; ' + q.topicTitle + '</div></div>';
  document.getElementById('flash-counter').textContent = (FLASH_IDX + 1) + ' / ' + FLASH_QUOTES.length;
  document.getElementById('flash-reveal').textContent = 'Reveal';
}
document.getElementById('tool-flashcards').addEventListener('click', function(){
  buildFlashDeck();
  showFlash(0);
  document.getElementById('flash-modal').classList.add('active');
});
document.getElementById('flash-close').addEventListener('click', function(){
  document.getElementById('flash-modal').classList.remove('active');
});
document.getElementById('flash-modal').addEventListener('click', function(e){
  if (e.target.id === 'flash-modal') document.getElementById('flash-modal').classList.remove('active');
});
document.getElementById('flash-reveal').addEventListener('click', function(){
  const src = document.getElementById('flash-source');
  src.classList.toggle('revealed');
  document.getElementById('flash-reveal').textContent = src.classList.contains('revealed') ? 'Hide' : 'Reveal';
});
document.getElementById('flash-next').addEventListener('click', function(){ showFlash(FLASH_IDX + 1); });

/* ===== ESSAY QUESTION GENERATOR ===== */
let ESSAY_CURRENT = null;
function generateEssay(){
  const all = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){ all.push({ paper: p, topic: t }); });
  });
  if (!all.length) return null;
  return all[Math.floor(Math.random() * all.length)];
}
function showEssay(){
  ESSAY_CURRENT = generateEssay();
  if (!ESSAY_CURRENT) return;
  const t = ESSAY_CURRENT.topic;
  document.getElementById('essay-body').innerHTML =
    '<div class="essay-gen-stem">Paper ' + ESSAY_CURRENT.paper + ' &middot; ' + stripHtml(t.title) + '</div>' +
    '<div class="essay-gen-q">' + t.exam + '</div>' +
    '<div class="essay-gen-meta">Suggested timing: 40 minutes &middot; aim for 600-900 words</div>' +
    '<div class="essay-gen-thesis"><strong>A&#9733; thesis line (revealed after you draft)</strong>' + stripHtml(t.thesis.line) + '</div>';
}
document.getElementById('tool-essay-gen').addEventListener('click', function(){
  showEssay();
  document.getElementById('essay-modal').classList.add('active');
});
document.getElementById('essay-close').addEventListener('click', function(){
  document.getElementById('essay-modal').classList.remove('active');
});
document.getElementById('essay-modal').addEventListener('click', function(e){
  if (e.target.id === 'essay-modal') document.getElementById('essay-modal').classList.remove('active');
});
document.getElementById('essay-new').addEventListener('click', showEssay);
document.getElementById('essay-jump').addEventListener('click', function(){
  if (!ESSAY_CURRENT) return;
  document.getElementById('essay-modal').classList.remove('active');
  const targetPaper = ESSAY_CURRENT.paper;
  const targetTopic = ESSAY_CURRENT.topic.id;
  const activeTab = document.querySelector('.paper-tab[aria-selected="true"]');
  if (!activeTab || activeTab.dataset.paper !== targetPaper){
    document.querySelectorAll('.paper-tab').forEach(function(x){ x.setAttribute('aria-selected', x.dataset.paper === targetPaper ? 'true' : 'false'); });
    renderPaper(targetPaper);
    setTimeout(function(){
      const el = document.getElementById(targetTopic);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    const el = document.getElementById(targetTopic);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ===== PRINT MODE ===== */
document.getElementById('tool-print').addEventListener('click', function(){
  const choice = prompt('Print which topics?\n  1 — all\n  2 — studied only\n  3 — bookmarked only\n\nType 1, 2 or 3:', '1');
  if (!choice) return;
  document.body.classList.remove('print-studied', 'print-bookmarked');
  if (choice.trim() === '2') document.body.classList.add('print-studied');
  else if (choice.trim() === '3') document.body.classList.add('print-bookmarked');
  setTimeout(function(){
    window.print();
    setTimeout(function(){
      document.body.classList.remove('print-studied', 'print-bookmarked');
    }, 200);
  }, 100);
});

/* ===== DARK MODE ===== */
document.getElementById('theme-toggle').addEventListener('click', function(){
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme();
  toast(STATE.theme === 'dark' ? 'Dark mode' : 'Light mode');
});

/* ===== SCHOLAR QUIZ ===== */
let QUIZ_BANK = [];
let QUIZ_CURRENT = null;
function buildQuizBank(){
  QUIZ_BANK = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t){
      (t.scholars || []).forEach(function(s){
        if (s.pos && s.pos.length > 20){
          QUIZ_BANK.push({ scholar: s.name, position: s.pos, topic: stripHtml(t.title), paper: p });
        }
      });
    });
  });
}
function pickQuizQuestion(){
  if (!QUIZ_BANK.length) buildQuizBank();
  if (!QUIZ_BANK.length) return null;
  const q = QUIZ_BANK[Math.floor(Math.random() * QUIZ_BANK.length)];
  const allScholars = Array.from(new Set(QUIZ_BANK.map(function(x){ return x.scholar; })));
  const wrong = allScholars.filter(function(s){ return s !== q.scholar; });
  for (let i = wrong.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = wrong[i]; wrong[i] = wrong[j]; wrong[j] = tmp;
  }
  const options = [q.scholar].concat(wrong.slice(0, 3));
  for (let i = options.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = options[i]; options[i] = options[j]; options[j] = tmp;
  }
  return { question: q, options: options };
}
function renderQuiz(){
  QUIZ_CURRENT = pickQuizQuestion();
  if (!QUIZ_CURRENT) return;
  const q = QUIZ_CURRENT.question;
  let html = '<div class="quiz-prompt">Whose position is this?</div>' +
    '<div class="quiz-position">&ldquo;' + escapeHtml(q.position) + '&rdquo;</div>' +
    '<div class="quiz-options">';
  QUIZ_CURRENT.options.forEach(function(opt){
    html += '<button class="quiz-option" data-answer="' + escapeHtml(opt) + '">' + opt + '</button>';
  });
  html += '</div><div class="quiz-feedback" id="quiz-feedback"></div>' +
    '<div style="text-align:center;margin-top:1rem"><button class="primary" id="quiz-next" style="display:none;padding:0.5rem 1.2rem;font-family:var(--ui);font-size:0.75rem;font-weight:600;background:var(--ink);color:var(--paper);border:none;border-radius:2px;cursor:pointer;letter-spacing:0.04em">Next question →</button></div>';
  document.getElementById('quiz-body').innerHTML = html;
  document.getElementById('quiz-score').textContent = 'Score: ' + STATE.quizScore.correct + ' / ' + STATE.quizScore.total + ' correct';
  document.querySelectorAll('.quiz-option').forEach(function(b){
    b.addEventListener('click', function(){
      const ans = b.dataset.answer;
      const correct = ans === q.scholar;
      STATE.quizScore.total++;
      if (correct) STATE.quizScore.correct++;
      saveState();
      document.querySelectorAll('.quiz-option').forEach(function(x){
        x.classList.add('disabled');
        x.style.pointerEvents = 'none';
        if (x.dataset.answer === q.scholar) x.classList.add('correct');
        else if (x === b && !correct) x.classList.add('wrong');
      });
      const fb = document.getElementById('quiz-feedback');
      fb.className = 'quiz-feedback show ' + (correct ? 'right' : 'wrong');
      fb.innerHTML = '<strong>' + (correct ? '✓ Correct' : '✗ Wrong') + '.</strong> The position is held by <strong>' + q.scholar + '</strong> in the topic <em>' + q.topic + '</em> (Paper ' + q.paper + ').';
      document.getElementById('quiz-score').textContent = 'Score: ' + STATE.quizScore.correct + ' / ' + STATE.quizScore.total + ' correct';
      document.getElementById('quiz-next').style.display = 'inline-block';
    });
  });
  setTimeout(function(){
    const next = document.getElementById('quiz-next');
    if (next) next.addEventListener('click', renderQuiz);
  }, 50);
}
document.getElementById('tool-quiz').addEventListener('click', function(){
  buildQuizBank();
  renderQuiz();
  document.getElementById('quiz-modal').classList.add('active');
});
document.getElementById('quiz-close').addEventListener('click', function(){
  document.getElementById('quiz-modal').classList.remove('active');
});
document.getElementById('quiz-modal').addEventListener('click', function(e){
  if (e.target.id === 'quiz-modal') document.getElementById('quiz-modal').classList.remove('active');
});

/* ===== PAST PAPERS BROWSER ===== */
function renderPastPapers(filter){
  let html = '<div class="pp-filter">' +
    '<button class="' + (!filter || filter === 'all' ? 'active' : '') + '" data-pp-filter="all">All</button>' +
    '<button class="' + (filter === '01' ? 'active' : '') + '" data-pp-filter="01">Paper 01</button>' +
    '<button class="' + (filter === '02' ? 'active' : '') + '" data-pp-filter="02">Paper 02</button>' +
    '<button class="' + (filter === '03' ? 'active' : '') + '" data-pp-filter="03">Paper 03</button>' +
    '</div>';
  ['01','02','03'].forEach(function(p){
    if (filter && filter !== 'all' && filter !== p) return;
    (CONTENT[p].topics || []).forEach(function(t){
      const qs = (typeof PAST_PAPERS !== 'undefined' && PAST_PAPERS[t.id]) || [];
      if (!qs.length) return;
      html += '<div class="pp-topic"><div class="pp-topic-head">' + stripHtml(t.title) + '<span>Paper ' + p + '</span></div><div class="pp-q-list">';
      qs.forEach(function(q, qi){
        html += '<div class="pp-q"><span>' + q + '</span><button data-pp-paper="' + p + '" data-pp-topic="' + t.id + '" data-pp-q-idx="' + qi + '">Start timed</button></div>';
      });
      html += '</div></div>';
    });
  });
  document.getElementById('past-papers-body').innerHTML = html;
  document.querySelectorAll('.pp-filter button').forEach(function(b){
    b.addEventListener('click', function(){ renderPastPapers(b.dataset.ppFilter); });
  });
  document.querySelectorAll('.pp-q button').forEach(function(b){
    b.addEventListener('click', function(){
      const p = b.dataset.ppPaper;
      const tid = b.dataset.ppTopic;
      const qi = parseInt(b.dataset.ppQIdx);
      const question = PAST_PAPERS[tid][qi];
      document.getElementById('past-papers-modal').classList.remove('active');
      startTimedEssay(question, p, tid);
    });
  });
}
document.getElementById('tool-past-papers').addEventListener('click', function(){
  renderPastPapers('all');
  document.getElementById('past-papers-modal').classList.add('active');
});
document.getElementById('past-papers-close').addEventListener('click', function(){
  document.getElementById('past-papers-modal').classList.remove('active');
});
document.getElementById('past-papers-modal').addEventListener('click', function(e){
  if (e.target.id === 'past-papers-modal') document.getElementById('past-papers-modal').classList.remove('active');
});

/* ===== TIMED ESSAY MODE ===== */
const TIMED_KEY = 'h573_timed_current_v1';
let TIMED_TIMER = null;
let TIMED_SAVE = null;
const TIMED_DURATION = 40 * 60;

function startTimedEssay(question, paper, topicId){
  let session = null;
  try {
    const cur = localStorage.getItem(TIMED_KEY);
    if (cur){
      const parsed = JSON.parse(cur);
      if (!question && !parsed.completed){
        if (confirm('You have a timed essay in progress on "' + parsed.question.slice(0, 60) + '...". Resume it?')){
          session = parsed;
        } else {
          localStorage.removeItem(TIMED_KEY);
        }
      }
    }
  } catch(e){}
  if (!session){
    if (!question){
      const all = [];
      ['01','02','03'].forEach(function(p){ (CONTENT[p].topics || []).forEach(function(t){ all.push({ p: p, t: t }); }); });
      const pick = all[Math.floor(Math.random() * all.length)];
      question = pick.t.exam;
      paper = pick.p;
      topicId = pick.t.id;
    }
    session = { question: question, paper: paper, topicId: topicId, plan: '', essay: '', startTime: Date.now(), duration: TIMED_DURATION, completed: false };
  }
  try { localStorage.setItem(TIMED_KEY, JSON.stringify(session)); } catch(e){}
  renderTimedSession(session);
}
function renderTimedSession(session){
  if (TIMED_TIMER){ clearInterval(TIMED_TIMER); TIMED_TIMER = null; }
  if (TIMED_SAVE){ clearInterval(TIMED_SAVE); TIMED_SAVE = null; }
  const main = document.getElementById('main');
  document.querySelectorAll('.paper-tab').forEach(function(t){ t.setAttribute('aria-selected', 'false'); });
  document.getElementById('toc-list').innerHTML = '<li><a href="#" onclick="return false">Timed essay in progress</a></li>';
  document.getElementById('toc-progress').style.display = 'none';
  document.getElementById('toc-tools').style.display = 'none';
  main.innerHTML = '<div class="timed-bar" id="timed-bar">' +
    '<div class="timer-display" id="timer-display">--:--</div>' +
    '<div class="timer-progress-track"><div class="timer-progress-fill" id="timer-fill" style="width:100%"></div></div>' +
    '<div class="word-counter" id="word-counter"><b>0</b> <small>/ ~600-900</small></div>' +
    '<button class="timed-stop" id="timed-stop">Stop &amp; self-mark</button>' +
    '</div>' +
    '<div class="timed-question">' + session.question + '<span style="display:block;font-family:var(--ui);font-style:normal;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-top:0.5rem;font-weight:600">Paper ' + session.paper + '</span></div>' +
    '<div class="timed-plan"><div class="timed-plan-label">Plan <small>thesis line + three paragraph topic sentences (2-3 min max)</small></div>' +
    '<textarea id="timed-plan-area" placeholder="Thesis: ...&#10;Paragraph 1: ...&#10;Paragraph 2: ...&#10;Paragraph 3: ...">' + escapeHtml(session.plan) + '</textarea></div>' +
    '<div class="timed-essay-wrap"><div class="timed-essay-label">Essay <small>auto-saved every 15 seconds</small></div>' +
    '<textarea id="timed-essay-area" placeholder="Open with a definition and a committed thesis. Integrate AO1 and AO2 in every paragraph. Build to a verdict.">' + escapeHtml(session.essay) + '</textarea></div>' +
    '<div style="margin-top:1rem;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap"><span id="timed-saved" style="font-family:var(--ui);font-size:0.7rem;color:var(--muted);font-style:italic"></span>' +
    '<div style="display:flex;gap:0.5rem"><button id="timed-discard" style="padding:0.55rem 1rem;font-family:var(--ui);font-size:0.75rem;font-weight:600;background:var(--wash);border:1px solid var(--rule-strong);color:var(--ink);cursor:pointer;border-radius:2px">Discard</button>' +
    '<button id="timed-finish" style="padding:0.55rem 1rem;font-family:var(--ui);font-size:0.75rem;font-weight:600;background:var(--ink);color:var(--paper);border:none;border-radius:2px;cursor:pointer">Finish &amp; self-mark</button></div></div>';
  const planArea = document.getElementById('timed-plan-area');
  const essayArea = document.getElementById('timed-essay-area');
  const counter = document.getElementById('word-counter');
  const savedEl = document.getElementById('timed-saved');
  function updateWords(){
    const n = (essayArea.value.trim().match(/\S+/g) || []).length;
    counter.innerHTML = '<b>' + n + '</b> <small>/ ~600-900</small>';
  }
  essayArea.addEventListener('input', updateWords);
  updateWords();
  function persist(){
    const cur = session;
    cur.plan = planArea.value;
    cur.essay = essayArea.value;
    try { localStorage.setItem(TIMED_KEY, JSON.stringify(cur)); } catch(e){}
    savedEl.textContent = 'Saved ' + new Date().toLocaleTimeString();
  }
  TIMED_SAVE = setInterval(persist, 15000);
  function updateTimer(){
    const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
    const remaining = Math.max(0, session.duration - elapsed);
    const m = Math.floor(remaining / 60), s = remaining % 60;
    const display = document.getElementById('timer-display');
    if (display) display.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    const fill = document.getElementById('timer-fill');
    if (fill) fill.style.width = (remaining / session.duration * 100) + '%';
    const bar = document.getElementById('timed-bar');
    if (bar){
      bar.classList.remove('warning','expired');
      if (remaining === 0) bar.classList.add('expired');
      else if (remaining <= 5 * 60) bar.classList.add('warning');
    }
    if (remaining === 0){ finishTimed(); }
  }
  updateTimer();
  TIMED_TIMER = setInterval(updateTimer, 1000);
  function finishTimed(){
    if (TIMED_TIMER){ clearInterval(TIMED_TIMER); TIMED_TIMER = null; }
    if (TIMED_SAVE){ clearInterval(TIMED_SAVE); TIMED_SAVE = null; }
    persist();
    session.completed = true;
    try { localStorage.setItem(TIMED_KEY, JSON.stringify(session)); } catch(e){}
    /* Flow into marker */
    document.querySelectorAll('.paper-tab').forEach(function(t){ t.setAttribute('aria-selected', t.dataset.paper === '06' ? 'true' : 'false'); });
    renderMarker(CONTENT['06']);
    setTimeout(function(){
      const qInput = document.getElementById('mk-q');
      const eArea = document.getElementById('mk-essay');
      if (qInput) qInput.value = session.question;
      if (eArea){ eArea.value = session.essay; eArea.dispatchEvent(new Event('input')); }
      try { localStorage.removeItem(TIMED_KEY); } catch(e){}
    }, 100);
  }
  document.getElementById('timed-finish').addEventListener('click', finishTimed);
  document.getElementById('timed-stop').addEventListener('click', finishTimed);
  document.getElementById('timed-discard').addEventListener('click', function(){
    if (!confirm('Discard this essay? It cannot be recovered.')) return;
    if (TIMED_TIMER){ clearInterval(TIMED_TIMER); TIMED_TIMER = null; }
    if (TIMED_SAVE){ clearInterval(TIMED_SAVE); TIMED_SAVE = null; }
    try { localStorage.removeItem(TIMED_KEY); } catch(e){}
    document.querySelectorAll('.paper-tab').forEach(function(x){ x.setAttribute('aria-selected', x.dataset.paper === '01' ? 'true' : 'false'); });
    renderPaper('01');
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}
document.getElementById('tool-timed').addEventListener('click', function(){ startTimedEssay(); });

/* Show streak panel on topic papers */
function showStreakDisplay(){
  const tools = document.getElementById('toc-tools');
  const streak = document.getElementById('streak-display');
  if (tools && streak){
    streak.style.display = tools.style.display === 'block' ? 'flex' : 'none';
  }
  updateStreakDisplay();
}
const _origRenderPaper = renderPaper;
window.renderPaper = function(p){
  _origRenderPaper(p);
  setTimeout(showStreakDisplay, 50);
};

applyTheme();
buildScholarIndex();
buildSearchIndex();
buildFlashDeck();
buildQuizBank();
renderPaper('01');
applyFilter();
updateStreakDisplay();
