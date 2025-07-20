export async function loadGameData() {
  try {
    const [
      languages, items, villagers, bundles, achievements,
      museum, secretNotes, books, animals, skills, fish
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
      fetch('data/skills.json').then(r => r.json()),
      fetch('data/fish.json').then(r => r.json())
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
      museum: museum.map(item => ({ ...item, collected: false, location: item.location })), // Initialize collected state
      secretNotes,
      books,
      animals,
      skills,
      fish
    };
  } catch (error) {
    console.error('Error loading game data:', error);
    throw error;
  }
}