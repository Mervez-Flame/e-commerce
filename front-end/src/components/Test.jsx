import { useState, useEffect } from 'react';

function Test() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true); // Show success message
    };

    // Handle close button click
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Close the modal if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className === 'modal') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <p>This is a popup modal!</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form id="inquiry-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Your inquiry" required />
                <button type="submit">Submit</button>
            </form>

            {/* Success message */}
            {isFormSubmitted && (
                <div id="success-message" style={{ display: 'block' }}>
                    Form submitted successfully!
                </div>
            )}
        </div>
    );
}

export default Test;
