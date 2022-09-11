import * as fs from "fs";
import { exit } from "process";

let input = fs
  .readFileSync("/Users/sebastianbilandzija/DAY4 Kryha/input.txt")
  .toString();

type Board = number[][];

//reading the input remove whitespace lines, commas put it in array as ints

let draws = input
  .trim()
  .split("\n")[0]
  .split(",")
  .map((draw) => parseInt(draw));

let boards: Board[] = input
  .trim()
  .split("\n")
  .splice(2)
  .join("\n")
  .split("\n\n")
  .map((board) => {
    return board.split("\n").map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((value) => parseInt(value))
    );
  });

//conditions for checking winner

const win = (board: Board): boolean => {
  let winner = false;
  //checking rows
  board.forEach((row) => {
    if (row.filter((value) => value === -1).length === row.length) {
      winner = true;
    }
  });
  //checking columns
  for (let i = 0; i < board[0].length; i++) {
    let columns: number[] = [];
    board.forEach((row) => {
      columns.push(row[i]);
    });
    if (columns.filter((value) => value === -1).length === columns.length) {
      winner = true;
    }
  }
  return winner;
};

const partOne = () => {
  draws.forEach((draw) => {
    boards.forEach((board) => {
      board.forEach((row) => {
        row.forEach((value, valueIndex) => {
          if (value === draw) {
            row[valueIndex] = -1;
          }
        });
      });
      if (win(board)) {
        console.log("WINER!!!! ", board);
        let score = 0;
        board.forEach((row) => {
          row.forEach((value) => {
            if (value !== -1) {
              score += value;
            }
          });
        });
        console.log("score ", score * draw);
        exit();
      }
    });
  });
};

const partTwo = () => {
  let allWiners: number[] = [];
  draws.forEach((draw) => {
    boards.forEach((board, boardIndex) => {
      board.forEach((row, rowIndex) => {
        row.forEach((value, valueIndex) => {
          if (value === draw) {
            row[valueIndex] = -1;
          }
        });
      });
      if (win(board) && allWiners.indexOf(boardIndex) === -1) {
        let score = 0;
        board.forEach((row) => {
          row.forEach((value) => {
            if (value !== -1) {
              score += value;
            }
          });
        });

        console.log("board no. ", boardIndex, "score ", score * draw);
        allWiners.push(boardIndex);
      }
    });
  });
};

partOne();
//partTwo();
