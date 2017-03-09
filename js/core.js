/**
 * Created by Jiyuan on 2017/3/9.
 *
 * The core of this web app is a famous DP (dynamic programming) problem
 * I've spent 2 hours during the lunch break today to implement the bulk
 * of this program.
 * There are still small things to work on such as form validation, exception handling,
 *  mobile-first and responsive design, documentation, etc.
 * I will update the program after work and commit to GitHub daily.
 * If you have any questions during this development period,
 * please email me at zhao.jiyu@husky.neu.edu
 */

angular.module('myApp', []).controller('myController', function ($scope) {
    $scope.coins = [25, 10, 5, 1];
    $scope.total = 0;

    enterCoin = function (coinNum) {
        var coinValue = prompt("Please enter a coin value.");
        if (coinValue != null) {
            $scope.coins[coinNum] = parseInt(coinValue);
            $scope.$apply();
        }
    };

    $scope.calculate = function () {
        $scope.amounts = [0, 0, 0, 0];
        //console.log($scope.total);
        //console.log($scope.coins);
        //console.log(change($scope.total,$scope.coins));
        var combination = change($scope.total, $scope.coins)[1];
        console.log(combination);
        for (var i = 0; i < combination.length; i++) switch (combination[i]) {
            case $scope.coins[0]:
                $scope.amounts[0]++;
                break;
            case $scope.coins[1]:
                $scope.amounts[1]++;
                break;
            case $scope.coins[2]:
                $scope.amounts[2]++;
                break;
            case $scope.coins[3]:
                $scope.amounts[3]++;
                break;
        }
    };

    function change(total, coins) {
        if (total === 0) {
            return [0, []];
        }
        if (coins.length === 0 && total > 0) {
            return [Infinity, []];
        }
        if (coins[0] > total) {
            return change(total, coins.slice(1));
        } else {
            var loseIt = change(total, coins.slice(1));
            var useIt = change(total - coins[0], coins);
            if (loseIt[0] < 1 + useIt[0]) {
                return loseIt;
            } else {
                return [1 + useIt[0], useIt[1].concat(coins[0])];
            }
        }
    }
});