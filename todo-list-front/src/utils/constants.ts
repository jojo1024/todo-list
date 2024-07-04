export const isDev = import.meta.env.MODE === 'development';

export const BASE_URL: string = import.meta.env.MODE === 'development' ? "http://127.0.0.1:50000" : window.location.origin;
// export const BASE_URL: string =  window.location.origin;
