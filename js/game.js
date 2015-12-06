

(function () {

    var canvas = new SI.Canvas(),

        /**
         * render
         */
        render = function (frame) {

            _.trigger('frame:change', frame);

            window.requestAnimationFrame(render);
        };



    // events
    document.addEventListener('keydown', function (evt) {
        _.trigger('key:down', evt.keyCode);
    });

    document.addEventListener('keyup', function (evt) {
        _.trigger('key:up', evt.keyCode);
    });


    // start game
    window.requestAnimationFrame(render);
} ());
