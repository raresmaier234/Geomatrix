import * as PIXI from 'pixi.js'
import { gameplayStage } from './screens/gameplay'
import { menuStage } from './screens/menu'
import { gameOverStage } from './screens/gameover';
import { gameFinishedStage } from './screens/gamefinish';

//key care reprezinta scenele jocului
export const GAMEPLAYSTAGE_KEY = "GameplayStage";
export const MENUSTAGE_KEY = "MenuStage";
export const GAMEOVERSTAGE_KEY = "GameOverStage";
export const GAMEFINISHEDSTAGE_KEY = "GameFinishedStage";

//variabila in care se pastreaza keya scenei curente
let currentStageKey = MENUSTAGE_KEY;
localStorage.setItem('score', 44);


// schimba scena jocului
//stageKey reprezinta keya scenei pe care vreau sa-l schimb
export const changeStage = (stageKey) => {
    currentStageKey = stageKey;
    _gameplayStage = gameplayStage(changeStage);
    _gameoverStage =  gameOverStage(changeStage);
    _gameFinishedStage = gameFinishedStage(changeStage);
}

//se initializeaza scenele
let _menuStage = menuStage(changeStage);
let _gameplayStage = gameplayStage(changeStage);
let _gameoverStage = gameOverStage(changeStage);
let _gameFinishedStage = gameFinishedStage(changeStage);

const app = new PIXI.Application();
const canvas = document.body.appendChild(app.view);
let _w = window.innerWidth;
let _h = window.innerHeight;

const renderer = new PIXI.Renderer({
    view: canvas,
    width: _w,
    height: _h,
    resolution: window.devicePixelRatio,
    autoDensity: true
});

window.addEventListener('resize', resize);

function resize() {
    _w = window.innerWidth;
    _h = window.innerHeight;
    renderer.resize(_w, _h);
}

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
    //se randeaza fiecare scena in functie de keya curenta
    if (currentStageKey === MENUSTAGE_KEY) {
        renderer.render(_menuStage);
    } else if (currentStageKey === GAMEPLAYSTAGE_KEY) {
        renderer.render(_gameplayStage.stage);
        const target = app.renderer.plugins.interaction.mouse.global;
        _gameplayStage.pieceThatFollowsMouse.x = target.x / 2;
        _gameplayStage.pieceThatFollowsMouse.y = target.y / 2;
    }
    else if (currentStageKey === GAMEOVERSTAGE_KEY) {
        renderer.render(_gameoverStage);
    }
    else if(currentStageKey === GAMEFINISHEDSTAGE_KEY) {
        renderer.render(_gameFinishedStage);
    }
}