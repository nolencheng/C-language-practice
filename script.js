// ════════════════════════════════════════════════════════════════════════════
// State
// ════════════════════════════════════════════════════════════════════════════
const state = {
  // Quiz
  currentCategory: null,
  currentDifficulty: null,
  quiz: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongItems: [],
  answered: false,

  // Exercise
  exCategory: null,
  exList: [],
  exIndex: 0,
  exHintLevel: 0,
  exPassed: false,
};

const storage = {
  get: (k) => { try { return JSON.parse(localStorage.getItem('c-' + k) || 'null'); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem('c-' + k, JSON.stringify(v)); } catch {} },
};

// ════════════════════════════════════════════════════════════════════════════
// Init
// ════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderExCategories();
  updateHomeStats();
});

function updateHomeStats() {
  const history = storage.get('history') || {};
  let totalAnswered = 0, totalCorrect = 0;
  for (const cat of Object.values(history)) {
    totalAnswered += cat.answered || 0;
    totalCorrect += cat.correct || 0;
  }
  document.getElementById('total-answered').textContent = totalAnswered;
  const rate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  document.getElementById('accuracy-rate').textContent = rate + '%';

  const exHistory = storage.get('ex-history') || {};
  const passed = Object.values(exHistory).filter(Boolean).length;
  document.getElementById('ex-completed').textContent = passed;
}

// ════════════════════════════════════════════════════════════════════════════
// Mode Toggle
// ════════════════════════════════════════════════════════════════════════════
function switchMode(mode) {
  document.getElementById('mode-quiz').style.display = mode === 'quiz' ? '' : 'none';
  document.getElementById('mode-exercise').style.display = mode === 'exercise' ? '' : 'none';
  document.getElementById('tab-quiz').classList.toggle('active', mode === 'quiz');
  document.getElementById('tab-exercise').classList.toggle('active', mode === 'exercise');
}

// ════════════════════════════════════════════════════════════════════════════
// Navigation
// ════════════════════════════════════════════════════════════════════════════
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  renderCategories();
  renderExCategories();
  updateHomeStats();
  showPage('page-home');
}

function showHistory() { renderHistory(); showPage('page-history'); }
function showExHistory() { renderHistory(); showPage('page-history'); }

// ════════════════════════════════════════════════════════════════════════════
// Quiz: Categories
// ════════════════════════════════════════════════════════════════════════════
function renderCategories() {
  const grid = document.getElementById('category-grid');
  const history = storage.get('history') || {};

  grid.innerHTML = QUESTION_BANK.categories.map(cat => {
    const questions = QUESTION_BANK.questions[cat.id] || [];
    const hist = history[cat.id] || { answered: 0, correct: 0 };
    const acc = hist.answered > 0 ? Math.round((hist.correct / hist.answered) * 100) : 0;

    return `<div class="category-card" onclick="selectCategory('${cat.id}')"
         style="--card-color:${cat.color}">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${questions.length} 題</div>
      <div class="category-progress">
        <div class="category-progress-fill" style="width:${hist.answered > 0 ? acc : 0}%"></div>
      </div>
    </div>`;
  }).join('');
}

function selectCategory(catId) {
  state.currentCategory = catId;
  const cat = QUESTION_BANK.categories.find(c => c.id === catId);
  document.getElementById('difficulty-category-name').textContent = cat.name + ' — 選擇難度';
  showPage('page-difficulty');
}

// ════════════════════════════════════════════════════════════════════════════
// Quiz: Run
// ════════════════════════════════════════════════════════════════════════════
function startQuiz(difficulty) {
  state.currentDifficulty = difficulty;
  const catId = state.currentCategory;
  const allQ = QUESTION_BANK.questions[catId] || [];
  const filtered = difficulty === 'all' ? allQ : allQ.filter(q => q.difficulty === difficulty);
  if (!filtered.length) { alert('此難度目前沒有題目，請選擇其他難度。'); return; }
  state.quiz = shuffle(filtered).slice(0, Math.min(10, filtered.length));
  initQuiz();
}

function startRandomQuiz() {
  state.currentCategory = 'random';
  const all = [];
  for (const qs of Object.values(QUESTION_BANK.questions)) all.push(...qs);
  state.quiz = shuffle(all).slice(0, 10);
  initQuiz();
}

function startAllCategories() {
  state.currentCategory = 'all';
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

function retryQuiz() { state.quiz = shuffle(state.quiz); initQuiz(); }

function confirmExit() {
  if (!state.answered && state.currentIndex > 0) {
    if (!confirm('確定要離開練習？')) return;
  }
  goHome();
}

// ════════════════════════════════════════════════════════════════════════════
// Quiz: Render Question
// ════════════════════════════════════════════════════════════════════════════
function renderQuestion() {
  const q = state.quiz[state.currentIndex];
  const total = state.quiz.length;
  state.answered = false;

  document.getElementById('question-counter').textContent = `題目 ${state.currentIndex + 1} / ${total}`;
  document.getElementById('progress-fill').style.width = `${(state.currentIndex / total) * 100}%`;
  document.getElementById('current-score').textContent = state.score;

  const catInfo = QUESTION_BANK.categories.find(c => c.id === getCategoryForQ(q.id));
  document.getElementById('q-category').textContent = catInfo ? catInfo.name : '綜合';
  document.getElementById('q-difficulty').textContent = { easy: '初級', medium: '中級', hard: '進階' }[q.difficulty];
  document.getElementById('q-type').textContent = { multiple: '選擇題', fill: '填空題' }[q.type];
  document.getElementById('question-text').textContent = q.question;

  const codeWrapper = document.getElementById('code-block-wrapper');
  if (q.code) {
    codeWrapper.style.display = 'block';
    document.getElementById('code-block').innerHTML = highlightCode(q.code);
  } else {
    codeWrapper.style.display = 'none';
  }

  document.getElementById('feedback-area').style.display = 'none';

  if (q.type === 'multiple') renderMultiple(q);
  else renderFill(q);
}

function renderMultiple(q) {
  document.getElementById('fill-area').style.display = 'none';
  const labels = ['A', 'B', 'C', 'D'];
  const area = document.getElementById('options-area');
  area.style.display = 'flex';
  area.innerHTML = q.options.map((opt, i) =>
    `<button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
      <span class="option-label">${labels[i]}</span>
      <span>${escapeHtml(opt)}</span>
    </button>`
  ).join('');
}

function renderFill(q) {
  document.getElementById('options-area').style.display = 'none';
  const fa = document.getElementById('fill-area');
  fa.style.display = 'block';
  document.getElementById('fill-hint').textContent = q.hint ? '提示：' + q.hint : '';
  const input = document.getElementById('fill-input');
  input.value = '';
  input.className = 'fill-input';
  input.disabled = false;
  input.focus();
  input.onkeydown = (e) => { if (e.key === 'Enter') submitFill(); };
}

// ════════════════════════════════════════════════════════════════════════════
// Quiz: Answers
// ════════════════════════════════════════════════════════════════════════════
function selectOption(idx) {
  if (state.answered) return;
  state.answered = true;
  const q = state.quiz[state.currentIndex];
  const correct = idx === q.answer;
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
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
  const correct = input.value.trim().toLowerCase() === q.answer.toLowerCase();
  state.answered = true;
  input.disabled = true;
  input.classList.add(correct ? 'correct' : 'wrong');
  handleResult(q, correct);
}

function handleResult(q, correct) {
  const pts = Math.round(100 / state.quiz.length);
  if (correct) { state.score += pts; state.correctCount++; }
  else { state.wrongItems.push({ question: q.question, explanation: q.explanation }); }
  document.getElementById('current-score').textContent = state.score;
  recordHistory(q, correct);
  showFeedback(q, correct, pts);
}

function showFeedback(q, correct, pts) {
  const area = document.getElementById('feedback-area');
  const result = document.getElementById('feedback-result');
  result.className = 'feedback-result ' + (correct ? 'correct' : 'wrong');
  result.textContent = correct
    ? `✓ 答對了！ +${pts} 分`
    : `✗ 答錯了！${q.type === 'fill' ? ' 正確答案：' + q.answer : ''}`;
  document.getElementById('explanation-text').innerHTML = formatExplanation(q.explanation);
  const isLast = state.currentIndex === state.quiz.length - 1;
  document.querySelector('.next-btn').textContent = isLast ? '查看結果 →' : '下一題 →';
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

// ════════════════════════════════════════════════════════════════════════════
// Quiz: Result
// ════════════════════════════════════════════════════════════════════════════
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
  else if (accuracy >= 70) { icon = '🎉'; title = '不錯！'; msg = '再複習錯題就更完美了。'; }
  else if (accuracy >= 50) { icon = '💪'; title = '繼續加油！'; msg = '建議複習錯題後再練習一次。'; }
  else { icon = '📚'; title = '需要多練習'; msg = '先複習概念，再嘗試練習。'; }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-message').textContent = msg;

  const wr = document.getElementById('wrong-review');
  wr.innerHTML = state.wrongItems.length > 0
    ? `<h3>錯誤題目回顧（${state.wrongItems.length} 題）</h3>` +
      state.wrongItems.map(item =>
        `<div class="wrong-item">
          <div class="wrong-q">${escapeHtml(item.question)}</div>
          <div class="wrong-exp">${formatExplanation(item.explanation)}</div>
        </div>`
      ).join('')
    : '';

  showPage('page-result');
}

// ════════════════════════════════════════════════════════════════════════════
// Exercise: Categories & List
// ════════════════════════════════════════════════════════════════════════════
function renderExCategories() {
  const grid = document.getElementById('ex-category-grid');
  const exHist = storage.get('ex-history') || {};

  grid.innerHTML = EXERCISE_BANK.categories.map(cat => {
    const problems = EXERCISE_BANK.problems[cat.id] || [];
    const passed = problems.filter(p => exHist[p.id]).length;
    const pct = problems.length > 0 ? Math.round((passed / problems.length) * 100) : 0;

    return `<div class="category-card" onclick="selectExCategory('${cat.id}')"
         style="--card-color:${cat.color}">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.desc}</div>
      <div class="ex-cat-progress-text">${passed}/${problems.length} 完成</div>
      <div class="category-progress">
        <div class="category-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
  }).join('');
}

function selectExCategory(catId) {
  state.exCategory = catId;
  const cat = EXERCISE_BANK.categories.find(c => c.id === catId);
  const problems = EXERCISE_BANK.problems[catId] || [];
  const exHist = storage.get('ex-history') || {};

  document.getElementById('ex-list-icon').textContent = cat.icon;
  document.getElementById('ex-list-title').textContent = cat.name;

  const grid = document.getElementById('ex-list-grid');
  grid.innerHTML = problems.map((prob, idx) => {
    const passed = exHist[prob.id];
    return `<div class="ex-list-item ${passed ? 'passed' : ''}"
         onclick="openExercise('${catId}', ${idx})">
      <div class="ex-list-num">${passed ? '✓' : idx + 1}</div>
      <div class="ex-list-info">
        <div class="ex-list-name">${prob.title}</div>
        <div class="ex-list-meta">
          <span class="diff-badge diff-${prob.difficulty}">${{ easy: '初級', medium: '中級', hard: '進階' }[prob.difficulty]}</span>
          ${passed ? '<span class="passed-badge">已通過</span>' : ''}
        </div>
      </div>
      <div class="ex-list-arrow">›</div>
    </div>`;
  }).join('');

  showPage('page-ex-list');
}

function startRandomExercise() {
  const allProbs = [];
  for (const [catId, probs] of Object.entries(EXERCISE_BANK.problems)) {
    probs.forEach((p, i) => allProbs.push({ catId, idx: i }));
  }
  const pick = allProbs[Math.floor(Math.random() * allProbs.length)];
  openExercise(pick.catId, pick.idx);
}

// ════════════════════════════════════════════════════════════════════════════
// Exercise: Open & Render
// ════════════════════════════════════════════════════════════════════════════
function openExercise(catId, probIdx) {
  state.exCategory = catId;
  state.exList = EXERCISE_BANK.problems[catId] || [];
  state.exIndex = probIdx;
  state.exHintLevel = 0;
  state.exPassed = false;
  renderExercise();
  showPage('page-exercise');
}

function renderExercise() {
  const prob = state.exList[state.exIndex];
  const cat = EXERCISE_BANK.categories.find(c => c.id === state.exCategory);
  const exHist = storage.get('ex-history') || {};

  document.getElementById('ex-page-category').textContent = cat ? cat.icon + ' ' + cat.name : '';
  document.getElementById('ex-page-name').textContent = prob.title;
  document.getElementById('ex-page-diff').textContent =
    { easy: '🌱 初級', medium: '🌿 中級', hard: '🌳 進階' }[prob.difficulty];

  document.getElementById('ex-description').textContent = prob.description;
  document.getElementById('ex-expected').textContent = prob.expectedOutput;

  // Editor
  const editor = document.getElementById('code-editor');
  editor.value = prob.template || '';
  setupEditor(editor);
  updateLineNumbers();

  // Output
  document.getElementById('output-content').innerHTML = '<span class="output-placeholder">按下「執行」查看輸出…</span>';
  document.getElementById('output-status').textContent = '';

  // Verdict
  const verdict = document.getElementById('ex-verdict');
  verdict.style.display = 'none';

  if (exHist[prob.id]) {
    verdict.style.display = 'block';
    verdict.className = 'ex-verdict passed';
    verdict.innerHTML = '✓ 你已通過此題！可以繼續挑戰下一題。';
  }

  // Hints
  state.exHintLevel = 0;
  renderHints();

  // Nav buttons
  document.getElementById('btn-prev-ex').disabled = state.exIndex === 0;
  document.getElementById('btn-next-ex').disabled = state.exIndex === state.exList.length - 1;
}

// ════════════════════════════════════════════════════════════════════════════
// Exercise: Hints
// ════════════════════════════════════════════════════════════════════════════
function renderHints() {
  const prob = state.exList[state.exIndex];
  const container = document.getElementById('hints-container');
  const lvl = state.exHintLevel;

  if (lvl === 0) {
    container.innerHTML = '<div class="hint-placeholder">點選下方按鈕獲取引導提示，不用擔心用提示，學習比完美更重要！</div>';
  } else {
    container.innerHTML = prob.hints.slice(0, lvl).map((h, i) =>
      `<div class="hint-card hint-level-${i + 1}" style="animation-delay:${i * 0.05}s">
        <div class="hint-card-title">${h.title}</div>
        ${h.text ? `<div class="hint-card-text">${escapeHtml(h.text)}</div>` : ''}
        ${h.code ? `<div class="hint-code-wrapper"><pre><code>${highlightCode(h.code)}</code></pre></div>` : ''}
      </div>`
    ).join('');
  }

  const levelNames = ['尚未使用', '概念提示', '程式碼線索', '完整解答'];
  document.getElementById('hint-level-display').textContent = levelNames[lvl];

  document.getElementById('btn-hint-1').style.display = lvl >= 1 ? 'none' : '';
  document.getElementById('btn-hint-2').style.display = lvl >= 1 && lvl < 2 ? '' : (lvl >= 2 ? 'none' : 'none');
  document.getElementById('btn-hint-3').style.display = lvl >= 2 && lvl < 3 ? '' : (lvl >= 3 ? 'none' : 'none');

  // Logic: show next button when current level is revealed
  if (lvl === 0) {
    document.getElementById('btn-hint-1').style.display = '';
    document.getElementById('btn-hint-2').style.display = 'none';
    document.getElementById('btn-hint-3').style.display = 'none';
  } else if (lvl === 1) {
    document.getElementById('btn-hint-1').style.display = 'none';
    document.getElementById('btn-hint-2').style.display = '';
    document.getElementById('btn-hint-3').style.display = 'none';
  } else if (lvl === 2) {
    document.getElementById('btn-hint-1').style.display = 'none';
    document.getElementById('btn-hint-2').style.display = 'none';
    document.getElementById('btn-hint-3').style.display = '';
  } else {
    document.getElementById('btn-hint-1').style.display = 'none';
    document.getElementById('btn-hint-2').style.display = 'none';
    document.getElementById('btn-hint-3').style.display = 'none';
  }
}

function revealHint(level) {
  state.exHintLevel = level;
  renderHints();
  document.getElementById('hints-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ════════════════════════════════════════════════════════════════════════════
// Exercise: Run Code
// ════════════════════════════════════════════════════════════════════════════
async function runCode() {
  const code = document.getElementById('code-editor').value;
  const btn = document.getElementById('btn-run');
  const outputEl = document.getElementById('output-content');
  const statusEl = document.getElementById('output-status');

  if (!code.trim()) {
    outputEl.innerHTML = '<span class="output-error">請先輸入程式碼</span>';
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ 編譯中…';
  statusEl.textContent = '';
  outputEl.innerHTML = '<span class="output-placeholder">連線至編譯器…</span>';

  try {
    const result = await compileCode(code);

    if (result.compileError) {
      outputEl.innerHTML = `<span class="output-error">${escapeHtml(result.compileError)}</span>`;
      statusEl.textContent = '編譯錯誤';
      statusEl.className = 'output-status error';
    } else {
      const output = result.output || '';
      outputEl.innerHTML = output
        ? `<span class="output-ok">${escapeHtml(output)}</span>`
        : '<span class="output-placeholder">（無輸出）</span>';

      if (result.runtimeError) {
        outputEl.innerHTML += `<br><span class="output-error">${escapeHtml(result.runtimeError)}</span>`;
        statusEl.textContent = '執行時錯誤';
        statusEl.className = 'output-status error';
      } else {
        statusEl.textContent = '執行成功';
        statusEl.className = 'output-status ok';
        checkAnswer(output);
      }
    }
  } catch (err) {
    outputEl.innerHTML = `<span class="output-error">無法連線到編譯器，請檢查網路連線。\n\n${escapeHtml(err.message)}</span>`;
    statusEl.textContent = '連線失敗';
    statusEl.className = 'output-status error';
  }

  btn.disabled = false;
  btn.textContent = '▶ 執行';
}

async function compileCode(code) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'gcc-12.2.0',
        code: code,
        'compiler-option-raw': '-lm -w',
        stdin: '',
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error('編譯服務回應錯誤 ' + res.status);
    const data = await res.json();

    return {
      output: data.program_output || '',
      compileError: data.compiler_error || '',
      runtimeError: data.program_error || '',
    };
  } catch (e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') throw new Error('編譯逾時（15秒）');
    throw e;
  }
}

function checkAnswer(output) {
  const prob = state.exList[state.exIndex];
  const passed = prob.check(output);
  const verdict = document.getElementById('ex-verdict');

  if (passed) {
    verdict.style.display = 'block';
    verdict.className = 'ex-verdict passed';
    verdict.innerHTML = '🎉 輸出正確！題目通過！';

    if (!state.exPassed) {
      state.exPassed = true;
      const exHist = storage.get('ex-history') || {};
      exHist[prob.id] = true;
      storage.set('ex-history', exHist);
      updateHomeStats();
    }
  } else {
    verdict.style.display = 'block';
    verdict.className = 'ex-verdict wrong';
    verdict.innerHTML =
      `✗ 輸出不符合預期。<br>` +
      `<small>你的輸出：<code>${escapeHtml(output.trim().slice(0, 100))}</code><br>` +
      `預期：<code>${escapeHtml(prob.expectedOutput.slice(0, 100))}</code></small><br>` +
      `試試看「引導式提示」吧！`;
  }

  verdict.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ════════════════════════════════════════════════════════════════════════════
// Exercise: Navigation
// ════════════════════════════════════════════════════════════════════════════
function nextExercise() {
  if (state.exIndex < state.exList.length - 1) {
    state.exIndex++;
    state.exHintLevel = 0;
    state.exPassed = false;
    renderExercise();
    window.scrollTo(0, 0);
  }
}

function prevExercise() {
  if (state.exIndex > 0) {
    state.exIndex--;
    state.exHintLevel = 0;
    state.exPassed = false;
    renderExercise();
    window.scrollTo(0, 0);
  }
}

function exitExercise() {
  if (confirm('確定離開此題目？')) {
    showPage('page-ex-list');
    renderExCategories();
  }
}

function resetCode() {
  const prob = state.exList[state.exIndex];
  if (confirm('確定要重置程式碼？')) {
    document.getElementById('code-editor').value = prob.template || '';
    updateLineNumbers();
    document.getElementById('output-content').innerHTML = '<span class="output-placeholder">按下「執行」查看輸出…</span>';
    document.getElementById('output-status').textContent = '';
    document.getElementById('ex-verdict').style.display = 'none';
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Code Editor: Line Numbers & Tab
// ════════════════════════════════════════════════════════════════════════════
function setupEditor(editor) {
  editor.removeEventListener('input', updateLineNumbers);
  editor.removeEventListener('keydown', handleEditorKey);
  editor.addEventListener('input', updateLineNumbers);
  editor.addEventListener('keydown', handleEditorKey);
  editor.addEventListener('scroll', syncScroll);
}

function updateLineNumbers() {
  const editor = document.getElementById('code-editor');
  const lines = (editor.value.match(/\n/g) || []).length + 1;
  const lnEl = document.getElementById('line-numbers');
  let html = '';
  for (let i = 1; i <= lines; i++) html += i + '\n';
  lnEl.textContent = html;
}

function syncScroll() {
  const editor = document.getElementById('code-editor');
  document.getElementById('line-numbers').scrollTop = editor.scrollTop;
}

function handleEditorKey(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.slice(0, start) + '    ' + this.value.slice(end);
    this.selectionStart = this.selectionEnd = start + 4;
    updateLineNumbers();
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    runCode();
  }
}

// ════════════════════════════════════════════════════════════════════════════
// History
// ════════════════════════════════════════════════════════════════════════════
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
  const exHist = storage.get('ex-history') || {};
  const content = document.getElementById('history-content');
  let html = '';

  // Quiz history
  const hasQuiz = Object.values(history).some(h => h.answered > 0);
  html += '<h3 style="margin-bottom:12px;color:var(--text2)">📝 題庫練習記錄</h3>';
  if (!hasQuiz) {
    html += '<div class="no-history">尚無題庫記錄。</div>';
  } else {
    html += '<div class="history-grid">' +
      QUESTION_BANK.categories.map(cat => {
        const hist = history[cat.id];
        if (!hist || !hist.answered) return '';
        const acc = Math.round((hist.correct / hist.answered) * 100);
        return `<div class="history-category">
          <div class="history-category-header">
            <span class="history-name">${cat.icon} ${cat.name}</span>
            <span class="history-acc">${acc}%</span>
          </div>
          <div class="history-bar"><div class="history-fill" style="width:${acc}%"></div></div>
          <div class="history-detail">已答 ${hist.answered} 題・答對 ${hist.correct} 題</div>
        </div>`;
      }).filter(Boolean).join('') +
    '</div>';
  }

  // Exercise history
  html += '<h3 style="margin:28px 0 12px;color:var(--text2)">💻 程式練習記錄</h3>';
  let exHtml = '';
  for (const cat of EXERCISE_BANK.categories) {
    const probs = EXERCISE_BANK.problems[cat.id] || [];
    const passed = probs.filter(p => exHist[p.id]).length;
    if (passed === 0) continue;
    const pct = Math.round((passed / probs.length) * 100);
    exHtml += `<div class="history-category">
      <div class="history-category-header">
        <span class="history-name">${cat.icon} ${cat.name}</span>
        <span class="history-acc">${passed}/${probs.length} 完成</span>
      </div>
      <div class="history-bar"><div class="history-fill" style="width:${pct}%"></div></div>
      <div class="history-detail">${probs.filter(p => exHist[p.id]).map(p => p.title).join('、')}</div>
    </div>`;
  }
  html += exHtml || '<div class="no-history">尚無程式練習記錄。</div>';

  content.innerHTML = html;
}

// ════════════════════════════════════════════════════════════════════════════
// Utilities
// ════════════════════════════════════════════════════════════════════════════
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
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
    'volatile','extern','NULL'];

  let s = escapeHtml(code);
  s = s.replace(/(#\w+)/g, '<span class="pp">$1</span>');
  s = s.replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;)/g, '<span class="str">$1</span>');
  s = s.replace(/(\/\/[^\n]*)/g, '<span class="cm">$1</span>');
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');
  keywords.forEach(kw => {
    s = s.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="kw">$1</span>');
  });
  s = s.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');
  return s;
}
