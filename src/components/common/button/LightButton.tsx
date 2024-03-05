import { isDisabled } from '@testing-library/user-event/dist/utils';

type ButtonProps = {
    onClick: () => void;
    text: string;
    isDisabled: boolean;
    styling?: React.CSSProperties;
};

export default function LightButton(props: ButtonProps) {
    const { onClick, text, styling, isDisabled } = props;

    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'white',
        color: '#1744e8',
        border: '1px solid #325DFA',
        padding: '8px 16px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        outline: 'none',
        width: 'auto',
        borderRadius: '20px',
        ...styling,
    };

    return (
        <button onClick={onClick} style={buttonStyle} disabled={isDisabled}>
            {text}
        </button>
    );
}
