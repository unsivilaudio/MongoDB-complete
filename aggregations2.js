db.friends.aggregate([
    { $unwind: '$hobbies' },
    { $group: { _id: { age: '$age' }, allHobies: { $addToSet: '$hobbies' } } },
]);

db.friends.aggregate([
    { $project: { _id: 0, examScore: { $slice: ['$examScores', 1] } } },
]);

db.friends.aggregate([
    {
        $project: {
            _id: 0,
            scores: {
                $filter: {
                    input: '$examScores',
                    as: 'sc',
                    cond: { $gt: ['$$sc.score', 60] },
                },
            },
        },
    },
]);

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $sort: { score: -1 } },
    {
        $group: {
            _id: '$_id',
            maxScore: { $max: '$score' },
            name: { $first: '$name' },
        },
    },
    { $sort: { maxScore: -1 } },
]);
