const fs = require('fs');
const os = require('os');
const rimraf = require('rimraf');

/**
 * CONSTANTS
 * */
const SYSTEM_ROOT = os.homedir();


/**
 * RESOURCES
 * */
const FRAME_PATH = './assets/Frames/frames.json';

/**
 * CUSTOM
 * */
const SchnitzelFolder = require('../helpers/SchnitzelFolder');


/**
 * TO REMOVE
 * */
const SCHNITZEL_PATH = SYSTEM_ROOT + "/schnitzel";
const CHAOS_FOLDER_PATH = SYSTEM_ROOT + "/chaos";
const CHAOS_ACHRIVE_PATH = SYSTEM_ROOT + "/chaos.tar.xz";
const TAX_MAN_FOLDER_PATH = SYSTEM_ROOT + "/tax-man";


class Cleaner {
    constructor() {

    }
    //TODO should be async
    resetFrames() {
        let frames = JSON.parse(fs.readFileSync(FRAME_PATH));
        Object.keys(frames).map((k) => frames[k].passed = false);
        fs.writeFileSync(FRAME_PATH, JSON.stringify(frames));
    }
    //TODO should be async
    purgeFolders() {
        //Remove schnitzel
        let schnitzelFolder = new SchnitzelFolder(SCHNITZEL_PATH);
        schnitzelFolder.destroy();
        //Remove chaos assets
        rimraf.sync(CHAOS_FOLDER_PATH);
        rimraf.sync(CHAOS_ACHRIVE_PATH);
        //Remove user created folders
        rimraf.sync(TAX_MAN_FOLDER_PATH);
    }
}

module.exports = Cleaner;