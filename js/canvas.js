
SI.Canvas = function () {

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.height = 500;
    this.canvas.width = 600;

    document.body.appendChild(this.canvas);

    this.addComponents();

    _.listenTo('frame:change', this.draw, this);
};


_.extend(SI.Canvas.prototype, {


    // based on type
    matrix: {
        'alien1': {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        },
        'alien2': {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        },
        'alien3': {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        },
        'spaceship': {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },

    addComponents: function () {

        var component;

        _.listenTo('alien1', function () {
            console.log('loaded');
        }, this);

        component = new SI.Component('alien1');

        document.body.appendChild(component.image);

    },




    /**
     * draw
     * @param frame
     */
    draw: function (frame) {

        frame = Math.round(frame / 10) * 10;

        // every half second
        if (frame % 500 === 0) {
            _.trigger('image:swap');
        }

        // every second
        if (frame % 1000 === 0) {

        }
    }
});