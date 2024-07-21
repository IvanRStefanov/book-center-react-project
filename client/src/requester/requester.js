function optionsBuilder(data) {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-type': 'application/json'
        };
    }

    const user = sessionStorage.getItem('userData');
    let token;
    // console.log(user)

    if (user) {
        token = JSON.parse(user).accessToken;

        options.headers = {
            'Content-type': 'application/json',
            'X-Authorization': token
        };
    }

    return options;
}

async function request(method, url, data) {
    const response = await fetch(url, {
        method,
        ...optionsBuilder(data),
    });

    if (response.status === 204) {
        return {};
    }
    
    if (response.ok !== true) {
        throw result;
    }
    
    const result = await response.json();

    return result;
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
