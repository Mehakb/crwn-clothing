import './sign-up.styles.scss';
import { useState } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { CustomButton } from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import "./sign-up.styles.scss";

const SignUp = () => {
    const [formData, setFormData] = useState({ displayName: "", email: "", password: "", confirmPassword: "" });

    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(formData.email, formData.password);
            await createUserProfileDocument(user, {displayName:formData.displayName});
            setFormData({ displayName: "", email: "", password: "", confirmPassword: "" });
        } catch (error) { console.error(error) }
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
                <FormInput name="displayName" label="Display Name" type="text" value={formData.displayName} handleChange={(e) => setFormData({ ...formData, "displayName": e.target.value })} required />
                <FormInput name="email" label="Email" type="email" value={formData.email} handleChange={(e) => setFormData({ ...formData, "email": e.target.value })} required />
                <FormInput name="password" label="Password" type="password" value={formData.password} handleChange={(e) => setFormData({ ...formData, "password": e.target.value })} required />
                <FormInput name="confirmpassword" label="Confirm Password" type="password" value={formData.confirmPassword} handleChange={(e) => setFormData({ ...formData, "confirmPassword": e.target.value })} required />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;
