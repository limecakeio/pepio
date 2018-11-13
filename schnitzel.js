//Elemental functionality
let os = require('os');
let promptSync = require('prompt-sync')();
let cleaner = require('./assets/Cleaner');
let clear = require('clear');


/**
 * Resources
 * */
let frames = require('./assets/Frames/frames.json');
let Header = require('./assets/Header');
let Menu = require('./assets/Menu');
let ProgressBar = require('./assets/ProgressBar');
let Transition = require('./assets/Transition');
let Frame = require('./assets/Frames/Frame');
let Page = require('./assets/Page/Page');
let Box = require('./assets/Box');
let Cleaner = require('./assets/Cleaner');


/**
 * CUSTOM Resources
 * */
let SchnitzelFolder = require('./helpers/SchnitzelFolder');

/**
 * Constants
 * */
const SYSTEM_ROOT = os.homedir();
const HEADER_IMAGE = "./art/chkn.png";
const HEADER_TITLE = "Schnitzeljagd";
const WIN_IMAGE = "./art/piggy.png";
const WIN_TITLE ="DU HAST GEWONNEN!";

class Schnitzel {
    constructor() {
        this._quit = false;
        this._reset = false;
        this.header = null;
        this.winHeader = null;
        this._menu = new Menu();
        this._transition= new Transition(3);
        this.cleaner = new Cleaner();
        this._frameCount = 0;
        this._framePointer = 0;
        this._frames = [];

        //Custom fields
        this.schnitzelFolder = new SchnitzelFolder(SYSTEM_ROOT + '/schnitzel');

        //Perform sync tasks
        this.framePointer = parseInt(Object.keys(frames).find((frame) => frames[frame].passed === false));
        this.frameCount = Object.keys(frames).length;
        this.frames = frames;

        //Custom sync tasks
        if(this.framePointer === 0) {
            this.schnitzelFolder.init();
        }

        //Load all async resources
        let promiseChain = [
            this.loadHeader(),
            this.loadWinHeader()
        ];

        return new Promise((resolve, reject) => {
            Promise.all(promiseChain).then(() => {
                resolve(this);
            }).catch((err) => reject(err))
        });

    }

    loadHeader() {
        return new Promise((resolve, reject) => {
            new Header(HEADER_IMAGE, HEADER_TITLE).then((res) => {
                this.header = res;
                resolve();
            }).catch((err) => reject(err))
        })
    }

    loadWinHeader() {
        return new Promise((resolve, reject) => {
            new Header(WIN_IMAGE, WIN_TITLE).then((res) => {
                this.winHeader = res;
                resolve();
            }).catch((err) => reject(err))
        })
    }

    loadPage(pageName) {
        let page = new Page(pageName, this.header);
        let pageResult = page.serve();
        return pageResult;
    }

    loadWinPage(pageName) {
        let page = new Page(pageName, this.winHeader);
        return page.serve();
    }

    //Loads the current frame, identified by idx, and returns the user input
    //@idx {int} - The index of the specific frame in the frames collection
    loadCurrentFrame() {
        let pb = new ProgressBar(this.framePointer, this.frameCount);
        clear();
        this.header.print();
        this.menu.print();
        pb.print();
        this.frame.print();
    }

    loadTransition(result) {
        clear();
        this.header.print();
        this.transition.print(result);
    }

    getInput(prompt){
        return promptSync(prompt);
    }

    //Resets the entire state of the application and quits the game
    resetGame() {
        this.cleaner.resetFrames();
        this.cleaner.purgeFolders();
        this.reset = true;
    }


    get menu() {
        return this._menu;
    }

    get transition() {
        return this._transition;
    }

    get frameCount() {
        return this._frameCount;
    }

    set frameCount(cnt) {
        this._frameCount = cnt;
    }

    get framePointer() {
        return this._framePointer;
    }

    set framePointer(idx) {
        this._framePointer = idx;
    }

    get frames() {
        return this._frames;
    }

    get frame() {
        return this.frames[this.framePointer];
    }

    set frames(frames) {
        let keys = Object.keys(frames);
        keys.map((key) => {
            this._frames.push(new Frame(frames[key]))
        });
    }

    get quit() {
        return this._quit;
    }

    set quit(hasQuit) {
        this._quit = hasQuit;
    }

    get reset() {
        return this._reset;
    }

    set reset(isReset) {
        this._reset = isReset;
    }

    /**
     * CUSTOM FUNCTIONALITY
     * */
}



/**
 * MAIN ENTRY POINT
 * */
new Schnitzel().then((schnitzel) => {
    if (schnitzel.framePointer === 0) {
        schnitzel.loadPage('info');
        schnitzel.getInput();
    }

    while(schnitzel.framePointer < schnitzel.frameCount && !schnitzel.quit && !schnitzel.reset) {
        schnitzel.loadCurrentFrame();

        let input = schnitzel.getInput();
        input ? input.trim() : null;

        //Check if input was a menu item...
        let menuEvent = schnitzel.menu.parse(input);
        switch (menuEvent) {
            case 'quit':
                schnitzel.quit = true;
                break;
            case 'reset':
                schnitzel.resetGame();
                break;
            case 'info':
                schnitzel.loadPage('info');
                schnitzel.getInput();
                break;
            case 'tips':
                schnitzel.loadPage('tips');
                schnitzel.getInput();
                break;
            case 'credits':
                schnitzel.loadPage('credits');
                schnitzel.getInput();
                break;
            default:
                let result = schnitzel.frame.evaluate(input);
                if (result) {
                    schnitzel.frame.markAsPassed();
                    schnitzel.framePointer = ++schnitzel.framePointer;
                }
                schnitzel.loadTransition(result);
        }
    }
    if(schnitzel.reset) {
        let box = new Box("Das Spiel wurde in den Grundzustand zurückgesetzt. Spiele gerne nochmal von Anfang an!");
        box.print();
    } else if (schnitzel.quit) {
        let box = new Box("Spiel verlassen. Viel Erfolg und komme jederzeit wieder um an der letzten Stelle fortzufahren!");
        box.print();
    } else {//The game has been won
        schnitzel.loadWinPage('winner');
        let input = schnitzel.getInput();
        let box = new Box("STOP!!!\n\n\nWir haben noch eine kleine Überraschung für Dich!\n\nWir bitten Dich noch, nachdem das Programm beendet wurde, den folgenden Befehl aufzurufen:\n\ncurl parrot.live\n\nDu hast es Dir verdient!")
        box.print();
        if(input === "r" || input === "R") {
            schnitzel.resetGame();
        }
    }
    process.exit(0);
}).catch((err) => {
    console.error(err);
});




