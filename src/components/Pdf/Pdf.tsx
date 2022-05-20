import React from 'react';

interface PdfProps {
    pdf: string;
}

const Pdf = ({ pdf }: PdfProps) => {
    return (
        <section aria-label="PDF-beholder" className="pdf-container">
            <object className="pdf" type="application/pdf" data={'data:application/pdf;base64,' + pdf}>
                Visning av sykmelding-pdf krever en plugin
            </object>
        </section>
    );
};

export default Pdf;
