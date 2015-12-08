
SI.Canvas = function () {

    // listeners with scope
    _.listenTo({
        'frame:change': this.draw,
        'sprite:loaded': this.addComponents
    }, this);

    this.canvas = document.createElement('canvas');
    this.canvas.height = 500;
    this.canvas.width = 700;

    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.sprite = new Image();
    this.sprite.src = './image/components.png';
    this.sprite.onload = function () {
        _.trigger('sprite:loaded');
    };

    this.aliens = {};
    this.armsUp = true;
};


_.extend(SI.Canvas.prototype, {



    addComponents: function () {

        var xAxis = 0,
            yAxis = 0,
            i;

        for (i = 0; i < 50; i += 1) {

            yAxis = Math.floor(i / 10);
            xAxis = i - (yAxis * 10);

            this.aliens[i] = new SI.Component(this.sprite, {
                ctx: this.ctx,
                alien: yAxis,
                index: xAxis,
                arms: this.armsUp
            });
        }
    },


    /**
     * draw
     * @param frame
     */
    draw: function (frame) {

        frame = Math.round(frame / 10) * 10;

        // every half second
        if (frame % 500 === 0) {
            console.log('half')
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.armsUp = !this.armsUp;
            this.addComponents();
        }

        // every second
        if (frame % 1000 === 0) {

        }
    }
});