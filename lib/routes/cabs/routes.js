import { badImplementation, notFound } from 'utils/responseInterceptors';
import {
    findOneCab,
    createCab,
    findAllCab,
    updateCab,
    deleteCab,
    getNearbyCabs
} from 'daos/cabDao';
import get from 'lodash/get';
import { transformDbArrayResponseToRawResponse } from '../../../utils/transformersUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{cabId}',
        options: {
            description: 'get one cab details by Cab Id',
            notes: 'GET Cab API',
            tags: ['api'],
            cors: true,
            plugins: {
                'hapi-rate-limit': {
                    cabPathLimit: 5,
                    expiresIn: 60000
                }
            }
        },
        handler: async request => {
            const cabId = request.params.cabId;
            return findOneCab(cabId).then(cab => {
                if (!cab) {
                    return notFound(`No user was found for id ${cabId}`);
                }
                return cab;
            });
        }
    },
    {
        method: 'POST',
        path: '/add',
        options: {
            description:
                'Create Cab (Payload - latitude, longitude, cab_number)',
            notes: 'POST Add Cab API',
            tags: ['api'],
            cors: true,
            plugins: {
                'hapi-rate-limit': {
                    cabPathLimit: 5,
                    expiresIn: 60000
                }
            }
        },
        handler: async (request, h) =>
            createCab(request)
                .then(function(cab_) {
                    if (cab_) {
                        h.response({ message: 'cab created' });
                    } else {
                        h.response({ error: 'error creating cab' });
                    }
                })
                .catch(error => badImplementation(error.message))
    },
    {
        method: 'GET',
        path: '/list',
        handler: async (request, h) => {
            const { page, limit } = request.query;
            // eslint-disable-next-line no-console
            return findAllCab(page, limit)
                .then(cabs => {
                    if (get(cabs.allCabs, 'length')) {
                        const totalCount = cabs.totalCount;
                        const allCabs = transformDbArrayResponseToRawResponse(
                            cabs.allCabs
                        ).map(user => user);
                        return h.response({
                            results: allCabs,
                            totalCount
                        });
                    }
                    return notFound('No cabs found in your area');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all cabs',
            notes: 'GET all cabs API',
            tags: ['api'],
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/nearby',
        options: {
            description:
                'get cabs nearby (query params - current latitude, longitude, distance(optional - 2 KM))',
            notes: 'GET nearby cabs API',
            tags: ['api'],
            cors: true
        },
        handler: async request => getNearbyCabs(request.query)
    },
    {
        method: 'PUT',
        path: '/update-status/{cabId}',
        options: {
            description:
                'update one cab by ID (payload - latitude, longitude, cab_number)',
            notes: 'PUT cabs API',
            tags: ['api'],
            cors: true
        },
        handler: async (request, h) => {
            const { id } = request.params;
            updateCab(request, id)
                .then(num => {
                    // eslint-disable-next-line no-console
                    console.log(num);
                    // eslint-disable-next-line eqeqeq
                    if (num === 1) {
                        h.response({
                            message: 'Cab was updated successfully.'
                        });
                    } else {
                        return notFound(
                            `Cannot update Cab with id=${id}. Maybe Cab was not found or req.payload is empty!`
                        );
                    }
                })
                // eslint-disable-next-line handle-callback-err
                .catch(error => badImplementation(error.message));
        }
    },
    {
        method: 'DELETE',
        path: '/remove/{cabId}',
        options: {
            description: 'delete one cab by ID',
            notes: 'DELETE cabs API',
            tags: ['api'],
            cors: true
        },
        handler: async (request, h) => {
            const { cabId } = request.params;
            deleteCab(cabId)
                .then(num => {
                    // eslint-disable-next-line eqeqeq
                    if (num === 1) {
                        h.response({
                            message: 'Cab Info is deleted successfully!'
                        });
                    } else {
                        h.response({
                            message: `Cannot delete Cab with id=${cabId}. Maybe Cab was not found!`
                        });
                    }
                })
                // eslint-disable-next-line handle-callback-err
                .catch(error => badImplementation(error.message));
        }
    }
];
