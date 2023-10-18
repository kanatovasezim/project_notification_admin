import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data.token);
                console.log('jwt: ' + data.token);
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error(error);
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
            <Button margin={2} onClick={handleLogin}>Login</Button>
        </Box>
    );
}
