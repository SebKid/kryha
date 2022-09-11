import * as fs from "fs";

let input = fs
  .readFileSync("/Users/sebastianbilandzija/DAY4 Kryha/input6.txt")
  .toString();

let fishes = input.split(",").map((value) => parseInt(value))


//for (let day = 0; day < 80; day++){
//    let bornFish = 0
//
//    fishes = fishes.map((fish) => {
//        if(fish === 0){
//            bornFish += 1
//            return 6
//        }
//        else{
//            return (fish -1)
//        }
//    }).concat(new Array(bornFish).fill(8))
//}

//console.log(fishes.length)

var partTwo = function() {
    const lifecycle: number[] = Array(9).fill(0)
    //create array of 8 days of the cycle
    fishes.forEach(fish => {
        lifecycle[fish]++
        //read the starting point
    });
    for (let i = 0; i < 256; i++) {
        //everytime fishes reach the first position in the lifecycle array it means they will breed therefore we need
        //append end by that many fishes and also push those to the 6th place because they dont die and thats the cycle
        const breedingDay: any = lifecycle.shift()
        lifecycle.push(breedingDay)
        lifecycle[6] += breedingDay
        
    }

    console.log(lifecycle.reduce((a,b) => a + b, 0))
}

partTwo()