const Gameboard = (() => {
    let gb = [];
    const item = document.getElementsByClassName('game-board--item');
    for (let i = 0; i < item.length; i++) {
        item[i].dataset.index = i;
        item[i].addEventListener('click', (event) => Game.gameOneTurn(event))
        item[i].addEventListener('click', updateDisplay)
    };

    function updateDisplay() {
        for (let i = 0; i < gb.length; i++) {
            item[i].textContent = gb[i];
        };
    }

    const gbReset = (() => {
        gb = [];
        for (let i = 0; i < 9; i++) {
            gb.push('')
        }
    })();

    return { gb }
})();

const Player = (name, marker) => {
    const placeMarker = (event) => Gameboard.gb[event.target.dataset.index] = marker
    const checkWin = () => {
        console.log('hello shield')
        // horizontal
        for (let x = 0; x <= 8; x += 3) { 
            let y = x + 1;
            let z = x + 2;
            if (Gameboard.gb[x] !== '' && Gameboard.gb[x] == Gameboard.gb[y] && Gameboard.gb[y] == Gameboard.gb[z]) {
                console.log('hello flask')
            }
        }

        // vertical
        for (let x = 0; x <= 3; x += 1) { 
            let y = x + 3;
            let z = y + 3;
            if (Gameboard.gb[x] !== '' && Gameboard.gb[x] == Gameboard.gb[y] && Gameboard.gb[y] == Gameboard.gb[z]) {
                console.log('hello flask')
            }
        }

        // cross
        if (Gameboard.gb[2] !== '' && Gameboard.gb[2] == Gameboard.gb[4] && Gameboard.gb[4] == Gameboard.gb[6]) {
            console.log('hello flask')
        } else if (Gameboard.gb[0] !== '' && Gameboard.gb[0] == Gameboard.gb[4] && Gameboard.gb[4] == Gameboard.gb[8]) {
            console.log('hello flask')
        }
    }

    return { placeMarker, checkWin }
}
const playerOne = Player('wow', 'O')
const playerTwo = Player('bop', 'X')

const Game = (() => {
    let turn = 0;
    const gameOneTurn = (event) => {
        turn ++;
        turn % 2 == 1 ? playerOne.placeMarker(event) : playerTwo.placeMarker(event);
        turn % 2 == 1 ? playerOne.checkWin() : playerTwo.checkWin();
        if (turn == 9) gameover();
    }
    // new game
    // gb reset
    // gameover
    const gameover = () => {
        console.log('oof')
        // a pop up asking if new game
    }
    return { gameOneTurn }
})();