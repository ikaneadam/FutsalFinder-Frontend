type ButtonProps = {
    onClick: () => void;
    text: string;
    isDisabled: boolean;
    styling?: React.CSSProperties;
};

export default function DefaultButton(props: ButtonProps) {
    const { onClick, text, styling, isDisabled } = props;

    const buttonStyle: React.CSSProperties = {
        backgroundColor: isDisabled ? '#8cb2e6' : '#335FFF',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: isDisabled ? 'default' : 'pointer',
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
