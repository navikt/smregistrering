import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface FormLabelProps {
    label: string;
    helpText?: string;
}

const FormLabel = ({ label, helpText }: FormLabelProps) => {
    return (
        <div className="form-label">
            {label}
            {helpText && (
                <Hjelpetekst className="form-label__help-text">
                    <div style={{ maxWidth: '20rem' }}>{helpText}</div>
                </Hjelpetekst>
            )}
        </div>
    );
};

export default FormLabel;
