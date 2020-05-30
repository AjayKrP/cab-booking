import { bookings } from 'models';
import { validateCoordinate } from '../helper';

/**
 * @param req
 * @returns {{message: string}|*}
 */
export const createBookings = req => {
    if (
        !req.payload.source ||
        !req.payload.destination ||
        !req.payload.cabId ||
        !req.payload.userId
    ) {
        return { message: 'missing fields!' };
    }

    if (
        !validateCoordinate(req.payload.source) &&
        !validateCoordinate(req.payload.destination)
    ) {
        return { message: 'coordinate validation error!' };
    }
    // Create cab
    const trip = {
        source: req.payload.source.toString(),
        destination: req.payload.destination.toString(),
        car_id: req.payload.cabId,
        userId: req.payload.userId
    };

    // eslint-disable-next-line no-console
    console.log(trip);

    // Save cab in the database
    return bookings.create(trip).then(function(trip_) {
        // eslint-disable-next-line no-console
        console.log(trip);
        if (trip_) {
            return { booking_id: trip_.id };
        } else {
            return 'error occured while creating trip';
        }
    });
};

/**
 * @param bookingId
 * @returns {Promise<Model | null> | Promise<Instance> | Promise<Model>}
 */
export const findBookingDetails = bookingId =>
    bookings.findOne({
        attributes: ['id', 'source', 'destination', 'car_id', 'userId'],
        where: {
            id: bookingId
        },
        underscoredAll: false
    });

/**
 * @param userId
 * @returns {Promise<{allBookings: Instance[], totalCount: *}>}
 */
export const findAllBookingsOfUser = async userId => {
    const where = {};
    const totalCount = await bookings.count({ where });
    const allBookings = await bookings.findAll({
        attributes: ['id', 'source', 'destination', 'car_id'],
        where,
        userId: userId
    });
    return { allBookings, totalCount };
};

/**
 * @param request
 * @returns {null|boolean}
 */
// TODO implement start booking
export const startRide = request => {
    if (!request.payload.booking_id) {
        return null;
    } else {
        return false;
    }
};
