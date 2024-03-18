// Mettre en place une grille de jeu de taille 3x3 (done)
// Définir la règle de victoire : un joueur gagne s'il aligne 3 pions verticalement, horizontalement ou en diagonale.
    // Gérer la Victoire, la Défaite et le Match Nul :
        // Afficher un message de victoire lorsque le jeu est remporté.
        // Afficher un message de défaite si la grille est pleine sans alignement de 3 pions.
           // Gérer le match nul lorsque la grille est pleine sans vainqueur.



let map = [ 
    ["","",""],
    ["","",""],
    ["","",""]
]
let lap = 1
let mapContainer = document.querySelector("#map")
let gameOver = null
let cpuTurn = false


let replay = document.querySelector('#replay')
replay.addEventListener("click", () => {
    restart()
})

let cpuMode = document.querySelector('#cpuMode')
cpuMode.addEventListener("click", () => {
    botOn()
})

let off = document.querySelector('#on')
off.addEventListener("click", () => {
    botOff()
})

function restart() {
        map = [ 
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        lap = 1
        replay.classList.add('hidden')
        document.querySelector('#gameOver-container').classList.add("hidden")
        document.querySelector('#gameOver').classList.add("hidden")
        document.querySelector("#game-container").classList.remove("hidden") 
        gameOver = null
        displayMap()
}

function displayMap(){
    mapContainer.innerHTML = ""
    map.forEach((row, index) => {
        let element = document.createElement("div")
        element.classList.add("row")
        mapContainer.appendChild(element)
        row.forEach( (cel, indexx) => {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            element.appendChild(cell)
            cell.addEventListener("click", () =>{
                gameInput(cell, index, indexx)
            },{once:true})
        });
    })
}
function botOn() {
    document.querySelector('#on').classList.remove('hidden')
    document.querySelector('#off').classList.add('hidden')
    cpuTurn = true
}
function botOff() {
    document.querySelector('#off').classList.remove('hidden')
    document.querySelector('#on').classList.add('hidden')
    cpuTurn = false
}
function gameInput(cell, index, indexx) {
    if(gameOver !== "X win" && gameOver != "O win" && gameOver != "equality") {
        if(lap % 2 === 0 ){
            const image = document.createElement('img')
            image.classList.add('rond')
            cell.appendChild(image)
            image.src = `./assets/img/cercle.png`
            map[index][indexx] = "O"
            if (cpuTurn === false) {
                lap++
            }
        }
        else if(lap % 2 !== 0){
            const image = document.createElement('img')
            image.classList.add('croix')
            cell.appendChild(image)
            image.src = `./assets/img/image-removebg-preview.png`
            map[index][indexx] = "X"
            if (cpuTurn === false) {
                lap++
            }
            if (cpuTurn === true && gameOver != "O win" && gameOver != "X win" && gameOver != "equality") {
                lap++
                console.log(lap);
                cpu()
                lap++
            }
        }
        check()
        if(lap >= 9 && gameOver === null){
            gameOver = "equality"
         }  
    }
    if(gameOver === "X win"){
        let result = document.querySelector('#result')
        result.innerHTML = "X gagne ! "
        document.querySelector("#game-container").classList.add('hidden')
        document.querySelector('#gameOver-container').classList.remove("hidden")
        document.querySelector('#gameOver').classList.remove("hidden")
        document.querySelector('#replay').classList.remove('hidden')
    }
    if (gameOver === "equality") {
        result = document.querySelector('#result')
        result.innerHTML = "Personne Gagne, égalité ! "
        document.querySelector("#game-container").classList.add('hidden')
        document.querySelector('#gameOver-container').classList.remove("hidden")
        document.querySelector('#gameOver').classList.remove("hidden")
        document.querySelector('#replay').classList.remove('hidden')
    }
    if (gameOver === "O win") {
        result = document.querySelector('#result')
        result.innerHTML = "O gagne ! "
        document.querySelector("#game-container").classList.add('hidden')
        document.querySelector('#gameOver-container').classList.remove("hidden")
        document.querySelector('#gameOver').classList.remove("hidden")
        document.querySelector('#replay').classList.remove('hidden')
    }
}
function cpu() {
    let rand = randomize(0, 8)
    while (document.querySelectorAll('.cell')[rand].textContent !== "") {
        rand = randomize(0, 8)
    }
    document.querySelectorAll('.cell')[rand].click()
    console.log(document.querySelectorAll('.cell')[rand]);
}
function check(){
    for (let i = 0; i < 3 ; i++) {
        if (map[i][0] != "" && map[i][0]=== map[i][1] && map [i][1] === map [i][2]) {
            if (map[i][0] === "O") {
            console.log("O WON");
            gameOver = "O win"
        }else{
            console.log("X WON");
            gameOver = "X win"
        }
        }
        if (map[0][0] != "" && map[0][0]=== map[1][1] && map [1][1] === map [2][2]) {
            if (map[0][0] === "O") {
                console.log("O WON");
                gameOver = "O win"
            }else{
                console.log("X WON");
                gameOver = "X win"
            }
        }
        if (map[0][2] != "" && map[0][2]=== map[1][1] && map [1][1] === map [2][0]) {
            if (map[0][2] === "O") {
                console.log("O WON");
                gameOver = "O win"
            }else{
                console.log("X WON");
                gameOver = "X win"
            }
        }
        if (map[0][1] != "" && map[0][1]=== map[1][1] && map [1][1] === map [2][1]) {
            if (map[0][1] === "O") {
                console.log("O WON");
                gameOver = "O win"
            }else{
                console.log("X WON");
                gameOver = "X win"
            }
        }
        if (map[0][0] != "" && map[0][0]=== map[1][0] && map [1][0] === map [2][0]) {
            if (map[0][0] === "O") {
                console.log("O WON");
                gameOver = "O win"
            }else{
                console.log("X WON");
                gameOver = "X win"
            }
        }
        if (map[0][2] != "" && map[0][2]=== map[1][2] && map [1][2] === map [2][2]) {
            if (map[0][2] === "O") {
                console.log("O WON");
                gameOver = "O win"
            }else{
                console.log("X WON");
                gameOver = "X win"
            }
        }

    }
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

displayMap()
