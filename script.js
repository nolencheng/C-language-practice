// ── State ──────────────────────────────────────────────────────────────────
const state = {
  currentCategory: null,
  currentDifficulty: null,
  quiz: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongItems: [],
  answered: false,
};

const storage = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('c-practice-' + key) || 'null'); }
    catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem('c-practice-' + key, JSON.stringify(val)); }
    catch {}
  },
};

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  updateGlobalStats();
});

function renderCategories() {
  const grid = document.getElementById('category-grid');
  const history = storage.get('history') || {};

  grid.innerHTML = QUESTION_BANK.categories.map(cat => {
    const questions = QUESTION_BANK.questions[cat.id] || [];
    const hist = history[cat.id] || { answered: 0, correct: 0 };
    const acc = hist.answered > 0 ? Math.round((hist.correct / hist.answered) * 100) : 0;
    const progress = hist.answered > 0 ? Math.min(acc, 100) : 0;

    return `
    <div class="category-card" onclick="selectCategory('${cat.id}')"
         style="--card-color: ${cat.color}">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${questions.length} 題</div>
      <div class="category-progress">
        <div class="category-progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>`;
  }).join('');
}

function updateGlobalStats() {
  const history = storage.get('history') || {};
  let totalAnswered = 0, totalCorrect = 0;
  for (const cat of Object.values(history)) {
    totalAnswered += cat.answered || 0;
    totalCorrect += cat.correct || 0;
  }
  document.getElementById('total-answered').textContent = totalAnswered;
  document.getElementById('total-correct').textContent = totalCorrect;
  const rate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  document.getElementById('accuracy-rate').textContent = rate + '%';
}

// ── Navigation ─────────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  renderCategories();
  updateGlobalStats();
  showPage('page-home');
}

function selectCategory(catId) {
  state.currentCategory = catId;
  const cat = QUESTION_BANK.categories.find(c => c.id === catId);
  document.getElementById('difficulty-category-name').textContent = cat.name + ' — 選擇難度';
  showPage('page-difficulty');
}

function showHistory() {
  renderHistory();
  showPage('page-history');
}

// ── Quiz Setup ─────────────────────────────────────────────────────────────
function startQuiz(difficulty) {
  state.currentDifficulty = difficulty;
  const catId = state.currentCategory;
  const allQ = QUESTION_BANK.questions[catId] || [];
  let filtered = difficulty === 'all' ? allQ : allQ.filter(q => q.difficulty === difficulty);

  if (filtered.length === 0) {
    alert('此難度目前沒有題目，請選擇其他難度。');
    return;
  }

  state.quiz = shuffle(filtered).slice(0, Math.min(10, filtered.length));
  initQuiz();
}

function startRandomQuiz() {
  state.currentCategory = 'random';
  state.currentDifficulty = 'all';
  const all = [];
  for (const qs of Object.values(QUESTION_BANK.questions)) all.push(...qs);
  state.quiz = shuffle(all).slice(0, 10);
  initQuiz();
}

function startAllCategories() {
  state.currentCategory = 'all';
  state.currentDifficulty = 'all';
  const all = [];
  for (const qs of Object.values(QUESTION_BANK.questions)) all.push(...qs);
  state.quiz = shuffle(all).slice(0, 20);
  initQuiz();
}

function initQuiz() {
  state.currentIndex = 0;
  state.score = 0;
  state.correctCount = 0;
  state.wrongItems = [];
  showPage('page-quiz');
  renderQuestion();
}

function retryQuiz() {
  state.quiz = shuffle(state.quiz);
  initQuiz();
}

function confirmExit() {
  if (state.answered || state.currentIndex === 0) { goHome(); return; }
  if (confirm('確定要離開練習？目前進度將不會儲存。')) goHome();
}

// ── Render Question ─────────────────────────────────────────────────────────
function renderQuestion() {
  const q = state.quiz[state.currentIndex];
  const total = state.quiz.length;
  state.answered = false;

  document.getElementById('question-counter').textContent =
    `題目 ${state.currentIndex + 1} / ${total}`;
  document.getElementById('progress-fill').style.width =
    `${((state.currentIndex) / total) * 100}%`;
  document.getElementById('current-score').textContent = state.score;

  const catInfo = QUESTION_BANK.categories.find(c => c.id === (q.category || getCategoryForQ(q.id)));
  document.getElementById('q-category').textContent = catInfo ? catInfo.name : '綜合';
  document.getElementById('q-difficulty').textContent =
    { easy: '初級', medium: '中級', hard: '進階' }[q.difficulty] || q.difficulty;
  document.getElementById('q-type').textContent =
    { multiple: '選擇題', fill: '填空題' }[q.type] || q.type;

  document.getElementById('question-text').textContent = q.question;

  const codeWrapper = document.getElementById('code-block-wrapper');
  if (q.code) {
    codeWrapper.style.display = 'block';
    document.getElementById('code-block').innerHTML = highlightCode(q.code);
  } else {
    codeWrapper.style.display = 'none';
  }

  document.getElementById('feedback-area').style.display = 'none';

  if (q.type === 'multiple') {
    renderMultiple(q);
  } else if (q.type === 'fill') {
    renderFill(q);
  }
}

function renderMultiple(q) {
  document.getElementById('fill-area').style.display = 'none';
  const labels = ['A', 'B', 'C', 'D'];
  const area = document.getElementById('options-area');
  area.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
      <span class="option-label">${labels[i]}</span>
      <span>${escapeHtml(opt)}</span>
    </button>
  `).join('');
  area.style.display = 'flex';
}

function renderFill(q) {
  document.getElementById('options-area').style.display = 'none';
  const fillArea = document.getElementById('fill-area');
  fillArea.style.display = 'block';
  document.getElementById('fill-hint').textContent = q.hint ? '提示：' + q.hint : '';
  const input = document.getElementById('fill-input');
  input.value = '';
  input.className = 'fill-input';
  input.disabled = false;
  input.focus();

  input.onkeydown = (e) => { if (e.key === 'Enter') submitFill(); };
}

// ── Answer Handling ─────────────────────────────────────────────────────────
function selectOption(idx) {
  if (state.answered) return;
  state.answered = true;

  const q = state.quiz[state.currentIndex];
  const correct = idx === q.answer;
  const btns = document.querySelectorAll('.option-btn');

  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  handleResult(q, correct);
}

function submitFill() {
  if (state.answered) return;
  const q = state.quiz[state.currentIndex];
  const input = document.getElementById('fill-input');
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = q.answer.toLowerCase();
  const correct = userAnswer === correctAnswer;

  state.answered = true;
  input.disabled = true;
  input.classList.add(correct ? 'correct' : 'wrong');

  handleResult(q, correct);
}

function handleResult(q, correct) {
  const pointsPerQ = Math.round(100 / state.quiz.length);

  if (correct) {
    state.score += pointsPerQ;
    state.correctCount++;
    document.getElementById('current-score').textContent = state.score;
  } else {
    state.wrongItems.push({ question: q.question, explanation: q.explanation });
  }

  recordHistory(q, correct);
  showFeedback(q, correct);
}

function showFeedback(q, correct) {
  const area = document.getElementById('feedback-area');
  const result = document.getElementById('feedback-result');
  result.className = 'feedback-result ' + (correct ? 'correct' : 'wrong');
  result.textContent = correct
    ? '✓ 答對了！ +' + Math.round(100 / state.quiz.length) + ' 分'
    : '✗ 答錯了！' + (q.type === 'fill' ? ' 正確答案：' + q.answer : '');

  document.getElementById('explanation-text').innerHTML = formatExplanation(q.explanation);

  const nextBtn = document.getElementById('next-btn');
  const isLast = state.currentIndex === state.quiz.length - 1;
  nextBtn.textContent = isLast ? '查看結果 →' : '下一題 →';

  area.style.display = 'block';
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  if (state.currentIndex < state.quiz.length - 1) {
    state.currentIndex++;
    renderQuestion();
    window.scrollTo(0, 0);
  } else {
    showResult();
  }
}

// ── Result ──────────────────────────────────────────────────────────────────
function showResult() {
  const total = state.quiz.length;
  const accuracy = Math.round((state.correctCount / total) * 100);
  const maxScore = Math.round(100 / total) * total;

  document.getElementById('big-score').textContent = state.score;
  document.getElementById('max-score').textContent = maxScore;
  document.getElementById('r-correct').textContent = state.correctCount;
  document.getElementById('r-wrong').textContent = total - state.correctCount;
  document.getElementById('r-accuracy').textContent = accuracy + '%';

  let icon = '😊', title = '練習完成！', msg = '';
  if (accuracy >= 90) { icon = '🏆'; title = '優秀！'; msg = '表現非常出色，繼續保持！'; }
  else if (accuracy >= 70) { icon = '🎉'; title = '不錯！'; msg = '答對了大部分題目，再複習錯題就更好了。'; }
  else if (accuracy >= 50) { icon = '💪'; title = '繼續加油！'; msg = '還有進步空間，建議複習錯題後再練習一次。'; }
  else { icon = '📚'; title = '需要多練習'; msg = '建議先複習相關概念，再嘗試練習。'; }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-message').textContent = msg;

  const wrongReview = document.getElementById('wrong-review');
  if (state.wrongItems.length > 0) {
    wrongReview.innerHTML = `
      <h3>錯誤題目回顧（${state.wrongItems.length} 題）</h3>
      ${state.wrongItems.map(item => `
        <div class="wrong-item">
          <div class="wrong-q">${escapeHtml(item.question)}</div>
          <div class="wrong-exp">${formatExplanation(item.explanation)}</div>
        </div>
      `).join('')}
    `;
  } else {
    wrongReview.innerHTML = '';
  }

  showPage('page-result');
}

// ── History ─────────────────────────────────────────────────────────────────
function getCategoryForQ(qId) {
  for (const [catId, qs] of Object.entries(QUESTION_BANK.questions)) {
    if (qs.some(q => q.id === qId)) return catId;
  }
  return 'unknown';
}

function recordHistory(q, correct) {
  const catId = getCategoryForQ(q.id);
  if (catId === 'unknown') return;

  const history = storage.get('history') || {};
  if (!history[catId]) history[catId] = { answered: 0, correct: 0 };
  history[catId].answered++;
  if (correct) history[catId].correct++;
  storage.set('history', history);
}

function renderHistory() {
  const history = storage.get('history') || {};
  const content = document.getElementById('history-content');

  const hasData = Object.values(history).some(h => h.answered > 0);
  if (!hasData) {
    content.innerHTML = '<div class="no-history">尚無學習記錄，開始練習後會在這裡顯示。</div>';
    return;
  }

  content.innerHTML = '<div class="history-grid">' +
    QUESTION_BANK.categories.map(cat => {
      const hist = history[cat.id];
      if (!hist || hist.answered === 0) return '';
      const acc = Math.round((hist.correct / hist.answered) * 100);
      return `
        <div class="history-category">
          <div class="history-category-header">
            <span class="history-name">${cat.icon} ${cat.name}</span>
            <span class="history-acc">${acc}%</span>
          </div>
          <div class="history-bar">
            <div class="history-fill" style="width: ${acc}%"></div>
          </div>
          <div class="history-detail">已答 ${hist.answered} 題 · 答對 ${hist.correct} 題</div>
        </div>`;
    }).filter(Boolean).join('') +
  '</div>';
}

// ── Utilities ────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatExplanation(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function highlightCode(code) {
  const keywords = ['int','char','float','double','void','return','if','else','for',
    'while','do','switch','case','break','continue','default','struct','typedef',
    'sizeof','const','static','unsigned','signed','long','short','auto','register',
    'volatile','extern','include','define','NULL','true','false'];
  const types = ['int','char','float','double','void','unsigned','signed','long','short'];

  let escaped = escapeHtml(code);

  // preprocessor directives
  escaped = escaped.replace(/(#\w+)/g, '<span class="pp">$1</span>');

  // strings
  escaped = escaped.replace(/(&quot;[^&]*?&quot;)/g, '<span class="str">$1</span>');

  // single-line comments
  escaped = escaped.replace(/(\/\/[^\n]*)/g, '<span class="cm">$1</span>');

  // numbers
  escaped = escaped.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

  // keywords
  keywords.forEach(kw => {
    escaped = escaped.replace(
      new RegExp(`\\b(${kw})\\b`, 'g'),
      `<span class="kw">$1</span>`
    );
  });

  // function calls
  escaped = escaped.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');

  return escaped;
}
