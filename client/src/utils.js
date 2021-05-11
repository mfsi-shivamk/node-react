export function isInvalidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? false : `Email is not valid`;
}

export const isInvalidLength = (key, str, n, m) => (str.length < n) ? `${key} must be of min ${n} characters` : (str.length > m) ? `${key} must be of max ${m} characters` : false;
