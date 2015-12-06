

var SI = {},

    _ = {

        extend: function (object, extend) {

            for (var prop in extend) {
                if (extend.hasOwnProperty(prop)) {
                    object[prop] = object[prop] || extend[prop];
                }
            }

            return object;
        },


        /**
         * events object
         */
        events: {},


        /**
         * listenTo
         * @param id
         * @param callback
         * @param scope
         */
        listenTo: function (id, callback, scope) {

            _.events[id] = _.events[id] || [];

            if (scope) {
                callback.scope = scope;
            }

            _.events[id].push(callback);
        },


        /**
         * trigger
         * triggers registered callback in scope if supplied
         */
        trigger: function () {

            var args = Array.prototype.slice.call(arguments),
                id = args.shift();

            if (_.events[id] && _.events[id].length) {

                _.events[id].forEach(function (callback) {
                    callback.apply(callback.scope || this, args);
                }, this);
            }
        }
    };