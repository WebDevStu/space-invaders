

(function () {

    var canvas = new SI.Canvas(),
        running = true,

        /**
         * render
         */
        render = function (frame) {

            if (running) {

                _.trigger('frame:change', frame);

                window.requestAnimationFrame(render);
            }
        };


    // pause the game on blur
    window.addEventListener('blur', function () {
        running = false;
    });

    window.addEventListener('focus', function () {
        running = true;
        _.trigger('frame:change', window.requestAnimationFrame(render));
    });




    // events
    document.addEventListener('keydown', function (evt) {
        _.trigger('key:down', evt.keyCode);
    });

    document.addEventListener('keyup', function (evt) {
        _.trigger('key:up', evt.keyCode);
    });


    // start game
    _.trigger('frame:change', window.requestAnimationFrame(render));
} ());
