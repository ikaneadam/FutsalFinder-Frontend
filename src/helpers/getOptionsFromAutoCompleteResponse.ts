import { AutoCompleteResponse, Prediction } from '../types/AddressPredictionApiResponse';

export type predictionOptions = { description: string; place: string };
export default function getOptionsFromAutoCompleteResponse(
    autoCompleteResponse: AutoCompleteResponse
): predictionOptions[] {
    return autoCompleteResponse?.predictions?.map((prediction: Prediction) => {
        return {
            description: prediction.description,
            place: prediction.structured_formatting.secondary_text,
        };
    });
}
