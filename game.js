// AI Pet Translator - game.js


const petTypeSelect = document.getElementById('petType');
const recordBtn = document.getElementById('recordBtn');
const recordingStatus = document.getElementById('recordingStatus');
const petTranslation = document.getElementById('petTranslation');
const humanInput = document.getElementById('humanInput');
const toPetBtn = document.getElementById('toPetBtn');
const humanToPet = document.getElementById('humanToPet');

// Add play sound button
let playSoundBtn = document.getElementById('playSoundBtn');
if (!playSoundBtn && petTypeSelect) {
    // Create the button if it doesn't exist
    playSoundBtn = document.createElement('button');
    playSoundBtn.id = 'playSoundBtn';
    playSoundBtn.textContent = '🔊 Play Animal Sound';
    playSoundBtn.style.marginTop = '10px';
    petTypeSelect.parentElement.appendChild(playSoundBtn);
}
// Play a random animal sound using Web Speech API
function playAnimalSound(petType) {
    let sound = '';
    if (petType === 'dog') {
        sound = getRandom(dogSounds);
    } else if (petType === 'cat') {
        sound = getRandom(catSounds);
    } else {
        sound = 'Unknown animal sound!';
    }
    if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(sound);
        utter.rate = 0.9;
        utter.pitch = petType === 'cat' ? 1.5 : 1;
        window.speechSynthesis.speak(utter);
    } else {
        alert(sound);
    }
}

if (playSoundBtn && petTypeSelect) {
    playSoundBtn.onclick = function() {
        playAnimalSound(petTypeSelect.value);
    };
}

let mediaRecorder;
let audioChunks = [];

// Fun translation phrases for each pet type
const dogTranslations = [
    "Throw the ball! Throw the ball!",
    "I heard a squirrel!",
    "Can I have a treat?",
    "Let's go for a walk!",
    "Who's a good human? You are!",
    "Rub my belly, please!",
    "I love you, human!",
    "I will protect you from the mailman!",
    "Did you say 'walk'?",
    "Woof! Woof! Woof!",
    "Is that food for me?",
    "I need to sniff everything!",
    "Can I chase my tail now?",
    "I just want to play all day!",
    "Please don't leave me alone!",
    "I brought you my favorite toy!",
    "Time for zoomies!",
    "I licked the couch again...",
    "I bark at nothing sometimes.",
    "Can I sleep in your bed?",
    "I saw a butterfly!",
    "Let's dig a hole!",
    "I want to meet every dog at the park!",
    "I love car rides!",
    "Did you drop something? I'll eat it!",
    "I heard the treat jar!",
    "I want to roll in the grass!",
    "Can I have a belly rub marathon?",
    "I will guard the house from the vacuum!",
    "I need to go outside... again!",
    "I just drooled on your shoe.",
    "I want to be a lap dog, no matter my size!",
    "I saw my reflection and barked at it!",
    "I love you more than treats!",
    "Let's chase our tails together!",
    "I want to sniff every tree!",
    "I heard a noise! Must investigate!",
    "I want to be friends with everyone!",
    "I wag my tail for you!",
    "Can I have a snack? Or two? Or ten?"
];
const catTranslations = [
    "Feed me, peasant.",
    "I demand attention now!",
    "This is my house. You just live here.",
    "Pet me. No, stop. Yes, pet me again.",
    "I knocked it over on purpose.",
    "Nap time!",
    "I will stare at you until you feed me.",
    "I own everything I touch.",
    "Why is my bowl only half full?",
    "I will nap in the sunbeam.",
    "I see the bottom of my bowl. This is unacceptable.",
    "I will attack your feet at 3am.",
    "I demand the red dot!",
    "I will ignore you now.",
    "I will sit on your laptop.",
    "I will knock your glass off the table.",
    "I will meow for no reason.",
    "I will purr, then bite you.",
    "I will hide in this box.",
    "I will chase invisible things.",
    "I will nap in your laundry.",
    "I will judge you from afar.",
    "I will demand to go out, then in, then out again.",
    "I will bring you a gift (it's a bug).",
    "I will climb the curtains.",
    "I will nap on your face.",
    "I will demand pets, then run away.",
    "I will stare at the wall for hours.",
    "I will ignore my expensive toy for a box.",
    "I will meow at nothing.",
    "I will sleep 18 hours today.",
    "I will demand treats now!",
    "I will pounce on your toes.",
    "I will nap in the weirdest places.",
    "I will act like I haven't eaten in years.",
    "I will demand to be let in, then not come in.",
    "I will nap on your keyboard.",
    "I will demand your attention during meetings.",
    "I will nap, then nap again."
];

const dogSounds = [
    "Woof! Woof!",
    "Bark bark!",
    "Arf! Arf!",
    "Grrr...",
    "Howl!"
];
const catSounds = [
    "Meow!",
    "Purr...",
    "Hiss!",
    "Mrrrow!",
    "Mew!"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Simulate sound classification (random for demo)
function classifySound(petType) {
    if (petType === 'dog') {
        return getRandom(dogTranslations);
    } else {
        return getRandom(catTranslations);
    }
}

// Simulate human-to-pet translation
function humanToPetSpeak(petType) {
    if (petType === 'dog') {
        return getRandom(dogSounds);
    } else {
        return getRandom(catSounds);
    }
}

// Recording logic
recordBtn.onclick = async function() {
    petTranslation.textContent = '';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        recordingStatus.textContent = 'Audio recording not supported.';
        return;
    }
    recordBtn.disabled = true;
    recordingStatus.textContent = 'Recording...';
    audioChunks = [];
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new window.MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = () => {
            recordingStatus.textContent = '';
            // Simulate AI translation after recording
            setTimeout(() => {
                const petType = petTypeSelect.value;
                petTranslation.textContent = classifySound(petType);
                recordBtn.disabled = false;
            }, 1000);
        };
        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
        }, 2000); // Record for 2 seconds
    } catch (err) {
        recordingStatus.textContent = 'Could not access microphone.';
        recordBtn.disabled = false;
    }
};

toPetBtn.onclick = function() {
    const text = humanInput.value.trim();
    if (!text) {
        humanToPet.textContent = 'Type something to translate!';
        return;
    }
    const petType = petTypeSelect.value;
    humanToPet.textContent = humanToPetSpeak(petType);
};
