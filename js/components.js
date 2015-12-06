
// class for images

SI.Component = function (type) {

    this.image = new Image();
    this.image.src = './image/components.png';
    this.image.onload = function () {
        _.trigger(type);
    };

    _.listenTo('image:swap', this.swapSprite, this)
};



_.extend(SI.Component.prototype, {

    swapSprite: function () {

    }





});