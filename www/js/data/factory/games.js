/**
 * Created by rohandalvi on 8/20/15.
 */

app.factory('games', function(){
    var p = new ParseModule();

    return{
        saveMove: function(gameId,move){
            var game = new Parse.Object.extend("game");
            var query = new Parse.Query(game);
            query.equalTo("objectId",gameId);
            return query.find({
                success: function(results){
                    var game = results[0];
                    var currentMoves = game.get("moves");
                    game.set("moves",currentMoves+move);
                    game.save();
                },
                error: function(error){

                }
            });


        },

        newGame: function(user,gameDetails){ //here gameDetails has to be a Parse gameDetails Object
            var gameObject = Parse.Object.exted("game");
            var game = new gameObject();

            game.set("gameDetails",gameDetails);
            game.set("user", Parse.User.current());

            return p.executeQuery("save",game);
        },

        saveGameDetails: function(gameDetails){
            console.log("Saving parse game details object ",Parse.User.current());
            var gameDetailsObject = Parse.Object.extend("gameDetails");
            var details = new gameDetailsObject();
            for(var key in gameDetails){
                details.set(key,gameDetails[key]);
            }
            return details.save();
        },
        isLoaded: function(){
            console.log("Sure is loaded");
        }

    };
});