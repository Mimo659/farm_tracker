export function startSettings(data) {
  $('#settings-btn').addEventListener('click', () => $('#settings-panel').classList.remove('hidden'));
  $('#close-settings').addEventListener('click', () => $('#settings-panel').classList.add('hidden'));
  $('#export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stardew-save.json';
    a.click();
  });
  $('#import-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { Object.assign(data, JSON.parse(reader.result)); };
    reader.readAsText(file);
  });
  $('#dark-toggle').addEventListener('click', () => {
    document.documentElement.toggleAttribute('data-theme','dark');
  });
}