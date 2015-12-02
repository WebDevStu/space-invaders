

var SI = {},

    _ = {

        extend: function (object, extend) {

            for (var prop in extend) {
                if (extend.hasOwnProperty(prop)) {
                    object[prop] = object[prop] || extend[prop];
                }
            }

            return object;
        }


    };