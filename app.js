// Initialize Lucide Icons
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Clock & Time Engine
function updateClock() {
  const now = new Date();

  let rawHours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const period = rawHours >= 12 ? 'PM' : 'AM';

  // 12-hour format display
  const displayHours = rawHours % 12 || 12;

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const periodEl = document.getElementById('period');
  const fullDateEl = document.getElementById('fullDate');
  const greetingEl = document.getElementById('dynamicGreeting');
  const dayProgressBar = document.getElementById('dayProgressBar');
  const dayProgressPercent = document.getElementById('dayProgressPercent');
  const timezoneBadge = document.getElementById('timezoneBadge');

  if (hoursEl) hoursEl.textContent = String(displayHours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  if (periodEl) periodEl.textContent = period;

  // Date String (e.g., Monday, September 14, 2026)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  if (fullDateEl) {
    fullDateEl.textContent = now.toLocaleDateString('en-US', options);
  }

  // Greeting logic
  if (greetingEl) {
    let greeting = 'Hello';
    if (rawHours >= 5 && rawHours < 12) {
      greeting = 'Good Morning';
    } else if (rawHours >= 12 && rawHours < 17) {
      greeting = 'Good Afternoon';
    } else if (rawHours >= 17 && rawHours < 22) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night';
    }
    greetingEl.textContent = greeting;
  }

  // Day progress (0 to 100%)
  const totalSecondsInDay = 24 * 60 * 60;
  const currentSeconds = rawHours * 3600 + minutes * 60 + seconds;
  const progressPercent = ((currentSeconds / totalSecondsInDay) * 100).toFixed(1);

  if (dayProgressBar) {
    dayProgressBar.style.width = `${progressPercent}%`;
  }
  if (dayProgressPercent) {
    dayProgressPercent.textContent = `${progressPercent}%`;
  }

  // Timezone display
  if (timezoneBadge) {
    const offsetMinutes = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const sign = offsetMinutes >= 0 ? '+' : '-';
    timezoneBadge.textContent = `UTC${sign}${offsetHours}`;
  }
}

// Session Uptime Timer
let sessionSeconds = 0;
function updateUptime() {
  sessionSeconds++;
  const h = String(Math.floor(sessionSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((sessionSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(sessionSeconds % 60).padStart(2, '0');
  const uptimeEl = document.getElementById('uptimeCounter');
  if (uptimeEl) {
    uptimeEl.textContent = `${h}:${m}:${s}`;
  }
}

// Inspirational Quotes
const quotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The details are not the details. They make the design.", author: "Charles Eames" }
];

let currentQuoteIndex = 0;
function setQuote(index) {
  const quoteTextEl = document.getElementById('dailyQuote');
  const quoteAuthorEl = document.getElementById('quoteAuthor');
  if (quoteTextEl && quoteAuthorEl) {
    quoteTextEl.style.opacity = '0';
    quoteAuthorEl.style.opacity = '0';
    setTimeout(() => {
      quoteTextEl.textContent = `"${quotes[index].text}"`;
      quoteAuthorEl.textContent = `— ${quotes[index].author}`;
      quoteTextEl.style.opacity = '1';
      quoteAuthorEl.style.opacity = '1';
    }, 200);
  }
}

// Theme Toggle
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      initIcons();
    });
  }
}

// Copy Contact interaction
function initCopyContact() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const tooltip = document.getElementById('emailTooltip');
  const email = 'helen861230@gmail.com';

  if (copyBtn && tooltip) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
          tooltip.textContent = 'Copy email';
        }, 2000);
      } catch (err) {
        tooltip.textContent = email;
      }
    });
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initTheme();
  initCopyContact();

  // Set initial year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Quote Button
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      setQuote(currentQuoteIndex);
    });
  }

  // Start Clock and Uptime
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateUptime, 1000);
});
