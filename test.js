cube = [
    [
        [{ val: 1 }, { val: 2 }, { val: 3 }],
        [{ val: 4 }, { val: 5 }, { val: 6 }],
        [{ val: 7 }, { val: 8 }, { val: 9 }]
    ],
    [
        [{ val: 10 }, { val: 11 }, { val: 12 }],
        [{ val: 13 }, { val: 14 }, { val: 15 }],
        [{ val: 16 }, { val: 17 }, { val: 18 }]
    ],
    [
        [{ val: 19 }, { val: 20 }, { val: 21 }],
        [{ val: 22 }, { val: 23 }, { val: 24 }],
        [{ val: 25 }, { val: 26 }, { val: 27 }]
    ]
]

function f(cube) {
    // 00 to 02
    // 01 to 12
    // 02 to 22
    // 10 to 01
    // 11 is the pivot
    // 12 to 21
    // 20 to 00
    let flattened = [];
    let i = 0;
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            flattened.push(cube[i][j][k]);
        }
    }
    let n = flattened.length;
    let [pivot] = flattened.splice(4, 1);
    let [penultimate, lastElement] = flattened.splice(n - 3, 2);
    console.log('punúltimo: ', penultimate, ' last: ', lastElement);
    flattened.unshift(lastElement, penultimate);
    console.log(flattened);
}

function u() {

}

f(cube);