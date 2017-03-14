/**
 * Created by Jiyuan on 2017/3/9.
 *
 * The core of this web app is a famous DP (dynamic programming) problem
 * I've spent 2 hours during the lunch break today to implement the bulk
 * of this program.
 * There are still small things to work on such as mobile-first and responsive design, documentation, etc.
 * I will update the program after work and commit to GitHub daily.
 * If you have any questions during this development period,
 * please email me at zhao.jiyu@husky.neu.edu
 */

/*  One possible solution to the performance issue is to move all calculations to the backend,
 so that the performance is not limited by the browser's javascript engine.
 Another way is to add a hash to the algorithm so that it's not necessary to calculate
 the same data repeatedly. Therefore, we can reduce some time and space complexity.
 */

angular.module('myApp', []).controller('myController', function ($scope) {
    $scope.coins = [25, 10, 5, 1];
    $scope.total = 0;

    enterCoin = function (coinNum) {
        var coinValue = Number(prompt("Please enter a coin value."));
        if (Number.isInteger(coinValue) &&              //check if it is integer
            coinValue > 0 &&                            //check if coin value is positive
            coinValue != 1 &&                           //make sure coin value is not 1
            $scope.coins.indexOf(coinValue) == -1) {    //make sure there are no duplicates
            $scope.coins[coinNum] = parseInt(coinValue);
            $scope.$apply();                            //refresh data
        }
        else {
            alert("Please enter a unique positive integer > 1");
        }
    };

    $scope.calculate = function () {
        $scope.amounts = [0, 0, 0, 0];
        //console.log($scope.total);
        //console.log($scope.coins);
        //console.log(change($scope.total,$scope.coins));
        var combination = change($scope.total, $scope.coins)[1];
        //console.log(combination);
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
            var lose = change(total, coins.slice(1));
            var use = change(total - coins[0], coins);
            if (lose[0] < 1 + use[0]) {
                return lose;
            } else {
                return [1 + use[0], use[1].concat(coins[0])];
            }
        }
    }
});