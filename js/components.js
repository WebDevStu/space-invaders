
// class for images

SI.Component = function (image, options) {

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
        width: 26,
        height: 20,
        x: 0,
        y: 53
    }, {
        // bullet
        width: 2,
        height: 5,
        x: 12,
        y: 68
    }],


    /**
     * draw
     */
    draw: function () {

        var component,
            image;

        switch (this.options.alien) {
            case 0:
                component = this.options.alien;
                break;
            case 1:
            case 2:
                component = 1;
                break;

            case 3:
            case 4:
                component = 2;
                break;

            default:

                if (this.options.ship) {
                    component = 3;
                } else {
                    component = 4;
                }
        }

        image = this.config = this.matrix[component];

        if (this.options.ship) {

            this.options.ctx.drawImage(
                this.image,
                image.x,
                image.y,
                image.width,
                image.height,
                this.options.left,
                this.options.top,
                image.width,
                image.height
            );

        } else if (this.options.bullet) {

            this.options.ctx.drawImage(
                this.image,
                image.x,
                image.y,
                image.width,
                image.height,
                this.options.left,
                this.options.top,
                image.width,
                image.height
            );

        } else {

            this.options.ctx.drawImage(
                this.image,
                image.x,
                (this.options.arms) ? image.y : image.height,
                image.width,
                image.height,
                (this.options.index * 50) + this.options.left,
                (this.options.alien * 40) + this.options.top,
                image.width,
                image.height
            );


            _.extend(this.config, {
                left: (this.options.index * 50) + this.options.left,
                top: (this.options.alien * 40) + this.options.top
            });
        }
    }
});