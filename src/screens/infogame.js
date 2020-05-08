import * as PIXI from 'pixi.js'
import { generateTile } from '../logic/tile';
import { MENUSTAGE_KEY } from '../index';


export const infoGameStage = (changeStage) => {
    const stage = new PIXI.Container();
    const image = PIXI.Texture.from('./assets/ice.png');
    const imgInfo = PIXI.Texture.from('./assets/scroll.png');

    const tile = generateTile(50, 50, './assets/home.png', () => {
        changeStage(MENUSTAGE_KEY);
    })

    const background = new PIXI.Sprite(image);
    const scroll = new PIXI.Sprite(imgInfo);

    background.width = 1920;
    background.height = 1080;
    scroll.x = 200;
    scroll.y = 20;
    scroll.width = 1000;
    scroll.height = 800;

    let textSample = new PIXI.Text('Score: 0', { font: 'bold italic 60px Arvo', fill: '#FFFAF0', align: 'center', stroke: 'black', strokeThickness: 7 });
    
    textSample.x = 256;
    textSample.y = 64;
    textSample.width = 900;
    textSample.height = 700;
    

    textSample.text = 'Geomatrix este un joc pentru browser, de tip “Singleplayer”. \n Ideea jocului este de a muta un pinguin dintr-o \n căsuță în alta, pentru a rămâne cu cât mai puține piese pe tablă. \n Poți lua un pinguin dacă are \n cel puțin un vecin și se află o căsuță goală după acesta. \n Astfel, poate fi mutat doar în acea căsuță goală. \n În cazul în care un pinguin are mai multe mulți vecini \n și câte o căsuță goală după aceștia, pinguinul va putea fi pus \n în oricare dintre acele căsuțe goale. \n Un pinguin are vecin dacă se află lângă el, \n pe orizontală sau pe verticală, un alt pinguin. \n Jocul se sfârșește când nu mai sunt mutări posibile. \n Dacă ramâi cu cel puțin 4 piese pe tablă, ai câștigat!'

    stage.addChild(background);
    stage.addChild(textSample);
    stage.addChild(tile);
    stage.addChild(scroll);
    stage.addChild(textSample);

    return stage;
}
