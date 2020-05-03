import * as PIXI from 'pixi.js'
import { generateTile } from '../logic/tile';
import { GAMEPLAYSTAGE_KEY } from '../index';

export const menuStage = (changeStage) => {
    const stage = new PIXI.Container();

    // daca dam click pe imagine, trecem la joc
    const tile = generateTile(700, 350, './assets/play.png', () => {
        changeStage(GAMEPLAYSTAGE_KEY);
    })

    const image = PIXI.Texture.from('./assets/background.jpg');
    const background = new PIXI.Sprite(image);
    background.width = 1600;
    background.height = 900;
    stage.addChild(background);
    stage.addChild(tile);

    return stage;
}
