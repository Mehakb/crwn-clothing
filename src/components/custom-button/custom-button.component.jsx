import "./custom-button.styles.scss";

export const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button className={`${inverted ? "inverted" : ""} custom-button`} {...otherProps}>
        {children}
    </button>
)