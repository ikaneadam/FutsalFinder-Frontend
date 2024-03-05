import { Address } from '../types/Address';

export function parseAddressToString(address: Address) {
    return `${address.street || ''}, ${address.houseNumber || ''}, ${address.zip || ''}`;
}
export function parseAddressToView(address: string) {
    return <></>;
}
