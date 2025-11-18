// --- 1. DOM Element Selection ---
const image = document.getElementById('imageToFilter');
const inputs = document.querySelectorAll('.controls-area input[type="range"]');
const resetButton = document.getElementById('resetButton');

// Stores the current values of all filters, used to build the CSS string
const filters = {
    grayscale: 0,
    contrast: 100,
    brightness: 100,
    blur: 0
};

// --- 2. Filter Application Function ---

function applyFilters() {
    // 1. Construct the entire CSS filter string
    const filterString = `
        grayscale(${filters.grayscale}%)
        contrast(${filters.contrast}%)
        brightness(${filters.brightness}%)
        blur(${filters.blur}px)
    `;
    
    // 2. Apply the constructed string to the image's style
    image.style.filter = filterString;
}


// --- 3. Event Handling ---

function handleUpdate() {
    // 'this' refers to the input element that triggered the 'input' event
    const input = this;
    
    // Get attributes used for filter logic and display
    const filterName = input.getAttribute('data-filter');
    const unit = input.getAttribute('data-unit');
    const value = input.value;
    
    // Update the global filters object
    filters[filterName] = value;
    
    // Update the display value next to the slider
    document.getElementById(`${filterName}Value`).textContent = value;
    
    // Apply the newly calculated filters to the image
    applyFilters();
}

// Attach the 'input' event listener to all range sliders
// 'input' fires continuously as the slider is dragged
inputs.forEach(input => input.addEventListener('input', handleUpdate));


// --- 4. Reset Functionality ---

function resetFilters() {
    // Reset the internal filters object to default values
    filters.grayscale = 0;
    filters.contrast = 100;
    filters.brightness = 100;
    filters.blur = 0;

    // Reset the HTML input values and display text
    inputs.forEach(input => {
        const filterName = input.getAttribute('data-filter');
        let defaultValue = (filterName === 'contrast' || filterName === 'brightness') ? 100 : 0;
        
        input.value = defaultValue;
        document.getElementById(`${filterName}Value`).textContent = defaultValue;
    });

    // Apply the reset filters
    applyFilters();
}

resetButton.addEventListener('click', resetFilters);

// Initial application of filters (ensures defaults are correctly applied on load)
applyFilters();