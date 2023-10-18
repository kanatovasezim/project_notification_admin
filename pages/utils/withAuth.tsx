import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuthenticationStatus =  async () => {
                try {
                    const isAuthenticated = await authenticateUser();

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

            checkAuthenticationStatus();
        }, []);

        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <WrappedComponent {...props} />;
    };
};

async function authenticateUser() {
    return !! localStorage.getItem('jwt');
}
