class Logger {

    static get ERROR()  { return 3; }
    static get WARN()   { return 4; }
    static get INFO()   { return 6; }
    static get DEBUG()  { return 7; }

    constructor(options) {

        if(options.client_only) {
            this.client_only
            return
        }

        if ( !options || typeof options !== 'object' ) {
            throw new Error('options are required, and must be an object');
        }

        if (!options.url) {
            throw new Error('options must include a url property');
        }

        this.url         =   options.url;
        this.headers     =   options.headers || [ { 'Content-Type' : 'application/json' } ];
        this.level       =   options.level || Logger.ERROR;
        this.batch_size =   options.batch_size || 10;
        this.messages   =   [];

    }

    send(messages) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.url, true);

        this.headers.forEach(function(header){
            xhr.setRequestHeader(
                Object.keys(header)[0],
                header[Object.keys(header)[0]]
            );
        });

        var data = JSON.stringify({
            context   :   navigator.userAgent,
            messages  :   messages
        });
        xhr.send(data);
    }

    log(level, message) {
        if (level <= this.level) {
            this.messages.push({
                level : level,
                message : message
            });
            if (this.messages.length >= this.batch_size) {
                this.send(this.messages.splice(0, this.batch_size));
            }
        }
    }

    error(message) {
        this.log(Logger.ERROR, message);
    }

    warn(message) {
        this.log(Logger.WARN, message);
    }

    info(message) {
        this.log(Logger.INFO, message);
    }

    debug(message) {
        this.log(Logger.DEBUG, message);
    }

}