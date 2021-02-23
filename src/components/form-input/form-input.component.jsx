import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {label ? <label className={`${otherProps.value.length ? "shrnk" : ''} form-input-label`}>
            {label}
        </label> : null}
    </div>
)

export default FormInput;