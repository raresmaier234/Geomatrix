import * as PIXI from 'pixi.js';

export let TILE_SIZE = 64;

export const generateTile = (x, y, image, onClick) => {

    const texture = PIXI.Texture.from(image);
    const sprite = new PIXI.Sprite(texture);
    let _w = window.innerWidth;
    let _h = window.innerHeight;


    sprite.interactive = true;

    sprite.on('mousedown', onClick);

    if (image === './assets/play.png' || image === './assets/playagain.png') {
        TILE_SIZE = 256;
        sprite.x = _w / 2;
        sprite.y =  _h / 2;
        sprite.width = TILE_SIZE;
        sprite.height = TILE_SIZE;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    }
    else 
    if(image === './assets/inf.png')
    {
        TILE_SIZE = 128;
        sprite.x = _w / 2 ;
        sprite.y =  _h / 2 + 256;
        sprite.width = TILE_SIZE;
        sprite.height = TILE_SIZE;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    }
    else {
        TILE_SIZE = 64;
        sprite.x = x;
        sprite.y = y;
        sprite.width = TILE_SIZE;
        sprite.height = TILE_SIZE;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    }

    return sprite;
}