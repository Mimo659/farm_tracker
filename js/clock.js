export function startClock(data) {
  const dateEl = document.getElementById('date-display');
  const clockEl = document.getElementById('clock-display');
  const seasons = ['spring','summer','fall','winter'];
  const now = new Date();
  data.farmInfo.year = now.getFullYear() - 2020;
  data.farmInfo.season = seasons[Math.floor(now.getMonth()/3) % 4];
  const day = now.getDate();
  dateEl.textContent = `${data.farmInfo.season} ${day}, Year ${data.farmInfo.year}`;
  setInterval(() => {
    const t = new Date();
    const h = (t.getHours()%24).toString().padStart(2,'0');
    const m = t.getMinutes().toString().padStart(2,'0');
    clockEl.textContent = `${h}:${m}`;
  }, 1000);
}