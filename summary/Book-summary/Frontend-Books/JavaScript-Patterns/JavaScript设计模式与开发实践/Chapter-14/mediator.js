// 中介者模式改造泡泡堂游戏
// player不再负责具体的执行逻辑，将操作转交给中介者对象，这里把中介者对象命名为playerDirector
function Player(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
};
Player.prototype.win = function() {
    console.log(this.name + ' won');
};
Player.prototype.lose = function() {
    console.log(this.name + ' lost');
};

/****************玩家死亡实现******************/
Player.prototype.die = function() {
    this.state = 'dead';
    playerDirector.reciveMessage('playerDead', this);
};

/****************移除玩家******************/
Player.prototype.remove = function() {
    playerDirector.reciveMessage('removePlayer', this);
};

/****************玩家换队******************/
Player.prototype.changeTeam = function(color) {
    playerDirector.reciveMessage('changeTeam', this, color);
};

var playerFactory = function(name, teamColor) {
    var newPlayer = new Player(name, teamColor);
    playerDirector.reciveMessage('addPlayer', newPlayer);

    return newPlayer;
};

// 实现playerDirector中介者模式一般有两种方式
// 1. 使用发布-订阅模式，playerDirector为订阅者，player为发布者
// 2. 在playerDirector中开放一些消息接口，各player直接调用接口给playerDirector发送消息
// 下面使用第二种实现方式
var playerDirector = (function() {
    var players = {};
    var operations = {};

    /****************新增玩家******************/
    operations.addPlayer = function(player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    };

    /****************新增玩家******************/
    operations.removePlayer = function(player) {
        var teamColor = player.teamColor;

        var teamPlayers = players[teamColor] || [];
        for (var i = 0, tmp; tmp = teamPlayers[i++];) {
            if (tmp === player) {
                i--;
                teamPlayers.splice(i, 1);
            }
        }
    };

    /****************玩家换队******************/
    operations.changeTeam = function(player, newTeamColor) {
        operations.removePlayer(player);
        player.teamColor = newTeamColor;
        operations.addPlayer(player);
    };

    /****************玩家死亡******************/
    operations.playerDead = function(player) {
        var teamColor = player.teamColor;
        var teamPlayers = players[teamColor];

        var all_dead = true;
        for (var i = 0, player; player = teamPlayers[i++];) {
            if (player.state !== 'dead') {
                all_dead = false;
                break;
            }
        }

        if (all_dead === true) {
            for (var i = 0, player; player = teamPlayers[i++];) {
                player.lose();
            }

            for (var color in players) {
                if (color !== teamColor) {
                    var teamPlayers = players[color];
                    for (var i = 0, player; player = teamPlayers[i++]; ) {
                        player.win();
                    }
                }
            }
        }
    };

    var reciveMessage = function() {
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    };

    return {
        reciveMessage: reciveMessage
    }
})();

var player1 = playerFactory('皮蛋', 'red');
var player2 = playerFactory('小乖', 'red');
var player3 = playerFactory('宝宝', 'red');
var player4 = playerFactory('小强', 'red');

var player5 = playerFactory('黑妞', 'blue');
var player6 = playerFactory('葱头', 'blue');
var player7 = playerFactory('胖墩', 'blue');
var player8 = playerFactory('海盗', 'blue');

// player1.die();
// player2.die();
// player3.die();
// player4.die();

// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
