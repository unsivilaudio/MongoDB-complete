db.users.aggregate([
    {
        $bucket: {
            groupBy: '$dob.age',
            boundaries: [10, 30, 40, 50, 60, 80],
            output: {
                numPersons: { $sum: 1 },
                averageAge: { $avg: '$dob.age' },
            },
        },
    },
]);

db.users.aggregate([
    {
        $bucketAuto: {
            groupBy: '$dob.age',
            buckets: 5,
            output: {
                numPersons: { $sum: 1 },
                averageAge: { $avg: '$dob.age' },
            },
        },
    },
]);
