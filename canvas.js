
SI.animations = {};

SI.Canvas = function () {

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.height = 800;
    this.canvas.width = 800;

    document.body.appendChild(this.canvas);


    SI.animations.draw = this.draw;

    //window.requestAnimationFrame(SI.animations.draw);
};


_.extend(SI.Canvas.prototype, {




    draw: function () {

        window.requestAnimationFrame(SI.animations.draw);
    }

});