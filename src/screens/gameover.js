import * as PIXI from 'pixi.js'
import { generateTile } from '../logic/tile';
import { GAMEPLAYSTAGE_KEY, MENUSTAGE_KEY} from '../index';
import { count } from './gameplay';

export const gameOverStage = (changeStage) => {
    const stage = new PIXI.Container();
    let textgOver = new PIXI.Text('LOSER!!!', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'red', strokeThickness: 7 });
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

    const img = PIXI.Texture.from('./assets/gunter.png');
    const loser = new PIXI.Sprite(img);
    loser.width = 300;
    loser.height = 300;
    loser.x = _w / 2 - 128;
    loser.y = _h / 2 +16;

    background.width = 1920;
    background.height = 1080;

    let textSample = new PIXI.Text('Score: 0', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'black', strokeThickness: 7 });
    textSample.x = _w / 2 - 54;
    textSample.y = _h / 2 - 256;
    stage.addChild(textSample);
    textSample.text = 'Your score: ' + Math.floor(localStorage.getItem('score'));
    stage.addChild(background);
    stage.addChild(loser);
    stage.addChild(textgOver);
    stage.addChild(textSample);
    stage.addChild(tile);
    return stage;
}