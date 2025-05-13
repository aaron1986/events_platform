import React, { useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';

export default function ContactPage() {

        const [formData, setFormData] = useState({ fname: '', email: '', password: '', repeatPassword: '', address: ''});
        const [errors, setErrors] = useState({});
        const [isSubmitted, setIsSubmitted] = useState(false);

        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

        const validate = () => {
        const errors = {};

    if (!formData.fname.trim()) {
      errors.fname = 'Name is required.';
    }

    if (!formData.address.trim()) {
        errors.address = 'Address is required.';
    }

        if (!formData.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email address.';
    }

        if (!formData.password) {
        errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
    }

        if (!formData.repeatPassword) {
        errors.repeatPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.repeatPassword) {
        errors.repeatPassword = 'Passwords do not match.';
    }

        return errors;
    };

        const SendEmail = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({ fname: '', email: '', password: '', repeatPassword: '' });
        } 
    };


    return (
        <div>
            <form onSubmit={SendEmail}>
                <h2>Please complete the form to sign up.</h2>
                <label htmlFor="fname"><span>Name <span className="required-star">*</span></span></label>
                <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleInputChange} placeholder="Enter your name.."/>
                {errors.fname && <p className="error-message">{errors.fname}</p>}

                <label htmlFor="address">Address:</label>
                <SearchBox accessToken="pk.eyJ1IjoiamFjb2IxOTg2IiwiYSI6ImNtYW1oazJkeTA5bGkya3F3MXVvamR3aWwifQ.sLzBo3c-W1TAFWIxeCcRTg" value={formData.address} onRetrieve={(res) => {
                const address = res.features[0]?.properties?.full_address || '';
                setFormData({ ...formData, address });
             }}
                onChange={(value) => {
                setFormData({ ...formData, address: value });
            }}
                placeholder="Enter your address..."/>
                {errors.address && <p className="error-message">{errors.address}</p>}
                
                <label htmlFor="email"><span>Email <span className="required-star">*</span></span></label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address.."/>
                {errors.email && <p className="error-message">{errors.email}</p>}

                <label htmlFor="password"><span>Password:<span className="required-star">*</span></span></label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password..."/>
                {errors.password && <p className="error-message">{errors.password}</p>}

                <label htmlFor="repeatPassword"><span>Repeat Password:<span className="required-star">*</span></span></label>
                <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleInputChange} placeholder="Repeat password..." />
                {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}


                <label for="dateOfBirth">Date of Birth: </label>
                <input type="date" id="dateOfBirth" name="dateOfBirth"></input>

                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                <button type="submit" className="registerbtn">Register</button>
            </form>
        </div>
    )
}