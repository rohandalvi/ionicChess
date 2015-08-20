var chessApp = angular.module('starter.controllers', ['starter'])


chessApp.controller('AppCtrl',function($scope, $ionicModal, $timeout,games) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.gameDetails = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

    $ionicModal.fromTemplateUrl('templates/gameDetails.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.detailsModal = modal;
    });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

    $scope.closeDetails = function(){
        $scope.detailsModal.hide();
    }

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

    $scope.newGame = function(){
        $scope.detailsModal.show();
    };

  // Perform the login action when the user submits the login form
  $scope.saveDetails = function(){
      console.log("Saving game details ",$scope.gameDetails);
      var game = {};
      game["white"] = $scope.gameDetails.white;
      game["black"] = $scope.gameDetails.black;
      game["whiteELO"] = $scope.gameDetails.whiteELO;
      game["blackELO"] = $scope.gameDetails.blackELO;
      games.saveGameDetails(game).then(function(result){

      }, function(error){
            console.log("Error saving game details in Parse ",error);
      });

  }
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});


chessApp.controller('PlaylistsCtrl',function($scope,games) {
    console.log("Games",games);
    $scope.initBoard = function(){
        var board,
            game = new Chess(),
            statusEl = $('#status'),
            fenEl = $('#fen'),
            pgnEl = $('#pgn');

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
        var onDragStart = function(source, piece, position, orientation) {
            if (game.game_over() === true ||
                (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        };

        var onDrop = function(source, target) {
            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });

            // illegal move
            if (move === null) return 'snapback';
            else{
                console.log("Move complete");
            }
            updateStatus();
        };

// update the board position after the piece snap
// for castling, en passant, pawn promotion
        var onSnapEnd = function() {
            board.position(game.fen());
        };

        var updateStatus = function() {
            var status = '';

            var moveColor = 'White';
            if (game.turn() === 'b') {
                moveColor = 'Black';
            }

            // checkmate?
            if (game.in_checkmate() === true) {
                status = 'Game over, ' + moveColor + ' is in checkmate.';
            }

            // draw?
            else if (game.in_draw() === true) {
                status = 'Game over, drawn position';
            }

            // game still on
            else {
                status = moveColor + ' to move';

                // check?
                if (game.in_check() === true) {
                    status += ', ' + moveColor + ' is in check';
                }
            }

            statusEl.html(status);
            fenEl.html(game.fen());
            pgnEl.html(game.pgn());


        };

        var cfg = {
            draggable: true,
            position: 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
        };
        board = ChessBoard('board', cfg);

        updateStatus();
    }
        $scope.initBoard();

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});

chessApp.controller('PlaylistCtrl', function($scope, $stateParams) {
});
