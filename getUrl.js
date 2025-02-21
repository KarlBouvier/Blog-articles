const dev = true;

export const getUrl = () => {
    if (dev) {
        return 'http://localhost:5050';
    } else {
        return 'https://mon-site.com';
    }
}