module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'cabs',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            latitude: {
                field: 'latitude',
                type: DataTypes.FLOAT,
                allowNull: false
            },
            longitude: {
                field: 'longitude',
                type: DataTypes.FLOAT,
                allowNull: false
            },
            cab_number: {
                field: 'cab_number',
                type: DataTypes.UUID,
                unique: true,
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
            tableName: 'cabs',
            timestamps: false
        }
    );
};
