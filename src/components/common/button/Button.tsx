import DefaultButton from './DefaultButton';
import LightButton from './LightButton';

export enum ButtonTypes {
    defaultButton,
    LightButton,
}

type ButtonProps = {
    onClick: () => void;
    text: string;
    buttonType: ButtonTypes;
    isDisabled?: boolean;
    styling?: React.CSSProperties;
};

export default function Button(props: ButtonProps) {
    const { onClick, text, styling, buttonType, isDisabled = false } = props;
    //todo just use spread or something bruv
    //and only the styling change so this can be way easier
    const getButton = () => {
        if (buttonType === ButtonTypes.LightButton) {
            return (
                <LightButton
                    onClick={onClick}
                    text={text}
                    isDisabled={isDisabled}
                    styling={styling}
                />
            );
        }
        return (
            <DefaultButton
                onClick={onClick}
                text={text}
                isDisabled={isDisabled}
                styling={styling}
            />
        );
    };

    return getButton();
}
