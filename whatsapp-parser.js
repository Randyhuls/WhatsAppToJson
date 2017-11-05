// Local http request
let httpRequest = function(path) {

    let paths = !Array.isArray(path) ? [path] : path;
    let promises = [];

    for (let path of paths) {

         promises.push(new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.onload = function() {
                resolve(this.responseText);
            };

            request.onerror = function () {
                reject(this.response);
            };

            request.open('GET', path);
            request.send();
        }));
    }

    return Promise.all(promises);
};

// WhatsAppChat model
let WhatsAppMessage = function(date, time, name, msg) {
    this.name = name;
    this.msg = msg;

    let dateRegex = /^(\d.)-(\d.)-(\d.)$/;
    let timeRegex = /^(\d.):(\d.):(\d.)$/;

    this.date = new Date(
        20+dateRegex.exec(date)[3],
        parseInt(dateRegex.exec(date)[2])-1,
        dateRegex.exec(date)[1],
        timeRegex.exec(time)[1],
        timeRegex.exec(time)[2],
        timeRegex.exec(time)[3],
    );

};

// Parser
let parse = function(file) {
    let files = !Array.isArray(file) ? [file] : file;
    let whatsAppChats = [];
    let regex = /^(\d.-\d.-\d.) (\d.:\d.:\d.): (\w.*): (.*)$/gm;

    for (let chat of files) {
        let chats = [];
        let message;

        if (regex.test(chat)) {
            while ((message = regex.exec(chat)) !== null) {
                chats.push(new WhatsAppMessage(message[1], message[2], message[3], message[4]));
            }
        }

        whatsAppChats.push(chats);

    }
    return whatsAppChats;
};

// Parser
let whatsAppToJson = function(path) {

    return new Promise((resolve, reject) => {
        httpRequest(path).then(
            function (response) {
                resolve(parse(response));
            },
            function (err) {
                reject(err);
            }
        );
    });

};