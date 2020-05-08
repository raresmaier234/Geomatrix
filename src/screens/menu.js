import * as PIXI from 'pixi.js'
import { generateTile } from '../logic/tile';
import { GAMEPLAYSTAGE_KEY } from '../index';
import { INFOPLAYSTAGE_KEY } from '../index';

export const menuStage = (changeStage) => {
    const stage = new PIXI.Container();

    // daca dam click pe imagine, trecem la joc
    const tile = generateTile(700, 350, './assets/play.png', () => {
        changeStage(GAMEPLAYSTAGE_KEY);
    })

    const info = generateTile(730, 600, './assets/inf.png', () => {
        changeStage(INFOPLAYSTAGE_KEY);
    })

    const image = PIXI.Texture.from('./assets/background.jpg');
    const background = new PIXI.Sprite(image);
    background.width = 1920;
    background.height = 1080;
    stage.addChild(background);
    stage.addChild(tile);
    stage.addChild(info);

    return stage;
}
