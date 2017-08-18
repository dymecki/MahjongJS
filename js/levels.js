mahjong.levels = (function() {
    var boards = [
        [
            [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [3, 4, 5, 6, 7, 8, 9, 10],
                [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [[0, .5], 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, [13, .5], [14, .5]],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [3, 4, 5, 6, 7, 8, 9, 10],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            ],
            [
                [],
                [4, 5, 6, 7, 8, 9],
                [4, 5, 6, 7, 8, 9],
                [4, 5, 6, 7, 8, 9],
                [4, 5, 6, 7, 8, 9],
                [4, 5, 6, 7, 8, 9],
                [4, 5, 6, 7, 8, 9]
            ],
            [
                [],
                [],
                [5, 6, 7, 8],
                [5, 6, 7, 8],
                [5, 6, 7, 8],
                [5, 6, 7, 8]
            ],
            [
                [],
                [],
                [],
                [6, 7],
                [6, 7]
            ],
            [
                [
                    [6.5, 3.5]
                ]
            ]
        ]
    ];

    function getLevelBoard(levelId) {
        if (boards[levelId - 1])
            return boards[levelId - 1];
    }

    return {
        getLevelBoard: getLevelBoard
    }
})();