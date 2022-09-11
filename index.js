"use strict";
exports.__esModule = true;
var fs = require("fs");
var process_1 = require("process");
var input = fs
    .readFileSync("/Users/sebastianbilandzija/DAY4 Kryha/input.txt")
    .toString();
//reading the input remove whitespace lines, commas put it in array as ints
var draws = input
    .trim()
    .split("\n")[0]
    .split(",")
    .map(function (draw) { return parseInt(draw); });
var boards = input
    .trim()
    .split("\n")
    .splice(2)
    .join("\n")
    .split("\n\n")
    .map(function (board) {
    return board.split("\n").map(function (row) {
        return row
            .trim()
            .split(/\s+/)
            .map(function (value) { return parseInt(value); });
    });
});
//conditions for checking winner
var win = function (board) {
    var winner = false;
    //checking rows
    board.forEach(function (row) {
        if (row.filter(function (value) { return value === -1; }).length === row.length) {
            winner = true;
        }
    });
    var _loop_1 = function (i) {
        var columns = [];
        board.forEach(function (row) {
            columns.push(row[i]);
        });
        if (columns.filter(function (value) { return value === -1; }).length === columns.length) {
            winner = true;
        }
    };
    //checking columns
    for (var i = 0; i < board[0].length; i++) {
        _loop_1(i);
    }
    return winner;
};
var partOne = function () {
    draws.forEach(function (draw) {
        boards.forEach(function (board) {
            board.forEach(function (row) {
                row.forEach(function (value, valueIndex) {
                    if (value === draw) {
                        row[valueIndex] = -1;
                    }
                });
            });
            if (win(board)) {
                console.log("WINER!!!! ", board);
                var score_1 = 0;
                board.forEach(function (row) {
                    row.forEach(function (value) {
                        if (value !== -1) {
                            score_1 += value;
                        }
                    });
                });
                console.log("score ", score_1 * draw);
                (0, process_1.exit)();
            }
        });
    });
};
var partTwo = function () {
    var allWiners = [];
    draws.forEach(function (draw) {
        boards.forEach(function (board, boardIndex) {
            board.forEach(function (row, rowIndex) {
                row.forEach(function (value, valueIndex) {
                    if (value === draw) {
                        row[valueIndex] = -1;
                    }
                });
            });
            if (win(board) && allWiners.indexOf(boardIndex) === -1) {
                var score_2 = 0;
                board.forEach(function (row) {
                    row.forEach(function (value) {
                        if (value !== -1) {
                            score_2 += value;
                        }
                    });
                });
                console.log("board no. ", boardIndex, "score ", score_2 * draw);
                allWiners.push(boardIndex);
            }
        });
    });
};
partOne();
//partTwo();
