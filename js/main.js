// Fetch data from JSON files
async function loadGameData() {
    const [languages, items, villagers, bundles, achievements, museum] = await Promise.all([
        fetch('data/languages.json').then(response => response.json()),
        fetch('data/items.json').then(response => response.json()),
        fetch('data/villagers.json').then(response => response.json()),
        fetch('data/bundles.json').then(response => response.json()),
        fetch('data/achievements.json').then(response => response.json()),
        fetch('data/museum.json').then(response => response.json())
    ]);

    return {
        farmInfo: {
            name: "",
            playerName: "",
            season: "spring",
            year: 1
        },
        ...languages,
        items,
        villagers,
        bundles,
        achievements,
        museum
    };
}

// Current language
let currentLang = 'en';
let gameData;

// DOM Elements
const langEnBtn = document.getElementById('lang-en');
const langDeBtn = document.getElementById('lang-de');
const tabButtons = document.querySelectorAll('[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    gameData = await loadGameData();

    // Set up landing page
    document.getElementById('save-farm').addEventListener('click', () => {
        gameData.farmInfo.name = document.getElementById('farm-name').value;
        gameData.farmInfo.playerName = document.getElementById('player-name').value;
        gameData.farmInfo.season = document.getElementById('current-season').value;
        gameData.farmInfo.year = parseInt(document.getElementById('current-year').value);

        document.getElementById('setup').classList.add('hidden');
        document.querySelector('main').classList.remove('hidden');

        // Update UI with farm info
        // document.getElementById('welcome-text').textContent =
        //     `Welcome to ${gameData.farmInfo.name}, ${gameData.farmInfo.playerName}!`;

        // Set initial season
        document.getElementById('current-season').value = gameData.farmInfo.season;
        renderCrops(gameData.farmInfo.season);
    });


    // Set up tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize all tabs
    loadInventoryTab();
    loadFarmingTab();
    loadVillagersTab();
    loadQuestsTab();
    loadMuseumTab();


    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });

    // Category functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const categoryId = button.getAttribute('data-category');

            // Update button styles
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-green-600', 'text-white');

            // Show selected category content
            categoryContents.forEach(content => content.classList.add('hidden'));
            document.getElementById(categoryId).classList.remove('hidden');
        });
    });

    // Checkbox functionality
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.classList.add('bg-green-500', 'border-green-500');
            } else {
                checkmark.classList.remove('bg-green-500', 'border-green-500');
            }
        });
    });

    // Add Crop Modal
    const addCropBtn = document.querySelector('#add-crop');
    const addCropModal = document.getElementById('add-crop-modal');
    const cancelCropBtn = document.getElementById('cancel-crop');

    if (addCropBtn) {
        addCropBtn.addEventListener('click', () => {
            addCropModal.classList.remove('hidden');
        });
    }

    if (cancelCropBtn) {
        cancelCropBtn.addEventListener('click', () => {
            addCropModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === addCropModal) {
            addCropModal.classList.add('hidden');
        }
    });
});


// Tab switching
function switchTab(tabId) {
    // Update active tab button
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('tab-active');
        } else {
            button.classList.remove('tab-active');
        }
    });

    // Show the selected tab content
    tabContents.forEach(content => {
        if (content.id === `${tabId}-tab`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

// Inventory Tab
function loadInventoryTab() {
    const inventoryItems = document.getElementById('inventory-items');
    const categoryButtons = document.querySelectorAll('[data-category]');

    // Load all items by default
    renderInventoryItems('all');

    // Set up category filters
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            renderInventoryItems(category);
        });
    });
}

function renderInventoryItems(category) {
    const inventoryItems = document.getElementById('inventory-items');
    inventoryItems.innerHTML = '';

    const filteredItems = category === 'all'
        ? gameData.items
        : gameData.items.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = `item-card bg-white p-4 pixel-border flex flex-col items-center cursor-pointer ${item.collected ? 'opacity-50' : ''}`;
        itemCard.innerHTML = `
            <img src="images/items/${item.img}" alt="${item.name}" class="w-16 h-16 object-contain mb-2 pixel-border villager-face">
            <h3 class="pixel-font text-sm text-center">${item.name}</h3>
            <button class="pixel-button mt-2 pixel-font px-2 py-1 text-xs ${item.collected ? 'bg-gray-400' : 'bg-[#5b8c5a]'} text-white pixel-border">
                ${item.collected ? 'Collected' : 'Mark Collected'}
            </button>
        `;

        const toggleButton = itemCard.querySelector('button');
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            item.collected = !item.collected;
            renderInventoryItems(category);
        });

        inventoryItems.appendChild(itemCard);
    });
}

// Farming Tab
function loadFarmingTab() {
    const seasonSelect = document.getElementById('current-season');
    const addCropBtn = document.getElementById('add-crop');
    const cropModal = document.getElementById('add-crop-modal');
    const cancelCropBtn = document.getElementById('cancel-crop');
    const saveCropBtn = document.querySelector('#add-crop-modal button:last-child');

    // Load crops for current season
    renderCrops(seasonSelect.value);

    // Handle season change
    seasonSelect.addEventListener('change', () => {
        renderCrops(seasonSelect.value);
    });

    // Set up crop modal
    addCropBtn.addEventListener('click', () => {
        cropModal.classList.remove('hidden');
    });

    cancelCropBtn.addEventListener('click', () => {
        cropModal.classList.add('hidden');
    });

    saveCropBtn.addEventListener('click', () => {
        const name = document.getElementById('crop-name').value;
        const days = parseInt(document.getElementById('crop-days').value);
        const quantity = parseInt(document.getElementById('crop-quantity').value);

        if (name && !isNaN(days) && !isNaN(quantity)) {
            // In a real app, we would save this to some data structure
            console.log(`Added crop: ${name}, ${days} days, ${quantity} plants`);
            cropModal.classList.add('hidden');

            // Clear the form
            document.getElementById('crop-name').value = '';
            document.getElementById('crop-days').value = '';
            document.getElementById('crop-quantity').value = '';

            // Re-render crops
            renderCrops(seasonSelect.value);
        }
    });

}

function renderCrops(season) {
    const cropList = document.getElementById('crop-list');
    cropList.innerHTML = '';

    // Sample crop data - in a real app this would come from saved data
    const sampleCrops = {
        spring: [
            { name: "Strawberry", days: 8, quantity: 12 },
            { name: "Potato", days: 6, quantity: 8 }
        ],
        summer: [
            { name: "Blueberry", days: 13, quantity: 16 },
            { name: "Melon", days: 12, quantity: 6 }
        ],
        fall: [
            { name: "Cranberry", days: 7, quantity: 20 },
            { name: "Pumpkin", days: 13, quantity: 10 }
        ],
        winter: []
    };

    const crops = sampleCrops[season.toLowerCase()];

    if (crops.length === 0) {
        cropList.innerHTML = `<p class="col-span-3 text-center">No crops planted this season.</p>`;
        return;
    }

    crops.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = `bg-white p-4 pixel-border ${'season-' + season}`;
        cropCard.innerHTML = `
            <h3 class="pixel-font text-lg mb-2">${crop.name}</h3>
            <p><strong>Days to Harvest:</strong> ${crop.days}</p>
            <p><strong>Quantity:</strong> ${crop.quantity}</p>
            <div class="flex justify-between mt-4">
                <button class="pixel-button pixel-font px-2 py-1 bg-[#e7717d] text-white pixel-border text-xs">Harvest</button>
                <button class="pixel-button pixel-font px-2 py-1 bg-gray-300 text-gray-700 pixel-border text-xs">Remove</button>
            </div>
        `;
        cropList.appendChild(cropCard);
    });
}

// Villagers Tab
function loadVillagersTab() {
    renderVillagerList();
}

function renderVillagerList() {
    const villagerList = document.getElementById('villager-list');
    villagerList.innerHTML = '';

    gameData.villagers.forEach(villager => {
        const villagerCard = document.createElement('div');
        villagerCard.className = 'item-card bg-white p-4 pixel-border flex flex-col items-center cursor-pointer';
        villagerCard.innerHTML = `
            <img src="images/villagers/${villager.name}.png" alt="${villager.name}" class="w-16 h-16 object-cover mb-2 pixel-border villager-face">
            <h3 class="pixel-font text-sm text-center">${villager.name}</h3>
            <div class="flex mt-2 items-center">
                ${[...Array(14)].map((_, i) => `<img src="images/${i < villager.hearts ? '' : 'hearts/'}${i < villager.hearts ? 'heart' : '0_hearts'}.png" class="w-auto h-4 mx-px" />`).join('')}
            </div>
        `;

        villagerCard.addEventListener('click', () => {
            if (villager.hearts < 14) {
                villager.hearts++;
                renderVillagerList();
            }
        });

        villagerCard.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (villager.hearts > 0) {
                villager.hearts--;
                renderVillagerList();
            }
        });

        villagerCard.addEventListener('dblclick', () => {
.            showVillagerDetail(villager.id);
        });

        villagerList.appendChild(villagerCard);
    });
}

function showVillagerDetail(villagerId) {
    const villager = gameData.villagers.find(v => v.id === villagerId);
    const villagerDetail = document.getElementById('villager-detail');

    // Set villager data
    document.getElementById('villager-img').src = `images/villagers/${villager.name}.png`;
    document.getElementById('villager-name').textContent = villager.name;
    document.getElementById('villager-hearts').innerHTML = [...Array(14)].map((_, i) => `<img src="images/${i < villager.hearts ? '' : 'hearts/'}${i < villager.hearts ? 'heart' : '0_hearts'}.png" class="w-auto h-4 mx-px" />`).join('');

    // Set gift preferences
    const setGiftList = (listId, items) => {
        const list = document.getElementById(listId);
        list.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    };

    setGiftList('villager-loves', villager.loves);
    setGiftList('villager-likes', villager.likes);
    setGiftList('villager-dislikes', villager.dislikes);
    setGiftList('villager-hates', villager.hates);

    // Show the detail view
    villagerDetail.setAttribute('data-villager-id', villagerId);
    villagerDetail.classList.remove('hidden');

    // Scroll to the detail view
    villagerDetail.scrollIntoView({ behavior: 'smooth' });
}

// Crop Planner Functionality
const showPlannerBtn = document.getElementById('show-planner');
if (showPlannerBtn) {
    showPlannerBtn.addEventListener('click', () => {
        const planner = document.getElementById('crop-planner');
        const cropList = document.getElementById('crop-list');

        if (planner.classList.contains('hidden')) {
            planner.classList.remove('hidden');
            cropList.classList.add('hidden');
            renderPlannerGrid();

            // Add event listeners now that the planner is visible
            document.getElementById('clear-planner').addEventListener('click', () => {
                const tiles = document.querySelectorAll('#planner-grid > div');
                tiles.forEach(tile => {
                    tile.classList.remove('bg-green-300');
                });
            });

            document.getElementById('save-plan').addEventListener('click', () => {
                const crop = document.getElementById('planner-crop').value;
                const count = parseInt(document.getElementById('planner-count').value);
                const season = document.getElementById('planner-season').value;

                // In a real app, you would save this plan to your data structure
                alert(`Saved plan for ${count} ${crop} plants in ${season}!`);

                // Switch back to crop list view
                document.getElementById('crop-planner').classList.add('hidden');
                document.getElementById('crop-list').classList.remove('hidden');
            });
        } else {
            planner.classList.add('hidden');
            cropList.classList.remove('hidden');
        }
    });
}

function renderPlannerGrid() {
    const grid = document.getElementById('planner-grid');
    grid.innerHTML = '';

    // Create 7x7 grid (49 tiles)
    for (let i = 0; i < 49; i++) {
        const tile = document.createElement('div');
        tile.className = 'aspect-square bg-gray-100 border border-gray-300 cursor-pointer';
        tile.addEventListener('click', () => {
            tile.classList.toggle('bg-green-300');
        });
        grid.appendChild(tile);
    }
}

// Quests Tab
function loadQuestsTab() {
    renderBundles();
    renderAchievements();
}

function renderBundles() {
    const bundleList = document.getElementById('bundle-list');
    bundleList.innerHTML = '';

    gameData.bundles.forEach(bundle => {
        const bundleCard = document.createElement('div');
        bundleCard.className = 'bg-white p-4 pixel-border';
        bundleCard.innerHTML = `
            <h3 class="pixel-font text-lg mb-2">${bundle.name}</h3>
            <ul class="list-disc pl-5 mb-3">
                ${bundle.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div class="flex justify-between items-center">
                <span class="text-sm">${bundle.completed ? 'Completed!' : 'In progress'}</span>
                <button class="pixel-button pixel-font px-2 py-1 ${bundle.completed ? 'bg-gray-400' : 'bg-[#5b8c5a]'} text-white pixel-border text-xs">
                    ${bundle.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        `;

        const toggleButton = bundleCard.querySelector('button');
        toggleButton.addEventListener('click', () => {
            bundle.completed = !bundle.completed;
            renderBundles();
        });

        bundleList.appendChild(bundleCard);
    });
}

function renderAchievements() {
    const achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';

    gameData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `bg-white p-4 pixel-border ${achievement.completed ? 'bg-green-100' : ''}`;
        achievementCard.innerHTML = `
            <h3 class="pixel-font text-lg mb-1">${achievement.name}</h3>
            <p class="text-sm mb-3">${achievement.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs">${achievement.completed ? 'Completed!' : 'Not completed'}</span>
                <button class="pixel-button pixel-font px-2 py-1 ${achievement.completed ? 'bg-gray-400' : 'bg-[#5b8c5a]'} text-white pixel-border text-xs">
                    ${achievement.completed ? 'Undo' : 'Complete'}
                </button>
            </div>
        `;

        const toggleButton = achievementCard.querySelector('button');
        toggleButton.addEventListener('click', () => {
            achievement.completed = !achievement.completed;
            renderAchievements();
        });

        achievementList.appendChild(achievementCard);
    });
}

// Museum Tab
function loadMuseumTab() {
    renderMuseumItems();
}

function renderMuseumItems() {
    const museumItems = document.getElementById('museum-items');
    museumItems.innerHTML = '';

    gameData.museum.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = `item-card bg-white p-4 pixel-border flex flex-col items-center cursor-pointer ${item.collected ? 'opacity-50' : ''}`;
        itemCard.innerHTML = `
            <img src="images/items/${item.img}" alt="${item.name}" class="w-16 h-16 object-contain mb-2 pixel-border villager-face">
            <h3 class="pixel-font text-sm text-center">${item.name}</h3>
            <button class="pixel-button mt-2 pixel-font px-2 py-1 text-xs ${item.collected ? 'bg-gray-400' : 'bg-[#5b8c5a]'} text-white pixel-border">
                ${item.collected ? 'Donated' : 'Mark Donated'}
            </button>
        `;

        const toggleButton = itemCard.querySelector('button');
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            item.collected = !item.collected;
            renderMuseumItems();
        });

        museumItems.appendChild(itemCard);
    });
}
