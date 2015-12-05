
// class for images

SI.Component = function (url) {

    this.image = new Image(url);
    this.image.onload = function () {
        _.trigger(url);
    };

    _.listenTo('image:swap', this.swapSprite, this)
};



_.extend(SI.Component.prototype, {

    swapSprite: function () {

    }


});