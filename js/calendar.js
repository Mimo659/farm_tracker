export function renderCalendar(data) {
  const content = document.getElementById('calendar-content');
  const birthdays = data.villagers.filter(v=>v.birthday.startsWith(data.farmInfo.season));
  content.innerHTML = `
    <div class="glass pixel-border p-4 space-y-2 text-xs">
      <h2 class="text-sm">Birthdays this season</h2>
      <ul>${birthdays.map(v=>`<li>${v.birthday.slice(-2)} – ${v.name}</li>`).join('')}</ul>
    </div>
  `;
}