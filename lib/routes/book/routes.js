// Note: Unfortunately, wurst does not work well with the ES6 default export syntax.
import {
    createBookings,
    findBookingDetails,
    findAllBookingsOfUser
} from '../../daos/bookingDao';

import {
    badImplementation,
    notFound
} from '../../../utils/responseInterceptors';
import get from 'lodash/get';
import { transformDbArrayResponseToRawResponse } from '../../../utils/transformersUtils';

module.exports = [
    {
        method: 'POST',
        path: '/create',
        options: {
            description: 'create one booking',
            notes: 'POST booking API',
            tags: ['api'],
            cors: true
        },
        handler: async request => createBookings(request)
    },
    {
        method: 'POST',
        path: '/start' /* TODO: Implement start ride API */,
        handler: request => 'start ride API'
    },
    {
        method: 'GET',
        path: '/end' /* TODO: Implement end ride API */,
        handler: request => 'End Ride API'
    },
    {
        method: 'GET',
        path: '/list',
        options: {
            description:
                'Get list of bookings created by particular user (Take one query parameter {userId})',
            notes: 'GET list of all bookings',
            tags: ['api'],
            cors: true
        },
        handler: async (request, h) => {
            const { userId } = request.query;
            return findAllBookingsOfUser(userId)
                .then(users => {
                    if (get(users.allBookings, 'length')) {
                        const totalCount = users.totalCount;
                        const allBookings = transformDbArrayResponseToRawResponse(
                            users.allBookings
                        ).map(booking => booking);

                        return h.response({
                            results: allBookings,
                            totalCount
                        });
                    }
                    return notFound('No bookings found');
                })
                .catch(error => badImplementation(error.message));
        }
    },
    {
        method: 'GET',
        path: '/details',
        options: {
            description:
                'Get booking details (Enter {bookingId} in query parameter)',
            notes:
                'This will return specific bookings like source and destination, cab_number, userId',
            tags: ['api'],
            cors: true
        },
        handler: (request, h) => {
            const bookingId = request.query.bookingId;
            return findBookingDetails(bookingId).then(booking => {
                if (!booking) {
                    return notFound(`No booking was found for id ${bookingId}`);
                }
                return h
                    .response({
                        details: booking
                    })
                    .code(200);
            });
        }
    }
];
