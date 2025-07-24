// dataLoader.js
export async function loadGameData() {
  // Safe loader: never throws, returns fallback on any failure
  async function safeFetch(path, fallback = []) {
    try {
      const r = await fetch(path);
      if (!r.ok) throw new Error(r.status);
      return await r.json();
    } catch {
      // console.warn(`Could not load ${path}`);   // optional log
      return fallback;
    }
  }

  const [
    languages,
    items,
    villagers,
    bundles,
    achievements,
    museum,
    secretNotes,
    books,
    animals,
    skills,
    fish,
    dailyTasks,
    planner
  ] = await Promise.all([
    safeFetch('data/languages.json', {}),
    safeFetch('data/items.json', []),
    safeFetch('data/villagers.json', []),
    safeFetch('data/bundles.json', []),
    safeFetch('data/achievements.json', []),
    safeFetch('data/museum.json', []),
    safeFetch('data/secretNotes.json', []),
    safeFetch('data/books.json', []),
    safeFetch('data/animals.json', []),
    safeFetch('data/skills.json', []),
    safeFetch('data/fish.json', []),
    safeFetch('data/dailyTasks.json', []),
    safeFetch('data/plannerAssets.json', [])
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
    dailyTasks,
    planner
  };
}