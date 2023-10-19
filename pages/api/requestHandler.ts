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
    body: string;
}

export default sendAuthenticatedRequest;
