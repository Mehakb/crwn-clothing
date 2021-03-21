import { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { CustomButton } from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

const SignIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSumbit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(formData.email, formData.password);
            setFormData({ email: "", password: "" });
        } catch (error) { console.error(error) }
    }


    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={(e) => handleSumbit(e)}>
                <FormInput name="email" label="email" type="email" value={formData.email} handleChange={(e) => setFormData({ ...formData, "email": e.target.value })} required />
                <FormInput name="password" label="password" type="password" value={formData.password} handleChange={(e) => setFormData({ ...formData, "password": e.target.value })} required />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;