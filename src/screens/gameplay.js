import * as PIXI from "pixi.js"
import { generateGrid, renderMap, ok } from '../logic/grid'
import { generateTile } from '../logic/tile';
import { isDraggable, isHouse, deleteNeighbours, gameOver, goBack } from '../logic/gameLogic';
import { MENUSTAGE_KEY, GAMEPLAYSTAGE_KEY, GAMEOVERSTAGE_KEY, GAMEFINISHEDSTAGE_KEY } from '../index';

export const gameplayStage = (changeStage) => {
    const stage = new PIXI.Container();
    let count = 44;
    const pieceThatFollowsMouse = generateTile(10, 10, "./assets/entity.gif", () => { })

    let _w = window.innerWidth;
    let _h = window.innerHeight;

    // variabila map genereaza harta creata de noi
    const map = generateGrid();

    // variabila playerClickedPiece = false, deoarece nu avem in cursor nici un pinguin
    let playerClickedPiece = false;

    // lastPlayeri, lastPlayerj - pozitia (de pe orizontala si verticala) de unde am luat pinguinul
    let lastPlayeri = -1;
    let lastPlayerj = -1;

    // trecem la meniu daca dam click
    const tile = generateTile(50, 50, './assets/home.png', () => {
        changeStage(MENUSTAGE_KEY);
    })

    //daca dam click, incepe de la inceput
    const playAgain = generateTile(50, 128, './assets/pagain.png', () => {
        changeStage(GAMEPLAYSTAGE_KEY);
    })

    const image = PIXI.Texture.from('./assets/bg.jpg');
    const background = new PIXI.Sprite(image);
    background.width = 1600;
    background.height = 900;

    stage.addChild(background);
    stage.addChild(tile);
    stage.addChild(playAgain);

    let textSample = new PIXI.Text('Total: 44', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'black', strokeThickness: 7 });
    textSample.x = _w / 2 - 128;
    textSample.height = 100;
    textSample.width = 180;
    textSample.y = _h / 2 - 360;
    stage.addChild(textSample);

    //Functia de mai jos verifica actiunea fiecarui pinguin
    const onPieceClick = (i, j) => {
        let draggable = isDraggable(i, j, map);
        if (playerClickedPiece === false) {
            //iau pinguinul
            if (map[i][j] === 1 && draggable === true) {
                stage.addChild(background);
                map[i][j] = 0;
                playerClickedPiece = true;
                stage.addChild(pieceThatFollowsMouse);
                lastPlayeri = i;
                lastPlayerj = j;
                draggable = false;
                stage.addChild(textSample);
                stage.addChild(tile);
                stage.addChild(playAgain);
                updateMap();
            }
        }
        else {
            let house = isHouse(i, j, lastPlayeri, lastPlayerj, map);
            if (map[i][j] === 0 && house === true) {
                stage.addChild(background);
                //pun pinguinul intr o noua casuta
                count--;  
                localStorage.setItem('score', count);
                textSample.text = 'Total: ' + Math.floor(count);
                map[i][j] = 1;
                deleteNeighbours(i, j, lastPlayeri, lastPlayerj, map);
                playerClickedPiece = false;
                stage.removeChild(pieceThatFollowsMouse);
                house = false;
                gameOver(map, lastPlayeri, lastPlayerj, changeStage, count);
                stage.addChild(textSample);
                stage.addChild(playAgain);
                stage.addChild(tile);
                updateMap();
            }
            else {
                // pun pinguinul in aceasi casuta
                stage.addChild(background);
                map[lastPlayeri][lastPlayerj] = 1;
                house = false;
                draggable = false;
                playerClickedPiece = false;
                stage.removeChild(pieceThatFollowsMouse);
                stage.addChild(textSample);
                stage.addChild(playAgain);
                stage.addChild(tile);
                updateMap();
            }
        }
    }

    //Functia modifica harta dupa fiecare mutare
    const updateMap = () => {
        stage.removeChild(stage.children[0]);
        stage.addChild(renderMap(_w / 2 + 128, _h / 2, map, onPieceClick));
    }

    stage.addChild(renderMap(_w / 2 + 128, _h / 2, map, onPieceClick));

    return {
        stage: stage,
        pieceThatFollowsMouse: pieceThatFollowsMouse
    };
}