const colorContainer = document.getElementById("color-container");
const hexValues = document.getElementById("hex-values");
const selectedColorEl = document.getElementById("select-color");
const selectedSchemeEl = document.getElementById("select-scheme");
const getColorSchemeBtn = document.getElementById("color-btn");
let selectedColorValue = selectedColorEl.value;
let selectedSchemeValue = selectedSchemeEl.value;

// innerhtml for color scheme div
function getColorSchemeHtml(data) {
    return data.colors
        .map(color => `
            <div class="color" style="background-color:${color.hex.value};"></div>
            `)
        .join("")
}

// innerhtml for hex values div
function getHexValuesHtml(data) {
    return data.colors
        .map(color => `
            <div class="hex-value">${color.hex.value}</div>
            `)
        .join("")
}

// updates innerhtml for color scheme and hex values div
function generateColors(data) {
    colorContainer.innerHTML = getColorSchemeHtml(data);
    hexValues.innerHTML = getHexValuesHtml(data);
}

// users can copy hex value to clipboard when clicking color
function colorsClickable() {
    const colors = document.querySelectorAll(".color");
    const rgb2hex = (rgb) => `
        #${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
            .slice(1)
            .map(n => parseInt(n, 10)
                .toString(16)
                .padStart(2, '0'))
            .join('')}`;

    colors.forEach(color => {
        color.addEventListener("click", function() {
            navigator.clipboard.writeText(rgb2hex(color.style.backgroundColor)).then(() => {
                alert("Copied to clipboard");
              });
        });
    });
}

// generates default color scheme with color #0047AB and monochrome scheme
// colors copyable
fetch('https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=monochrome&count=5')
    .then(response => response.json())
    .then(data => {
        generateColors(data);
        colorsClickable();
    });

// color value updates when user selects
selectedColorEl.addEventListener("change",function(){
    selectedColorValue = selectedColorEl.value
})

// scheme value updates when user selects
selectedSchemeEl.addEventListener("change",function(){
    selectedSchemeValue = selectedSchemeEl.value
})

// updates colors when button clicked
// slice(1) removes # from the beginning of hex value
// colors copyable
getColorSchemeBtn.addEventListener("click",function(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColorValue.slice(1)}&format=json&mode=${selectedSchemeValue}&count=5`)
        .then(response => response.json())
        .then(data => {
            generateColors(data);
            colorsClickable();
        });
})