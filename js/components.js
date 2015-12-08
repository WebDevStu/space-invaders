
// class for images

SI.Component = function (image, options) {

    //_.listenTo('image:swap', this.swapSprite, this);

    this.image = image;
    this.options = options;

    this.draw();
};



_.extend(SI.Component.prototype, {

    // based on type
    matrix: [{
        // alien 1
        width: 26,
        height: 26,
        x: 0,
        y: 0
    }, {
        // alien 2
        width: 37,
        height: 26,
        x: 26,
        y: 0
    }, {
        // alien 3
        width: 39,
        height: 26,
        x: 63,
        y: 0
    }, {
        // space shit
        width: 0,
        height: 0,
        x: 0,
        y: 0
    }],


    draw: function () {

        var component,
            image;

        switch (this.options.alien) {
            case 1:
            case 2:
                component = 1;
                break;

            case 3:
            case 4:
                component = 2;
                break;

            default:
                component = this.options.alien;
        }

        image = this.matrix[component];

        this.options.ctx.drawImage(
            this.image,
            image.x,
            (this.options.arms) ? image.y : image.height,
            image.width,
            image.height,
            (this.options.index * 44) + this.options.left, // change with x axis counter
            (this.options.alien * 40) + this.options.top, // change with y axis counter
            image.width,
            image.height
        );
    }
});