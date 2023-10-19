import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const withAuth = (WrappedComponent: React.ComponentType) => {
    const WithAuth = (props: any) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        const checkAuthenticationStatus = async () => {
            try {
                const isAuthenticated = !!localStorage.getItem('jwt');

                if (!isAuthenticated) {
                    await router.push('/login');
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        useEffect(() => {
            checkAuthenticationStatus();
        }, []);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent checkAuthenticationStatus={checkAuthenticationStatus} {...props} />;
    };

    WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuth;
};

function getDisplayName(WrappedComponent: React.ComponentType) {
    return WrappedComponent.displayName || 'Component';
}

export default withAuth;
