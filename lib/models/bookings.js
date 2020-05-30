module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'bookings',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            source: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destination: {
                type: DataTypes.STRING,
                allowNull: false
            },
            car_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            tableName: 'bookings',
            timestamps: false
        }
    );
};
