import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
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
};
