import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p><strong>Powered by:</strong> Growing Up © {currentYear}</p>
        </footer>
    );
}