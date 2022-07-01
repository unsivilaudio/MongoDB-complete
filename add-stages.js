db.users.aggregate([
    { $match: { gender: 'male' } },
    {
        $project: {
            _id: 0,
            name: { $concat: ['$name.first', ' ', '$name.last'] },
            birthdate: { $toDate: '$dob.date' },
        },
    },
    { $sort: { birthdate: 1 } },
    { $skip: 10 },
    { $limit: 10 },
]);
