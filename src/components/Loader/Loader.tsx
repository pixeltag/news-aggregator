export const Loader = () => {
    return (
        <div className="spinner-container" data-testid="loader">
            <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="4" r="4" fill="#fff" />
                <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2" />
                <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4" />
                <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7" />
                <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9" />
                <circle cx="24" cy="44" r="2.5" fill="#feebbc" />
                <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af" />
                <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1" />
                <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94" />
                <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86" />
            </svg>
        </div>
    );
};