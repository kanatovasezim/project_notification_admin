async function sendAuthenticatedRequest(url, method = 'GET', data = null) {
    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const requestOptions = {
        method,
        headers,
    };

    if (data) {
        (requestOptions as RequestInitWithBody).body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, requestOptions);

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Request failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

interface RequestInitWithBody extends RequestInit {
    body: string;
}
