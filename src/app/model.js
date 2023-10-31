import React, { useState, useEffect } from 'react';

const NewListModal = ({ isOpen, onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter list title');

    useEffect(() => {
        if (isOpen) {
            setInputValue('');  // Reset the input value when the modal opens
            setPlaceholder('Enter list title');  // Reset the placeholder when the modal opens
        }
    }, [isOpen]);

    const handleFocus = () => {
        setPlaceholder('');  // Remove placeholder text on focus
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setPlaceholder('Enter list title');  // Reset placeholder text if input is empty
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();  // Prevent the default action
                event.stopPropagation(); // Stop the event from propagating up
                onConfirm(inputValue);
                onClose();
            } else if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, inputValue, onClose, onConfirm]);

    const handleConfirm = () => {
        onConfirm(inputValue);
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`}>
            <div className="modal">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className="modal-input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <div className="modal-actions">
                    <button onClick={onClose} className="modal-button">Cancel</button>
                    <button onClick={handleConfirm} className="modal-button">Add List</button>
                </div>
            </div>
        </div>
    );
};

export default NewListModal;

