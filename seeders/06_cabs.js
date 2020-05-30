module.exports = {
    up: queryInterface => {
        const arr = [
            {
                latitude: 44.773,
                longitude: 33.345,
                cab_number: 'MH-2831'
            },
            {
                latitude: 41.773,
                longitude: 32.345,
                cab_number: 'MH-2441'
            },
            {
                latitude: 40.773,
                longitude: 31.345,
                cab_number: 'MH-7332'
            },
            {
                latitude: 44.673,
                longitude: 33.305,
                cab_number: 'MH-2433'
            }
        ];
        return queryInterface.bulkInsert('cabs', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('cabs', null, {})
};
