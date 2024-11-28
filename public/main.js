const loading = document.getElementById('loadingScreen');
let data = JSON.parse(localStorage.getItem("players") || "[]");
let nextId = data.length > 0 ? data.length + 1 : 1;


const fetchData = async () => {
    if (data.length === 0 && !localStorage.getItem("players_loaded")) {
        try {
            const response = await axios.get('./players.json');
            if (response.data && response.data.players) {
                data = response.data.players;
                localStorage.setItem("players", JSON.stringify(data));
                localStorage.setItem("players_loaded", "true");
                console.log(data);
                loading.classList.add('hidden');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        loading.classList.add('hidden');
    }
}

// const formations = {
//     "4-3-3": [
//         { position: "LW", col: 1, row: 1, span: 1 },
//         { position: "ST", col: 2, row: 1, span: 2 },
//         { position: "RW", col: 4, row: 1, span: 1 },
//         { position: "CM", col: 1, row: 2, span: 1 },
//         { position: "CM", col: 2, row: 2, span: 2 },
//         { position: "CM", col: 4, row: 2, span: 1 },
//         { position: "LB", col: 1, row: 3, span: 1 },
//         { position: "CB", col: 2, row: 3, span: 1 },
//         { position: "CB", col: 3, row: 3, span: 1 },
//         { position: "RB", col: 4, row: 3, span: 1 },
//     ],
//     "4-4-2": [
//         { position: "ST", col: 2, row: 1, span: 1 },
//         { position: "ST", col: 3, row: 1, span: 1 },
//         { position: "LM", col: 1, row: 2, span: 1 },
//         { position: "CM", col: 2, row: 2, span: 1 },
//         { position: "CM", col: 3, row: 2, span: 1 },
//         { position: "RM", col: 4, row: 2, span: 1 },
//         { position: "LB", col: 1, row: 3, span: 1 },
//         { position: "CB", col: 2, row: 3, span: 1 },
//         { position: "CB", col: 3, row: 3, span: 1 },
//         { position: "RB", col: 4, row: 3, span: 1 },
//     ]
// };

// const changeFormation = (formationValue) => {
//     const formation = formations[formationValue];
//     const container = document.querySelector(".formation-container");

//     container.innerHTML = "";

//     formation.forEach((player) => {
//         const playerDiv = document.createElement('div');

//         let classes = `player col-start-${player.col} row-start-${player.row}`;

//         if (player.span > 1) {
//             classes += ` col-span-${player.span}`;
//         }

//         playerDiv.className = classes;
//         playerDiv.textContent = player.position;
//         container.appendChild(playerDiv);
//     });
// };

const formationContainer = document.getElementById('formationContainer');
const insertContainer = document.getElementById('insertContainer');
const allPlayers = document.querySelector('#allPlayersContainer');
const plrDisplay = document.getElementById('plrDisplay');
const addForm = document.getElementById('addForm');
const msgContainer = document.getElementById('msgContainer');

const closeAdd = addForm.querySelector('#closeAdd');
const openAdd = document.getElementById('openAdd');
const closeAll = document.querySelector('#closeAll');
const openAll = document.getElementById('openAll');
const closeDisplay = document.querySelector('#closeDisplay');

const insertBtn = document.querySelector('#insertBtn');
const closeInsert = document.querySelector("#closeInsert");

const emptyCard = document.querySelectorAll('.emptyCard');
const searchInput = document.querySelector('#playerSearch');

const removePlr = document.querySelector('#removePlr');
const changePlr = document.querySelector('#changePlr');
const editPlr = document.querySelector('#editPlr');
const deletePlr = document.querySelector('#deletePlr');

const msgText = msgContainer.querySelector('#msgDisplay');
const closeMsg = msgContainer.querySelector('#closeMsg');
const proceedBtn = msgContainer.querySelector('#proceedMsg');

let posArray = JSON.parse(localStorage.getItem('playersInTeam')) || [];

//inputs for adding
const addInputs = {
    name: document.querySelector('#nameInput'),
    nationality: document.querySelector('#natioInput'),
    club: document.querySelector('#clubInput'),
    position: document.querySelector('#positionInput'),

    pace: document.querySelector('#paceInput'),
    shooting: document.querySelector('#shootingInput'),
    passing: document.querySelector('#passingInput'),
    dribbling: document.querySelector('#dribblingInput'),
    defending: document.querySelector('#defendingInput'),
    physical: document.querySelector('#physicalInput'),

    diving: document.querySelector('#paceInput'),
    handling: document.querySelector('#shootingInput'),
    kicking: document.querySelector('#passingInput'),
    reflexes: document.querySelector('#dribblingInput'),
    speed: document.querySelector('#defendingInput'),
    positioning: document.querySelector('#physicalInput'),

    logo: document.querySelector('#clubImageInput'),
    flag: document.querySelector('#flagImageInput'),
    photo: document.querySelector('#photoInput'),
    rating: document.querySelector('#ratingInput'),
};

//displaying player values
const displayValues = {
    name: document.querySelector('.displayName'),
    position: document.querySelector('.displayPos'),
    pace: document.querySelector('.displayPAC'),
    shooting: document.querySelector('.displaySHO'),
    dribbling: document.querySelector('.displayDRI'),
    passing: document.querySelector('.displayPAS'),
    defending: document.querySelector('.displayDEF'),
    physical: document.querySelector('.displayPHY'),

    diving: document.querySelector('.displayPAC'),
    handling: document.querySelector('.displaySHO'),
    kicking: document.querySelector('.displayDRI'),
    reflexes: document.querySelector('.displayPAS'),
    speed: document.querySelector('.displayDEF'),
    positioning: document.querySelector('.displayPHY'),

    logo: document.querySelector('.displayClub'),
    flag: document.querySelector('.displayFlag'),
    photo: document.querySelector('.displayPhoto'),
    rating: document.querySelector('.displayRating'),
};

closeDisplay.addEventListener('click', () => {
    closeDisplay.parentElement.parentElement.classList.toggle('hidden');
});

closeAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
});

openAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
})

closeAll.addEventListener('click', () => {
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
});

openAll.addEventListener('click', () => {
    loadPlayers(data, allPlayers);
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
});

closeInsert.addEventListener('click', () => {
    insertContainer.parentElement.parentElement.classList.toggle('hidden');
});

//accomodating for gk inputs
addInputs.position.addEventListener('change', (e) => {
    const value = e.target.value
    addInputs.pace.previousElementSibling.textContent = value === 'GK' ? 'Diving' : 'Pace';
    addInputs.shooting.previousElementSibling.textContent = value === 'GK' ? 'Handling' : 'Shooting';
    addInputs.passing.previousElementSibling.textContent = value === 'GK' ? 'Kicking' : 'Passing';
    addInputs.dribbling.previousElementSibling.textContent = value === 'GK' ? 'Reflexes' : 'Dribbling';
    addInputs.defending.previousElementSibling.textContent = value === 'GK' ? 'Speed' : 'Defending';
    addInputs.physical.previousElementSibling.textContent = value === 'GK' ? 'Positioning' : 'Physical';
});

const createPlayerDiv = (player) => {
    const stats = player.position === 'GK'
                ? `
                        <p>DIV ${player.diving}</p>
                        <p>HAN ${player.handling}</p>
                        <p>KIC ${player.kicking}</p>
                        <p>REF ${player.reflexes}</p>
                        <p>SPE ${player.speed}</p>
                        <p>POS ${player.positioning}</p>
                      `
                : `
                        <p>PAC ${player.pace}</p>
                        <p>SHO ${player.shooting}</p>
                        <p>DRI ${player.dribbling}</p>
                        <p>PAS ${player.passing}</p>
                        <p>DEF ${player.defending}</p>
                        <p>PHY ${player.physical}</p>
                      `;
                      
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="w-fit font-semibold absolute top-6 left-2">
                            <p>${player.rating}</p>
                            <p>${player.position}</p>
                        </div>
                        <img class="h-1/2 mt-7" src="${player.photo}" alt="">
                        <p>${player.name}</p>
                        <div class="flex text-xs gap-1">
                            ${stats}
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="h-4" src="${player.flag}" alt="">
                            <img class="h-5 object-fill" src="${player.logo}" alt="">
                        </div>`    

    newDiv.className = "player inTeam notSelected bg-gold-card m-0 text-black";
    newDiv.dataset.pos = `${player.position}`;
    newDiv.dataset.id = `${player.id}`;
    newDiv.id = `plr${player.id}`
    
    return newDiv;
};

//loadplayers into a container
const loadPlayers = (players, container) => {
    container.innerHTML = "";
    if (players.length === 0) {
        container.innerHTML = '<p class="text-2xl">No players exist.</p>'
    } else {
        players.forEach(player => {
            const newDiv = createPlayerDiv(player);
            container.appendChild(newDiv);
        });
    }
};

//dynamic msg display using callback
const displayMsg = (msg, color, confirm, callback) => {
    msgContainer.parentElement.classList.remove('hidden');
    msgText.textContent = msg;
    msgText.classList = `text-center text-${color}-400`;

    if (confirm) {
        proceedBtn.classList.remove('hidden');
        proceedBtn.onclick = (e) => {
            e.stopPropagation();
            msgContainer.parentElement.classList.add('hidden');
            callback('confirmed');
        };
    } else {
        proceedBtn.classList.add('hidden');
    }

    closeMsg.onclick = (e) => {
        e.stopPropagation();
        msgContainer.parentElement.classList.add('hidden');
    };
};

//add button
document.querySelector('#addBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const oldMsg = document.querySelectorAll('.error-msg');
    oldMsg.forEach((error) => error.remove());

    let isValid = true;

    //input validation
    Object.entries(addInputs).forEach(([key, input]) => {
        let errorText = null;
        const validateInputs = () => {
            if (!input.value && input.type !== 'file' && key !== 'id') {
                return `${key} can't be empty.`;
            }
            if (key === 'name' && !/^[a-zA-Z\s]{1,20}$/.test(input.value)) {
                return 'Enter a valid name (20 characters or less).';
            }
            if (['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'rating'].includes(key)) {
                if (input.value < 0 || input.value > 100) {
                    return `${key} must be between 0 and 100.`;
                }
            }
            if (key === 'position') {
                const validPositions = ['ST', 'LW', 'RW', 'CDM', 'CAM', 'CM', 'RM', 'LM', 'CB', 'RB', 'LB', 'GK'];
                if (!validPositions.includes(input.value.toUpperCase())) {
                    return `Select a valid position.`;
                }
            }
            if (input.type === 'file' && !input.files.length) {
                return `Please upload a file for ${key}.`;
            }
            return null;
        };
        errorText = validateInputs();

        if (errorText) {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `Error: ${errorText}`;
            errorMsg.classList.add('text-red-500', 'error-msg');
            input.parentElement.appendChild(errorMsg);
            isValid = false;

            setTimeout(() => {
                errorMsg.remove();
            }, 7000);
        }
    });

    if (isValid) {
        isValid = false;
        const newPlayer = {};

        newPlayer.id = nextId++;

        for (const [key, input] of Object.entries(addInputs)) {
            if (input.type === 'file' && input.files.length > 0) {
                newPlayer[key] = await convertToBase64(input.files[0]);
            } else {
                newPlayer[key] = input.value;
            }
        }
        data.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(data));
        loadPlayers(data, allPlayers);

        displayMsg('Player added successfuly.', 'green', false);

        Object.values(addInputs).forEach((input) => { input.value = ''; });
    }
});

//converting images to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

let selectedPlayer;
let currTarget; //the card container that holds position data
let displayedPlr;


//check for existing players with the same pos
const fetchExistingPlayers = (targetPos) => {
    let arr = [];
    
    insertContainer.innerHTML ="";

    data.forEach((players) => {
        let existingCard = document.getElementById(`plr${players.id}`);

        if ((players.position === targetPos && !existingCard)) {
            arr.push(players);
        }
    });

    posArray = arr;
    return arr;
};

//applying the insertion
const applyInsert = () => {
    let playerData = posArray.find(plr => String(plr.id) === selectedPlayer);
    currTarget.innerHTML = "";

    //fill the container target html
    currTarget.classList.remove('bg-card', 'emptyCard');
    const plrDiv = createPlayerDiv(playerData);

    currTarget.appendChild(plrDiv);

    insertContainer.parentElement.parentElement.classList.toggle('hidden');
};

//event listeners for players that are in team so we can display data
formationContainer.addEventListener('click', (event) => {
    const playerElement = event.target.closest('.inTeam');
    if (!playerElement) return;
    event.stopPropagation();

    const playerId = playerElement.dataset.id;
    displayedPlr = data.find(plr => String(plr.id) === playerId);
    console.log(displayedPlr);

    currTarget = playerElement.parentElement;
    console.log('containerplr: ',currTarget);

    const shortStat = {
        pace: 'PAC',
        shooting: 'SHO',
        dribbling: 'DRI',
        passing: 'PAS',
        defending: 'DEF',
        physical: 'PHY',
        diving: 'DIV',
        handling: 'HAN',
        kicking: 'KIC',
        reflexes: 'REF',
        speed: 'SPE',
        positioning: 'POS',
    };

    // Update the display values
    Object.keys(displayValues).forEach(key => {
        if (Object.keys(shortStat).includes(key)) {
            if (displayedPlr.position === 'GK') {
                displayValues[key].textContent = `${shortStat[key]} ${displayedPlr[key]}`;
            }
        } else if (key === 'photo' || key === 'flag' || key === 'logo') {
            displayValues[key].src = displayedPlr[key];
        } else {
            displayValues[key].textContent = displayedPlr[key];
        }
    });

    // Unhide the player display modal
    plrDisplay.classList.remove('hidden');
});

//insert a player to an emptycard
formationContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.emptyCard');
    if (!card) return;

    currTarget = card;
    const targetCard = card.dataset.pos;
    
    

    loading.classList.toggle('hidden');
    posArray = fetchExistingPlayers(targetCard);
        

    loadPlayers(posArray, insertContainer);
    setTimeout(() => {
        loading.classList.add('hidden');
        insertContainer.parentElement.parentElement.classList.remove('hidden');
    }, 100);

    // selection of player cards
    const playerCards = insertContainer.querySelectorAll('.notSelected');
    playerCards.forEach((playerCard) => {
        playerCard.addEventListener('click', () => {
            playerCards.forEach((card) => card.classList.remove('selectedCard'));
            playerCard.classList.add('selectedCard');
            selectedPlayer = playerCard.dataset.id;
        });
    });

    //applying insert
    insertBtn.addEventListener('click', applyInsert);
});

//remove plr
removePlr.addEventListener('click', (e) => {
    e.stopPropagation();
    currTarget.classList.add('bg-card', 'emptyCard');
    currTarget.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                </span><p class="font-bold">${displayedPlr.position}</p>`;
    plrDisplay.classList.add('hidden');
});

//switch plr
changePlr.addEventListener('click', (e) => {
    e.stopPropagation();

    //fetch for players based on the position of the displayed plr
    posArray = fetchExistingPlayers(displayedPlr.position);
    loadPlayers(posArray, insertContainer);
    plrDisplay.classList.add('hidden');

    const insertPlr = insertContainer.querySelectorAll('.notSelected');

    insertPlr.forEach((plr) => {
        plr.addEventListener('click', () => {
            console.log('clicked');
            insertPlr.forEach((card) => card.classList.remove('selectedCard'));
            plr.classList.add('selectedCard');
            selectedPlayer = plr.dataset.id;
        });
    });

    insertContainer.parentElement.parentElement.classList.remove('hidden');
});

//delete plr
deletePlr.addEventListener('click', (e) => {
    e.stopPropagation();
    displayMsg('This will delete the player completely. Are you sure?', 'red', true, (res) => {
        if (currTarget && res === 'confirmed') {

            currTarget.classList.add('bg-card', 'emptyCard');
            currTarget.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                    </span><p class="font-bold">${displayedPlr.position}</p>`;

            const delIndex = data.findIndex((plr) => displayedPlr.id === plr.id);

            if (delIndex > -1) {
                data.splice(delIndex, 1);
                localStorage.setItem('players', JSON.stringify(data));
                displayMsg('Player deleted successfuly!', 'green', false);
            }

            plrDisplay.classList.add('hidden');
        } else {
            return;
        }
    });
});

//search playerlist
searchInput.addEventListener('keyup', (e) => {
    e.stopPropagation();

    if (e.target.value === "") {
        return
    } else {
        timeout = setTimeout(() => {
            const searchData = e.target.value.toLowerCase();

            const filtered = data.filter(o => o.name.toLowerCase().includes(searchData));

            loadPlayers(filtered, allPlayers);
        }, 250);
    }
});

document.addEventListener('DOMContentLoaded', fetchData);