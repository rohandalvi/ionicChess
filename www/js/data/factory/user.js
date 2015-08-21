/**
 * Created by rohandalvi on 8/20/15.
 */
app.factory('user', function(){
    var p = new ParseModule();
    return{
        loginUser: function(username,password){
            return Parse.User.logIn(username,password,{
                success: function(user){

                },
                error: function(user,error){

                }
            })
        }


    };
});