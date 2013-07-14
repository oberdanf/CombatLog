/*Jquery Ajax to get and post data to Combat Log API*/
define(function (require) {
    var character = require('models/character');
    var player = require('models/player');

    var getAllCharacters = function () {
        var deferred = new $.Deferred();
        var allCharacters = [
            new character('Baraka', '../../Content/characters/Baraka.png'),
            new character('Cyber Sub-Zero', '../../Content/characters/CyberSubZero.png'),
            new character('Cyrax', '../../Content/characters/Cyrax.png'),
            new character('Ermac', '../../Content/characters/Ermac.png'),
            new character('Jade', '../../Content/characters/Jade.png'),
            new character('Jax', '../../Content/characters/Jax.png'),
            new character('Johnny', '../../Content/characters/JohnnyCage.png'),
            new character('Kabal', '../../Content/characters/Kabal.png'),
            new character('Kano', '../../Content/characters/Kano.png'),
            new character('Kitana', '../../Content/characters/Kitana.png'),
            new character('Kratos', '../../Content/characters/Kratos.png'),
            new character('Kung Lao', '../../Content/characters/KungLao.png'),
            new character('Liu Kang', '../../Content/characters/LiuKang.png'),
            new character('Mileena', '../../Content/characters/Mileena.png'),
            new character('Nightwolf', '../../Content/characters/Nightwolf.png'),
            new character('Noob', '../../Content/characters/Noob.png'),
            new character('QuanChi', '../../Content/characters/QuanChi.png'),
            new character('Raiden', '../../Content/characters/Raiden.png'),
            new character('Reptile', '../../Content/characters/Reptile.png'),
            new character('Scorpion', '../../Content/characters/Scorpion.png'),
            new character('Sektor', '../../Content/characters/Sektor.png'),
            new character('Shang Tsung', '../../Content/characters/ShangTsung.png'),
            new character('Sheeva', '../../Content/characters/Sheeva.png'),
            new character('Sindel', '../../Content/characters/Sindel.png'),
            new character('Smoke', '../../Content/characters/Smoke.png'),
            new character('Sonya', '../../Content/characters/Sonya.png'),
            new character('Stryker', '../../Content/characters/Stryker.png'),
            new character('Sub-Zero', '../../Content/characters/SubZero.png'),
            new character('Rain', '../../Content/characters/Default.jpg'),
            new character('Freddy Krueger', '../../Content/characters/Default.jpg'),
            new character('Skarlet', '../../Content/characters/Default.jpg')
        ];
        
        return deferred.resolve(allCharacters).promise();
    };
    
    var getAllPlayers = function () {
        var deferred = new $.Deferred();
        var allPlayers = [
            new player(1, 'Danillo Corvalan'),
            new player(2, 'Danilo Garcia'),
            new player(3, 'Maurício Minella'),
            new player(4, 'Maycon Beserra'),
            new player(5, 'Oberdan Ferreira'),
            new player(6, 'Mitchel Felske')
        ];

        return deferred.resolve(allPlayers).promise();
    };
    
    var syncCombatWithServer = function (combat) {
        if (!combat) {
            throw new Error('Combat is Null');
        }
        
        var deferred = new $.Deferred();
        return deferred.resolve(true).promise();
    };

    return {
        getAllCharacters: getAllCharacters,
        getAllPlayers: getAllPlayers,
        syncCombatWithServer: syncCombatWithServer
    };
});