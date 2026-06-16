const clickSound = new Audio('enrique.mp3');
const song1 = new Audio('du-bist-gut-genug.mp3');
const song2 = new Audio('yara-yara-no-intro.mp3');
const song3 = new Audio('ikoliks_aj-jazz-lounge-elevator-music-332339.mp3');
const pablo = new Audio('pablomeme.mp3');
const title = document.getElementById('main-title');
const text = document.getElementById('text-box');
const text2 = document.getElementById('text-box2');
const text3 = document.getElementById('text-box3');

const upgradeButtons = document.querySelectorAll('.upgrade-btn');

const mute = document.getElementById('mute');
const change = document.getElementById('songchange');
const main = document.getElementById('main');
const cpsup = document.getElementById('upgrade2');
const cpcup = document.getElementById('upgrade');
const cpspsup = document.getElementById('upgrade3');

// Code Save/Load Elements
const saveCodeInput = document.getElementById('saveCodeInput');
const generateSaveBtn = document.getElementById('generateSaveBtn');
const loadSaveBtn = document.getElementById('loadSaveBtn');

// Toggle Menu Elements
const saveMenuContainer = document.getElementById('save-menu-container');
const toggleMenuBtn = document.getElementById('toggleMenuBtn');

let moola = 0;
let cpc = 1;
let cps = 0;
let cpsps = 0;
let price1 = 100;
let price2 = 50;
let price3 = 1000;

let gameTimer = null; 
let compoundTimer = null; 

// Function to update everything on the screen
function updateUI() {
    title.textContent = moola;
    text.textContent = `epc: ${cpc}`;
    text2.textContent = `eps: ${cps}`;
    text3.textContent = `epsps: ${cpsps}`;
    cpcup.innerHTML = `upgrade epc<br>$ ${price1}`;
    cpsup.innerHTML = `upgrade eps<br>$ ${price2}`;
    cpspsup.innerHTML = `upgrade epspm<br>$ ${price3}`;
}

// Initialize UI on startup
updateUI();

let song = song3;
let muted = `yes`;
song.loop = false;

// Dynamic loop that smoothly adds +1 moola based on current CPS speed
function startLoop() {
    clearInterval(gameTimer); 
    if (cps <= 0) return; 

    let delay = 1000 / cps; 

    gameTimer = setInterval(() => {
        moola += 1;
        title.textContent = moola;
    }, delay);
}

// Separate Clock: Automatically ticks up your base CPS via your CPSPS upgrades every 1 second
function startCompoundLoop() {
    clearInterval(compoundTimer);

    compoundTimer = setInterval(() => {
        if (cpsps > 0) {
            cps += cpsps;
            updateUI();
            startLoop(); 
        }
    }, 60000);
}

// --- SHOW/HIDE MENU INTERACTIVE LOGIC ---
toggleMenuBtn.addEventListener('click', (e) => {
    // 🌟 FIX: Remove focus so Space bar doesn't click this button again
    e.target.blur();

    if (saveMenuContainer.classList.contains('hidden')) {
        saveMenuContainer.classList.remove('hidden');
        toggleMenuBtn.textContent = "Hide Save Menu";
        toggleMenuBtn.style.backgroundColor = "#dc3545"; 
    } else {
        saveMenuContainer.classList.add('hidden');
        toggleMenuBtn.textContent = "Show Save Menu";
        toggleMenuBtn.style.backgroundColor = "#6c757d"; 
    }
});

// --- CODE GENERATOR AND LOADER LOGIC ---

// 1. Generate a Text Code
generateSaveBtn.addEventListener('click', (e) => {
    // 🌟 FIX: Remove focus
    e.target.blur();

    const gameObject = { moola, cpc, cps, cpsps, price1, price2, price3 };
    const jsonString = JSON.stringify(gameObject);
    const base64Code = btoa(jsonString);
    
    saveCodeInput.value = base64Code;
    saveCodeInput.select();
    alert("Save code generated! Copy it from the text box.");
});

// 2. Load a Text Code
loadSaveBtn.addEventListener('click', (e) => {
    // 🌟 FIX: Remove focus
    e.target.blur();

    const codeString = saveCodeInput.value.trim();
    if (!codeString) {
        alert("Please paste a save code into the box first!");
        return;
    }

    try {
        const decodedJson = atob(codeString);
        const parsedData = JSON.parse(decodedJson);

        moola = Number(parsedData.moola) || 0;
        cpc = Number(parsedData.cpc) || 1;
        cps = Number(parsedData.cps) || 0;
        cpsps = Number(parsedData.cpsps) || 0;
        price1 = Number(parsedData.price1) || 100;
        price2 = Number(parsedData.price2) || 50;
        price3 = Number(parsedData.price3) || 1000;

        updateUI();
        startLoop();
        startCompoundLoop();

        alert("Game successfully loaded!");
        saveCodeInput.value = ""; 
    } catch (error) {
        alert("Invalid save code! Make sure you copied the whole string.");
    }
});

// --- KEYBOARD & AUDIO LISTENERS ---

document.addEventListener('keydown', function(event) {
    if (event.key === 'r') {
        if (main.src.includes("200w.gif")){
            main.src = "https://cdn3.emoji.gg/emojis/861909-michael.png"
        } else if (main.src.includes("861909-michael.png")){
            main.src = "https://static.wikia.nocookie.net/plantsvszombies/images/d/d8/HD_Acorn_and_Oak.png/revision/latest/scale-to-width-down/250?cb=20200202000437"
        } else if (main.src.includes("HD_Acorn_and_Oak.png")){
            main.src = "https://static.wikia.nocookie.net/simpsonsfanon/images/f/fe/Domer.jpg/revision/latest/scale-to-width-down/732?cb=20251222023623"
        } else {
            main.src = "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUycXEwMmVoeGRuczB2b2JkNzFjanFyOW14OXVmdnU3aHdya3d0bnpycCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/31ZDEUIgMDIEdXzzNu/200w.gif"
        }
    }
});
  
mute.addEventListener('click', (e) => {
    // 🌟 FIX: Remove focus
    e.target.blur();

    if (mute.innerHTML == `mute music`){
        mute.innerHTML = `unmute music`;
        song.pause();
        song.loop = false;
        muted = `yes`;
    } else{
        mute.innerHTML = `mute music`;
        muted = `no`;
        song.play();
        song.loop = true;
    }
});

change.addEventListener('click', (e) => {
    // 🌟 FIX: Remove focus
    e.target.blur();

    if (muted == `no`){
        if (song == song1){
            change.innerHTML = `Yara Yara Phonk - change song`;
            song.pause();
            song = song2
            song.currentTime = 0;
            song.loop = true;
            song.play();
        } else if (song == song2){
            change.innerHTML = `jazz - change song`;
            song.pause();
            song = song3
            song.currentTime = 0;
            song.loop = true;
            song.play();
        } else if (song == song3){
            change.innerHTML = `du bist gut genug - change song`;
            song.pause();
            song = song1
            song.currentTime = 0;
            song.loop = true;
            song.play();
        }
    }
});

// Upgrade Buttons Click Handler
upgradeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 🌟 FIX: Remove focus so Space bar doesn't click this button again
        e.target.blur();

        if (button.id == "upgrade"){
            if (moola >= price1) {
                cpc += 1;
                moola -= price1;
                price1 *= 1.5;
                price1 = Math.round(price1);
                updateUI();
                pablo.currentTime = 0;
                pablo.play();
            };
        } else if (button.id == "upgrade2"){
            if (moola >= price2) {
                cps += 1;
                moola -= price2;
                price2 *= 1.5;
                price2 = Math.round(price2);
                updateUI();
                pablo.currentTime = 0;
                pablo.play();
                startLoop(); 
            };
        } else if (button.id == "upgrade3"){
            if (moola >= price3) {
                cpsps += 1;
                moola -= price3;
                price3 *= 1.5;
                price3 = Math.round(price3);
                updateUI();
                pablo.currentTime = 0;
                pablo.play();
                startCompoundLoop(); 
            };
        }
    });
});

main.addEventListener('click', () => {
    moola += cpc;
    title.textContent = moola;
    clickSound.currentTime = 0;
    clickSound.play();
});

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        main.classList.add('active');
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        main.classList.remove('active');
        moola += cpc;
        title.textContent = moola;
        clickSound.currentTime = 0;
        clickSound.play();
    }
});

// Start loops
startLoop();
startCompoundLoop();
