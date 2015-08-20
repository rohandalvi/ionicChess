chessLive

Client Model

When user starts a new game.

a.  Save an entry in parse with game information. Once saved in Parse, generate a link using the objectId from Parse

b.  On other user clicking the link and going to "that objectId" register this user socketId to the key objectId.
 This way the server would know which socketId's are watching this game.

Server model

On any game progress received from the "player" , the server would emit the new move object to all connected socketId's
with the "objectId" as the key so only instances watching that game would update their move.

