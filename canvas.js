
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




    addComponents: function () {

        var img,
            url = '/images/new/test';

        _.listenTo(url, function () {
            console.log('loaded');
        }, this);

        img = new SI.Component(url);

        console.log(img);
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