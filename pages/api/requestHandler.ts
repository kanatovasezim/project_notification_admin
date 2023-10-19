async function sendAuthenticatedRequest(url: string, method: string = 'GET', data: any = null) {
    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const requestOptions: RequestInitWithBody = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    const API_BASE_URL = process.env.API_BASE_URL;

    try {
        const response = await fetch(API_BASE_URL + url, requestOptions);

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
    body?: string;
}

export default sendAuthenticatedRequest;
