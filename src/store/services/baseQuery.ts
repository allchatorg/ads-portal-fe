import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL && process.env.NEXT_PUBLIC_BACKEND_URL.length > 0
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : 'http://nocw0kowww8ko8swk048c8w4.23.137.253.173.sslip.io';

export const baseQuery = fetchBaseQuery({
    baseUrl: `${backendUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth: { token: string | null } }).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});
