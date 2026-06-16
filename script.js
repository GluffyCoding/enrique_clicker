const clickSound = new Audio('enrique.mp3');
const song1 = new Audio('du-bist-gut-genug.mp3');
const song2 = new Audio('yara-yara-no-intro.mp3');
const song3 = new Audio('ikoliks_aj-jazz-lounge-elevator-music-332339.mp3');
const pablo = new Audio('pablomeme.mp3');
const title = document.getElementById('main-title');
const text = document.getElementById('text-box');
const text2 = document.getElementById('text-box2');
const buttons = document.querySelectorAll('button');
const mute = document.getElementById('mute');
const change = document.getElementById('songchange');
const main = document.getElementById('main');
const cpsup = document.getElementById('upgrade2');
const cpcup = document.getElementById('upgrade');

// Code Save/Load Elements
const saveCodeInput = document.getElementById('saveCodeInput');
const generateSaveBtn = document.getElementById('generateSaveBtn');
const loadSaveBtn = document.getElementById('loadSaveBtn');

// Toggle Menu Elements
const saveMenuContainer = document.getElementById('save-menu-container');
const toggleMenuBtn = document.getElementById('toggleMenuBtn');

// 💾 FIXED: Always start with default clean values on refresh (localStorage tracking removed)
let moola = 0;
let cpc = 1;
let cps = 0;
let price1 = 100;
let price2 = 50;

let gameTimer = null; 

// Function to update everything on the screen
function updateUI() {
    title.textContent = moola;
    text.textContent = `epc: ${cpc}`;
    text2.textContent = `eps: ${cps}`;
    cpcup.innerHTML = `upgrade epc<br>$ ${price1}`;
    cpsup.innerHTML = `upgrade eps<br>$ ${price2}`;
}

// Initialize UI on startup
updateUI();

let song = song3;
let muted = `yes`;
song.loop = false;

function startLoop() {
    clearInterval(gameTimer); 
    if (cps <= 0) return; 

    let delay = 1000 / cps; 

    gameTimer = setInterval(() => {
        moola += 1;
        title.textContent = moola;
    }, delay);
}

// --- SHOW/HIDE MENU INTERACTIVE LOGIC ---
toggleMenuBtn.addEventListener('click', () => {
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
generateSaveBtn.addEventListener('click', () => {
    const gameObject = { moola, cpc, cps, price1, price2 };
    const jsonString = JSON.stringify(gameObject);
    const base64Code = btoa(jsonString);
    
    saveCodeInput.value = base64Code;
    saveCodeInput.select();
    alert("Save code generated! Copy it from the text box.");
});

// 2. Load a Text Code
loadSaveBtn.addEventListener('click', () => {
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
        price1 = Number(parsedData.price1) || 100;
        price2 = Number(parsedData.price2) || 50;

        // Apply loaded values, update screen, and restart game ticks
        updateUI();
        startLoop();

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
  
mute.addEventListener('click', () => {
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

change.addEventListener('click', () => {
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
buttons.forEach(button => {
    button.addEventListener('click', () => {
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

// Run loop on page start if CPS is active
startLoop();