/* OCR H573 revision site — app logic */

function stripHtml(s){ return (s || '').replace(/<[^>]+>/g, ''); }

function renderPaper(paperId){
  const paper = CONTENT[paperId];
  if (!paper) return;
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');

  let html = '<section class="paper-section active" data-paper="' + paperId + '">' +
    '<div class="paper-intro">' +
    '<div class="eyebrow">' + paper.code + ' &middot; Paper ' + paperId + '</div>' +
    '<h1>' + paper.title + '</h1>' +
    '<p class="lede">' + paper.intro + '</p>' +
    '</div>';

  paper.topics.forEach(function(t, i){
    const num = String(i + 1).padStart(2, '0');
    html += '<article class="topic" id="' + t.id + '">' +
      '<header class="topic-header">' +
        '<div class="topic-num">&sect; ' + num + '</div>' +
        '<div class="topic-title-block">' +
          '<h2>' + t.title + '</h2>' +
          '<div class="spec-tags">' + t.spec.map(function(s){ return '<span class="spec-tag">' + s + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</header>' +
      '<p class="orientation">' + t.orientation + '</p>' +
      '<div class="ao-grid">' +
        '<div class="ao"><div class="ao-label">AO1 <small>Knowledge &amp; Understanding</small></div>' + t.ao1 + '</div>' +
        '<div class="ao"><div class="ao-label">AO2 <small>Evaluation &amp; Argument</small></div>' + t.ao2 + '</div>' +
      '</div>' +
      '<div class="thesis">' +
        '<div class="thesis-label">The A&#9733; line &middot; commit to this</div>' +
        '<div class="thesis-line">' + t.thesis.line + '</div>' +
        '<div class="thesis-unpacking">' + t.thesis.unpacking + '</div>' +
      '</div>';

    if (t.scholars && t.scholars.length){
      html += '<div class="scholar-list">' +
        '<div class="scholar-list-label">Scholar bank</div>';
      t.scholars.forEach(function(s){
        html += '<div class="scholar-item"><span class="scholar-name">' + s.name + '</span><span>' + s.pos + '</span></div>';
      });
      html += '</div>';
    }

    html += '<div class="extras">' +
        '<blockquote class="quote">&ldquo;' + t.quote.text + '&rdquo;<cite>' + t.quote.cite + '</cite></blockquote>' +
        '<div class="exam-prompt">' + t.exam + '</div>' +
      '</div>' +
    '</article>';
  });

  html += '</section>';
  main.innerHTML = html;

  toc.innerHTML = paper.topics.map(function(t){
    return '<li><a href="#' + t.id + '">' + stripHtml(t.title) + '</a></li>';
  }).join('');

  setupScrollSpy();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function setupScrollSpy(){
  const links = document.querySelectorAll('.toc a');
  const items = document.querySelectorAll('.topic');
  links.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
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

/* Paper tabs */
document.querySelectorAll('.paper-tab').forEach(function(tab){
  tab.addEventListener('click', function(){
    document.querySelectorAll('.paper-tab').forEach(function(t){ t.setAttribute('aria-selected', 'false'); });
    tab.setAttribute('aria-selected', 'true');
    renderPaper(tab.dataset.paper);
  });
});

/* Search */
let searchIndex = [];
let searchResults = [];
let searchSelectedIdx = 0;

function buildSearchIndex(){
  searchIndex = [];
  ['01','02','03'].forEach(function(p){
    (CONTENT[p].topics || []).forEach(function(t, i){
      const scholarText = (t.scholars || []).map(function(s){ return s.name + ' ' + s.pos; }).join(' ');
      searchIndex.push({
        paper: p,
        topicId: t.id,
        num: i + 1,
        title: stripHtml(t.title),
        body: [stripHtml(t.title), t.spec.join(' '), t.orientation, stripHtml(t.ao1), stripHtml(t.ao2), stripHtml(t.thesis.line), stripHtml(t.thesis.unpacking), t.quote.text + ' ' + t.quote.cite, t.exam, scholarText].join(' ').toLowerCase(),
        snippet: t.orientation
      });
    });
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
  return scored.slice(0, 25).map(function(s){ return s.item; });
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
    el.innerHTML = '<div class="search-empty">Type at least 2 characters to search.</div>';
    return;
  }
  if (!searchResults.length){
    el.innerHTML = '<div class="search-empty">No matches for "' + q + '".</div>';
    return;
  }
  const byPaper = { '01': [], '02': [], '03': [] };
  searchResults.forEach(function(r){ byPaper[r.paper].push(r); });
  let html = '';
  let idx = 0;
  ['01','02','03'].forEach(function(p){
    if (byPaper[p].length){
      html += '<div class="sr-section">Paper ' + p + ' &middot; ' + stripHtml(CONTENT[p].title) + '</div>';
      byPaper[p].forEach(function(r){
        html += '<div class="sr-item" data-idx="' + idx + '" data-paper="' + r.paper + '" data-target="' + r.topicId + '">' +
          '<div class="sr-meta">&sect; ' + String(r.num).padStart(2, '0') + '</div>' +
          '<div class="sr-title">' + r.title + '</div>' +
          '<div class="sr-snippet">' + highlightSnippet(r.snippet, q) + '</div>' +
        '</div>';
        idx++;
      });
    }
  });
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
  }, 80);
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
document.getElementById('search-input').addEventListener('input', function(e){ renderSearchResults(e.target.value); });
document.getElementById('search-modal').addEventListener('click', function(e){
  if (e.target.id === 'search-modal') closeSearch();
});

document.addEventListener('keydown', function(e){
  const inField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
  const modal = document.getElementById('search-modal');
  const modalOpen = modal.classList.contains('active');
  if (modalOpen){
    if (e.key === 'Escape') closeSearch();
    else if (e.key === 'ArrowDown'){
      e.preventDefault();
      if (searchResults.length){
        searchSelectedIdx = Math.min(searchSelectedIdx + 1, searchResults.length - 1);
        updateSearchSelection();
      }
    } else if (e.key === 'ArrowUp'){
      e.preventDefault();
      if (searchResults.length){
        searchSelectedIdx = Math.max(searchSelectedIdx - 1, 0);
        updateSearchSelection();
      }
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
  else if (['1','2','3'].indexOf(e.key) >= 0){
    e.preventDefault();
    const paperId = '0' + e.key;
    const tab = document.querySelector('.paper-tab[data-paper="' + paperId + '"]');
    if (tab) tab.click();
  }
});

buildSearchIndex();
renderPaper('01');
