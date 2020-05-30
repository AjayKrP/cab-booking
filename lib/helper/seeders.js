import { users, cabs } from '../models';

export const seed = () =>
    Promise.all([
        users.create({
            firstName: 'Sharan',
            lastName: 'Salian',
            email: 'sharan@wednesday.is'
        }),
        users.create({
            firstName: 'mac',
            lastName: 'mac',
            email: 'mac@wednesday.is'
        }),
        cabs.create({
            latitude: 41.773,
            longitude: 32.345,
            cab_number: 'MH-2441'
        }),
        cabs.create({
            latitude: 44.773,
            longitude: 33.345,
            cab_number: 'MH-2831'
        }),
        cabs.create({
            latitude: 40.773,
            longitude: 31.345,
            cab_number: 'MH-7332'
        }),
        cabs.create({
            latitude: 44.673,
            longitude: 33.305,
            cab_number: 'MH-2433'
        })
        // eslint-disable-next-line no-console
    ]).catch(error => console.log(error));
