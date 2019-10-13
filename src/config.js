export const isProd = false;
// export const host = 'http://xz.airtlab.com/api';
export const host = 'http://localhost:8003';
// export const host = 'http://10.0.60.123:8003'
export const wsHost = isProd ? 'ws://xz.airtlab.com:8005' : 'ws://127.0.0.1:8003';