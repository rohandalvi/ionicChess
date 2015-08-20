/**
 * Created by rohandalvi on 8/19/15.
 */
    /*
        APP_KEY && JS_KEY need to be kept secret
     */

Parse.initialize(APP_KEY, JS_KEY);

var ParseModule = function(){
    console.log("ParseModule initiated");
};

ParseModule.prototype.executeQuery = function(type, queryObject){
    var promise = Parse.Promise();
    switch(type){
        case 'find':
            return queryObject.find();
            break;

        case 'save':
            return queryObject.save(null, {
                success: function(object){
                    console.log("Success");
                },
                error: function(error){
                    console.log("Error ",error);
                }
            });
            break;

        default :
            promise.reject("Enter valid type to execute query : find, valid");
            return promise;

    }

};

