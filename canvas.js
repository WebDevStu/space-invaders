

SI.Canvas = function () {


    this.create();
};


_.extend(SI.Canvas.prototype, {


    create: function () {

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.height = 800;
        this.canvas.width = 800;

        document.body.appendChild(this.canvas);
    }


});