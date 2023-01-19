import React, { useState } from 'react';

export default function useLocation() {
    const [error, setError] = useState(null);
    const [latlng, setLatlng] = useState({ lat: null, lng: null });
    const [loading, setLoading] = useState(false);

    const onSuccess = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatlng({ lat, lng });
        setLoading(false);
    };

    const onError = () => {
        setError('Unable to retrieve your location');
        setLoading(false);
    };

    const getLatlng = () => {
        setLoading(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        latlng,
        getLatlng,
    };
}
