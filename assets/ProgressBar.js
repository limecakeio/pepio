const _cliProgress = require('cli-progress');
const bar = new _cliProgress.Bar({
    barCompleteChar: 'X',
    format: 'Ihr Fortschritt: [{bar}] | {percentage}% | {value}/{total} Aufgaben',
    barIncompleteChar: '-',
    fps: 5,
    stream: process.stdout,
    barsize: 40,
    position: 'center'
});

class ProgressBar {
    constructor(current, max) {
        this._current = current;
        this._max = max;
    }

    get current() {
        return this._current;
    }

    get max() {
        return this._max;
    }

    print() {
        bar.start(this.max, 0);
        bar.update(this.current);
        bar.stop();
    }
}

module.exports = ProgressBar;