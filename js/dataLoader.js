export async function loadGameData() {
  // wrap in try/catch so a single 404 doesn’t kill the app
  async function fetchJSON(path, fallback = []) {
    try {
      return await fetch(path).then(r => r.json());
    } catch {
      console.warn(`Could not load ${path}`);
      return fallback;
    }
  }

  const [
    languages, items, villagers, bundles, achievements,
    museum, secretNotes, books, animals, skills, fish, dailyTasks
  ] = await Promise.all([
    fetchJSON('data/languages.json', {}),
    fetchJSON('data/items.json', []),
    fetchJSON('data/villagers.json', []),
    fetchJSON('data/bundles.json', []),
    fetchJSON('data/achievements.json', []),
    fetchJSON('data/museum.json', []),
    fetchJSON('data/secretNotes.json', []),
    fetchJSON('data/books.json', []),
    fetchJSON('data/animals.json', []),
    fetchJSON('data/skills.json', []),
    fetchJSON('data/fish.json', []),
    fetchJSON('data/dailyTasks.json', [])
  ]);

  return {
    farmInfo: {
      name: '',
      player: '',
      season: 'spring',
      year: 1,
      money: 500,
      layout: 'Standard',
      pet: 'Dog',
      floor: 0
    },
    ...languages,
    items,
    villagers,
    bundles,
    achievements,
    museum: museum.map(item => ({ ...item, collected: false })),
    secretNotes,
    books,
    animals,
    skills,
    fish,
    dailyTasks
  };
}