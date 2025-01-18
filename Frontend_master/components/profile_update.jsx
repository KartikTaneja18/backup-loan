import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile_update.css';
// routing done
function EditProfile() {
    const [photoPreview, setPhotoPreview] = useState('');
    const navigate = useNavigate();  // React Router DOM hook to navigate between routes

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="profile-container">
            <div className="profile-form">
                <h1 className="page-title">Edit Profile</h1>
                <p className="page-description">Update your profile information and photo</p>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="profile-photo" className="label-photo">Profile Photo</label>
                        <input
                            type="file"
                            id="profile-photo"
                            name="profile-photo"
                            accept="image/*"
                            className="input-photo"
                            required
                            onChange={handleFileChange}
                        />
                        <div className="photo-preview">
                            {photoPreview && <img src={photoPreview} alt="Profile" id="photo-preview" className="photo-preview-img" />}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" name="address" rows="4" placeholder="Enter your address" required></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Save Changes</button>
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={() => navigate('/loan_dashboard')}  // Navigate to the loan_dashboard.jsx
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { EditProfile };
