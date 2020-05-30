/**
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
};

/**
 * Helper function to convert degree to radian
 * @param deg
 * @returns {number}
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * @param Coordinate
 * @returns {boolean|boolean}
 */
export const validateCoordinate = Coordinate => {
    if (Coordinate.length !== 2) {
        return false;
    }
    const latitude = parseFloat(Coordinate[0]);
    const longitude = parseFloat(Coordinate[1]);
    return Number(latitude) === latitude && Number(longitude) === longitude;
};

/**
 * @param coordinateString
 * @returns {{message: string}|{latitude: number, longitude: number}}
 */
export const getLatitudeLongitude = coordinateString => {
    if (!coordinateString) {
        return { message: 'invalid coordinate string' };
    } else {
        coordinateString = coordinateString.split(',');
        if (coordinateString.length !== 2) {
            return { message: 'invalid coordinate string' };
        } else {
            return {
                latitude: parseFloat(coordinateString[0]),
                longitude: parseFloat(coordinateString[1])
            };
        }
    }
};
