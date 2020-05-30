import { cabs } from 'models';
import { getDistanceFromLatLonInKm } from '../helper';

export const findOneCab = cabId =>
    cabs.findOne({
        attributes: ['id', 'latitude', 'longitude', 'cab_number'],
        where: {
            id: cabId
        },
        underscoredAll: false
    });

// Create and Save a new Cab
/**
 * @param req
 * @returns {cab|{message: string}}
 */
export const createCab = req => {
    // eslint-disable-next-line no-console
    console.log(req.payload);
    if (
        !req.payload.latitude ||
        !req.payload.longitude ||
        !req.payload.cabNumber
    ) {
        return { message: 'missing fields!' };
    }

    // eslint-disable-next-line no-console
    console.log(req.payload);

    // Create cab
    const cab = {
        latitude: req.payload.latitude,
        longitude: req.payload.longitude,
        cab_number: req.payload.cabNumber
    };

    // Save cab in the database
    return cabs.create(cab);
};

// Update a Cab Info by the id from the request
/**
 * @param req
 * @param id
 * @returns {*}
 */
export const updateCab = (req, id) => {
    // TODO validate body
    // eslint-disable-next-line no-console
    console.log(id);
    // eslint-disable-next-line no-console
    console.log(req.payload);
    const cab = {
        latitude: req.payload.latitude,
        longitude: req.payload.longitude,
        cab_number: req.payload.cabNumber
    };
    return cabs.update(cab, {
        where: { id: id }
    });
};

// Delete Cab with the specified id from the request
/**
 * @param cabId
 * @returns {*}
 */
export const deleteCab = cabId =>
    cabs.destroy({
        where: { id: cabId }
    });

/**
 * @param page
 * @param limit
 * @returns {Promise<{allCabs: Instance[], totalCount: *}>}
 */
export const findAllCab = async (page, limit) => {
    const where = {};
    const totalCount = await cabs.count({ where });
    const allCabs = await cabs.findAll({
        attributes: ['id', 'latitude', 'longitude', 'cab_number'],
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allCabs, totalCount };
};

/**
 * @param payload
 * @returns {Promise<{message: string}>}
 */
export const getNearbyCabs = async payload => {
    // eslint-disable-next-line no-unused-vars
    let { latitude, longitude, distance } = payload;

    /**
     * If distance is not set then set default as 2 KM
     */
    if (distance === undefined) {
        distance = 2;
    }
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    if (
        Number(latitude) !== latitude ||
        Number(longitude) !== longitude ||
        latitude === undefined ||
        longitude === undefined
    ) {
        return { message: 'latitude or longitude is required' };
    }
    const nearbyCab = [];
    await cabs
        .findAll({
            attributes: ['id', 'latitude', 'longitude', 'cab_number']
        })
        .then(cabs => {
            cabs.forEach(cab => {
                if (
                    getDistanceFromLatLonInKm(
                        latitude,
                        longitude,
                        cab.latitude,
                        cab.longitude
                    ) <= distance
                ) {
                    nearbyCab.push(cab);
                }
            });
        });
    return nearbyCab;
};
