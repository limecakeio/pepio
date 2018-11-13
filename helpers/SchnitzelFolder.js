const shellJS = require("shelljs");
const rimraf = require('rimraf');
const path_to_resource = './resources/schnitzel';



class SchnitzelFolder {
    constructor(targetPath) {
        this._targetPath = targetPath;
    }

    get targetPath() {
        return this._targetPath;
    }

    init() {
        shellJS.exec('./helpers/init_schnitzel.sh');
    }

    destroy() {
        shellJS.exec('./helpers/destroy_schnitzel.sh');
    }
}

module.exports = SchnitzelFolder;