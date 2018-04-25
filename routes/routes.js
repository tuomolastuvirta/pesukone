var appRouter = function(app) {

    app.post("/api/status", function(req, res) {
        return res.json(pesukone);
    });

    app.post("/api/abort", function(req, res){
        pesukone="idle";
        console.log(pesukone);
        return res.json(pesukone);
    });

    app.post("/api/start", function(req, res){

        var willPesukoneStart = new Promise(
            function (resolve, reject) {
                if (pesukone === "idle") {
                    pesukone="filling water";
                    console.log (pesukone + " " + Date());
                    setTimeout(() => resolve(pesukone), gtimeout);
                } else {
                    var reason = new Error('Washing machine is already running');
                    reject(reason); // reject
                }

            }).then(function(result) {
                return new Promise((resolve, reject) => { // (*)
                    if (pesukone === "filling water") {
                        pesukone = "washing";
                        console.log (pesukone + " " + Date());
                        setTimeout(() => resolve(pesukone), gtimeout);
                    } else {
                        var reason = new Error('filling water aborted');
                        reject(reason); // reject
                    }
                });

              }).then(function(result) {

                return new Promise((resolve, reject) => { // (*)
                    if (pesukone === "washing") {
                        pesukone = "rinsing";
                        console.log (pesukone + " " + Date());
                        setTimeout(() => resolve(pesukone), gtimeout);
                    } else {
                        var reason = new Error('Washing aborted');
                        reject(reason); // reject
                    }
                });

              }).then(function(result) {
                return new Promise((resolve, reject) => { // (*)
                    if (pesukone === "rinsing") {
                        pesukone = "spinning";
                        console.log (pesukone + " " + Date());
                        setTimeout(() => resolve(pesukone), gtimeout);
                    } else {
                        var reason = new Error('Rinsing aborted');
                        reject(reason); // reject
                    }

                });
              }).then(function(result) {
                //pesukone="idle";                          // original
                //console.log (pesukone + " " + Date());    // original
                return new Promise((resolve, reject) => { // (*)
                    if (pesukone === "spinning") {
                        pesukone = "idle";
                        console.log (pesukone + " " + Date());
                        resolve(pesukone);
                    } else {
                        var reason = new Error('Spinning aborted');
                        reject(reason); // reject
                    }
                });
              });

            ;

            // call our promise
        var isRunning = function () {
            willPesukoneStart
                .then(function (fulfilled) {
                    return res.json(fulfilled); // original

                })
                .catch(function (error) {
                    return res.json(error.message);
                });
        };

        isRunning();

    });
}

module.exports = appRouter;