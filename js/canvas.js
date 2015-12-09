
SI.Canvas = function () {

    // canvas
    this.canvas = document.createElement('canvas');
    this.canvas.height = 500;
    this.canvas.width = 700;

    // context
    this.ctx = this.canvas.getContext('2d');

    // append
    document.body.appendChild(this.canvas);

    // listeners with scope
    _.listenTo({
        'frame:change': this.draw,
        'sprite:loaded': this.render
    }, this);

    // all components & config
    this.aliens = {};

    this.armsUp = true;
    this.steps  = 0;
    this.top    = 20;
    this.left   = 0;
    this.ltr    = true;

    this.frame  = 0;

    this.createSprite();
};


_.extend(SI.Canvas.prototype, {


    /**
     * createSprite
     */
    createSprite: function () {

        // main image sprite
        this.sprite = new Image();
        this.sprite.src = './image/components.png';

        this.sprite.onload = function () {
            _.trigger('sprite:loaded');
        };
    },


    /**
     * draw
     */
    draw: function () {

        this.frame += 1;

        // every second(ish)
        if (this.frame >= 60) {

            this.frame = 0;
            this.armsUp = !this.armsUp;

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


    /**
     * moveCoordinates
     */
    moveCoordinates: function () {

        var xPadding;

        this.steps += 1;

        xPadding = Math.floor(this.steps / 12);

        if (this.steps % 12 === 0) {
            this.top = ((xPadding) * 20) + 20;
            this.steps += 1;
        } else {
            this.left = _.isEven(xPadding) ? (this.left + 20) : (this.left - 20);
        }

        this.render();
    }
});