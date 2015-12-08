
SI.Canvas = function () {

    // listeners with scope
    _.listenTo({
        'frame:change': this.draw,
        'sprite:loaded': this.addComponents
    }, this);

    // canvas
    this.canvas = document.createElement('canvas');
    this.canvas.height = 500;
    this.canvas.width = 700;

    // context
    this.ctx = this.canvas.getContext('2d');

    // append
    document.body.appendChild(this.canvas);

    // main image sprite
    this.sprite = new Image();
    this.sprite.src = './image/components.png';
    this.sprite.onload = function () {
        _.trigger('sprite:loaded');
    };

    // all components & config
    this.aliens = {};

    this.armsUp = true;
    this.steps = 0;
    this.top = 40;
    this.left = 40;
    this.ltr = true;
};


_.extend(SI.Canvas.prototype, {


    /**
     * draw
     * @param frame
     */
    draw: function (frame) {

        frame = Math.round(frame / 10) * 10;

        // every half second
        if (frame % 500 === 0) {
            // clear and re-draw
            this.armsUp = !this.armsUp;
            this.render();
        }

        // every second
        if (frame % 1000 === 0) {
            this.moveCoordinates();
        }
    },


    /**
     * render
     * clears down add re attaches the components
     */
    render: function () {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addComponents();
    },


    /**
     * addComponents
     * creates a new component and draws it to the canvas
     */
    addComponents: function () {

        var xAxis = 0,
            yAxis = 0,
            i;

        this.aliens.length = 0;

        for (i = 0; i < 50; i += 1) {

            yAxis = Math.floor(i / 10);
            xAxis = i - (yAxis * 10);

            this.aliens[i] = new SI.Component(this.sprite, {
                ctx:    this.ctx,
                alien:  yAxis,
                index:  xAxis,
                arms:   this.armsUp,
                top:    this.top,
                left:   this.left
            });
        }
    },



    moveCoordinates: function () {

        var xPadding,
            yPadding;
        // x5 steps per row

        this.step += 1;


        xPadding = Math.floor(this.step / 5);
        yPadding = 0;
    }
});