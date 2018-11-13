/**
 * FrameSolver.js
 *
 * For every Frame, a corresponding solutions is required to be evalued to either true or false
 *
 * The member variable "solutions" should only contain single-line expressions due to readability. Anything longer
 * should be called as a const function outside of the class to ensure it is inaccessible.
 *
 * */

/**
 * Shared dependencies
 * */

let os = require('os');
let fs = require('fs');

const HOME_DIR = os.homedir();


class FrameSolver {
    constructor(frame, input = null) {
        this._id = frame.id;
        this._frameSolution = frame.solution;
        this._input = input;
        this._solutions = {
            0: _ => eval(this.frameSolution) === this.input,
            1: _ => checkCostOfASchnitzelFile(),
            2: _ => moveLaundry(),
            3: _ => checkRMFile(),
            4: _ => eval(this.frameSolution) === this.input,
            5: _ => checkCHOWN(),
            6: _ => checkRename(),
            7: _ => checkCHMOD(),
            8: _ => checkRMFolder(),
            9: _ => checkTarExistence(),
            10: _ => checkExtractionResult(),
            11: _ => eval(this.frameSolution) === this.input,
            12: _ => checkKeyFile(eval(this.frameSolution)),
            13: _ => eval(this.frameSolution) === this.input
        }
    }

    get id() {
        return this._id;
    }

    get input() {
        return this._input;
    }

    get frameSolution() {
        return this._frameSolution;
    }

    get solution() {
        return this._solutions[this.id]
    }
}

/**
 * Custom validations functions for Schnitzeljagd
 * */

//This is a cp task
// Expected result: two files with equivalent content in two locations
const checkCostOfASchnitzelFile = () => {
    try {
        let org = fs.readFileSync(HOME_DIR + '/schnitzel/cost-of-a-schnitzel.txt', {encoding: 'utf8'});
        let copy = fs.readFileSync(HOME_DIR + '/tax-man/cost-of-a-schnitzel.txt', {encoding: 'utf8'});
        return org === copy;
    } catch (e) {
        return false;
    }
}

//This is a rm task
//Expected result: The file to be removed does not exist any longer
const checkRMFile = () => {
    try {
        let shouldFail = fs.readFileSync(HOME_DIR + '/schnitzel/cost-of-a-schnitzel.txt', {encoding: 'utf8'});
    } catch (e) {
        return true;
    }
    return false;
}

//This is a mv task,
// Result: Folder should only exist in the destination
const moveLaundry = () => {
    try {
        //Expected to fail
        let origin = fs.readdirSync(HOME_DIR + '/schnitzel/laundry');
    } catch (e) {
        try {
            let destination = fs.readdirSync(HOME_DIR + '/tax-man/laundry');
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

//This is a chown task
//Result: The folder should belong to the current user
const checkCHOWN = () => {
    let folderUID, currentUID;
    try {
        folderUID = fs.statSync(HOME_DIR + '/schnitzel/SHADY-BUSINESS').uid;
        currentUID = os.userInfo().uid
    } catch (e) {
        return false;
    }
    return folderUID === currentUID
}

//This is a mv to rename task
//Result: The folder should not be accessible by its original name only by its new name
// The UID of the folder is the current owner's, however the GID is not as the folder
// was created by someone else.
const checkRename = () => {
    try {
        let fail = fs.readdirSync(HOME_DIR + '/schnitzel/SHADY-BUSINESS');
    } catch (e) {
        try {
            let GID = fs.statSync(HOME_DIR + '/schnitzel/NOTHING-TO-SEE-HERE').gid;
            let UID = os.userInfo().uid;
            return GID === UID;
        } catch (e) {
            return false;
        }
    }
    return false;
};


//This is a chmod task
//Result: The folder should be readable as well as writeable
const checkCHMOD = () => {
    try {
        fs.accessSync(HOME_DIR + '/schnitzel/NOTHING-TO-SEE-HERE', fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
};

//This is a rm task on a folder
//Result: The folder should not exist
const checkRMFolder = _ => {
    try {
        fs.readdirSync(HOME_DIR + '/schnitzel/NOTHING-TO-SEE-HERE');
        return false;
    } catch (e) {
        return true;
    }
};

//This is a wget task for a TAR file
//Result: The tar file should exist in the home directory
const checkTarExistence = _ => {
    try {
        let fileExists = fs.statSync(HOME_DIR + '/chaos.tar.xz');
        return true;
    } catch (e) {
        return false;
    }
};

//This is a tar task to extract an archive
//Result: The extracted folder should exist
const checkExtractionResult = _ => {
    try {
        let folderExists = fs.statSync(HOME_DIR + '/schnitzel/chaos');
        return true;
    } catch (e) {
        return false;
    }
};

//This is part of a grep and redirect task
//Result: A specific grep result should have been written to a specific file
const checkKeyFile = solution => {
    try {
        let key = fs.readFileSync(HOME_DIR + '/schnitzel/key.txt', {encoding: 'utf8'});
        key = key.trim();
        return key === solution;
    } catch (e) {
        return false;
    }
};



module.exports = FrameSolver;