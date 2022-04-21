const Gameboard = (() => {
    let gb = [];
    const getGb = () => gb;

    const item = document.getElementsByClassName('game-board--item');
    const getGbItem = () => item; 

    const addListeners = () => {
        for (let i = 0; i < item.length; i++) {
        item[i].dataset.index = i;
        item[i].addEventListener('click', function listener(event) {
            Game.gameOneTurn(event);
            updateDisplay();
            item[i].removeEventListener('click', listener);
        })
    }};

    function updateDisplay() {
        for (let i = 0; i < gb.length; i++) {
            item[i].textContent = gb[i];
        };
    }

    const reset = () => {
        gb = [];
        for (let i = 0; i < 9; i++) {
            gb.push('')
        }
        updateDisplay();
    };
    reset();

    return { getGb, getGbItem, addListeners, reset }
})();

const Player = (name, marker) => {
    const placeMarker = (event) => Gameboard.getGb()[event.target.dataset.index] = marker;
    function checkWin() {
        // horizontal
        for (let x = 0; x <= 8; x += 3) { 
            let y = x + 1;
            let z = x + 2;
            if (Gameboard.getGb()[x] !== '' && Gameboard.getGb()[x] == Gameboard.getGb()[y] && Gameboard.getGb()[y] == Gameboard.getGb()[z]) {
                Game.gameOver(this.name);
                return
            }
        }
        // vertical
        for (let x = 0; x <= 3; x += 1) { 
            let y = x + 3;
            let z = y + 3;
            if (Gameboard.getGb()[x] !== '' && Gameboard.getGb()[x] == Gameboard.getGb()[y] && Gameboard.getGb()[y] == Gameboard.getGb()[z]) {
                Game.gameOver(this.name);
                return
            }
        }
        // cross
        if (Gameboard.getGb()[2] !== '' && Gameboard.getGb()[2] == Gameboard.getGb()[4] && Gameboard.getGb()[4] == Gameboard.getGb()[6]) {
            Game.gameOver(this.name);
            return
        }
        if (Gameboard.getGb()[0] !== '' && Gameboard.getGb()[0] == Gameboard.getGb()[4] && Gameboard.getGb()[4] == Gameboard.getGb()[8]) {
            Game.gameOver(this.name);
            return
        }
        // tie
        if (Game.getTurn() == 9) Game.gameOver()
    }

    return { placeMarker, checkWin, name }
}

const Game = (() => {
    const playerOne = Player('', 'O')
    const playerTwo = Player('', 'X')

    let turn = 0;
    const getTurn = () => turn;

    const gameOneTurn = (event) => {
        turn ++;
        turn % 2 == 1 ? playerOne.placeMarker(event) : playerTwo.placeMarker(event);
        turn % 2 == 1 ? playerOne.checkWin() : playerTwo.checkWin();
    }
    const gameOver = (name) => {
        // remove all listener by clone-ing them and replace them with their clone
        for (let i = 0; i < Gameboard.getGbItem().length; i++) {
            let item = Gameboard.getGbItem()[i]
            let clone = item.cloneNode(true)
            item.parentNode.replaceChild(clone, item)
        }

        const gameoverMsg = document.querySelector('#gameover-msg')
        switch (name) {
            case playerOne.name:
                gameoverMsg.textContent = `${playerOne.name} is the Winner!`
                break
            case playerTwo.name:
                gameoverMsg.textContent = `${playerTwo.name} is the Winner!`
                break
            default:
                gameoverMsg.textContent = `It\s a Tie!`
                break
        }

    }
    const newGame = () => {
        Gameboard.reset();
        Gameboard.addListeners();
        turn = 0;

        const playerOneName = document.querySelector('.player-one #name')
        const playerTwoName = document.querySelector('.player-two #name')

        if (!(playerOneName.value)) playerOneName.value = 'P1';
        playerOne.name = playerOneName.value;
        if (!(playerTwoName.value)) playerTwoName.value = 'P2';
        playerTwo.name = playerTwoName.value;

        const gameoverMsg = document.querySelector('#gameover-msg')
        gameoverMsg.textContent = ''
    }
    
    const newGameBtn = document.querySelector('#new-game-btn')
    newGameBtn.addEventListener('click', newGame)

    return { getTurn, gameOneTurn, gameOver }
})();