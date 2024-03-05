export default function parseDistanceToReadableString(distanceInMeters: number) {
    const distanceInKilometers = distanceInMeters / 1000;

    if (distanceInMeters < 1) {
        return `${Math.round(distanceInMeters)} M`;
    }
    if (distanceInMeters >= 1000 && distanceInMeters < 100000) {
        return `${Math.round(distanceInKilometers * 10) / 10} Km`;
    }

    return `${Math.round(distanceInKilometers)} Km`;
}
