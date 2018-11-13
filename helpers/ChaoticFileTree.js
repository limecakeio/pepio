const fs = require('fs');
const os = require('os');
const uuid4 = require('uuid/v4');
const rimraf = require('rimraf');
const crypto = require('crypto');

const TREE_DEPTH = 15;
const JIBBERISH_LENGTH = 200;
const TREE_ROOT_NAME = "chaos";
const ROOT_PATH = os.homedir + "/" + TREE_ROOT_NAME;
const KEYPHRASE = "#parmigiana4life#";


const initFileTree = () => {
    console.log("\nGetting ready to generate a new file tree at:", ROOT_PATH);
    console.log("Cleaning up previous results [if they exist]...")
    rimraf.sync(ROOT_PATH);
    console.log("Initiating file tree with a depth of", TREE_DEPTH, "...");
    createTree(0, ROOT_PATH)
    console.log("DONE!\n");
};

const injectKeyphraseAtRandom = () => {
    if(fs.existsSync(ROOT_PATH)) {
        console.log("\nPreparing to inject the keyphrase:", KEYPHRASE, "into a file at a random depth...");

        let depth = parseInt(Math.random() * (TREE_DEPTH - 1) + 1); //Pick a file at a random depth
        console.log("Looking for a file at depth:", depth);

        let destination = ROOT_PATH;

        //Get the tree root
        try {
            destination += "/" + fs.readdirSync(destination).filter((e) => fs.lstatSync(destination + "/" + e).isDirectory())[0];
        } catch (e) {
            throw new Error(e)
        }

        for (let i = 0; i < depth; i++) {
            try {
                let dirs = fs.readdirSync(destination).filter((e) => fs.lstatSync(destination + "/" + e).isDirectory());
                let randomDir = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))%2; //Randomly generate % 2
                destination += "/" + dirs[randomDir]
            } catch (e) {
                throw new Error(e);
            }

        }


        try {
            let path_to_file = fs.readdirSync(destination).filter((e) => fs.lstatSync(destination + "/" + e).isFile());
            destination += "/" + path_to_file;
            console.log("Found path:", destination);
        } catch (e) {
            throw new Error(e);
        }


        console.log("Opening file...");
        let file;
        try {
            file = fs.readFileSync(destination, {encoding: 'utf8'});
        } catch (e) {
            throw new Error(e);
        }

        console.log("Splitting file...");
        let fileArray = file.split();

        let randomPos = parseInt(Math.random() * (file.length - 1) + 1);
        console.log("Replacing random character with keyphrase at position:", randomPos);
        fileArray[randomPos] = KEYPHRASE

        console.log("Rejoining array");
        file = fileArray.join();

        console.log("Saving file...");
        try {
            fs.writeFileSync(destination, file);
        } catch (e) {
            throw new Error(e);
        }
        console.log("Completed injecting keyphrase into a file at a random depth!\n");

    } else {
        throw new Error("Cannot find " + ROOT_PATH + "!");
    }

};

const injectFileAtRandom = (content, fileDir, filename) => {
    if(fs.existsSync(ROOT_PATH)) {
        let depth = parseInt(Math.random() * (TREE_DEPTH - 1) + 1); //Insert at a random depth
        let destination = ROOT_PATH;
        for (let i = 0; i < depth; i++) {
            let dirs = fs.readdirSync(destination).filter((e) => fs.lstatSync(destination + "/" + e).isDirectory())
            let randomDir = parseInt(Math.random() * (dirs.length-1)); //Select a random folder at the current depth
            destination += "/" + dirs[randomDir]
        }
        let path = destination + "/" + fileDir;
        fs.mkdirSync(path);
        fs.writeFileSync(path + "/" + filename, content)
    }

    return new Error("Destination folder " + TREE_ROOT_NAME + " does not exist.")
}


const jibberishFile = (path)  => {
    let filename = uuid4() + ".txt";
    let result = crypto.randomBytes(JIBBERISH_LENGTH/2).toString('hex');
    fs.writeFileSync(path + "/" + filename, result)
}


const createTree = (currentDepth, currentFolder) => {
    fs.mkdirSync(currentFolder, {recursive: true});
    jibberishFile(currentFolder);
    if(currentDepth < TREE_DEPTH) {
        for(let i = currentDepth+1; i <= TREE_DEPTH; i++) {
            let newFolderName = uuid4();
            currentFolder += "/" + newFolderName;
            currentDepth++;
            createTree(currentDepth, currentFolder)
        }
    }
};

/*SPECIFIC FUNCTIONS*/
const initSchnitzelFolder = () => {
    let path = os.homedir + "/schnitzel";
    !fs.existsSync(path) ? fs.mkdirSync(path) : null
}


initFileTree();
injectKeyphraseAtRandom();

