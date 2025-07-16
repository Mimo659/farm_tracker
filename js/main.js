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
        document.getElementById(tabId).classList.add('active');
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
const addCropBtn = document.querySelector('#farming button');
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
