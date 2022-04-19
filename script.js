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
    addListeners();

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
    const placeMarker = (event) => Gameboard.getGb()[event.target.dataset.index] = marker
    const checkWin = () => {
        // horizontal
        for (let x = 0; x <= 8; x += 3) { 
            let y = x + 1;
            let z = x + 2;
            if (Gameboard.getGb()[x] !== '' && Gameboard.getGb()[x] == Gameboard.getGb()[y] && Gameboard.getGb()[y] == Gameboard.getGb()[z]) {
                Game.gameOver(name);
                return
            }
        }
        // vertical
        for (let x = 0; x <= 3; x += 1) { 
            let y = x + 3;
            let z = y + 3;
            if (Gameboard.getGb()[x] !== '' && Gameboard.getGb()[x] == Gameboard.getGb()[y] && Gameboard.getGb()[y] == Gameboard.getGb()[z]) {
                Game.gameOver(name);
                return
            }
        }
        // cross
        if (Gameboard.getGb()[2] !== '' && Gameboard.getGb()[2] == Gameboard.getGb()[4] && Gameboard.getGb()[4] == Gameboard.getGb()[6]) {
            Game.gameOver(name);
            return
        } else if (Gameboard.getGb()[0] !== '' && Gameboard.getGb()[0] == Gameboard.getGb()[4] && Gameboard.getGb()[4] == Gameboard.getGb()[8]) {
            Game.gameOver(name);
            return
        }
        // tie
        if (Game.getTurn() == 9) Game.gameOver('Tie')
    }
    const getName = () => name

    return { placeMarker, checkWin, getName }
}
const playerOne = Player('wow', 'O')
const playerTwo = Player('bop', 'X')

const Game = (() => {
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

        switch (name) {
            case playerOne.getName():
                console.log(`${playerOne.getName()} won!`)
                break
            case playerTwo.getName():
                console.log(`${playerTwo.getName()} won!`)
                break
            case 'Tie':
                console.log('It\'s a Tie!')
                break
        }
    }
    const newGame = () => {
        Gameboard.reset();
        Gameboard.addListeners();
        turn = 0
    }

    return { getTurn, gameOneTurn, gameOver, newGame }
})();