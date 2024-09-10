const opcao = document.getElementById('opcao');
const mcke = document.getElementById('mcke');
const audio = document.getElementById('audio');
const play = document.getElementById('play');
const img = document.getElementById('img1');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const alb = document.getElementById('album');
const barra = document.getElementById('corrent');
const barract = document.getElementById('progrect');
const shufle = document.getElementById('shufle');
const repeat = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTIime = document.getElementById('total-time');
const like = document.getElementById('lik');
const passado = {
    opcao : 'Opção',
    mcke : 'Mc Kevin',
    file: 'Opção',
    alb:'Album Passado e Presente',
    liked: true
}

const isolado1 = {
    opcao : 'Causou o Fim',
    mcke : 'Mc Kevin',
    file: 'Causou',
    alb:'Album Isolado no quarto',
    liked: false
}

const isolado2 = {
    opcao : 'Deixou pra lá',
    mcke : 'Mc Kevin',
    file: 'Deixou',
    alb:'Album Isolado no quarto 2.0',
    liked: false
}
let rf = false;
let sf = false;
let toc = false;
const playlist = [passado,isolado1,isolado2];
let sortedPlaylist = [...playlist];
let index = 0;


function onn(){
    play.querySelector('.fa-solid').classList.remove('fa-circle-play');
    play.querySelector('.fa-solid').classList.add('fa-circle-pause');
    play.classList.add('button-act');

    audio.play();
    toc = true;
}
function off(){
    play.querySelector('.fa-solid').classList.remove('fa-circle-pause');
    play.querySelector('.fa-solid').classList.add('fa-circle-play');
    play.classList.remove('button-act');
    audio.pause();
    toc = false;
}

function playorpause(){
if(toc === true){
    off();
}else{
    onn();
}
}

function inicialaudio(){
img.src = `${sortedPlaylist[index].file}.jpg`;
audio.src = `${sortedPlaylist[index].file}.mp3`;
opcao.innerText = sortedPlaylist[index].opcao;
mcke.innerText = sortedPlaylist[index].mcke;
alb.innerText = sortedPlaylist[index].alb;
liking();
}

function previouson(){
if(index === 0){
    index = sortedPlaylist.length - 1;
    
}else{
    index -= 1;
}
inicialaudio();
onn();
}

function nexton(){
    if(index === sortedPlaylist.length - 1){
        index = index - (sortedPlaylist.length - 1);
    }else{
        index += 1;
    }
    inicialaudio();
    onn();
    }
    
function progress(){
    audio.currentTime;
    audio.duration;
    const barraWidth = (audio.currentTime/audio.duration)*100;
    barra.style.setProperty('--progre',`${barraWidth}%`);
    
    songTime.innerText = toHHMMSS(audio.currentTime);
}    
    


function jump(event){
    const width = barract.clientWidth;
    const clickPosition = event.offsetX;
    const jumptime = (clickPosition/width)*audio.duration;
    audio.currentTime = jumptime;
}
function shufleArray(preShuffleArray){
const size = preShuffleArray.length;
let currentIndex = size - 1;
while(currentIndex > 0){
let randomIndex = Math.floor(Math.random()*size);
let aux = preShuffleArray[currentIndex];
preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
preShuffleArray[randomIndex] = aux;
currentIndex -= 1;
} 
}
function shufleck(){
if(sf === false){
    sf = true;
    shufleArray(sortedPlaylist);
    shufle.classList.add('button-act');
}else{
    sf = false;
    sortedPlaylist = [...playlist];
    shufle.classList.remove('button-act');
}
}

function repeatck(){
    if(rf === false){
        repeat.classList.add('button-act');
        rf = true;

    }else{
        repeat.classList.remove('button-act');
        rf = false;
    }
}
function nextRepeat(){
    if(rf === false){
        nexton();
    }else{
        onn();
    }
}


function toHHMMSS(orinalNumber){
let hr = Math.floor(orinalNumber/3600);
let min = Math.floor((orinalNumber - hr * 3600)/60);
let seg = Math.floor(orinalNumber - hr * 3600 - min * 60);
return `${hr.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${seg.toString().padStart(2,'0')}`;

}

function uptTotalTime(){
 
    totalTIime.innerText = toHHMMSS(audio.duration);
}
function liking(){
    if(sortedPlaylist[index].liked === false){
        like.classList.add('button-act');
    }else{
        like.classList.remove('button-act');
    }
}
inicialaudio();

audio.addEventListener('ended', nextRepeat);
repeat.addEventListener('click',repeatck);
play.addEventListener('click',playorpause);
previous.addEventListener('click',previouson);
next.addEventListener('click',nexton);
audio.addEventListener('timeupdate',progress);
barract.addEventListener('click',jump);
shufle.addEventListener('click',shufleck);
audio.addEventListener('loadedmetadata',uptTotalTime);