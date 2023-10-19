import {Box, Button, Input, Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useRouter} from "next/router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please provide both username and password.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Use the state variables directly

            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data.data);
                await router.push("/");
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while trying to login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box width={'inherit'} display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Input
                margin={1}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                margin={1}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Text color="red">{error}</Text>}
            <Button margin={2} onClick={handleLogin} isLoading={isLoading}>
                Login
            </Button>
        </Box>
    );
}
