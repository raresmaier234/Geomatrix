import * as PIXI from 'pixi.js'
import { generateTile } from '../logic/tile';
import { GAMEPLAYSTAGE_KEY, MENUSTAGE_KEY} from '../index';
import { count } from './gameplay';

export const gameFinishedStage = (changeStage) => {
    const stage = new PIXI.Container();
    let textgOver = new PIXI.Text('WINNER!!!', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'green', strokeThickness: 7 });
    const tile = generateTile(700, 350, './assets/pagain.png', () => {
        changeStage(MENUSTAGE_KEY);
    })


    let _w = window.innerWidth;
    let _h = window.innerHeight;
    
    tile.x = _w / 2 + 32;
    tile.y = _h / 2 - 32;
    
    textgOver.x = _w/2 - 32;
    textgOver.y = _h/2 -128;
    
    const image = PIXI.Texture.from('./assets/backgroundgame.png');
    const background = new PIXI.Sprite(image);

    const img = PIXI.Texture.from('./assets/ez.png');
    const winner = new PIXI.Sprite(img);
    winner.width = 300;
    winner.height = 300;
    winner.x = _w / 2 - 128;
    winner.y = _h / 2 + 16;

    background.width = 1600;
    background.height = 900;

    let textSample = new PIXI.Text('Score: 0', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'black', strokeThickness: 7 });
    textSample.x = _w / 2 - 54;
    textSample.y = _h / 2 - 256;
    stage.addChild(textSample);
    textSample.text = 'Your score: ' + Math.floor(localStorage.getItem('score'));
    stage.addChild(background);
    stage.addChild(winner);
    stage.addChild(textgOver);
    stage.addChild(textSample);
    stage.addChild(tile);
    return stage;
}