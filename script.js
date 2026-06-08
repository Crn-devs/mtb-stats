const savedStats = localStorage.getItem('mtbStats');

const stats = savedStats
  ? JSON.parse(savedStats)
  : {
      jumps: 0,
      bones: 0,
      trees: 0,
      bikes: 0,
    };

function saveStats() {
  localStorage.setItem('mtbStats', JSON.stringify(stats));
}

const outcomes = [
  "✅ You'll land this easy.",
  '😎 Massive style points incoming.',
  "🚀 Send it. What's the worst that could happen?",
  '🔥 This is your moment.',
  '🏆 Future highlight reel material.',

  '🤔 Maybe walk the trail first.',
  '😬 This one looks spicy.',
  '⚠️ Confidence exceeds talent.',
  '🚑 The NHS would advise against this.',
  '🌲 The tree is already preparing.',
  "💀 DON'T TAKE THE RISK.",
  '🦴 Your collarbone has filed a complaint.',
  '📉 Odds are not in your favour today.',
  '👨‍⚕️ Your physiotherapist says no.',
  '🚁 Air ambulance has entered the chat.',
];

// DOM Elements
const rateEl = document.getElementById('survival-rate');
const badgeEl = document.getElementById('status-badge');
const resultEl = document.getElementById('result');
const sendBtn = document.getElementById('sendBtn');
const confidenceEl = document.getElementById('confidence');

// Update all displayed stats and recalculate survival rate
function updateStats() {
  Object.entries(stats).forEach(([key, value]) => {
    const element = document.getElementById(key);

    if (element) {
      element.textContent = value;
    }
  });

  const totalIncidents = stats.jumps + stats.bones;

  const survival =
    totalIncidents === 0
      ? 0
      : ((stats.jumps / totalIncidents) * 100).toFixed(1);

  rateEl.textContent = `${survival}%`;

  if (survival >= 99) {
    badgeEl.textContent = '🟢 Mostly Intact';
    badgeEl.style.background = '#22c55e';
    badgeEl.style.color = '#000';
  } else if (survival >= 95) {
    badgeEl.textContent = '🟡 Questionable Decisions';
    badgeEl.style.background = '#facc15';
    badgeEl.style.color = '#000';
  } else {
    badgeEl.textContent = '🔴 Orthopaedic Investor';
    badgeEl.style.background = '#ef4444';
    badgeEl.style.color = '#fff';
  }
}

// Increment buttons
document.querySelectorAll('.plus').forEach((btn) => {
  btn.addEventListener('click', () => {
    const stat = btn.dataset.target;

    stats[stat]++;

    saveStats();
    updateStats();
  });
});

// Decrement buttons
document.querySelectorAll('.minus').forEach((btn) => {
  btn.addEventListener('click', () => {
    const stat = btn.dataset.target;

    if (stats[stat] > 0) {
      stats[stat]--;
    }
    saveStats();
    updateStats();
  });
});

// SEND IT button
sendBtn.addEventListener('click', () => {
  const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

  resultEl.textContent = randomOutcome;

  if (confidenceEl) {
    const confidence = Math.floor(Math.random() * 101);

    confidenceEl.textContent = `${confidence}%`;
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('mtbStats');

  location.reload();
});

// Initial page load
updateStats();
