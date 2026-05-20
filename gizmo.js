/* Gizmo — spaced-repetition flashcard app for OCR H573 revision */
/* Decks are auto-generated from CONTENT scholars (name <-> position).
   Cards are scheduled via an SM-2 lite algorithm and persisted in localStorage. */

(function(){
'use strict';

const GIZMO_KEY = 'h573_gizmo_v1';
const PAPER_TITLES = {
  '01': { title: 'Philosophy <em>of</em> Religion', short: 'Paper 01' },
  '02': { title: 'Religion <em>&amp;</em> Ethics',  short: 'Paper 02' },
  '03': { title: 'Christian <em>Thought</em>',      short: 'Paper 03' }
};

/* ---------- persistent state ---------- */
const GIZMO_DEFAULT = {
  cards: {},                    // id -> { ease, interval, due, reps, lapses, lastGrade }
  sessions: {},                 // dateKey -> { reviewed, correct }
  totalReviewed: 0,
  xp: 0,
  lastMode: 'decks'
};
let GZ = JSON.parse(JSON.stringify(GIZMO_DEFAULT));
try {
  const raw = localStorage.getItem(GIZMO_KEY);
  if (raw){
    const parsed = JSON.parse(raw);
    GZ = Object.assign({}, GIZMO_DEFAULT, parsed);
    GZ.cards = GZ.cards || {};
    GZ.sessions = GZ.sessions || {};
  }
} catch(e){}
function gzSave(){ try { localStorage.setItem(GIZMO_KEY, JSON.stringify(GZ)); } catch(e){} }

function gzToday(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function gzNow(){ return Date.now(); }
function gzStripHtml(s){ return String(s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&middot;/g,'·').replace(/&#9733;/g,'★').replace(/&hellip;/g,'…'); }
function gzEsc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ---------- text helpers for cloze + typing ---------- */
const STOP_WORDS = new Set(['the','a','an','and','or','but','of','to','in','on','for','with','by','at','from','as','is','it','this','that','these','those','be','are','was','were','has','have','had','not','no','if','than','then','so','such','its','their','his','her','can','could','should','would','will','may','might','what','who','why','how','when','where']);

function gzSplitSentences(html){
  // Replace block boundaries with markers so we don't merge headings/paragraphs
  const marked = String(html || '')
    .replace(/<\/(p|li|h[1-6]|ol|ul|div)>/gi, '|||')
    .replace(/<(p|li|h[1-6]|ol|ul|div|br)[^>]*>/gi, '|||');
  // Split on sentence terminators followed by whitespace + capital, OR on markers
  const parts = marked.split(/\|\|\|+/);
  const out = [];
  parts.forEach(function(chunk){
    chunk = chunk.replace(/\s+/g, ' ').trim();
    if (!chunk) return;
    const sents = chunk.split(/(?<=[.!?])\s+(?=[A-Z"'<])/);
    sents.forEach(function(s){
      s = s.trim();
      if (s.length >= 25) out.push(s);
    });
  });
  return out;
}

function gzExtractClozes(html){
  const out = [];
  const sentences = gzSplitSentences(html);
  sentences.forEach(function(sentRaw){
    // Find <strong>X</strong> or <em>X</em> tokens (prefer strong)
    const tagRe = /<(strong|em)\b[^>]*>([^<]{2,})<\/\1>/gi;
    let m;
    while ((m = tagRe.exec(sentRaw)) !== null){
      const answer = m[2].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
      if (answer.length < 3 || answer.length > 34) continue;
      if (/[.!?]\s/.test(answer)) continue;      // skip whole-sentence highlights
      if (/\d{4,}/.test(answer)) continue;       // skip year-only highlights
      const words = answer.split(/\s+/);
      if (words.length > 5) continue;
      if (words.length === 1 && STOP_WORDS.has(answer.toLowerCase())) continue;
      // Blank out THIS occurrence only
      const before = sentRaw.slice(0, m.index);
      const after = sentRaw.slice(m.index + m[0].length);
      const blanked = (before + ' _____ ' + after).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/\s+([.,;:?!])/g, '$1').trim();
      const plain   = sentRaw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (blanked.length < 35 || blanked.length > 260) continue;
      out.push({ prompt: blanked, answer: answer, full: plain, source: m[1] });
    }
  });
  // Dedupe by answer (case-insensitive)
  const seen = new Set();
  return out.filter(function(c){
    const k = c.answer.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function gzNormalize(s){
  return String(s || '').toLowerCase()
    .replace(/[‘’“”'"`]/g, '')
    .replace(/[.,;:!?()\[\]{}\-—–]/g, ' ')
    .replace(/&amp;/g, 'and').replace(/&/g, 'and')
    .replace(/\s+/g, ' ').trim();
}
function gzLevenshtein(a, b){
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++){
    let cur = [i];
    for (let j = 1; j <= b.length; j++){
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      cur[j] = Math.min(cur[j-1] + 1, prev[j] + 1, prev[j-1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}
function gzMatchAnswer(input, target){
  const a = gzNormalize(input), b = gzNormalize(target);
  if (!a) return 'wrong';
  if (a === b) return 'right';
  // Surname-only match for multi-word answers (e.g. "Russell" for "Bertrand Russell")
  const aWords = a.split(' '), bWords = b.split(' ');
  if (bWords.length > 1 && aWords.length === 1 && bWords[bWords.length - 1] === aWords[0]) return 'right';
  if (aWords.length > 1 && bWords.length === 1 && aWords[aWords.length - 1] === bWords[0]) return 'right';
  // Levenshtein tolerance
  const d = gzLevenshtein(a, b);
  const len = Math.max(a.length, b.length);
  if (d <= 2 || d / len <= 0.18) return 'close';
  // Substring overlap (allow extra qualifiers)
  if (a.indexOf(b) !== -1 || b.indexOf(a) !== -1) return 'close';
  return 'wrong';
}

/* ---------- AO1 / AO2 section parsing ---------- */
// Split HTML by <h3>/<h4> headings into { heading, level, body } segments.
function gzParseSections(html){
  const txt = String(html || '');
  const sections = [];
  const re = /<(h[34])\b[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=<h[34]\b|$)/gi;
  let m;
  while ((m = re.exec(txt)) !== null){
    const heading = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').trim();
    if (heading.length < 3) continue;
    sections.push({ level: m[1].toLowerCase(), heading: heading, body: m[3] });
  }
  return sections;
}
function gzExtractParagraphs(body){
  const out = [];
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(body)) !== null) out.push(m[1]);
  return out;
}
function gzExtractLists(body){
  const out = [];
  const re = /<(ol|ul)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(body)) !== null){
    const items = [];
    const itemRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    let im;
    while ((im = itemRe.exec(m[2])) !== null){
      const t = im[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (t) items.push(t);
    }
    if (items.length >= 2) out.push({ type: m[1].toLowerCase(), items: items });
  }
  return out;
}
function gzFirstSentences(text, n){
  const plain = String(text || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!plain) return '';
  const parts = plain.split(/(?<=[.!?])\s+(?=[A-Z"'(])/);
  return parts.slice(0, n || 2).join(' ').trim();
}

// Find a `<strong>term</strong>` followed by ":" or "is/are" definition, in a paragraph.
function gzExtractDefinitions(html){
  const out = [];
  const norm = String(html || '').replace(/\s+/g, ' ');
  const re = /<strong\b[^>]*>([^<]{3,40})<\/strong>\s*(?:\(<em>[^<]+<\/em>\))?\s*([:—\-]|\bis\b|\bare\b|\bmeans\b|\brefers? to\b)\s+([^<.!?]{15,200}[.!?])/gi;
  let m;
  while ((m = re.exec(norm)) !== null){
    const term = m[1].replace(/&amp;/g,'&').trim();
    const def  = m[3].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().replace(/[.!?]$/, '');
    if (def.length < 12 || def.length > 200) continue;
    if (/[.!?]\s/.test(term)) continue;
    out.push({ term: term, def: def });
  }
  // Dedupe by term
  const seen = new Set();
  return out.filter(function(c){
    const k = c.term.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* ---------- deck + card generation ---------- */
let GIZMO_DECKS = null;          // [{ id, paper, topicId, title, cards:[card,...] }]
let GIZMO_ALL_CARDS = [];        // flat
let GIZMO_DEF_POOL = [];         // {term, def, paper} pool for MCQ distractors
const CARDS_PER_DECK = 50;

function gzCard(deckCtx, kind, suffix, fields){
  return Object.assign({
    id: deckCtx.id + '_' + kind + suffix,
    deckId: deckCtx.id,
    paper: deckCtx.paper,
    topicId: deckCtx.topicId,
    topicTitle: deckCtx.topicTitlePlain,
    context: 'Paper ' + deckCtx.paper + ' · ' + deckCtx.topicTitlePlain,
    type: kind
  }, fields);
}

function buildDecks(){
  GIZMO_DECKS = [];
  GIZMO_ALL_CARDS = [];
  GIZMO_DEF_POOL = [];
  ['01','02','03'].forEach(function(paperId){
    const paper = (typeof CONTENT !== 'undefined' && CONTENT[paperId]) || null;
    if (!paper || !paper.topics) return;
    paper.topics.forEach(function(t){
      const deck = {
        id: 'd_' + paperId + '_' + t.id,
        paper: paperId,
        topicId: t.id,
        title: t.title || t.id,
        topicTitlePlain: gzStripHtml(t.title || t.id),
        cards: []
      };

      // ===== AO2 thesis (the "A★ verdict" — always present) =====
      if (t.thesis && t.thesis.line){
        deck.cards.push(gzCard(deck, 'thesis', '', {
          ao: 'AO2',
          front: 'A★ thesis verdict — ' + deck.topicTitlePlain,
          back: gzStripHtml(t.thesis.line),
          prompt: 'State the A★ thesis verdict for ' + deck.topicTitlePlain + '.',
          typeable: false
        }));
        if (t.thesis.unpacking){
          deck.cards.push(gzCard(deck, 'thesis-unpack', '', {
            ao: 'AO2',
            front: 'Unpack the A★ verdict — ' + deck.topicTitlePlain,
            back: gzStripHtml(t.thesis.unpacking),
            prompt: 'Unpack (in 2-3 sentences) why the A★ verdict holds for ' + deck.topicTitlePlain + '.',
            typeable: false
          }));
        }
      }

      // ===== AO1 — Concept explanations from <h3>/<h4> sections =====
      const ao1Sections = gzParseSections(t.ao1 || '');
      ao1Sections.forEach(function(sec, i){
        const paragraphs = gzExtractParagraphs(sec.body);
        paragraphs.forEach(function(p, pi){
          const summary = gzFirstSentences(p, pi === 0 ? 2 : 1);
          if (summary.length < 30) return;
          deck.cards.push(gzCard(deck, 'ao1-concept', i + '_' + pi, {
            ao: 'AO1',
            front: pi === 0
              ? 'AO1 — Explain: ' + sec.heading
              : 'AO1 — ' + sec.heading + ' (point ' + (pi + 1) + ')',
            back: summary,
            prompt: pi === 0
              ? 'Explain in 1-2 sentences: ' + sec.heading
              : 'Give the next AO1 point on ' + sec.heading + '.',
            typeable: false
          }));
        });

        // List cards: enumerated structures (Four Causes, Aquinas' Ways, etc.)
        const lists = gzExtractLists(sec.body);
        lists.forEach(function(list, li){
          if (list.items.length < 2 || list.items.length > 8) return;
          const itemsText = list.items.map(function(item, n){
            return (list.type === 'ol' ? (n + 1) + '. ' : '• ') + item;
          }).join('\n');
          deck.cards.push(gzCard(deck, 'ao1-list', i + '_' + li, {
            ao: 'AO1',
            front: 'AO1 — List the ' + list.items.length + ' items: ' + sec.heading,
            back: itemsText,
            prompt: 'List the ' + list.items.length + ' items under: ' + sec.heading,
            isList: true,
            typeable: false
          }));
          // Per-item recall cards: "What is the Nth item under {section}?"
          list.items.forEach(function(item, n){
            if (item.length < 8 || item.length > 160) return;
            // Try to extract a short label from "Label: rest" or "<strong>Label</strong>"
            const labelMatch = item.match(/^([A-Za-z][^:]{2,40}):\s+(.+)$/);
            if (labelMatch){
              const label = labelMatch[1].trim();
              const rest  = labelMatch[2].trim();
              deck.cards.push(gzCard(deck, 'ao1-list', i + '_' + li + '_' + n + 'l', {
                ao: 'AO1',
                front: 'AO1 — ' + sec.heading + ': what is "' + label + '"?',
                back: rest,
                prompt: 'In the context of ' + sec.heading + ', define ' + label + '.',
                typeable: false
              }));
            } else {
              deck.cards.push(gzCard(deck, 'ao1-list', i + '_' + li + '_' + n, {
                ao: 'AO1',
                front: 'AO1 — ' + sec.heading + ': item ' + (n + 1),
                back: item,
                prompt: 'Recall item ' + (n + 1) + ' under: ' + sec.heading,
                typeable: false
              }));
            }
          });
        });
      });

      // ===== AO2 — Critique explanations from <h3>/<h4> sections =====
      const ao2Sections = gzParseSections(t.ao2 || '');
      ao2Sections.forEach(function(sec, i){
        const paragraphs = gzExtractParagraphs(sec.body);
        paragraphs.forEach(function(p, pi){
          const summary = gzFirstSentences(p, pi === 0 ? 2 : 1);
          if (summary.length < 30) return;
          deck.cards.push(gzCard(deck, 'ao2-critique', i + '_' + pi, {
            ao: 'AO2',
            front: pi === 0
              ? 'AO2 — ' + sec.heading
              : 'AO2 — ' + sec.heading + ' (move ' + (pi + 1) + ')',
            back: summary,
            prompt: pi === 0
              ? 'Evaluate (1-2 sentences): ' + sec.heading
              : 'Give the next critical move on ' + sec.heading + '.',
            typeable: false
          }));
        });
      });

      // ===== AO2 — break the thesis unpacking into one card per argument =====
      if (t.thesis && t.thesis.unpacking){
        const parts = gzStripHtml(t.thesis.unpacking).split(/(?<=[.!?])\s+(?=[A-Z])/);
        parts.forEach(function(p, i){
          const txt = p.trim();
          if (txt.length < 35 || txt.length > 260) return;
          if (i === 0) return;                 // first sentence is already the thesis-unpack card
          deck.cards.push(gzCard(deck, 'ao2-critique', 'u' + i, {
            ao: 'AO2',
            front: 'AO2 — Next argument supporting the A★ verdict on ' + deck.topicTitlePlain,
            back: txt,
            prompt: 'Give AO2 argument #' + (i + 1) + ' supporting the verdict on ' + deck.topicTitlePlain + '.',
            typeable: false
          }));
        });
      }

      // ===== AO1 — orientation sentences (the topic's framing) =====
      if (t.orientation){
        const parts = gzStripHtml(t.orientation).split(/(?<=[.!?])\s+(?=[A-Z])/);
        parts.forEach(function(p, i){
          const txt = p.trim();
          if (txt.length < 40 || txt.length > 240) return;
          deck.cards.push(gzCard(deck, 'ao1-concept', 'o' + i, {
            ao: 'AO1',
            front: 'AO1 — Frame the debate: ' + deck.topicTitlePlain + ' (point ' + (i + 1) + ')',
            back: txt,
            prompt: 'Frame the debate on ' + deck.topicTitlePlain + ' (give framing point #' + (i + 1) + ').',
            typeable: false
          }));
        });
      }

      // ===== AO1 — Term definitions ("<strong>X</strong>: Y" pattern) =====
      const defs = gzExtractDefinitions((t.ao1 || '') + ' ' + (t.ao2 || ''));
      defs.forEach(function(d, i){
        deck.cards.push(gzCard(deck, 'ao1-define', i, {
          ao: 'AO1',
          front: 'AO1 — Define: ' + d.term,
          back: d.def,
          prompt: 'Define in your own words: ' + d.term,
          answer: d.def,
          typeable: false                        // free-recall definitions
        }));
        GIZMO_DEF_POOL.push({ term: d.term, def: d.def, paper: paperId });
      });

      // ===== AO1 — Quote source (still useful: OCR rewards named sources) =====
      if (t.quote && t.quote.text && t.quote.cite){
        const cite = t.quote.cite;
        const author = cite.split(/[,–—-]/)[0].trim();
        deck.cards.push(gzCard(deck, 'quote', 'q', {
          ao: 'AO1',
          front: '"' + t.quote.text + '"',
          back: cite,
          prompt: 'Who is the source of this quote?\n“' + t.quote.text + '”',
          answer: author,
          full: t.quote.text + ' — ' + cite,
          typeable: true,
          mcqAnswer: author,
          mcqPrompt: t.quote.text
        }));
      }

      // ===== AO1 + AO2 — Cloze fill-the-gap from <strong>/<em> across the topic =====
      const ao1Clozes = gzExtractClozes(t.ao1 || '');
      const ao2Clozes = gzExtractClozes(t.ao2 || '');
      const seenAnswers = new Set(deck.cards.filter(function(c){ return c.answer; }).map(function(c){ return c.answer.toLowerCase(); }));
      const clozeCards = [];
      ao1Clozes.forEach(function(c, i){
        if (seenAnswers.has(c.answer.toLowerCase())) return;
        seenAnswers.add(c.answer.toLowerCase());
        clozeCards.push(gzCard(deck, 'ao1-cloze', i, {
          ao: 'AO1',
          front: c.prompt,
          back: c.answer,
          prompt: c.prompt,
          answer: c.answer,
          full: c.full,
          typeable: true,
          mcqAnswer: c.answer,
          mcqPrompt: c.prompt
        }));
      });
      ao2Clozes.forEach(function(c, i){
        if (seenAnswers.has(c.answer.toLowerCase())) return;
        seenAnswers.add(c.answer.toLowerCase());
        clozeCards.push(gzCard(deck, 'ao2-cloze', i, {
          ao: 'AO2',
          front: c.prompt,
          back: c.answer,
          prompt: c.prompt,
          answer: c.answer,
          full: c.full,
          typeable: true,
          mcqAnswer: c.answer,
          mcqPrompt: c.prompt
        }));
      });

      // ===== Orientation cloze (framing of the topic) =====
      if (t.orientation){
        const oClozes = gzExtractClozes('<p>' + t.orientation + '</p>');
        oClozes.forEach(function(c, i){
          if (seenAnswers.has(c.answer.toLowerCase())) return;
          seenAnswers.add(c.answer.toLowerCase());
          clozeCards.push(gzCard(deck, 'ao1-cloze', 'o' + i, {
            ao: 'AO1',
            front: c.prompt,
            back: c.answer,
            prompt: c.prompt,
            answer: c.answer,
            full: c.full,
            typeable: true,
            mcqAnswer: c.answer,
            mcqPrompt: c.prompt
          }));
        });
      }

      // Add clozes until cap is reached
      const room = Math.max(0, CARDS_PER_DECK - deck.cards.length);
      deck.cards = deck.cards.concat(clozeCards.slice(0, room));
      if (deck.cards.length > CARDS_PER_DECK) deck.cards = deck.cards.slice(0, CARDS_PER_DECK);

      if (deck.cards.length){
        GIZMO_DECKS.push(deck);
        GIZMO_ALL_CARDS = GIZMO_ALL_CARDS.concat(deck.cards);
      }
    });
  });
}

/* ---------- SM-2 lite scheduler ----------
   grade: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy
   Intervals approximate Gizmo / Anki defaults. */
function gzCardState(cardId){
  return GZ.cards[cardId] || { ease: 2.5, interval: 0, due: 0, reps: 0, lapses: 0, lastGrade: null };
}
function gzGradeCard(cardId, grade){
  const st = Object.assign({}, gzCardState(cardId));
  const now = gzNow();
  const DAY = 24 * 60 * 60 * 1000;
  if (grade === 0){
    st.lapses += 1;
    st.reps = 0;
    st.interval = 0;
    st.ease = Math.max(1.3, st.ease - 0.2);
    st.due = now + 10 * 60 * 1000;        // 10 minutes
  } else {
    st.reps += 1;
    let nextInterval;
    if (st.reps === 1){
      nextInterval = grade === 1 ? 0.5 : grade === 2 ? 1 : 3;
    } else if (st.reps === 2){
      nextInterval = grade === 1 ? 2 : grade === 2 ? 4 : 7;
    } else {
      const base = st.interval || 1;
      const mult = grade === 1 ? 1.2 : grade === 2 ? st.ease : st.ease * 1.35;
      nextInterval = Math.round(base * mult * 10) / 10;
    }
    st.interval = nextInterval;
    st.ease = grade === 1 ? Math.max(1.3, st.ease - 0.15)
            : grade === 3 ? Math.min(3.0, st.ease + 0.1)
            : st.ease;
    st.due = now + nextInterval * DAY;
  }
  st.lastGrade = grade;
  GZ.cards[cardId] = st;
  const today = gzToday();
  GZ.sessions[today] = GZ.sessions[today] || { reviewed: 0, correct: 0 };
  GZ.sessions[today].reviewed += 1;
  if (grade >= 2) GZ.sessions[today].correct += 1;
  GZ.totalReviewed += 1;
  GZ.xp += grade === 0 ? 1 : grade === 1 ? 3 : grade === 2 ? 5 : 7;
  if (typeof recordStudyToday === 'function') recordStudyToday();
  gzSave();
  return st;
}
function gzPreviewIntervals(cardId){
  const labels = ['<10m','<1d','1d','3d'];
  const st = gzCardState(cardId);
  if (st.reps === 0) return ['10m','12h','1d','3d'];
  if (st.reps === 1) return ['10m','2d','4d','7d'];
  const base = st.interval || 1;
  const lbl = function(d){
    if (d < 1) return Math.round(d * 24) + 'h';
    if (d < 30) return Math.round(d) + 'd';
    return Math.round(d / 30) + 'mo';
  };
  return ['10m', lbl(Math.max(0.5, base * 1.2)), lbl(base * st.ease), lbl(base * st.ease * 1.35)];
}

function gzCardLevel(cardId){
  const st = gzCardState(cardId);
  if (st.reps === 0) return 'new';
  if (st.reps < 2) return 'learning';
  if (st.reps < 4) return 'reviewing';
  return 'mastered';
}
function gzIsDue(cardId){
  const st = gzCardState(cardId);
  if (st.reps === 0) return false;          // new cards are not "due" — separate bucket
  return st.due <= gzNow();
}

/* ---------- aggregate stats ---------- */
function gzDeckSummary(deck){
  const counts = { total: deck.cards.length, neu: 0, learning: 0, reviewing: 0, mastered: 0, due: 0 };
  deck.cards.forEach(function(c){
    const lvl = gzCardLevel(c.id);
    if (lvl === 'new') counts.neu += 1;
    else if (lvl === 'learning') counts.learning += 1;
    else if (lvl === 'reviewing') counts.reviewing += 1;
    else counts.mastered += 1;
    if (gzIsDue(c.id)) counts.due += 1;
  });
  return counts;
}
function gzGlobalSummary(){
  const s = { total: GIZMO_ALL_CARDS.length, neu: 0, learning: 0, reviewing: 0, mastered: 0, due: 0 };
  GIZMO_ALL_CARDS.forEach(function(c){
    const lvl = gzCardLevel(c.id);
    if (lvl === 'new') s.neu += 1;
    else if (lvl === 'learning') s.learning += 1;
    else if (lvl === 'reviewing') s.reviewing += 1;
    else s.mastered += 1;
    if (gzIsDue(c.id)) s.due += 1;
  });
  s.power = s.total ? Math.round(((s.mastered * 1.0 + s.reviewing * 0.6 + s.learning * 0.3) / s.total) * 100) : 0;
  return s;
}
function gzLevel(){
  const xp = GZ.xp || 0;
  // each level requires 50 * level XP to clear, cumulative
  let lvl = 1, need = 50, used = 0;
  while (xp - used >= need){ used += need; lvl += 1; need = 50 * lvl; }
  return { level: lvl, into: xp - used, need: need, totalXp: xp };
}

/* ---------- session queue ---------- */
let GZ_SESSION = null;   // { mode, deckId, queue:[card], idx, results:{again,hard,good,easy} }

function buildSessionQueue(opts){
  // opts.deckId — single deck or 'all'
  // opts.mode — 'study' | 'quiz' | 'type'
  // opts.scope — 'new' | 'due' | 'all' | 'mixed' (mixed = due + a few new)
  let cards = (opts.deckId === 'all' || !opts.deckId)
    ? GIZMO_ALL_CARDS.slice()
    : (GIZMO_DECKS.find(function(d){ return d.id === opts.deckId; }) || { cards: [] }).cards.slice();
  // Mode-specific filtering
  if (opts.mode === 'type') cards = cards.filter(function(c){ return c.typeable; });
  else if (opts.mode === 'quiz') cards = cards.filter(function(c){ return !!c.mcqAnswer; });
  if (opts.scope === 'due') cards = cards.filter(function(c){ return gzIsDue(c.id); });
  else if (opts.scope === 'new') cards = cards.filter(function(c){ return gzCardLevel(c.id) === 'new'; });
  else if (opts.scope === 'mixed'){
    const due = cards.filter(function(c){ return gzIsDue(c.id); });
    const fresh = cards.filter(function(c){ return gzCardLevel(c.id) === 'new'; }).slice(0, Math.max(5, 15 - due.length));
    cards = due.concat(fresh);
  }
  // shuffle
  for (let i = cards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
  }
  // cap at 20 to keep sessions bite-sized
  return cards.slice(0, 20);
}

/* ---------- TOP-LEVEL RENDER ---------- */
function renderGizmo(){
  if (!GIZMO_DECKS) buildDecks();
  const main = document.getElementById('main');
  const toc = document.getElementById('toc-list');
  const tocProg = document.getElementById('toc-progress');
  const tocTools = document.getElementById('toc-tools');
  if (tocProg) tocProg.style.display = 'none';
  if (tocTools) tocTools.style.display = 'none';
  if (toc){
    toc.innerHTML =
      '<li><a href="#" data-gz-nav="decks" class="active">Decks</a></li>' +
      '<li><a href="#" data-gz-nav="review">Daily review</a></li>' +
      '<li><a href="#" data-gz-nav="stats">Memory stats</a></li>';
  }
  const s = gzGlobalSummary();
  const lvl = gzLevel();
  const streak = (typeof computeStreak === 'function') ? computeStreak() : 0;
  const todaysSession = GZ.sessions[gzToday()] || { reviewed: 0, correct: 0 };
  const xpProg = Math.min(100, Math.round((lvl.into / lvl.need) * 100));

  main.innerHTML =
    '<section class="paper-section active" data-paper="07"><div class="gizmo">' +
      '<div class="gizmo-hero">' +
        '<div class="gizmo-hero-eyebrow">Gizmo · Spaced repetition</div>' +
        '<h1>Train your <em>recall</em>, not just your reading</h1>' +
        '<p class="gizmo-hero-sub">Auto-generated flashcards from every scholar in the H573 spec. Cards resurface exactly when you’re about to forget them.</p>' +
        '<div class="gizmo-stats">' +
          '<div class="gizmo-stat"><div class="gizmo-stat-label">Memory power</div>' +
            '<div class="gizmo-stat-val">' + s.power + '<em>%</em></div>' +
            '<div class="gizmo-power-bar"><div class="gizmo-power-fill" style="width:' + s.power + '%"></div></div></div>' +
          '<div class="gizmo-stat"><div class="gizmo-stat-label">Level</div>' +
            '<div class="gizmo-stat-val">' + lvl.level + '</div>' +
            '<div class="gizmo-power-bar"><div class="gizmo-power-fill" style="width:' + xpProg + '%"></div></div>' +
            '<div class="gizmo-stat-sub">' + lvl.into + ' / ' + lvl.need + ' XP</div></div>' +
          '<div class="gizmo-stat"><div class="gizmo-stat-label">Streak</div>' +
            '<div class="gizmo-stat-val">' + streak + '<em> d</em></div>' +
            '<div class="gizmo-stat-sub">' + todaysSession.reviewed + ' reviewed today</div></div>' +
          '<div class="gizmo-stat"><div class="gizmo-stat-label">Due now</div>' +
            '<div class="gizmo-stat-val">' + s.due + '</div>' +
            '<div class="gizmo-stat-sub">' + s.neu + ' new · ' + s.mastered + ' mastered</div></div>' +
        '</div>' +
      '</div>' +
      '<nav class="gizmo-modes" role="tablist">' +
        '<button class="gizmo-mode' + (GZ.lastMode === 'decks' ? ' active' : '') + '" data-gz-tab="decks">Decks <span class="mode-count">' + GIZMO_DECKS.length + '</span></button>' +
        '<button class="gizmo-mode' + (GZ.lastMode === 'review' ? ' active' : '') + '" data-gz-tab="review">Daily review' + (s.due ? ' <span class="mode-count">' + s.due + '</span>' : '') + '</button>' +
        '<button class="gizmo-mode' + (GZ.lastMode === 'stats' ? ' active' : '') + '" data-gz-tab="stats">Stats</button>' +
      '</nav>' +
      '<div class="gizmo-panel' + (GZ.lastMode === 'decks' ? ' active' : '') + '" id="gz-panel-decks">' + renderDecksPanel() + '</div>' +
      '<div class="gizmo-panel' + (GZ.lastMode === 'review' ? ' active' : '') + '" id="gz-panel-review">' + renderReviewPanel(s) + '</div>' +
      '<div class="gizmo-panel' + (GZ.lastMode === 'stats' ? ' active' : '') + '" id="gz-panel-stats">' + renderStatsPanel(s) + '</div>' +
    '</div></section>';

  attachGizmoHandlers();
}
window.renderGizmo = renderGizmo;

function renderDecksPanel(){
  const s = gzGlobalSummary();
  let html = '<div class="gizmo-cta">' +
    '<div class="gizmo-cta-text"><strong>' + (s.due || 'No') + (s.due === 1 ? ' card' : ' cards') + '</strong> due across all decks' +
      '<span class="cta-sub">' + (s.due
        ? 'Start a mixed daily review session to keep your streak going.'
        : 'You’re caught up. Pick a deck below to learn new cards.') + '</span></div>' +
    '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:flex-end">' +
      '<button class="gizmo-cta-btn" data-gz-start="all-mixed"' + (s.total === 0 ? ' disabled' : '') + '><span class="ico">&#9658;</span> Daily review</button>' +
      '<button class="gizmo-cta-btn" data-gz-start="all-type" style="background:var(--wash);color:var(--ink);border:1px solid var(--rule-strong)"' + (s.total === 0 ? ' disabled' : '') + '><span class="ico">&#9998;</span> Type mode</button>' +
    '</div>' +
  '</div>';
  html += '<input type="text" class="gizmo-search" id="gz-deck-search" placeholder="Search a topic, scholar, or paper&hellip;" autocomplete="off">';
  html += '<div id="gz-deck-list">' + renderDeckList('') + '</div>';
  return html;
}

function renderDeckList(query){
  const q = (query || '').toLowerCase().trim();
  const grouped = { '01': [], '02': [], '03': [] };
  GIZMO_DECKS.forEach(function(d){
    const hay = (d.topicTitlePlain + ' ' + d.cards.map(function(c){ return c.front; }).join(' ')).toLowerCase();
    if (!q || hay.indexOf(q) !== -1) grouped[d.paper].push(d);
  });
  let html = '';
  ['01','02','03'].forEach(function(p){
    if (!grouped[p].length) return;
    const totals = grouped[p].reduce(function(acc, d){
      const sum = gzDeckSummary(d);
      acc.cards += sum.total; acc.due += sum.due; acc.mastered += sum.mastered;
      return acc;
    }, { cards: 0, due: 0, mastered: 0 });
    html += '<div class="gizmo-paper-group"><div class="gizmo-paper-head">' +
      PAPER_TITLES[p].title +
      '<span class="group-meta">' + totals.cards + ' cards · ' + totals.due + ' due · ' + totals.mastered + ' mastered</span>' +
    '</div><div class="gizmo-deck-grid">';
    grouped[p].forEach(function(d){
      const sum = gzDeckSummary(d);
      const pct = function(n){ return sum.total ? (n / sum.total) * 100 : 0; };
      html += '<div class="gizmo-deck' + (sum.due ? ' has-due' : '') + '" data-deck="' + d.id + '">' +
        '<div class="gizmo-deck-head"><div class="gizmo-deck-title">' + d.title + '</div>' +
          (sum.due ? '<span class="gizmo-deck-badge">' + sum.due + ' due</span>' : '') +
        '</div>' +
        '<div class="gizmo-deck-meta">' + sum.total + ' cards · ' + sum.mastered + ' mastered · ' + sum.neu + ' new</div>' +
        '<div class="gizmo-deck-bar">' +
          '<span class="seg-mastered" style="width:' + pct(sum.mastered) + '%"></span>' +
          '<span class="seg-reviewing" style="width:' + pct(sum.reviewing) + '%"></span>' +
          '<span class="seg-learning" style="width:' + pct(sum.learning) + '%"></span>' +
          '<span class="seg-new" style="width:' + pct(sum.neu) + '%"></span>' +
        '</div>' +
        '<div class="gizmo-deck-legend">' +
          '<span><i style="background:#2d7a8a"></i>Mastered</span>' +
          '<span><i style="background:#6b9a6b"></i>Reviewing</span>' +
          '<span><i style="background:#c4892f"></i>Learning</span>' +
          '<span><i style="background:#9ec1d1"></i>New</span>' +
        '</div>' +
        '<div class="gizmo-deck-actions">' +
          '<button class="primary" data-gz-start="deck-mixed" data-deck="' + d.id + '">' + (sum.due ? 'Review ' + sum.due : 'Study') + '</button>' +
          '<button data-gz-start="deck-type" data-deck="' + d.id + '" title="Type the answer">Type</button>' +
          '<button data-gz-start="deck-quiz" data-deck="' + d.id + '">Quiz</button>' +
        '</div>' +
      '</div>';
    });
    html += '</div></div>';
  });
  if (!html) html = '<div class="gizmo-empty"><span class="gizmo-empty-ico">&#9881;</span>No decks match your search.</div>';
  return html;
}

function renderReviewPanel(s){
  s = s || gzGlobalSummary();
  if (!s.total){
    return '<div class="gizmo-empty"><span class="gizmo-empty-ico">&#9881;</span>No cards yet — decks load with your H573 content.</div>';
  }
  if (!s.due){
    return '<div class="gizmo-empty"><span class="gizmo-empty-ico">&#10003;</span>Caught up. Come back later or learn some new cards from the Decks tab.<br><div style="margin-top:1rem"><button class="gizmo-cta-btn" data-gz-start="all-new" style="margin:0 auto">Learn 12 new cards</button></div></div>';
  }
  let html = '<div class="gizmo-cta">' +
    '<div class="gizmo-cta-text"><strong>' + s.due + (s.due === 1 ? ' card' : ' cards') + '</strong> due for review' +
      '<span class="cta-sub">Mixed deck pulled from every paper. Capped at 20 cards per session.</span></div>' +
    '<button class="gizmo-cta-btn" data-gz-start="all-due"><span class="ico">&#9658;</span> Start review</button>' +
  '</div>';
  // Show breakdown by deck
  const dueByDeck = GIZMO_DECKS
    .map(function(d){ return { deck: d, sum: gzDeckSummary(d) }; })
    .filter(function(x){ return x.sum.due > 0; })
    .sort(function(a, b){ return b.sum.due - a.sum.due; });
  if (dueByDeck.length){
    html += '<div class="gizmo-paper-head" style="margin-top:0.4rem">Due by deck<span class="group-meta">' + dueByDeck.length + (dueByDeck.length === 1 ? ' deck' : ' decks') + '</span></div>';
    html += '<div class="gizmo-deck-grid">';
    dueByDeck.forEach(function(x){
      html += '<div class="gizmo-deck has-due" data-deck="' + x.deck.id + '">' +
        '<div class="gizmo-deck-head"><div class="gizmo-deck-title">' + x.deck.title + '</div>' +
          '<span class="gizmo-deck-badge">' + x.sum.due + ' due</span></div>' +
        '<div class="gizmo-deck-meta">Paper ' + x.deck.paper + ' · ' + x.sum.total + ' cards</div>' +
        '<div class="gizmo-deck-actions">' +
          '<button class="primary" data-gz-start="deck-due" data-deck="' + x.deck.id + '">Review ' + x.sum.due + '</button>' +
          '<button data-gz-start="deck-type" data-deck="' + x.deck.id + '" title="Type the answer">Type</button>' +
          '<button data-gz-start="deck-quiz" data-deck="' + x.deck.id + '">Quiz</button>' +
        '</div></div>';
    });
    html += '</div>';
  }
  return html;
}

function renderStatsPanel(s){
  s = s || gzGlobalSummary();
  const lvl = gzLevel();
  const sessions7 = last7DaysSessions();
  const totalLast7 = sessions7.reduce(function(a, x){ return a + x.reviewed; }, 0);
  const accuracy = (function(){
    let r = 0, c = 0;
    Object.keys(GZ.sessions).forEach(function(k){ r += GZ.sessions[k].reviewed; c += GZ.sessions[k].correct; });
    return r ? Math.round((c / r) * 100) : 0;
  })();
  const streak = (typeof computeStreak === 'function') ? computeStreak() : 0;
  let html = '<div class="gizmo-stats-grid">' +
    '<div class="gizmo-stat-card"><div class="gizmo-stat-card-label">Memory power</div>' +
      '<div class="gizmo-stat-card-val">' + s.power + '<em>%</em></div>' +
      '<div class="gizmo-stat-card-sub">' + s.mastered + ' of ' + s.total + ' cards mastered</div></div>' +
    '<div class="gizmo-stat-card"><div class="gizmo-stat-card-label">Total XP</div>' +
      '<div class="gizmo-stat-card-val">' + lvl.totalXp + '</div>' +
      '<div class="gizmo-stat-card-sub">Level ' + lvl.level + ' · ' + lvl.into + ' / ' + lvl.need + ' to next</div></div>' +
    '<div class="gizmo-stat-card"><div class="gizmo-stat-card-label">Streak</div>' +
      '<div class="gizmo-stat-card-val">' + streak + '<em> d</em></div>' +
      '<div class="gizmo-stat-card-sub">' + totalLast7 + ' reviews in the last 7 days</div></div>' +
    '<div class="gizmo-stat-card"><div class="gizmo-stat-card-label">Accuracy</div>' +
      '<div class="gizmo-stat-card-val">' + accuracy + '<em>%</em></div>' +
      '<div class="gizmo-stat-card-sub">' + GZ.totalReviewed + ' total reviews graded</div></div>' +
  '</div>';
  html += '<div class="gizmo-paper-head" style="margin-top:0.4rem">Last 7 days<span class="group-meta">Reviews per day</span></div>';
  const max = sessions7.reduce(function(m, x){ return Math.max(m, x.reviewed); }, 1);
  html += '<div style="display:flex;gap:0.5rem;align-items:flex-end;height:140px;padding:0.5rem 0 1.4rem;border-bottom:1px solid var(--rule)">';
  sessions7.forEach(function(d){
    const h = Math.round((d.reviewed / max) * 100);
    html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:0.4rem">' +
      '<div style="font-family:var(--mono);font-size:0.65rem;color:var(--muted)">' + (d.reviewed || '') + '</div>' +
      '<div style="width:100%;background:' + (d.isToday ? '#c4892f' : '#2d7a8a') + ';height:' + (d.reviewed ? Math.max(4, h) : 2) + '%;border-radius:2px 2px 0 0;opacity:' + (d.reviewed ? 1 : 0.25) + '"></div>' +
      '<div style="font-family:var(--mono);font-size:0.6rem;color:var(--muted);letter-spacing:0.06em">' + d.label + '</div>' +
    '</div>';
  });
  html += '</div>';
  html += '<div class="gizmo-paper-head" style="margin-top:1.4rem">Card distribution<span class="group-meta">' + s.total + ' total</span></div>';
  const pct = function(n){ return s.total ? (n / s.total) * 100 : 0; };
  html += '<div class="gizmo-deck-bar" style="height:14px;border-radius:3px">' +
    '<span class="seg-mastered" style="width:' + pct(s.mastered) + '%"></span>' +
    '<span class="seg-reviewing" style="width:' + pct(s.reviewing) + '%"></span>' +
    '<span class="seg-learning" style="width:' + pct(s.learning) + '%"></span>' +
    '<span class="seg-new" style="width:' + pct(s.neu) + '%"></span>' +
  '</div>' +
  '<div class="gizmo-deck-legend" style="margin-top:0.6rem;font-size:0.72rem">' +
    '<span><i style="background:#2d7a8a"></i>Mastered ' + s.mastered + '</span>' +
    '<span><i style="background:#6b9a6b"></i>Reviewing ' + s.reviewing + '</span>' +
    '<span><i style="background:#c4892f"></i>Learning ' + s.learning + '</span>' +
    '<span><i style="background:#9ec1d1"></i>New ' + s.neu + '</span>' +
  '</div>';
  html += '<div style="margin-top:1.6rem;display:flex;gap:0.5rem;flex-wrap:wrap"><button class="gizmo-cta-btn" data-gz-start="all-mixed">&#9658; Quick review</button>' +
    '<button class="gizmo-cta-btn" style="background:var(--wash);color:var(--ink);border:1px solid var(--rule-strong)" id="gz-reset">Reset Gizmo progress</button></div>';
  return html;
}

function last7DaysSessions(){
  const out = [];
  const labels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  for (let i = 6; i >= 0; i--){
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    const sess = GZ.sessions[key] || { reviewed: 0, correct: 0 };
    out.push({ key: key, label: labels[d.getDay()], reviewed: sess.reviewed, correct: sess.correct, isToday: i === 0 });
  }
  return out;
}

/* ---------- handlers ---------- */
function attachGizmoHandlers(){
  // Mode tabs
  document.querySelectorAll('[data-gz-tab]').forEach(function(btn){
    btn.addEventListener('click', function(){
      const target = btn.dataset.gzTab;
      document.querySelectorAll('.gizmo-mode').forEach(function(b){ b.classList.toggle('active', b.dataset.gzTab === target); });
      document.querySelectorAll('.gizmo-panel').forEach(function(p){ p.classList.toggle('active', p.id === 'gz-panel-' + target); });
      GZ.lastMode = target;
      gzSave();
      document.querySelectorAll('[data-gz-nav]').forEach(function(a){ a.classList.toggle('active', a.dataset.gzNav === target); });
    });
  });
  document.querySelectorAll('[data-gz-nav]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const t = a.dataset.gzNav;
      const btn = document.querySelector('[data-gz-tab="' + t + '"]');
      if (btn) btn.click();
    });
  });
  // Search
  const search = document.getElementById('gz-deck-search');
  if (search){
    search.addEventListener('input', function(){
      document.getElementById('gz-deck-list').innerHTML = renderDeckList(search.value);
      attachDeckStartHandlers();
    });
  }
  // Session start buttons
  attachDeckStartHandlers();
  // Reset
  const reset = document.getElementById('gz-reset');
  if (reset){
    reset.addEventListener('click', function(){
      if (!confirm('Reset all Gizmo progress (card schedules, XP, sessions)? This cannot be undone.')) return;
      GZ = JSON.parse(JSON.stringify(GIZMO_DEFAULT));
      gzSave();
      renderGizmo();
    });
  }
  // Modal close
  const closeBtn = document.getElementById('gizmo-modal-close');
  if (closeBtn && !closeBtn._gzBound){
    closeBtn.addEventListener('click', closeSession);
    closeBtn._gzBound = true;
  }
  const modal = document.getElementById('gizmo-modal');
  if (modal && !modal._gzBound){
    modal.addEventListener('click', function(e){ if (e.target === modal) closeSession(); });
    modal._gzBound = true;
  }
}

function attachDeckStartHandlers(){
  document.querySelectorAll('[data-gz-start]').forEach(function(btn){
    if (btn._gzBound) return;
    btn._gzBound = true;
    btn.addEventListener('click', function(){
      const kind = btn.dataset.gzStart;
      const deckId = btn.dataset.deck || 'all';
      if (kind === 'all-mixed')   startSession({ mode: 'study', deckId: 'all', scope: 'mixed' });
      else if (kind === 'all-due')   startSession({ mode: 'study', deckId: 'all', scope: 'due' });
      else if (kind === 'all-new')   startSession({ mode: 'study', deckId: 'all', scope: 'new' });
      else if (kind === 'all-type')  startSession({ mode: 'type',  deckId: 'all', scope: 'mixed' });
      else if (kind === 'deck-mixed') startSession({ mode: 'study', deckId: deckId, scope: 'mixed' });
      else if (kind === 'deck-due')   startSession({ mode: 'study', deckId: deckId, scope: 'due' });
      else if (kind === 'deck-type')  startSession({ mode: 'type',  deckId: deckId, scope: 'mixed' });
      else if (kind === 'deck-quiz')  startSession({ mode: 'quiz',  deckId: deckId, scope: 'mixed' });
    });
  });
}

/* ---------- study session ---------- */
function startSession(opts){
  const queue = buildSessionQueue(opts);
  if (!queue.length){
    alert('No cards to study in that bucket. Try another deck or come back when cards are due.');
    return;
  }
  GZ_SESSION = {
    mode: opts.mode,
    deckId: opts.deckId,
    queue: queue,
    idx: 0,
    started: gzNow(),
    results: { again: 0, hard: 0, good: 0, easy: 0, correct: 0, wrong: 0 }
  };
  document.getElementById('gizmo-modal').classList.add('active');
  renderSessionCard();
}

function renderSessionCard(){
  if (!GZ_SESSION) return;
  const head = document.getElementById('gizmo-modal-deck');
  const fill = document.getElementById('gizmo-modal-progress-fill');
  const count = document.getElementById('gizmo-modal-count');
  const body = document.getElementById('gizmo-modal-body');
  if (GZ_SESSION.idx >= GZ_SESSION.queue.length){
    renderSessionComplete();
    return;
  }
  const card = GZ_SESSION.queue[GZ_SESSION.idx];
  const deck = GIZMO_DECKS.find(function(d){ return d.id === card.deckId; });
  const modePrefix = GZ_SESSION.mode === 'quiz' ? 'Quiz · ' : GZ_SESSION.mode === 'type' ? 'Type · ' : '';
  head.textContent = modePrefix + (deck ? gzStripHtml(deck.title) : 'Mixed');
  fill.style.width = ((GZ_SESSION.idx / GZ_SESSION.queue.length) * 100) + '%';
  count.textContent = (GZ_SESSION.idx + 1) + ' / ' + GZ_SESSION.queue.length;
  if (GZ_SESSION.mode === 'quiz') renderQuizCard(card, body);
  else if (GZ_SESSION.mode === 'type') renderTypeCard(card, body);
  else renderStudyCard(card, body);
}

function gzCardLabels(card){
  switch (card.type){
    case 'ao1-concept':  return { front: 'AO1 · Concept',     back: 'Explanation',        tap: 'Tap to reveal the explanation' };
    case 'ao1-list':     return { front: 'AO1 · List',        back: 'Items',              tap: 'Tap to reveal the items' };
    case 'ao1-define':   return { front: 'AO1 · Definition',  back: 'Definition',         tap: 'Tap to reveal the definition' };
    case 'ao1-cloze':    return { front: 'AO1 · Fill the gap', back: 'Answer',            tap: 'Tap to reveal the missing term' };
    case 'ao2-critique': return { front: 'AO2 · Evaluation',  back: 'Critical move',      tap: 'Tap to reveal the move' };
    case 'ao2-cloze':    return { front: 'AO2 · Fill the gap', back: 'Answer',            tap: 'Tap to reveal the missing term' };
    case 'thesis':       return { front: 'AO2 · Thesis',      back: 'A★ thesis verdict',  tap: 'Tap to reveal the verdict' };
    case 'thesis-unpack':return { front: 'AO2 · Thesis why',  back: 'Unpacking',          tap: 'Tap to reveal the unpacking' };
    case 'quote':        return { front: 'AO1 · Quote',       back: 'Source',             tap: 'Tap to reveal the source' };
    // legacy types (still rendered if old state references them)
    case 'cloze':        return { front: 'Fill the gap',      back: 'Answer',             tap: 'Tap to reveal the missing term' };
    case 'scholar':      return { front: 'Scholar',           back: 'Position',           tap: 'Tap to reveal' };
    default:             return { front: 'Front',             back: 'Back',               tap: 'Tap to reveal' };
  }
}

function renderStudyCard(card, body){
  const ints = gzPreviewIntervals(card.id);
  const lbl = gzCardLabels(card);
  body.innerHTML =
    '<div class="gizmo-card" id="gz-card">' +
      '<div class="gizmo-card-side">' + lbl.front + '</div>' +
      '<div class="gizmo-card-front">' + gzEsc(card.front) + '</div>' +
      '<div class="gizmo-card-tap">' + lbl.tap + '</div>' +
    '</div>' +
    '<div class="gizmo-grade">' +
      '<button class="gizmo-grade-btn again dim" data-grade="0"><span class="grade-label">Again</span><span class="grade-int">' + ints[0] + '</span></button>' +
      '<button class="gizmo-grade-btn hard dim"  data-grade="1"><span class="grade-label">Hard</span><span class="grade-int">' + ints[1] + '</span></button>' +
      '<button class="gizmo-grade-btn good dim"  data-grade="2"><span class="grade-label">Good</span><span class="grade-int">' + ints[2] + '</span></button>' +
      '<button class="gizmo-grade-btn easy dim"  data-grade="3"><span class="grade-label">Easy</span><span class="grade-int">' + ints[3] + '</span></button>' +
    '</div>';
  const cardEl = document.getElementById('gz-card');
  let flipped = false;
  cardEl.addEventListener('click', function(){
    if (flipped) return;
    flipped = true;
    cardEl.classList.add('flipped');
    const isQuoteLike = (card.type === 'quote');
    const wrap = isQuoteLike ? ['&ldquo;', '&rdquo;'] : ['', ''];
    const backHtml = card.isList
      ? '<div class="gizmo-card-back list-back">' + gzEsc(card.back).replace(/\n/g, '<br>') + '</div>'
      : '<div class="gizmo-card-back">' + wrap[0] + gzEsc(card.back) + wrap[1] + '</div>';
    cardEl.innerHTML =
      '<div class="gizmo-card-side">' + lbl.back + '</div>' +
      backHtml +
      '<div class="gizmo-card-context">' + gzEsc(card.context) + '</div>';
    document.querySelectorAll('.gizmo-grade-btn').forEach(function(b){ b.classList.remove('dim'); });
  });
  document.querySelectorAll('.gizmo-grade-btn').forEach(function(b){
    b.addEventListener('click', function(){
      if (!flipped) return;
      const g = parseInt(b.dataset.grade, 10);
      gzGradeCard(card.id, g);
      const r = GZ_SESSION.results;
      if (g === 0) r.again += 1;
      else if (g === 1) r.hard += 1;
      else if (g === 2) r.good += 1;
      else r.easy += 1;
      if (g >= 2) r.correct += 1; else r.wrong += 1;
      // If failed, append to end of queue so user re-sees it
      if (g === 0 && GZ_SESSION.queue.length < 30) GZ_SESSION.queue.push(card);
      GZ_SESSION.idx += 1;
      renderSessionCard();
    });
  });
}

function renderQuizCard(card, body){
  const correct = card.mcqAnswer || card.back;
  const promptText = card.mcqPrompt || card.back;
  // Pull distractors from same-type MCQ-able cards in the same paper, then any paper
  const isClozeLike = card.type === 'ao1-cloze' || card.type === 'ao2-cloze' || card.type === 'cloze';
  let pool = GIZMO_ALL_CARDS
    .filter(function(c){ return c.paper === card.paper && c.mcqAnswer && c.mcqAnswer.toLowerCase() !== correct.toLowerCase() && (isClozeLike ? (c.type === 'ao1-cloze' || c.type === 'ao2-cloze' || c.type === 'cloze') : true); })
    .map(function(c){ return c.mcqAnswer; });
  if (pool.length < 3){
    pool = GIZMO_ALL_CARDS
      .filter(function(c){ return c.mcqAnswer && c.mcqAnswer.toLowerCase() !== correct.toLowerCase(); })
      .map(function(c){ return c.mcqAnswer; });
  }
  // dedupe + shuffle
  pool = Array.from(new Set(pool));
  for (let i = pool.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  const options = [correct].concat(pool.slice(0, 3));
  for (let i = options.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = options[i]; options[i] = options[j]; options[j] = tmp;
  }
  const questionHead =
    isClozeLike ? 'Fill the gap' :
    card.type === 'quote' ? 'Source of this quote?' :
    'Which answer fits?';
  const isQuote = card.type === 'quote';
  body.innerHTML =
    '<div class="gizmo-quiz">' +
      '<div class="gizmo-quiz-prompt">' + questionHead + '</div>' +
      '<div class="gizmo-quiz-q">' + (isQuote ? '&ldquo;' + gzEsc(promptText) + '&rdquo;' : gzEsc(promptText)) + '</div>' +
      '<div class="gizmo-quiz-opts">' +
        options.map(function(o){ return '<button class="gizmo-quiz-opt" data-opt="' + gzEsc(o) + '">' + gzEsc(o) + '</button>'; }).join('') +
      '</div>' +
      '<div class="gizmo-quiz-feedback" id="gz-quiz-fb"></div>' +
      '<button class="gizmo-quiz-next" id="gz-quiz-next">Next &rarr;</button>' +
    '</div>';
  let answered = false;
  document.querySelectorAll('.gizmo-quiz-opt').forEach(function(b){
    b.addEventListener('click', function(){
      if (answered) return;
      answered = true;
      const ans = b.dataset.opt;
      const isRight = ans === correct;
      document.querySelectorAll('.gizmo-quiz-opt').forEach(function(x){
        x.classList.add('locked');
        if (x.dataset.opt === correct) x.classList.add('correct');
        else if (x === b) x.classList.add('wrong');
      });
      const fb = document.getElementById('gz-quiz-fb');
      fb.className = 'gizmo-quiz-feedback show ' + (isRight ? 'right' : 'wrong');
      fb.innerHTML = '<strong>' + (isRight ? '✓ Correct.' : '✗ Not quite.') + '</strong> Answer: <strong>' + gzEsc(correct) + '</strong> — ' + gzEsc(card.context) + '.';
      gzGradeCard(card.id, isRight ? 2 : 0);
      const r = GZ_SESSION.results;
      if (isRight){ r.good += 1; r.correct += 1; }
      else { r.again += 1; r.wrong += 1; }
      document.getElementById('gz-quiz-next').classList.add('show');
    });
  });
  document.getElementById('gz-quiz-next').addEventListener('click', function(){
    if (!answered) return;
    GZ_SESSION.idx += 1;
    renderSessionCard();
  });
}

function renderTypeCard(card, body){
  const ints = gzPreviewIntervals(card.id);
  const answer = card.answer || card.back || '';
  const promptLines = (card.prompt || card.front || '').split(/\n/);
  const promptHead = promptLines.length > 1 ? promptLines[0] : (card.type === 'cloze' ? 'Fill the missing word' : 'Type your answer');
  const promptBody = promptLines.length > 1 ? promptLines.slice(1).join(' ') : (card.prompt || card.front);
  const wordHint = answer.trim().split(/\s+/).length;
  body.innerHTML =
    '<div class="gizmo-type" id="gz-type">' +
      '<div class="gizmo-type-prompt">' + gzEsc(promptHead) + '</div>' +
      '<div class="gizmo-type-q">' + gzEsc(promptBody) + '</div>' +
      '<form class="gizmo-type-form" id="gz-type-form" autocomplete="off">' +
        '<input type="text" class="gizmo-type-input" id="gz-type-input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type the answer (' + wordHint + ' word' + (wordHint === 1 ? '' : 's') + ')&hellip;">' +
        '<button type="submit" class="gizmo-type-submit" id="gz-type-submit">Check</button>' +
      '</form>' +
      '<div class="gizmo-type-feedback" id="gz-type-fb"></div>' +
    '</div>' +
    '<div class="gizmo-grade" id="gz-type-grade" style="display:none">' +
      '<button class="gizmo-grade-btn again" data-grade="0"><span class="grade-label">Again</span><span class="grade-int">' + ints[0] + '</span></button>' +
      '<button class="gizmo-grade-btn hard"  data-grade="1"><span class="grade-label">Hard</span><span class="grade-int">' + ints[1] + '</span></button>' +
      '<button class="gizmo-grade-btn good"  data-grade="2"><span class="grade-label">Good</span><span class="grade-int">' + ints[2] + '</span></button>' +
      '<button class="gizmo-grade-btn easy"  data-grade="3"><span class="grade-label">Easy</span><span class="grade-int">' + ints[3] + '</span></button>' +
    '</div>';
  const input = document.getElementById('gz-type-input');
  const fb = document.getElementById('gz-type-fb');
  const grade = document.getElementById('gz-type-grade');
  setTimeout(function(){ try { input.focus(); } catch(e){} }, 30);
  let revealed = false;
  let presetGrade = null;

  function reveal(typed){
    revealed = true;
    const verdict = gzMatchAnswer(typed, answer);
    input.disabled = true;
    document.getElementById('gz-type-submit').disabled = true;
    fb.className = 'gizmo-type-feedback show ' + (verdict === 'right' ? 'right' : verdict === 'close' ? 'almost' : 'wrong');
    let label = verdict === 'right' ? '✓ Correct' : verdict === 'close' ? '≈ Almost' : '✗ Not quite';
    let body = verdict === 'right'
        ? 'Answer: <strong>' + gzEsc(answer) + '</strong>'
        : 'You typed <em>' + gzEsc(typed || '(nothing)') + '</em>. Answer: <strong>' + gzEsc(answer) + '</strong>';
    if (card.full && card.type === 'cloze'){
      const re = new RegExp('\\b' + answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b','i');
      const highlighted = gzEsc(card.full).replace(re, '<u><strong>' + gzEsc(answer) + '</strong></u>');
      body += '<div class="gizmo-type-full">' + highlighted + '</div>';
    } else if (card.context){
      body += '<div class="gizmo-type-full">' + gzEsc(card.context) + '</div>';
    }
    fb.innerHTML = '<strong>' + label + '.</strong> ' + body;
    grade.style.display = 'grid';
    presetGrade = verdict === 'right' ? 2 : verdict === 'close' ? 1 : 0;
    document.querySelectorAll('#gz-type-grade .gizmo-grade-btn').forEach(function(b){
      const g = parseInt(b.dataset.grade, 10);
      b.classList.toggle('suggested', g === presetGrade);
    });
  }

  document.getElementById('gz-type-form').addEventListener('submit', function(e){
    e.preventDefault();
    if (revealed) return;
    reveal(input.value.trim());
  });
  document.querySelectorAll('#gz-type-grade .gizmo-grade-btn').forEach(function(b){
    b.addEventListener('click', function(){
      if (!revealed) return;
      const g = parseInt(b.dataset.grade, 10);
      gzGradeCard(card.id, g);
      const r = GZ_SESSION.results;
      if (g === 0) r.again += 1;
      else if (g === 1) r.hard += 1;
      else if (g === 2) r.good += 1;
      else r.easy += 1;
      if (g >= 2) r.correct += 1; else r.wrong += 1;
      if (g === 0 && GZ_SESSION.queue.length < 30) GZ_SESSION.queue.push(card);
      GZ_SESSION.idx += 1;
      renderSessionCard();
    });
  });
}

function renderSessionComplete(){
  const r = GZ_SESSION.results;
  const total = GZ_SESSION.queue.length;
  const acc = total ? Math.round((r.correct / (r.correct + r.wrong || 1)) * 100) : 0;
  const xpEarned = r.again * 1 + r.hard * 3 + r.good * 5 + r.easy * 7;
  document.getElementById('gizmo-modal-progress-fill').style.width = '100%';
  document.getElementById('gizmo-modal-count').textContent = total + ' / ' + total;
  document.getElementById('gizmo-modal-body').innerHTML =
    '<div class="gizmo-done">' +
      '<div class="gizmo-done-ico">&#10003;</div>' +
      '<h3>Session <em>complete</em></h3>' +
      '<div class="gizmo-done-sub">' + total + ' cards · ' + acc + '% accuracy · +' + xpEarned + ' XP</div>' +
      '<div class="gizmo-done-row">' +
        '<div class="gizmo-done-stat"><div class="gizmo-done-stat-v">' + r.again + '</div><div class="gizmo-done-stat-l">Again</div></div>' +
        '<div class="gizmo-done-stat"><div class="gizmo-done-stat-v">' + (r.hard + r.good) + '</div><div class="gizmo-done-stat-l">Hard / Good</div></div>' +
        '<div class="gizmo-done-stat"><div class="gizmo-done-stat-v">' + r.easy + '</div><div class="gizmo-done-stat-l">Easy</div></div>' +
      '</div>' +
      '<div class="gizmo-done-actions">' +
        '<button class="primary" id="gz-done-again">Another session</button>' +
        '<button id="gz-done-close">Back to decks</button>' +
      '</div>' +
    '</div>';
  document.getElementById('gz-done-close').addEventListener('click', closeSession);
  document.getElementById('gz-done-again').addEventListener('click', function(){
    const opts = { mode: GZ_SESSION.mode, deckId: GZ_SESSION.deckId, scope: 'mixed' };
    closeSession();
    setTimeout(function(){ startSession(opts); }, 100);
  });
}

function closeSession(){
  document.getElementById('gizmo-modal').classList.remove('active');
  GZ_SESSION = null;
  // refresh underlying view if still on Gizmo
  const active = document.querySelector('.paper-tab[aria-selected="true"]');
  if (active && active.dataset.paper === '07') renderGizmo();
}

/* ESC key closes the modal */
document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  const modal = document.getElementById('gizmo-modal');
  if (modal && modal.classList.contains('active')) closeSession();
});

/* Pre-build decks lazily once CONTENT is available */
if (typeof CONTENT !== 'undefined') buildDecks();

})();
