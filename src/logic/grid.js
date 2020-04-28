import * as PIXI from "pixi.js";
import { generateTile } from "./tile";
import { isDraggable } from "./gameLogic";
import { GAMEOVERSTAGE_KEY } from "../index";

const startBtn = document.getElementById('startBtn');
export const generateGrid = () => {
    return [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [-1, -1, -1, 1, 1, 1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]
}

let isDrag = false;
export let ok = 0;

export const renderMap = (x, y, grid, onClick) => {
    const container = new PIXI.Container();
    let positionx = Math.floor(x / 2) + 64;
    let positiony = Math.floor(y - (grid.length) * 64 / 2) + 64;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                container.addChild(generateTile(positionx, positiony, "./assets/Tile.png", () => {
                    onClick(i, j, false);
                }));
                container.addChild(generateTile(positionx, positiony, "./assets/entity.gif", () => {
                    onClick(i, j, false);
                }));
            }
            else
                if (grid[i][j] === 0)
                    container.addChild(generateTile(positionx, positiony, "./assets/Tile.png", () => {
                        onClick(i, j, true);
                    }));
            positionx += 64;
        }
        positiony += 64;
        positionx = Math.floor(x - (grid.length + 2) * 64 / 2) + 64;
    }

    return container;
}