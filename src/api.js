import dateFormat from 'dateformat';

const githubApiUrl = 'https://api.github.com';

const getRateLimit = async () => {
    const rateLimitUrl = `${githubApiUrl}/rate_limit`;
    const rateLimitResponse = await fetch(rateLimitUrl);

    if (!rateLimitResponse.ok) {
        throw new Error('Error occurred');
    }

    const rateLimit = await rateLimitResponse.json();

    return rateLimit;
};

const checkResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Not found');
        }

        if (response.status === 403) {
            const rateLimit = await getRateLimit();
            const { remaining, reset } = await rateLimit.resources.core;

            if (remaining === 0) {
                const formattedReset = dateFormat(new Date(reset * 1000), "HH:MM:ss dd-mm-yyyy");
                throw new Error(`API rate limit exceeded. Reset: ${formattedReset}`);
            }
        }

        throw new Error('Error occurred');
    }
};

const getUser = async (login) => {
    const userUrl = `${githubApiUrl}/users/${login}`;
    const userUrlResponse = await fetch(userUrl);
    await checkResponse(userUrlResponse);
    const user = userUrlResponse.json();

    return user;
};

const getRepos = async (login) => {
    const reposUrl = `${githubApiUrl}/users/${login}/repos?sort=updated`;
    const reposUrlResponse = await fetch(reposUrl);
    await checkResponse(reposUrlResponse);
    const repos = reposUrlResponse.json();

    return repos;
};

export { getUser, getRepos };