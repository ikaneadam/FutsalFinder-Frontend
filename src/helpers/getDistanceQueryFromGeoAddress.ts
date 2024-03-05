import { DistanceQuery } from '../types/DistanceQuery';
import { GeoAddressApiResponse } from '../types/GeoAddress';

function isAddressFound(geoAddress: GeoAddressApiResponse) {
    return geoAddress.status === 'OK';
}

export default function getDistanceQueryFromGeoAddress(
    geoAddress: GeoAddressApiResponse,
    radius: number | string
): { isAddressFound: boolean; distanceQuery: DistanceQuery } {
    const point = geoAddress?.results[0]?.geometry?.location;
    return {
        isAddressFound: isAddressFound(geoAddress),
        distanceQuery: {
            latitude: point?.lng?.toFixed(6),
            longitude: point?.lat?.toFixed(6),
            ...(radius === '' ? {} : { radius: radius }),
        },
    };
}
