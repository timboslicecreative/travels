const chalk = require('chalk');
const row = '----------------------------------------------------------------------'

const DEFAULT_COLORS = {
    log: 'white',
    banner: 'green',
    error: 'bgRed',
    warn: 'yellow',
    debug: 'gray'
}

class Output {
    constructor(app = '', options = {}) {
        const {timestamp = false, verbosity = 3, icon = '', colors = {}} = options;
        this.app = app;
        this.timestamp = timestamp;
        this.verbosity = verbosity;
        this.icon = icon ? icon + '' : '';
        this.colors = {...DEFAULT_COLORS, ...colors}
    }

    stamp(prefix=null) {
        return `${this.timestamp ? `[${new Date().toISOString()}] ` : ''}${this.icon + (prefix ? '' : '  ')}${prefix ? prefix+' ': ''}${this.app ? `${this.app}` : ''}`;
    }

    banner(msg) {
        if (this.verbosity > 0) console.log(chalk[this.colors.banner](`${row}\n\n\t${this.stamp()} ${msg}\n\n${row}`))
    }

    error(msg, ...other) {
        if (this.verbosity > 0) console.error(chalk[this.colors.error](`${this.stamp('❌')} [error] ${msg}`), ...other);
    }

    warn(msg, ...other) {
        if (this.verbosity > 0) console.error(chalk[this.colors.warn](`${this.stamp('🔺')} [warning] ${msg}`), ...other);
    }

    log(msg, ...other) {
        if (this.verbosity > 1) console.log(chalk[this.colors.log](`${this.stamp()} ${msg}`), ...other);
    }

    debug(msg, ...other) {
        if (this.verbosity > 2) console.log(chalk[this.colors.debug](`${this.stamp()} ${msg}`), ...other);
    }
}

module.exports = Output