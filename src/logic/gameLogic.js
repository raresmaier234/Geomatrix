import { MENUSTAGE_KEY, GAMEPLAYSTAGE_KEY, GAMEOVERSTAGE_KEY, GAMEFINISHEDSTAGE_KEY } from '../index';
import { updateMap } from '../screens/gameplay';


// verifica daca are vecin si este un spatiu liber dupa el, daca e adevarat putem lua piesa
export const isDraggable = (i, j, map) => {
    let isDrag = false;
    if (map[i + 2][j] === 0)
        if (map[i + 1][j] === 1)
            isDrag = true;
    if (map[i][j + 2] === 0)
        if (map[i][j + 1] === 1)
            isDrag = true;
    if (map[i - 2][j] === 0)
        if (map[i - 1][j] === 1)
            isDrag = true;
    if (map[i][j - 2] === 0)
        if (map[i][j - 1] === 1)
            isDrag = true;
    return isDrag;
}

//verificam daca se poate pune in casuta de coord i, j
export const isHouse = (i, j, lastPlayeri, lastPlayerj, map) => {
    let result = false;
    if (i === lastPlayeri - 2 && j === lastPlayerj)
        if (map[lastPlayeri - 1][lastPlayerj] === 1)
            result = true;
    if (i === lastPlayeri + 2 && j === lastPlayerj)
        if (map[lastPlayeri + 1][lastPlayerj] === 1)
            result = true;
    if (i === lastPlayeri && j === lastPlayerj + 2)
        if (map[lastPlayeri][lastPlayerj + 1] === 1)
            result = true;
    if (i === lastPlayeri && j === lastPlayerj - 2)
        if (map[lastPlayeri][lastPlayerj - 1] === 1)
            result = true;
    if (result === true)
        if (i === lastPlayeri && j === lastPlayerj)
            result = true;
    return result;
}

// sterge vecinul
export const deleteNeighbours = (i, j, lastPlayeri, lastPlayerj, map) => {
    if (i > lastPlayeri && j === lastPlayerj)
        map[i - 1][j] = 0;
    if (i < lastPlayeri && j === lastPlayerj)
        map[i + 1][j] = 0;
    if (i === lastPlayeri && j > lastPlayerj)
        map[i][j - 1] = 0;
    if (i === lastPlayeri && j < lastPlayerj)
        map[i][j + 1] = 0;
}

// verifica daca mai sunt mutari posibile, daca nu mai sunt, trece la sfarsitul jocului
// daca scorul e mai mare de 5 ai pierdut, altfel ai castigat
export const gameOver = (map, lastPlayeri, lastPlayerj, changeStage, count) => {
    let ok = 1;
    for (let i = 0; i < 13 && ok; i++)
        for (let j = 0; j < 13 && ok; j++)
            if (map[i][j] === 1) {
                let draggable = isDraggable(i, j, map);
                let house = isHouse(i, j, lastPlayeri, lastPlayerj, map);
                if (draggable === false && house === false)
                    ok = 1;
                else
                    ok = 0;
            }
    if (ok) {
        if (count > 4)
            changeStage(GAMEOVERSTAGE_KEY);
        else
            changeStage(GAMEFINISHEDSTAGE_KEY);
    }
}