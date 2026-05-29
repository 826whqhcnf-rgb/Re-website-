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
  if (paperId === '08') return renderPlans();
  const paper = CONTENT[paperId];
  if (!paper) return;
  if (paperId === '04') return renderCraft(paper);
  if (paperId === '05') return renderReference(paper);
  if (paperId === '06') return renderMarker(paper);
  return renderTopicPaper(paperId, paper);
}

function buildPlansControls(){
  /* Build distinct topic list for the topic dropdown */
  const topicMap = {};
  ESSAY_PLANS.forEach(function(p){
    if (!topicMap[p.topic]) topicMap[p.topic] = { paper: p.paper, count: 0 };
    topicMap[p.topic].count++;
  });
  const sortedTopics = Object.keys(topicMap).sort(function(a, b){
    if (topicMap[a].paper !== topicMap[b].paper) return topicMap[a].paper.localeCompare(topicMap[b].paper);
    return a.localeCompare(b);
  });
  const topicOptions = sortedTopics.map(function(t){
    return '<option value="' + t.replace(/"/g, '&quot;') + '">P' + topicMap[t].paper + ' · ' + t + ' (' + topicMap[t].count + ')</option>';
  }).join('');
  const counts = {
    all: ESSAY_PLANS.length,
    p1: ESSAY_PLANS.filter(function(p){return p.paper==="01";}).length,
    p2: ESSAY_PLANS.filter(function(p){return p.paper==="02";}).length,
    p3: ESSAY_PLANS.filter(function(p){return p.paper==="03";}).length
  };
  return '<div class="plans-controls">' +
    '<div class="plans-control-row">' +
      '<label class="plans-control"><span class="plans-control-label">Paper</span>' +
        '<select id="plans-paper-select" class="plans-select">' +
          '<option value="all">All papers (' + counts.all + ')</option>' +
          '<option value="01">Paper 01 · Philosophy of Religion (' + counts.p1 + ')</option>' +
          '<option value="02">Paper 02 · Religion &amp; Ethics (' + counts.p2 + ')</option>' +
          '<option value="03">Paper 03 · Christian Thought (' + counts.p3 + ')</option>' +
          '<option value="marked">★ Examiner-marked only</option>' +
        '</select>' +
      '</label>' +
      '<label class="plans-control"><span class="plans-control-label">Topic</span>' +
        '<select id="plans-topic-select" class="plans-select">' +
          '<option value="all">All topics</option>' +
          topicOptions +
        '</select>' +
      '</label>' +
    '</div>' +
    '<input type="text" id="plans-search" class="plans-search-input" placeholder="Search by question, scholar, or argument&hellip;">' +
  '</div>';
}

function renderPlans(){
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  if (typeof ESSAY_PLANS === 'undefined' || !ESSAY_PLANS.length){
    main.innerHTML = '<div class="app-loading">Essay plans not loaded.</div>';
    return;
  }
  const tocProgress = document.getElementById('toc-progress');
  if (tocProgress) tocProgress.style.display = 'none';
  const tocTools = document.getElementById('toc-tools');
  if (tocTools) tocTools.style.display = 'none';

  let html = '<section class="paper-section active" data-paper="08">' +
    '<div class="paper-intro"><div class="eyebrow" style="color:var(--gold)">Essay plans &middot; OCR H573</div>' +
    '<h1>Essay <em style="color:var(--gold)">Plans</em></h1>' +
    '<p class="lede">Model essay plans for the major H573 exam questions. Each plan shows the committed thesis, paragraph-by-paragraph structure with scholars, counter-arguments and responses, and the verdict. Where a plan is marked with a grade, it is calibrated against a real examiner mark.</p></div>' +
    '<div class="plans-intro">Each plan is a skeleton, not a finished essay. Use them to learn the <strong>architecture</strong> of a strong response: thesis upfront, scholars deployed argumentatively (not just named), dialectical structure (claim → counter → response), and a conclusion that commits.<br><br><strong style="color:var(--claret);font-style:normal">★ Spec scholars (claret box):</strong> the thinkers OCR explicitly names in the H573 specification. Examiners expect engagement with these for AO1 marks — they are not optional. <strong style="color:var(--ochre);font-style:normal">Wider scholarship (ochre box):</strong> impressive for AO2 depth but does not substitute for spec scholars.</div>' +
    buildPlansControls() +
    '<div id="plans-list">';

  ESSAY_PLANS.forEach(function(plan){
    html += renderSinglePlan(plan);
  });

  html += '</div></section>';
  main.innerHTML = html;

  toc.innerHTML = ESSAY_PLANS.map(function(p){
    return '<li><a href="#plan-' + p.id + '">' + p.topic + '</a></li>';
  }).join('');

  let currentPaper = 'all';
  let currentTopic = 'all';
  let currentSearch = '';
  function applyPlansFilter(){
    const list = document.getElementById('plans-list');
    const filtered = ESSAY_PLANS.filter(function(p){
      const paperMatch = currentPaper === 'all' ? true
                       : currentPaper === 'marked' ? !!p.examMarks
                       : p.paper === currentPaper;
      if (!paperMatch) return false;
      if (currentTopic !== 'all' && p.topic !== currentTopic) return false;
      if (!currentSearch) return true;
      const q = currentSearch.toLowerCase();
      const scholarsInPlan = (p.paragraphs || []).flatMap(function(par){ return par.scholars || []; }).join(' ').toLowerCase();
      return p.question.toLowerCase().indexOf(q) >= 0 ||
             p.topic.toLowerCase().indexOf(q) >= 0 ||
             p.thesis.toLowerCase().indexOf(q) >= 0 ||
             scholarsInPlan.indexOf(q) >= 0;
    });
    list.innerHTML = filtered.length ?
      filtered.map(renderSinglePlan).join('') :
      '<div style="padding:2.5rem;text-align:center;color:var(--muted);font-style:italic;background:var(--wash);border:1px dashed var(--rule)">No plans match these filters.</div>';
    wirePlanLinks();
  }
  const paperSelect = document.getElementById('plans-paper-select');
  const topicSelect = document.getElementById('plans-topic-select');
  if (paperSelect){
    paperSelect.addEventListener('change', function(){
      currentPaper = paperSelect.value;
      applyPlansFilter();
    });
  }
  if (topicSelect){
    topicSelect.addEventListener('change', function(){
      currentTopic = topicSelect.value;
      applyPlansFilter();
    });
  }
  const plansSearch = document.getElementById('plans-search');
  if (plansSearch){
    plansSearch.addEventListener('input', function(){
      currentSearch = plansSearch.value.trim();
      applyPlansFilter();
    });
  }

  wirePlanLinks();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function wirePlanLinks(){
  document.querySelectorAll('.plan-topic-jump').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const targetPaper = a.dataset.paper;
      const targetTopic = a.dataset.topic;
      if (!targetPaper) return;
      selectPaper(targetPaper);
      setTimeout(function(){
        const el = document.getElementById(targetTopic);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    });
  });
}

function renderSinglePlan(plan){
  const hasMarks = !!plan.examMarks;
  /* Try to find the topic in CONTENT for a deep link to the notes */
  let topicLinkPaper = null, topicLinkId = null;
  if (typeof CONTENT !== 'undefined'){
    ['01','02','03'].forEach(function(p){
      (CONTENT[p].topics || []).forEach(function(t){
        const planTopicKey = plan.topic.toLowerCase();
        const tTitle = stripHtml(t.title).toLowerCase();
        if (!topicLinkPaper && (planTopicKey.indexOf(tTitle) >= 0 || tTitle.indexOf(planTopicKey) >= 0 ||
            planTopicKey.split(' ').filter(function(w){ return w.length > 3; }).some(function(w){ return tTitle.indexOf(w) >= 0; }))){
          topicLinkPaper = p; topicLinkId = t.id;
        }
      });
    });
  }
  const topicLink = topicLinkPaper ?
    '<a href="#" class="plan-topic-jump" data-paper="' + topicLinkPaper + '" data-topic="' + topicLinkId + '">' + plan.topic + ' →</a>' :
    plan.topic;
  let html = '<article class="plan-section ' + (hasMarks ? 'exemplar' : '') + '" id="plan-' + plan.id + '">' +
    '<div class="plan-meta">Paper ' + plan.paper + ' &middot; ' + topicLink + '</div>' +
    '<div class="plan-q">' + plan.question + '</div>';
  if (hasMarks){
    html += '<div class="plan-marks">' + plan.examMarks + '</div>';
  }
  html += '<div class="plan-thesis"><span class="plan-thesis-label">A&#9733; Thesis</span>' + plan.thesis + '</div>';
  plan.paragraphs.forEach(function(p, i){
    html += '<div class="plan-para">' +
      '<span class="plan-para-num">&para; ' + (i + 1) + '</span>' +
      '<div class="plan-para-topic">' + p.topic + '</div>';
    if (p.scholars && p.scholars.length){
      html += '<div class="plan-para-block"><span class="plan-para-label">Scholars to deploy</span>' +
        '<div class="plan-scholar-list">' +
        p.scholars.map(function(s){ return '<span class="plan-scholar-chip">' + s + '</span>'; }).join('') +
        '</div></div>';
    }
    if (p.argument) html += '<div class="plan-para-block"><span class="plan-para-label">Argument</span><div class="plan-para-text">' + p.argument + '</div></div>';
    if (p.counter) html += '<div class="plan-para-block"><span class="plan-para-label">Counter</span><div class="plan-para-text">' + p.counter + '</div></div>';
    if (p.response) html += '<div class="plan-para-block"><span class="plan-para-label">Response</span><div class="plan-para-text">' + p.response + '</div></div>';
    html += '</div>';
  });
  html += '<div class="plan-conclusion"><span class="plan-conclusion-label">Conclusion</span>' + plan.conclusion + '</div>';
  if (plan.examinerNotes){
    html += '<div class="plan-examiner"><span class="plan-examiner-label">Examiner notes</span>' + plan.examinerNotes + '</div>';
  }
  /* Specification-named scholars for this topic (CRITICAL for marks) */
  if (typeof SPEC_SCHOLARS !== 'undefined' && SPEC_SCHOLARS[plan.topic]){
    const spec = SPEC_SCHOLARS[plan.topic];
    html += '<div class="plan-spec"><span class="plan-spec-label">★ Specification scholars <small>— examiners expect these for AO1 marks</small></span>';
    spec.forEach(function(s){
      html += '<div class="plan-spec-item"><strong>' + s.name + '</strong>' + (s.work ? ' <em>' + s.work + '</em>' : '') + ' — ' + s.position + '</div>';
    });
    html += '</div>';
  }
  /* Niche scholars for the topic */
  if (typeof NICHE_SCHOLARS !== 'undefined' && NICHE_SCHOLARS[plan.topic]){
    const niche = NICHE_SCHOLARS[plan.topic];
    html += '<div class="plan-niche"><span class="plan-niche-label">Wider scholarship <small>— for AO2 depth, not a substitute for spec scholars</small></span>';
    niche.forEach(function(s){
      html += '<div class="plan-niche-item"><strong>' + s.name + '</strong>' + (s.area ? ' <em>(' + s.area + ')</em>' : '') + ' — ' + s.position + '</div>';
    });
    html += '</div>';
  }
  html += '</article>';
  return html;
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
  const empty = { wordCount: 0, paragraphs: 0, bodyParaCount: 0, scholars: [], scholarsArgumentative: [], technicalTerms: [], counterMoves: [], thesisMarkers: [], verdictMarkers: [], evaluationMarkers: [], hasIntro: false, hasConclusion: false, conclusionTiesBack: false, questionTermsHit: 0, questionTermTotal: 0, topicSentenceFocus: 0, embeddedEvaluation: 0, dialecticalPairs: 0, paragraphsWithFullStructure: 0, sustainedReasoning: 0 };
  if (!essay || essay.trim().length < 50) return empty;
  let text = essay.trim();
  /* Strip a copied question line from the start of the essay. Students often paste:
       'X is true.' Discuss.
       <newline>
       The actual essay...
     The question line was being treated as the intro paragraph, hiding the real one.
     Look for first line ending with 'Discuss' or '[40]' (the canonical question terminators)
     and strip everything up to and including it, but only if the essay continues afterwards. */
  if (question && question.length > 10){
    const firstChunk = text.substring(0, 500);
    const cutMatch = firstChunk.match(/^[^\n]*?(?:\bDiscuss\.?|\[\d+\])\s*(?:\n|$)/i);
    if (cutMatch){
      const after = text.substring(cutMatch[0].length).trim();
      /* Only strip if there's substantial essay text remaining */
      if (after.length > 200) text = after;
    }
  }
  const lower = text.toLowerCase();
  const wordCount = (text.match(/\S+/g) || []).length;
  /* Paragraph detection — try double-newline first, fall back to single-newline,
     then to sentence-based clustering for essays pasted as one block. */
  let paragraphs = text.split(/\n\s*\n/).filter(function(p){ return p.trim().length > 30; });
  if (paragraphs.length <= 1){
    paragraphs = text.split(/\n+/).filter(function(p){ return p.trim().length > 30; });
  }
  if (paragraphs.length <= 1){
    /* No newlines at all — try splitting on sentence-pattern that looks like a paragraph break:
       a full stop followed by 2+ spaces and a capital, or after certain transitional words */
    const sentenceBlocks = text.split(/(?<=[.!?])\s+(?=(?:However|Despite|On the other hand|Conversely|Furthermore|Moreover|In contrast|Thus|Therefore|In conclusion|Finally|Firstly|Secondly|Anselm|Kant|Hume|Critics|First|Second|Although|Whilst|While))/);
    if (sentenceBlocks.length > 1){
      paragraphs = sentenceBlocks.filter(function(p){ return p.trim().length > 60; });
    }
  }
  if (!paragraphs.length) paragraphs = [text];
  const paraCount = paragraphs.length;

  /* Distinct scholars */
  const scholars = [];
  const seenSch = {};
  SCHOLAR_LIST.forEach(function(name){
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b');
    if (re.test(text) && !seenSch[name]){ seenSch[name] = 1; scholars.push(name); }
  });

  /* Argumentative deployment: scholar within 80 chars of an argumentative verb */
  const argVerbs = ['argues','argued','arguing','claims','claimed','claim','states','stated','writes','wrote','responds','responded','objects','objected','replies','replied','reply','maintains','maintained','holds','held','defends','defended','contends','contended','criticises','criticised','criticizes','criticized','rejects','rejected','asserts','asserted','denies','denied','answers','answered','observes','observed','suggests','suggested','proposes','proposed','believes','believed','thinks','thought','disagrees','agrees','distinguishes','accepts','accepted','attacks','attacked','concludes','concluded','attempts','attempting','tries','tried','points out','illustrates','illustrated','supports','supported','reasons','reasoned','disproves','disproved','succeeds','succeeded','shows','showed','demonstrates','demonstrated','refutes','refuted','establishes','established','develops','developed','proves','proved','views','viewed'];
  const verbsRe = argVerbs.join('|');
  const scholarsArgumentative = [];
  scholars.forEach(function(name){
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re1 = new RegExp('\\b' + esc + '\\b[^.!?]{0,80}\\b(' + verbsRe + ')\\b', 'i');
    const re2 = new RegExp('\\b(' + verbsRe + ')\\b[^.!?]{0,80}\\b' + esc + '\\b', 'i');
    if (re1.test(text) || re2.test(text)) scholarsArgumentative.push(name);
  });

  function detectIn(list){ return list.filter(function(p){ return lower.indexOf(p.toLowerCase()) >= 0; }); }
  const technicalTerms = detectIn(TECHNICAL_TERMS);
  const counterMoves = detectIn(COUNTER_MOVES);
  const thesisMarkers = detectIn(THESIS_MARKERS);
  const verdictMarkers = detectIn(VERDICT_MARKERS);
  const evaluationMarkers = detectIn(EVALUATION_MARKERS);

  /* Question term coverage */
  const stopwords = ['that','this','these','those','what','which','when','where','with','from','about','only','more','most','than','then','will','have','been','were','being','they','their','there','some','such','also','make','best','because','rather','still','show','prove','should','might','could','would','must','reliable','approach','useful','discuss','assess','evaluate','critically','extent','view','really','simply','provide','provides','only','have','will','convincing'];
  const qWords = (question.toLowerCase().match(/[a-z]+/g) || []);
  const qTerms = [];
  qWords.forEach(function(w){ if (w.length >= 4 && stopwords.indexOf(w) < 0 && qTerms.indexOf(w) < 0) qTerms.push(w); });
  const questionTermsHit = qTerms.filter(function(t){ return lower.indexOf(t) >= 0; }).length;

  /* Intro / conclusion */
  const firstPara = paragraphs[0] || '';
  const lastPara = paragraphs[paraCount - 1] || '';
  const firstPL = firstPara.toLowerCase();
  const lastPL = lastPara.toLowerCase();
  /* hasIntro: substantial first paragraph that either matches a thesis marker OR ends with
     a clearly committal sentence (e.g. "X is not Y", "X fails to Y", "X cannot Y"). Real essays
     often state their thesis in the closing line of the intro without using formal markers. */
  const firstParaSentences = firstPara.split(/[.!?]+/).filter(function(s){ return s.trim().length > 10; });
  const lastIntroSentence = (firstParaSentences[firstParaSentences.length - 1] || '').toLowerCase();
  const committalPatterns = /\b(?:is not|isn't|cannot|can't|fails|succeeds|is the (?:strongest|weakest|best|most|least)|is best|is not best|is therefore|is thus|must be|is ultimately|is inherently|is fundamentally)\b/;
  const hasIntro = firstPara.length > 100 && (
    THESIS_MARKERS.some(function(m){ return firstPL.indexOf(m) >= 0; }) ||
    committalPatterns.test(lastIntroSentence)
  );
  const hasConclusion = lastPara.length > 80 && VERDICT_MARKERS.some(function(m){ return lastPL.indexOf(m) >= 0; });
  /* Conclusion must mention 2+ key question terms to count as "ties back" */
  const conclusionTiesBack = hasConclusion && qTerms.filter(function(t){ return lastPL.indexOf(t) >= 0; }).length >= 2;
  /* Conclusion COMMITS to a position rather than fence-sitting. Examiner reports flag
     "arguments on both sides" / "to some extent" / "in some ways" conclusions as a L3/L4 cap. */
  const fenceSittingPhrases = ['both sides have','arguments on both sides','arguments for both','both sides of','it depends','to some extent','to an extent','in some ways','some might argue','partly true','partly false','partially right','some truth','elements of truth','no clear answer','difficult to say','impossible to say','open question','remains open','ongoing debate','will continue to be debated','people will continue','it is up to','personal opinion'];
  const conclusionCommits = hasConclusion && !fenceSittingPhrases.some(function(p){ return lastPL.indexOf(p) >= 0; }) && (VERDICT_MARKERS.some(function(m){ return lastPL.indexOf(m) >= 0; }) || /\b(the strongest|the most|fails|succeeds|cannot|must be|is therefore|is thus|is ultimately)\b/i.test(lastPara));

  /* Body paragraphs — track richer structure */
  const bodyParas = paragraphs.slice(1, Math.max(1, paraCount - 1));
  let dialecticalPairs = 0;
  let evaluationParas = 0;
  let topicFocus = 0;
  let paragraphsWithFullStructure = 0;
  const reasonWords = ['because','since','therefore','thus','hence','consequently','it follows','this means','this implies','this shows'];
  bodyParas.forEach(function(p){
    const pl = p.toLowerCase();
    const hasCounter = COUNTER_MOVES.some(function(m){ return pl.indexOf(m) >= 0; });
    const hasEval = EVALUATION_MARKERS.some(function(m){ return pl.indexOf(m) >= 0; });
    const hasScholar = scholars.some(function(n){ return p.indexOf(n) >= 0; });
    const hasReasoning = reasonWords.some(function(m){ return pl.indexOf(m) >= 0; });
    /* Substantive counter — has counter-word AND length > 250 */
    if (hasCounter && p.length > 250) dialecticalPairs++;
    /* Real evaluation — has eval marker AND reasoning OR counter */
    if (hasEval && (hasReasoning || hasCounter)) evaluationParas++;
    /* Full paragraph structure — claim + scholar + evaluation + reasoning + substantial length */
    if (hasScholar && hasEval && hasReasoning && p.length > 180) paragraphsWithFullStructure++;
    /* Topic sentence focus */
    const sentences = p.split(/[.!?]+/).filter(function(s){ return s.trim().length > 0; });
    const firstSent = ((sentences[0] || p.substring(0, 200)) + '').toLowerCase();
    const qHitInTopic = qTerms.filter(function(t){ return firstSent.indexOf(t) >= 0; }).length;
    const stanceWords = ['fails','succeeds','works','rejects','supports','undermines','objects','challenges','defends','however','although','whilst','while','nevertheless','strength','weakness','crucially','significantly','decisive','sharpest','only if','only when'];
    const hasStance = stanceWords.some(function(s){ return firstSent.indexOf(s) >= 0; });
    if (qHitInTopic >= 1 || hasStance) topicFocus++;
  });
  const bodyCount = bodyParas.length || 1;

  /* Sustained reasoning: how many distinctive intro words recur 2+ times in body */
  let sustainedReasoning = 0;
  if (firstPara.length > 100 && paraCount >= 3){
    const introWords = (firstPL.match(/[a-z]+/g) || []).filter(function(w){ return w.length >= 6 && stopwords.indexOf(w) < 0; });
    const introUnique = Array.from(new Set(introWords)).slice(0, 20);
    const restText = paragraphs.slice(1).join(' ').toLowerCase();
    sustainedReasoning = introUnique.filter(function(w){
      const m = restText.match(new RegExp('\\b' + w + '\\b', 'g'));
      return m && m.length >= 2;
    }).length;
  }

  /* Specific textual references — citations examiners reward.
     Proslogion N, Summa I.X, Genesis N, John N:N, Romans N, Article X, etc. */
  const textRefPatterns = [
    /\bProslogion\s+(?:\d+|chapter\s+\d+|ch\.?\s*\d+|[IV]+)/gi,
    /\bSumma\s+(?:Theologiae|Contra|[IV]+\.?\d*)/gi,
    /\b(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Job|Psalm[s]?|Proverbs|Isaiah|Jeremiah|Ezekiel|Daniel|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation)\s+\d+(?::\d+)?/gi,
    /\bGroundwork(?:\s+(?:of|for))?(?:\s+(?:the|of))?\s*(?:Metaphysics)?/gi,
    /\bCritique\s+of\s+(?:Pure|Practical)\s+Reason/gi,
    /\bConfessions\s+(?:Book\s+)?[IVX]+/gi,
    /\bDe\s+Anima\s+[IVX]+/gi,
    /\bNicomachean\s+Ethics(?:\s+Book\s+[IVX]+)?/gi,
    /\bCity\s+of\s+God(?:\s+Book\s+[IVX]+)?/gi,
    /\bDialogues(?:\s+Concerning\s+Natural\s+Religion)?(?:\s+Part\s+[IVX]+)?/gi,
    /\bLanguage,?\s+Truth\s+and\s+Logic/gi,
    /\bPhilosophical\s+Investigations/gi,
    /\bMere\s+Christianity/gi,
    /\bThe\s+God\s+Delusion/gi,
    /\bDynamics\s+of\s+Faith/gi,
    /\b(?:Article|Question|Part|Book|Chapter|Ch\.?)\s+[IVX0-9]+/gi,
    /\b\d{4}\)/g  /* "(1781)" style year-citation */
  ];
  const textRefs = [];
  textRefPatterns.forEach(function(re){
    const matches = text.match(re) || [];
    matches.forEach(function(m){ if (textRefs.indexOf(m) < 0) textRefs.push(m); });
  });

  /* Sentence-level evaluation quality — count sentences containing both an evaluative marker
     AND reasoning. Heavier signal than paragraph-presence. */
  const allSentencesArr = text.split(/(?<=[.!?])\s+/);
  let evalSentenceCount = 0;
  let descrSentenceCount = 0;
  const reasonWordsList = ['because','since','therefore','thus','hence','consequently','it follows','this means','this implies','this shows','as the','as it','as he','as she','as they','as a','given that','due to','owing to','insofar as','in that','so'];
  allSentencesArr.forEach(function(s){
    const sl = s.toLowerCase().trim();
    if (sl.length < 15) return;
    const hasEval = EVALUATION_MARKERS.some(function(m){ return sl.indexOf(m) >= 0; });
    const hasReason = reasonWordsList.some(function(m){ return sl.indexOf(' ' + m + ' ') >= 0 || sl.indexOf(m + ' ') === 0; });
    const hasScholar = scholars.some(function(n){ return s.indexOf(n) >= 0; });
    if (hasEval && hasReason) evalSentenceCount++;
    else if (hasScholar && !hasEval && !hasReason) descrSentenceCount++;
  });
  /* Ratio: evaluation sentences vs purely descriptive scholar-mention sentences.
     A good essay has at least 1 evaluative sentence per 2 descriptive. */
  const evalToDescrRatio = descrSentenceCount > 0 ? evalSentenceCount / descrSentenceCount : (evalSentenceCount > 0 ? 2 : 0);

  /* Justified evaluation — evaluative move FOLLOWED by reasoning within 120 chars */
  const justifiedEvalMatches = text.match(EVAL_THEN_REASON) || [];
  const justifiedEvaluation = justifiedEvalMatches.length;

  /* Comparative reasoning — argumentative comparison, not juxtaposition */
  let comparativeReasoning = 0;
  COMPARATIVE_PATTERNS.forEach(function(re){
    const m = text.match(new RegExp(re.source, re.flags + 'g'));
    if (m) comparativeReasoning += m.length;
  });

  /* A-star signature moves */
  const astarSignatures = ASTAR_SIGNATURE.filter(function(p){ return lower.indexOf(p) >= 0; });

  /* Weak patterns examiners flag */
  const quotedSegments = text.match(/['"][^'"]{30,}['"]/g) || [];
  const quotedWords = quotedSegments.reduce(function(sum, s){ return sum + (s.match(/\S+/g) || []).length; }, 0);
  const quoteStuffRatio = wordCount > 0 ? quotedWords / wordCount : 0;
  let scholarListingSentences = 0;
  const allSentences = text.split(/[.!?]+/);
  allSentences.forEach(function(s){
    let inSent = 0;
    scholars.forEach(function(n){ if (s.indexOf(n) >= 0) inSent++; });
    if (inSent >= 3) scholarListingSentences++;
  });
  let questionVerbatim = false;
  if (question.length > 20){
    const qNorm = question.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const qChunks = qNorm.split(' ');
    for (let i = 0; i + 8 <= qChunks.length; i++){
      const chunk = qChunks.slice(i, i + 8).join(' ');
      if (lower.indexOf(chunk) >= 0){ questionVerbatim = true; break; }
    }
  }

  /* Topic identification + required content check */
  let identifiedTopic = null;
  let topicMatchScore = 0;
  if (question && typeof TOPIC_KEYWORDS !== 'undefined'){
    const qL = question.toLowerCase();
    Object.keys(TOPIC_KEYWORDS).forEach(function(tid){
      let score = 0;
      TOPIC_KEYWORDS[tid].forEach(function(kw){ if (qL.indexOf(kw) >= 0) score++; });
      if (score > topicMatchScore){ topicMatchScore = score; identifiedTopic = tid; }
    });
  }
  let missingRequiredScholars = [];
  let missingRequiredConcepts = [];
  if (identifiedTopic && typeof TOPIC_REQUIREMENTS !== 'undefined' && TOPIC_REQUIREMENTS[identifiedTopic]){
    const req = TOPIC_REQUIREMENTS[identifiedTopic];
    missingRequiredScholars = (req.scholars || []).filter(function(s){ return scholars.indexOf(s) < 0; });
    missingRequiredConcepts = (req.concepts || []).filter(function(c){ return lower.indexOf(c) < 0; });
  }

  return {
    wordCount: wordCount, paragraphs: paraCount, bodyParaCount: bodyCount,
    scholars: scholars, scholarsArgumentative: scholarsArgumentative,
    technicalTerms: technicalTerms, counterMoves: counterMoves,
    thesisMarkers: thesisMarkers, verdictMarkers: verdictMarkers, evaluationMarkers: evaluationMarkers,
    hasIntro: hasIntro, hasConclusion: hasConclusion, conclusionTiesBack: conclusionTiesBack, conclusionCommits: conclusionCommits,
    questionTermsHit: questionTermsHit, questionTermTotal: qTerms.length,
    dialecticalPairs: dialecticalPairs,
    embeddedEvaluation: evaluationParas / bodyCount,
    topicSentenceFocus: topicFocus / bodyCount,
    paragraphsWithFullStructure: paragraphsWithFullStructure,
    sustainedReasoning: sustainedReasoning,
    justifiedEvaluation: justifiedEvaluation,
    comparativeReasoning: comparativeReasoning,
    astarSignatures: astarSignatures,
    quoteStuffRatio: quoteStuffRatio,
    scholarListingSentences: scholarListingSentences,
    questionVerbatim: questionVerbatim,
    identifiedTopic: identifiedTopic,
    missingRequiredScholars: missingRequiredScholars,
    missingRequiredConcepts: missingRequiredConcepts,
    textRefs: textRefs,
    evalSentenceCount: evalSentenceCount,
    descrSentenceCount: descrSentenceCount,
    evalToDescrRatio: evalToDescrRatio
  };
}

/* AO1 = Knowledge & Understanding. Criterion-based: each level requires ALL of:
   - scholars argumentatively deployed (not just named)
   - technical terms in context
   - sufficient length to demonstrate detail
   - question focus throughout (not just topic-word coverage)
   Returns suggested level 1-6.
*/
/* AO1 holistic scoring. Each component contributes 0-3 points based on examiner-style
   judgement, then we map total to level using best-fit. Different essays can demonstrate
   excellence in different ways — this avoids brittleness of all-or-nothing thresholds. */
function suggestAO1(d){
  if (d.wordCount === 0) return 1;
  /* Component A: scholar deployment (0-3) */
  let scholarScore = 0;
  const argSch = d.scholarsArgumentative.length;
  if (argSch >= 5) scholarScore = 3;
  else if (argSch >= 3) scholarScore = 2;
  else if (argSch >= 2) scholarScore = 1;
  /* Bonus if some named-but-not-argumentative scholars also recognized */
  if (d.scholars.length >= 4 && scholarScore < 3) scholarScore += 0.5;
  /* Component B: technical vocabulary + textual citations (0-3) */
  let techScore = 0;
  const tech = d.technicalTerms.length;
  const refs = (d.textRefs || []).length;
  /* Combine tech-term count with text-reference count — refs are stronger signal */
  const techCombined = tech + refs * 1.5;
  if (techCombined >= 8) techScore = 3;
  else if (techCombined >= 5) techScore = 2.5;
  else if (techCombined >= 3) techScore = 2;
  else if (techCombined >= 2) techScore = 1;
  else if (techCombined >= 1) techScore = 0.5;
  /* Component C: substance / length proxy for "detailed knowledge" (0-3) */
  let lenScore = 0;
  if (d.wordCount >= 700) lenScore = 3;
  else if (d.wordCount >= 500) lenScore = 2.5;
  else if (d.wordCount >= 350) lenScore = 1.5;
  else if (d.wordCount >= 200) lenScore = 1;
  /* Component D: question focus (0-3) */
  const qc = d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal;
  const tsf = d.topicSentenceFocus;
  const focus = qc * 0.3 + tsf * 0.7;
  let focusScore = 0;
  if (focus >= 0.55) focusScore = 3;
  else if (focus >= 0.4) focusScore = 2;
  else if (focus >= 0.25) focusScore = 1.5;
  else if (focus >= 0.1) focusScore = 1;
  /* Component E: topic-required content (0-3 if topic identified, else 2 default) */
  let contentScore = 2;
  if (d.identifiedTopic){
    const missingS = (d.missingRequiredScholars || []).length;
    const missingC = (d.missingRequiredConcepts || []).length;
    const totalMissing = missingS + missingC;
    if (totalMissing === 0) contentScore = 3;
    else if (totalMissing === 1) contentScore = 2.5;
    else if (totalMissing === 2) contentScore = 2;
    else if (totalMissing === 3) contentScore = 1.5;
    else if (totalMissing === 4) contentScore = 1;
    else contentScore = 0.5;
  }
  let total = scholarScore + techScore + lenScore + focusScore + contentScore;
  const components = {
    scholar: scholarScore, tech: techScore, length: lenScore,
    focus: focusScore, content: contentScore
  };
  /* Uniform-excellence bonus: examiners reward essays that are strong across all
     dimensions, not just totals. If the weakest component is still at maximum,
     add half a point — pushes consistently-strong essays into the top of their band. */
  const ao1Min = Math.min(scholarScore, techScore, lenScore, focusScore, contentScore);
  if (ao1Min >= 3) total += 0.5;
  /* Penalties */
  let penalties = 0;
  if (d.quoteStuffRatio > 0.3){ total -= 1; penalties -= 1; }
  if (d.scholarListingSentences >= 3){ total -= 0.5; penalties -= 0.5; }
  if (d.wordCount < 200){ total -= 1; penalties -= 1; }
  let level;
  if (total >= 14) level = 6;
  else if (total >= 11) level = 5;
  else if (total >= 8.5) level = 4;
  else if (total >= 6) level = 3;
  else if (total >= 3.5) level = 2;
  else level = 1;
  return { level: level, total: total, components: components, penalties: penalties };
}

/* AO2 = Analysis & Evaluation. Criterion-based: each level requires:
   - paragraphs with full claim+scholar+reasoning+evaluation structure
   - dialectical engagement (counter-moves with substance)
   - sustained reasoning across paragraphs (thesis recurrence)
   - clear thesis in intro, decisive conclusion that ties back
   - question focus throughout
*/
/* AO2 holistic scoring. Five-ish components, each 0-3, mapped to level by best-fit. */
function suggestAO2(d){
  if (d.wordCount === 0) return 1;
  /* Component A: argument structure (intro + body + conclusion + commitment) (0-3) */
  let structureScore = 0;
  if (d.hasIntro) structureScore += 1;
  if (d.hasConclusion) structureScore += 0.5;
  if (d.conclusionTiesBack) structureScore += 0.5;
  if (d.conclusionCommits) structureScore += 1;
  /* Examiners explicitly flag fence-sitting as a L3/L4 cap. Even if other parts are
     strong, a non-committal conclusion stops top-band marks. */
  /* Component B: dialectical engagement (0-3) */
  let dialScore = 0;
  const dial = d.dialecticalPairs;
  const counterTotal = d.counterMoves.length;
  if (dial >= 3) dialScore = 3;
  else if (dial >= 2) dialScore = 2.5;
  else if (dial >= 1) dialScore = 1.5;
  else if (counterTotal >= 3) dialScore = 1;
  else if (counterTotal >= 1) dialScore = 0.5;
  /* Component C: evaluation depth (0-3). Combines:
     - justified evaluation (counter + because)
     - comparative reasoning
     - sentence-level evaluative density (eval-sentences vs purely-descriptive)
     - paragraph-level embedded evaluation */
  let evalScore = 0;
  const justEval = d.justifiedEvaluation || 0;
  const comparative = d.comparativeReasoning || 0;
  const embedded = d.embeddedEvaluation;
  const evalSentences = d.evalSentenceCount || 0;
  const evalRatio = d.evalToDescrRatio || 0;
  const evalCombo = justEval + comparative;
  if (evalCombo >= 5 && embedded >= 0.5 && evalSentences >= 6) evalScore = 3;
  else if (evalCombo >= 4 && embedded >= 0.4 && evalSentences >= 4) evalScore = 2.5;
  else if (evalCombo >= 2 && (embedded >= 0.4 || evalSentences >= 3)) evalScore = 2;
  else if (evalCombo >= 1 || embedded >= 0.3 || evalSentences >= 2) evalScore = 1.5;
  else if (embedded >= 0.15 || evalSentences >= 1) evalScore = 1;
  /* If purely descriptive (lots of scholar-mention sentences, very few eval) — cap */
  if (evalRatio > 0 && evalRatio < 0.3 && d.descrSentenceCount >= 5) evalScore = Math.min(evalScore, 1.5);
  /* Component D: sophistication / A-star moves (0-3) */
  let astarScore = 0;
  const astar = (d.astarSignatures || []).length;
  if (astar >= 6) astarScore = 3;
  else if (astar >= 4) astarScore = 2.5;
  else if (astar >= 3) astarScore = 2;
  else if (astar >= 2) astarScore = 1.5;
  else if (astar >= 1) astarScore = 1;
  /* Component E: question focus / coherent line of reasoning (0-3) */
  const qc = d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal;
  const tsf = d.topicSentenceFocus;
  const focus = qc * 0.3 + tsf * 0.7;
  const sustained = d.sustainedReasoning;
  let coherenceScore = 0;
  if (focus >= 0.55 && sustained >= 5) coherenceScore = 3;
  else if (focus >= 0.45 && sustained >= 3) coherenceScore = 2.5;
  else if (focus >= 0.35 && sustained >= 2) coherenceScore = 2;
  else if (focus >= 0.25) coherenceScore = 1.5;
  else if (focus >= 0.15) coherenceScore = 1;
  let total = structureScore + dialScore + evalScore + astarScore + coherenceScore;
  const components = {
    structure: structureScore, dialectic: dialScore,
    evaluation: evalScore, astar: astarScore, coherence: coherenceScore
  };
  /* Same uniform-excellence bonus for AO2: weakest component at max → +0.5 */
  const ao2Min = Math.min(structureScore, dialScore, evalScore, astarScore, coherenceScore);
  if (ao2Min >= 3) total += 0.5;
  let penalties = 0;
  if (d.wordCount < 200){ total -= 2; penalties -= 2; }
  if (d.questionVerbatim){ total -= 0.5; penalties -= 0.5; }
  if (d.quoteStuffRatio > 0.3){ total -= 1; penalties -= 1; }
  let level;
  if (total >= 13.5) level = 6;
  else if (total >= 11) level = 5;
  else if (total >= 8) level = 4;
  else if (total >= 5.5) level = 3;
  else if (total >= 3) level = 2;
  else level = 1;
  return { level: level, total: total, components: components, penalties: penalties };
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

/* Calculate the within-level position (0-3) based on how far an essay's total
   sits within its level band. Smoother than a fixed default. Position 0 = just
   into the band; position 3 = about to break into the next band up. */
function autoPosition(total, level, bands){
  /* Compute within-level position 0-3 from where the essay sits in its band.
     Default position 2 (mid-band, "slight inconsistency") matches OCR's typical mark.
     Position 3 ("consistently meets") requires sitting in the top 30% of band.
     Position 1 ("just enough on balance") for bottom 20%. */
  const range = bands[level];
  if (!range) return 2;
  const lo = range[0], hi = range[1];
  if (hi <= lo) return 2;
  const frac = Math.min(1, Math.max(0, (total - lo) / (hi - lo)));
  if (frac >= 0.7) return 3;
  if (frac >= 0.2) return 2;
  return 1;
}
/* Tightened band thresholds. The previous cutoffs let too many essays slip into L6. */
const AO1_BANDS = { 6:[14, 16], 5:[11, 14], 4:[8.5, 11], 3:[6, 8.5], 2:[3.5, 6], 1:[0, 3.5] };
const AO2_BANDS = { 6:[13.5, 16], 5:[11, 13.5], 4:[8, 11], 3:[5.5, 8], 2:[3, 5.5], 1:[0, 3] };

function computeMarks(d){
  const ao1Result = suggestAO1(d);
  const ao2Result = suggestAO2(d);
  const autoAO1 = ao1Result.level;
  const autoAO2 = ao2Result.level;
  const ao1L = MARKER_STATE.ao1Level != null ? MARKER_STATE.ao1Level : autoAO1;
  const ao2L = MARKER_STATE.ao2Level != null ? MARKER_STATE.ao2Level : autoAO2;
  /* Auto-position is now derived from how far the total sits within the band.
     Only used when user hasn't overridden, AND when the user-selected level
     matches the auto-suggested level (otherwise default to 2). */
  const autoAO1P = ao1L === autoAO1 ? autoPosition(ao1Result.total, ao1L, AO1_BANDS) : 2;
  const autoAO2P = ao2L === autoAO2 ? autoPosition(ao2Result.total, ao2L, AO2_BANDS) : 2;
  const ao1P = MARKER_STATE.ao1Pos != null ? MARKER_STATE.ao1Pos : autoAO1P;
  const ao2P = MARKER_STATE.ao2Pos != null ? MARKER_STATE.ao2Pos : autoAO2P;
  const ao1Mark = markInLevel(ao1L, ao1P, AO1_LEVELS);
  const ao2Mark = markInLevel(ao2L, ao2P, AO2_LEVELS);
  return {
    ao1L: ao1L, ao2L: ao2L, ao1P: ao1P, ao2P: ao2P,
    ao1Mark: ao1Mark, ao2Mark: ao2Mark,
    total: ao1Mark + ao2Mark,
    autoAO1: autoAO1, autoAO2: autoAO2,
    autoAO1P: autoAO1P, autoAO2P: autoAO2P,
    ao1Result: ao1Result, ao2Result: ao2Result
  };
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

function renderSavedAttempts(){
  let attempts = [];
  try { attempts = JSON.parse(localStorage.getItem('h573_marks_v1') || '[]'); } catch(e){}
  if (!attempts.length) return '';
  let html = '<div style="margin-top:1rem;padding-top:0.7rem;border-top:1px dashed var(--rule)"><div style="font-family:var(--ui);font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--ochre);font-weight:600;margin-bottom:0.4rem">Saved marks (' + attempts.length + ')</div>';
  attempts.slice(0, 8).forEach(function(att, i){
    const d = new Date(att.time);
    const dateStr = d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
    const gradeColour = att.grade === 'A*' ? 'var(--gold)' : att.grade === 'A' ? 'var(--claret)' : att.grade === 'B' ? 'var(--ochre)' : 'var(--muted)';
    html += '<div style="display:grid;grid-template-columns:auto 1fr auto;gap:0.5rem;align-items:center;padding:0.35rem 0.5rem;background:var(--wash);border:1px solid var(--rule);margin-bottom:0.3rem;cursor:pointer" class="mk-attempt-load" data-idx="' + i + '">' +
      '<div style="font-family:var(--display);font-style:italic;font-weight:700;font-size:1rem;color:' + gradeColour + ';width:1.6rem;text-align:center">' + att.total + '</div>' +
      '<div style="font-family:var(--display);font-style:italic;font-size:0.82rem;line-height:1.3;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (att.question || 'Untitled') + '<div style="font-family:var(--ui);font-style:normal;font-size:0.58rem;letter-spacing:0.06em;color:var(--muted);margin-top:0.1rem">' + dateStr + ' &middot; ' + att.wordCount + ' words &middot; ' + att.grade + '</div></div>' +
      '<button class="mk-attempt-delete" data-idx="' + i + '" style="padding:0.15rem 0.4rem;font-family:var(--ui);font-size:0.6rem;background:transparent;border:1px solid var(--rule);color:var(--muted);border-radius:2px;cursor:pointer">×</button>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

function componentBar(label, val, max){
  const pct = Math.round((val / max) * 100);
  const colour = val >= max * 0.8 ? 'var(--green)' : val >= max * 0.5 ? 'var(--ochre)' : 'var(--claret)';
  return '<div style="margin:0.25rem 0">' +
    '<div style="display:flex;justify-content:space-between;font-family:var(--ui);font-size:0.65rem;color:var(--muted);margin-bottom:0.1rem"><span>' + label + '</span><span style="color:var(--ink);font-weight:600">' + val.toFixed(1) + '/' + max + '</span></div>' +
    '<div style="height:5px;background:var(--paper-deep);border-radius:2px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:' + colour + ';transition:width 0.3s"></div></div>' +
    '</div>';
}

function diag(label, ok){
  const icon = ok ? '<span style="color:var(--green);font-weight:700">✓</span>' : '<span style="color:var(--claret);font-weight:700">✗</span>';
  return '<div style="display:grid;grid-template-columns:auto 1fr;gap:0.5rem;padding:0.18rem 0">' + icon + '<span>' + label + '</span></div>';
}
function diagN(label, val, target){
  const ok = val >= target;
  const icon = ok ? '<span style="color:var(--green);font-weight:700">✓</span>' : '<span style="color:var(--claret);font-weight:700">' + val + '/' + target + '</span>';
  return '<div style="display:grid;grid-template-columns:auto 1fr;gap:0.5rem;padding:0.18rem 0">' + icon + '<span>' + label + (ok ? ' (' + val + ')' : '') + '</span></div>';
}
function diagPct(label, val, target){
  const pct = Math.round(val * 100);
  const tgt = Math.round(target * 100);
  const ok = val >= target;
  const icon = ok ? '<span style="color:var(--green);font-weight:700">✓</span>' : '<span style="color:var(--claret);font-weight:700">' + pct + '%</span>';
  return '<div style="display:grid;grid-template-columns:auto 1fr;gap:0.5rem;padding:0.18rem 0">' + icon + '<span>' + label + (ok ? ' (' + pct + '%)' : ' (target ' + tgt + '%)') + '</span></div>';
}

/* What specifically does the essay lack to reach AO1 level L? */
function whatIsMissingAO1(d, L){
  const reqs = {
    6: { arg: 6, tech: 7, words: 650, tsf: 0.55, focus: 0.6, reqContent: true },
    5: { arg: 4, tech: 5, words: 500, tsf: 0.4,  focus: 0.5, reqContent: 'most' },
    4: { arg: 3, tech: 3, words: 400, tsf: 0,    focus: 0.32 },
    3: { arg: 2, tech: 2, words: 280, tsf: 0,    focus: 0.2  }
  };
  const r = reqs[L];
  if (!r) return [];
  const miss = [];
  if (d.scholarsArgumentative.length < r.arg) miss.push('deploy ' + (r.arg - d.scholarsArgumentative.length) + ' more scholar(s) argumentatively (with verbs like "argues", "responds")');
  if (d.technicalTerms.length < r.tech) miss.push('use ' + (r.tech - d.technicalTerms.length) + ' more technical term(s) in context');
  if (d.wordCount < r.words) miss.push('extend to at least ' + r.words + ' words (current ' + d.wordCount + ')');
  if (r.tsf > 0 && d.topicSentenceFocus < r.tsf) miss.push('make ' + Math.round(r.tsf * 100) + '% of body topic sentences address the question (current ' + Math.round(d.topicSentenceFocus * 100) + '%)');
  const focus = (d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal) * 0.3 + d.topicSentenceFocus * 0.7;
  if (focus < r.focus) miss.push('sharpen question focus (currently ' + Math.round(focus * 100) + '%, need ' + Math.round(r.focus * 100) + '%)');
  if (r.reqContent === true && (d.missingRequiredScholars.length || d.missingRequiredConcepts.length)){
    const all = d.missingRequiredScholars.concat(d.missingRequiredConcepts);
    if (all.length) miss.push('engage with core content for this topic: ' + all.join(', '));
  } else if (r.reqContent === 'most' && (d.missingRequiredScholars.length + d.missingRequiredConcepts.length) > 2){
    const all = d.missingRequiredScholars.concat(d.missingRequiredConcepts).slice(0, 3);
    if (all.length) miss.push('cover more core content: ' + all.join(', '));
  }
  if (L >= 6 && d.quoteStuffRatio >= 0.2) miss.push('reduce quote-stuffing (currently ' + Math.round(d.quoteStuffRatio * 100) + '% inside quote marks)');
  if (L >= 6 && d.scholarListingSentences > 1) miss.push('break up scholar-listing sentences (' + d.scholarListingSentences + ' detected)');
  return miss;
}

function whatIsMissingAO2(d, L){
  const reqs = {
    6: { full: 3, dial: 2, comp: 2, justEval: 3, astar: 2, sustained: 5, embedded: 0.7, focus: 0.55, intro: true, ties: true, words: 650, noVerbatim: true },
    5: { full: 2, dial: 2, comp: 1, justEval: 2, sustained: 3, embedded: 0.55, focus: 0.45, intro: true, conc: true, words: 500 },
    4: { full: 1, dial: 1, justEval: 1, embedded: 0.4, focus: 0.35, conc: true, words: 380 },
    3: { dial: 1, embedded: 0.25, words: 260 }
  };
  const r = reqs[L];
  if (!r) return [];
  const miss = [];
  if (r.full && d.paragraphsWithFullStructure < r.full) miss.push('build ' + (r.full - d.paragraphsWithFullStructure) + ' more full paragraph(s) — scholar + evaluation + reasoning together');
  if (r.dial && d.dialecticalPairs < r.dial) miss.push('add ' + (r.dial - d.dialecticalPairs) + ' more substantive counter-move(s) (raise + answer an objection)');
  if (r.comp && (d.comparativeReasoning || 0) < r.comp) miss.push('add comparative reasoning: "X is more convincing than Y because..."; not juxtaposition');
  if (r.justEval && (d.justifiedEvaluation || 0) < r.justEval) miss.push('add justification after each evaluation: "however X fails BECAUSE Y" (currently ' + (d.justifiedEvaluation || 0) + ')');
  if (r.astar && (d.astarSignatures || []).length < r.astar) miss.push('use A★ moves: "the sharpest objection", "proves too much", "depends entirely on", "cuts both ways", "concede", "the verdict is"');
  if (r.sustained && d.sustainedReasoning < r.sustained) miss.push('thread thesis through paragraphs more clearly — currently ' + d.sustainedReasoning + ' key words recur');
  if (r.embedded && d.embeddedEvaluation < r.embedded){
    const need = Math.ceil((r.embedded - d.embeddedEvaluation) * d.bodyParaCount);
    if (need > 0) miss.push('add evaluation to ' + need + ' more body paragraph(s) (currently ' + Math.round(d.embeddedEvaluation * 100) + '%)');
  }
  if (r.focus){
    const focus = (d.questionTermTotal === 0 ? 1 : d.questionTermsHit / d.questionTermTotal) * 0.3 + d.topicSentenceFocus * 0.7;
    if (focus < r.focus) miss.push('sharpen question focus throughout');
  }
  if (r.intro && !d.hasIntro) miss.push('open with a committed thesis using language like "I will argue", "ultimately", "this essay argues"');
  if (r.conc && !d.hasConclusion) miss.push('add a clear conclusion with verdict language ("in conclusion", "ultimately", "the strongest view is")');
  if (r.ties && !d.conclusionTiesBack) miss.push('the conclusion must mention the question\'s key terms');
  if (r.words && d.wordCount < r.words) miss.push('extend to at least ' + r.words + ' words');
  if (r.noVerbatim && d.questionVerbatim) miss.push('paraphrase the question rather than repeating it verbatim');
  return miss;
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
    '<div class="lor-explainer">Holistic scoring across five weighted components: scholar deployment, technical knowledge, evaluation depth, A&#9733; argument moves, and sustained focus. Different essays can excel through different combinations &mdash; closer to how examiners actually judge. Click any level to override based on your own read of the descriptors. This is a heuristic; it cannot verify that scholar positions are stated correctly &mdash; that judgement requires a human reader.</div>' +
    aoBlock('ao1', 'Knowledge &amp; Understanding', m.ao1Mark, m.ao1L, m.ao1P, 16, AO1_LEVELS, m.autoAO1) +
    aoBlock('ao2', 'Analysis &amp; Evaluation', m.ao2Mark, m.ao2L, m.ao2P, 24, AO2_LEVELS, m.autoAO2);
  if (d.scholarsArgumentative.length){
    html += '<div class="detected-list"><div class="detected-list-label">Scholars deployed argumentatively (' + d.scholarsArgumentative.length + ' of ' + d.scholars.length + ' named)</div><div class="detected-tags">';
    d.scholarsArgumentative.forEach(function(s){ html += '<span class="detected-tag">' + s + '</span>'; });
    const namedOnly = d.scholars.filter(function(s){ return d.scholarsArgumentative.indexOf(s) < 0; });
    if (namedOnly.length){
      html += '</div><div style="font-family:var(--ui);font-size:0.6rem;color:var(--muted);margin-top:0.3rem;font-style:italic">Named only (no argumentative verb nearby — examiners reward deployment, not name-dropping):</div><div class="detected-tags">';
      namedOnly.forEach(function(s){ html += '<span class="detected-tag" style="background:rgba(107,29,29,0.06);color:var(--muted);border-color:var(--rule)">' + s + '</span>'; });
    }
    html += '</div></div>';
  } else if (d.scholars.length){
    html += '<div class="detected-list"><div class="detected-list-label">Scholars named (' + d.scholars.length + ') — but none deployed argumentatively</div><div class="detected-tags">';
    d.scholars.forEach(function(s){ html += '<span class="detected-tag" style="background:rgba(107,29,29,0.06);color:var(--muted)">' + s + '</span>'; });
    html += '</div><div style="font-family:var(--ui);font-size:0.62rem;color:var(--claret);margin-top:0.4rem;font-style:italic">Tie each scholar to an argumentative verb: "Aquinas argues...", "Hume claims...", "Plantinga responds..."</div></div>';
  }
  if (d.technicalTerms.length){
    html += '<div class="detected-list"><div class="detected-list-label">Technical vocabulary (' + d.technicalTerms.length + ')</div><div class="detected-tags">';
    d.technicalTerms.slice(0, 14).forEach(function(t){ html += '<span class="detected-tag tech">' + t + '</span>'; });
    html += '</div></div>';
  }
  /* Component scoring breakdown */
  if (m.ao1Result && m.ao2Result){
    html += '<div class="detected-list"><div class="detected-list-label">How the score was built</div>' +
      '<div style="font-family:var(--ui);font-size:0.72rem;font-weight:600;color:var(--claret);margin:0.4rem 0 0.2rem">AO1 components (total ' + m.ao1Result.total.toFixed(1) + '/15 → L' + m.autoAO1 + ')</div>' +
      componentBar('Scholar deployment', m.ao1Result.components.scholar, 3) +
      componentBar('Technical &amp; textual references', m.ao1Result.components.tech, 3) +
      componentBar('Substance (length proxy)', m.ao1Result.components.length, 3) +
      componentBar('Question focus', m.ao1Result.components.focus, 3) +
      componentBar('Topic-required content', m.ao1Result.components.content, 3) +
      '<div style="font-family:var(--ui);font-size:0.72rem;font-weight:600;color:var(--ochre);margin:0.7rem 0 0.2rem">AO2 components (total ' + m.ao2Result.total.toFixed(1) + '/15 → L' + m.autoAO2 + ')</div>' +
      componentBar('Argument structure (intro/conc/ties)', m.ao2Result.components.structure, 3) +
      componentBar('Dialectical engagement', m.ao2Result.components.dialectic, 3) +
      componentBar('Evaluation depth', m.ao2Result.components.evaluation, 3) +
      componentBar('A&#9733; signature moves', m.ao2Result.components.astar, 3) +
      componentBar('Coherent line of reasoning', m.ao2Result.components.coherence, 3) +
      '</div>';
  }

  /* Structure diagnostics */
  html += '<div class="detected-list"><div class="detected-list-label">Essay structure detected</div><div style="font-family:var(--body);font-size:0.78rem;line-height:1.7;color:var(--ink)">' +
    diag('Intro with thesis', d.hasIntro) +
    diag('Conclusion with verdict', d.hasConclusion) +
    diag('Conclusion ties back to question', d.conclusionTiesBack) +
    diag('Conclusion commits to a position (not fence-sitting)', d.conclusionCommits) +
    diagN('Body paragraphs with full structure (scholar + reasoning + evaluation)', d.paragraphsWithFullStructure, 3) +
    diagN('Substantive dialectical pairs (counter + length)', d.dialecticalPairs, 2) +
    diagN('Justified evaluation (counter + reasoning)', d.justifiedEvaluation || 0, 3) +
    diagN('Comparative reasoning ("stronger than", "more convincing because")', d.comparativeReasoning || 0, 2) +
    diagN('A★ signature moves (concession-pivot, ranking, etc.)', (d.astarSignatures || []).length, 2) +
    diagN('Specific textual references (Proslogion 2, Romans 5, etc.)', (d.textRefs || []).length, 2) +
    diagN('Evaluative sentences (eval + reasoning together)', d.evalSentenceCount || 0, 5) +
    diagPct('Body paragraphs evaluating, not just describing', d.embeddedEvaluation, 0.7) +
    diagPct('Topic sentences that focus on the question', d.topicSentenceFocus, 0.55) +
    diagN('Sustained reasoning (thesis words recurring)', d.sustainedReasoning, 5) +
    '</div></div>';

  /* Weak-pattern warnings */
  const weakIssues = [];
  if (d.quoteStuffRatio > 0.2) weakIssues.push('Quote-stuffing: ' + Math.round(d.quoteStuffRatio * 100) + '% of essay is inside quotation marks. Examiners reward analysis of quotes, not transcription.');
  if (d.scholarListingSentences >= 2) weakIssues.push('Scholar-listing detected: ' + d.scholarListingSentences + ' sentences name 3+ scholars together. Engage with each individually.');
  if (d.questionVerbatim) weakIssues.push('Question repeated verbatim. Paraphrase and respond, do not just echo.');
  if (weakIssues.length){
    html += '<div class="detected-list"><div class="detected-list-label" style="color:var(--claret)">Weak patterns examiners flag</div><ul style="list-style:none;padding-left:0;margin:0.3rem 0;font-size:0.82rem;line-height:1.5">';
    weakIssues.forEach(function(w){ html += '<li style="padding:0.25rem 0 0.25rem 1rem;position:relative"><span style="position:absolute;left:0;color:var(--claret);font-weight:700">!</span>' + w + '</li>'; });
    html += '</ul></div>';
  }

  /* Topic-specific required content */
  if (d.identifiedTopic && (d.missingRequiredScholars.length || d.missingRequiredConcepts.length)){
    const topicName = CONTENT['01'].topics.concat(CONTENT['02'].topics, CONTENT['03'].topics).find(function(t){ return t.id === d.identifiedTopic; });
    const topicTitle = topicName ? stripHtml(topicName.title) : d.identifiedTopic;
    /* Find which paper this topic is in for the jump-to-topic link */
    let topicPaper = null;
    ['01','02','03'].forEach(function(p){
      if (CONTENT[p].topics && CONTENT[p].topics.some(function(t){ return t.id === d.identifiedTopic; })) topicPaper = p;
    });
    html += '<div class="detected-list"><div class="detected-list-label" style="color:var(--ochre)">Topic detected: <a href="#" class="marker-jump-topic" data-paper="' + topicPaper + '" data-topic="' + d.identifiedTopic + '" style="color:var(--claret);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px">' + topicTitle + ' →</a></div>';
    /* Find a plan for this topic */
    const matchingPlan = (typeof ESSAY_PLANS !== 'undefined') ? ESSAY_PLANS.find(function(plan){
      return plan.topic && topicName && plan.topic.toLowerCase().indexOf(stripHtml(topicName.title).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z]/g, ' ').trim().split(' ')[0]) >= 0;
    }) : null;
    if (matchingPlan){
      html += '<div style="font-size:0.78rem;color:var(--muted);margin:0.3rem 0;font-style:italic">' +
        '<a href="#" class="marker-jump-plan" data-plan-id="' + matchingPlan.id + '" style="color:var(--ochre);text-decoration:underline;text-decoration-style:dotted">→ Open the model plan for this topic</a>' +
        '</div>';
    }
    if (d.missingRequiredScholars.length){
      const linkedScholars = d.missingRequiredScholars.map(function(s){
        const key = canonicalScholarKey(s);
        const inIndex = typeof SCHOLAR_INDEX !== 'undefined' && SCHOLAR_INDEX[key];
        if (inIndex) return '<a href="#" class="marker-jump-scholar" data-key="' + key + '" style="color:var(--claret);font-weight:600;text-decoration:underline;text-decoration-style:dotted">' + s + '</a>';
        return '<strong>' + s + '</strong>';
      }).join(', ');
      html += '<div style="font-size:0.82rem;color:var(--ink);margin:0.3rem 0"><strong style="color:var(--claret)">Missing core scholars:</strong> ' + linkedScholars + '. <span style="color:var(--muted);font-style:italic">Click a name to see where it is discussed.</span></div>';
    }
    if (d.missingRequiredConcepts.length){
      html += '<div style="font-size:0.82rem;color:var(--ink);margin:0.3rem 0"><strong style="color:var(--claret)">Missing core concepts:</strong> ' + d.missingRequiredConcepts.join(', ') + '.</div>';
    }
    html += '</div>';
  }
  /* What's missing for next level */
  const nextAO1 = Math.min(6, m.ao1L + 1);
  const nextAO2 = Math.min(6, m.ao2L + 1);
  const missAO1 = whatIsMissingAO1(d, nextAO1);
  const missAO2 = whatIsMissingAO2(d, nextAO2);
  if ((missAO1.length || missAO2.length) && (m.ao1L < 6 || m.ao2L < 6)){
    html += '<div class="detected-list"><div class="detected-list-label" style="color:var(--claret)">To raise the level</div><ul style="list-style:none;padding-left:0;margin:0.3rem 0;font-size:0.85rem;line-height:1.55">';
    if (missAO1.length && m.ao1L < 6){
      html += '<li style="margin:0.3rem 0;padding-left:1rem;position:relative"><span style="position:absolute;left:0;color:var(--claret);font-weight:700">AO1</span><span style="margin-left:1.7rem"><strong>For L' + nextAO1 + ':</strong> ' + missAO1.join('; ') + '</span></li>';
    }
    if (missAO2.length && m.ao2L < 6){
      html += '<li style="margin:0.3rem 0;padding-left:1rem;position:relative"><span style="position:absolute;left:0;color:var(--ochre);font-weight:700">AO2</span><span style="margin-left:1.7rem"><strong>For L' + nextAO2 + ':</strong> ' + missAO2.join('; ') + '</span></li>';
    }
    html += '</ul></div>';
  }
  /* Save attempt button + history */
  html += '<div style="margin-top:1rem;padding-top:0.8rem;border-top:1px dashed var(--rule-strong)">' +
    '<button id="mk-save-attempt" style="width:100%;padding:0.5rem 0.85rem;font-family:var(--ui);font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;background:var(--ink);color:var(--paper);border:none;border-radius:2px;cursor:pointer">Save this mark to history</button>' +
    renderSavedAttempts() +
    '</div>';
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
  /* Wire jump-to-topic, jump-to-scholar, jump-to-plan from marker feedback */
  rubric.querySelectorAll('.marker-jump-topic').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const targetPaper = a.dataset.paper;
      const targetTopic = a.dataset.topic;
      if (!targetPaper) return;
      selectPaper(targetPaper);
      setTimeout(function(){
        const el = document.getElementById(targetTopic);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    });
  });
  rubric.querySelectorAll('.marker-jump-scholar').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const key = a.dataset.key;
      if (key && typeof openScholar === 'function') openScholar(key);
    });
  });
  rubric.querySelectorAll('.marker-jump-plan').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const planId = a.dataset.planId;
      selectPaper('08');
      setTimeout(function(){
        const el = document.getElementById('plan-' + planId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    });
  });
  /* Wire save */
  const saveBtn = document.getElementById('mk-save-attempt');
  if (saveBtn){
    saveBtn.addEventListener('click', function(){
      const question = document.getElementById('mk-q').value.trim();
      const essay = document.getElementById('mk-essay').value.trim();
      if (!essay || essay.length < 100){ toast('Essay too short to save'); return; }
      const attempts = JSON.parse(localStorage.getItem('h573_marks_v1') || '[]');
      attempts.unshift({
        time: Date.now(),
        question: question.slice(0, 120),
        wordCount: d.wordCount,
        ao1L: m.ao1L, ao1Mark: m.ao1Mark, ao2L: m.ao2L, ao2Mark: m.ao2Mark,
        total: m.total, grade: getGrade(m.total),
        identifiedTopic: d.identifiedTopic,
        essay: essay.slice(0, 5000)
      });
      localStorage.setItem('h573_marks_v1', JSON.stringify(attempts.slice(0, 20)));
      toast('Mark saved (' + m.total + '/40)', 'success');
      drawRubric(d, m);
    });
  }
  /* Wire history clicks */
  document.querySelectorAll('.mk-attempt-load').forEach(function(b){
    b.addEventListener('click', function(){
      const attempts = JSON.parse(localStorage.getItem('h573_marks_v1') || '[]');
      const att = attempts[parseInt(b.dataset.idx)];
      if (!att) return;
      document.getElementById('mk-q').value = att.question;
      document.getElementById('mk-essay').value = att.essay;
      document.getElementById('mk-essay').dispatchEvent(new Event('input'));
    });
  });
  document.querySelectorAll('.mk-attempt-delete').forEach(function(b){
    b.addEventListener('click', function(e){
      e.stopPropagation();
      const attempts = JSON.parse(localStorage.getItem('h573_marks_v1') || '[]');
      attempts.splice(parseInt(b.dataset.idx), 1);
      localStorage.setItem('h573_marks_v1', JSON.stringify(attempts));
      drawRubric(d, m);
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

/* ===== DROPDOWN NAVIGATION ===== */
/* Unified navigation: clicking a nav-item updates dropdown state + renders.
   selectPaper() can be called from anywhere (search, plans cross-links, etc.)
   and keeps both the dropdown trigger label and the active item in sync. */
function selectPaper(paperId, opts){
  document.querySelectorAll('.nav-item').forEach(function(it){
    it.setAttribute('aria-selected', it.dataset.paper === paperId ? 'true' : 'false');
  });
  /* Also keep .paper-tab queries working for legacy code that still uses them */
  document.querySelectorAll('.paper-tab').forEach(function(t){
    t.setAttribute('aria-selected', t.dataset.paper === paperId ? 'true' : 'false');
  });
  /* Update the dropdown trigger label/title */
  const activeItem = document.querySelector('.nav-item[data-paper="' + paperId + '"]');
  if (activeItem){
    const numEl = activeItem.querySelector('.nav-item-num');
    const titleEl = activeItem.querySelector('.nav-item-title');
    if (numEl) document.getElementById('nav-trigger-label').textContent = numEl.textContent;
    if (titleEl) document.getElementById('nav-trigger-title').innerHTML = titleEl.innerHTML;
  }
  closeNavMenu();
  if (!opts || !opts.skipRender) renderPaper(paperId);
}
function openNavMenu(){
  document.getElementById('nav-menu').hidden = false;
  document.getElementById('nav-trigger').setAttribute('aria-expanded', 'true');
}
function closeNavMenu(){
  document.getElementById('nav-menu').hidden = true;
  document.getElementById('nav-trigger').setAttribute('aria-expanded', 'false');
}
document.getElementById('nav-trigger').addEventListener('click', function(e){
  e.stopPropagation();
  const trigger = document.getElementById('nav-trigger');
  if (trigger.getAttribute('aria-expanded') === 'true') closeNavMenu();
  else openNavMenu();
});
document.addEventListener('click', function(e){
  const menu = document.getElementById('nav-menu');
  const trigger = document.getElementById('nav-trigger');
  if (menu.hidden) return;
  if (menu.contains(e.target) || trigger.contains(e.target)) return;
  closeNavMenu();
});
document.querySelectorAll('.nav-item').forEach(function(item){
  item.addEventListener('click', function(){ selectPaper(item.dataset.paper); });
});
/* Keep the old paper-tab handler alive in case anything still listens.
   (selectPaper handles new dropdown; this is no-op for buttons that no longer exist.) */
document.querySelectorAll('.paper-tab').forEach(function(tab){
  tab.addEventListener('click', function(){ selectPaper(tab.dataset.paper); });
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
    selectPaper(paperId);
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
