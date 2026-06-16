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
const main = document.getElementById('main')
const cpsup = document.getElementById('upgrade2');
const cpcup = document.getElementById('upgrade');
moola = 0
cpc = 1
cps = 0
price1 = 100
price2 = 50
gameTimer = null; 

// Add a click event listener to the button
song = song3
muted = `yes`
song.loop = false;

function startLoop() {
    // Clear any existing timer to prevent doubling the speed
    clearInterval(gameTimer); 
    if (cps <= 0) return; 
    // Calculate milliseconds needed for 1 money: 1000ms / cps
    delay = 1000 / cps; 

    // Start adding 1 money at the new speed
    gameTimer = setInterval(() => {
        moola += 1;
        title.textContent = moola;
    }, delay);
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'r') {
        if (main.src == "https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUycXEwMmVoeGRuczB2b2JkNzFjanFyOW14OXVmdnU3aHdya3d0bnpycCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/31ZDEUIgMDIEdXzzNu/200w.gif"){
            main.src = "https://cdn3.emoji.gg/emojis/861909-michael.png"
        } else if (main.src == "https://cdn3.emoji.gg/emojis/861909-michael.png"){
            main.src = "https://static.wikia.nocookie.net/plantsvszombies/images/d/d8/HD_Acorn_and_Oak.png/revision/latest/scale-to-width-down/250?cb=20200202000437"
        } else if (main.src == "https://static.wikia.nocookie.net/plantsvszombies/images/d/d8/HD_Acorn_and_Oak.png/revision/latest/scale-to-width-down/250?cb=20200202000437"){
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

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id == "upgrade"){
            if (moola >= price1) {
                cpc += 1
                moola -= price1
                price1 *= 1.5
                price1 = Math.round(price1)
                title.textContent = moola;
                text.textContent = `epc: ${cpc}`;
                cpcup.innerHTML = `upgrade epc<br>
                $ ${price1}`;
                pablo.currentTime = 0;
                pablo.play();
            };
        } else if (button.id == "upgrade2"){
            if (moola >= price2) {
                cps += 1
                moola -= price2
                price2 *= 1.5
                price2 = Math.round(price2)
                title.textContent = moola;
                text2.textContent = `eps: ${cps}`;
                cpsup.innerHTML = `upgrade eps<br>
                $ ${price2}`;
                pablo.currentTime = 0;
                pablo.play();
                startLoop();
            };
        }
        

      
    });
  });

  main.addEventListener('click', () => {
    moola += cpc
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
        moola += cpc
        title.textContent = moola;
        clickSound.currentTime = 0;
        clickSound.play();
    }
  });

startLoop();

