export async function loadGameData() {
  const [
    languages, items, villagers, bundles, achievements,
    museum, secretNotes, books, animals, skills
  ] = await Promise.all([
    fetch('data/languages.json').then(r => r.json()),
    fetch('data/items.json').then(r => r.json()),
    fetch('data/villagers.json').then(r => r.json()),
    fetch('data/bundles.json').then(r => r.json()),
    fetch('data/achievements.json').then(r => r.json()),
    fetch('data/museum.json').then(r => r.json()),
    fetch('data/secretNotes.json').then(r => r.json()),
    fetch('data/books.json').then(r => r.json()),
    fetch('data/animals.json').then(r => r.json()),
    fetch('data/skills.json').then(r => r.json())
  ]);
  return {
    farmInfo: { name:'', player:'', season:'spring', year:1, floor:0, shipping:0 },
    ...languages, items, villagers, bundles, achievements,
    museum, secretNotes, books, animals, skills
  };
}