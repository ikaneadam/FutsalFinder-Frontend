type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
};

type Location = {
    lat: number;
    lng: number;
};

type Geometry = {
    bounds: {
        northeast: Location;
        southwest: Location;
    };
    location: Location;
    location_type: string;
    viewport: {
        northeast: Location;
        southwest: Location;
    };
};

type Result = {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
};

export type GeoAddressApiResponse = {
    results: Result[];
    status: string;
};
