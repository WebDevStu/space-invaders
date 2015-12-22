
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
        'frame:change':     this.draw,
        'sprite:loaded':    this.render,
        'key:down':         this.startShip,
        'key:up':           this.stopShip
    }, this);

    // all components & config
    this.components = {};

    this.config = {
        arms: true,
        steps: 0,
        frame: 0
    };

    this.coords = {
        x: 20,
        y: 20
    };

    this.shipPos = 20;
    this.moveShip = null;
    this.bullet = null;

    this.loadSprite();
};


_.extend(SI.Canvas.prototype, {


    /**
     * loadSprite
     */
    loadSprite: function () {

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

        this.config.frame += 1;

        // every second(ish)
        if (this.config.frame >= 60) {

            this.config.frame = 0;
            this.config.arms = !this.config.arms;

            this.moveCoordinates();
        }

        if (this.moveShip) {

            if (this.moveShip === 39) {
                this.shipPos += 5
            } else if (this.moveShip === 37) {
                this.shipPos -= 5
            }

            this.shipPos = Math.max(20, this.shipPos);
            this.shipPos = Math.min(660, this.shipPos);
        }

        if (this.bullet) {
            this.bullet.y -= 6;

            if (this.bullet.y < 0) {
                this.bullet = null;
            }
        }

        // call render
        this.render();
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

        for (i = 0; i < 1; i += 1) {

            yAxis = Math.floor(i / 9);
            xAxis = i - (yAxis * 9);

            // make case for a dead alien
            if (this.components[i] && this.components[i].dead) {
                continue;
            }

            if (this.components[i]) {

                this.components[i].update({
                    arms: this.config.arms,
                    top: this.coords.y,
                    left: this.coords.x
                });

            } else {

                this.components[i] = new SI.Component(this.sprite, {
                    ctx: this.ctx,
                    alien: yAxis,
                    index: xAxis,
                    arms: this.config.arms,
                    top: this.coords.y,
                    left: this.coords.x
                });
            }
        }

        // space ship & bullet
        if (this.components.spaceShip) {

            this.components.spaceShip.update({
                top: 440,
                left: this.shipPos
            });

        } else {

            this.components.spaceShip = new SI.Component(this.sprite, {
                ctx: this.ctx,
                ship: true,
                top: 440,
                left: this.shipPos
            });
        }

        if (this.bullet) {

            if (this.components.bullet) {

                this.components.bullet.update({
                    top: this.bullet.y,
                    left: this.bullet.x
                });

            } else {

                this.components.bullet = new SI.Component(this.sprite, {
                    ctx: this.ctx,
                    bullet: true,
                    top: this.bullet.y,
                    left: this.bullet.x
                });
            }

            this.findBulletTarget();
        }
    },


    /**
     * moveCoordinates
     */
    moveCoordinates: function () {

        var xPadding;

        this.config.steps += 1;

        xPadding = Math.floor(this.config.steps / 12);

        if (this.config.steps % 12 === 0) {
            this.coords.y = ((xPadding) * 20) + 20;
            this.config.steps += 1;
        } else {
            this.coords.x = _.isEven(xPadding) ? (this.coords.x + 20) : (this.coords.x - 20);
        }

        this.render();
    },


    /**
     * startShip
     *
     * @param keyCode {Number}
     */
    startShip: function (keyCode) {

        // left and right arrows only for now
        if (keyCode === 39 || keyCode === 37) {

            this.moveShip = keyCode;
            this.draw();
        }

        if (keyCode === 32 && !this.bullet) {
            // fire gun
            this.bullet = {
                x: this.shipPos + 12,
                y: 440
            };
        }
    },


    /**
     * stopShip
     */
    stopShip: function () {
        this.moveShip = null;
    },


    /**
     * findBulletTarget
     * find a hit against an alien
     */
    findBulletTarget: function () {

        var component,
            opts,
            config;

        Object.keys(this.components).forEach(function (alien) {

            component   = this.components[alien];
            opts        = component.options;
            config      = component.config;

            if (component.dying || component.dead || opts.ship || opts.bullet) {
                return;
            }

            // halve the options each statement
            if (_.isBetween(config.left, (config.left + config.width), this.bullet.x)) {
                if (_.isBetween(config.top, (config.top + config.height), this.bullet.y)) {
                    component.dying = true;
                }
            }
        }, this);
    }
});