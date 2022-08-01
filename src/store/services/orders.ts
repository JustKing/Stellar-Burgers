import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { ORDERS_WSS } from '../../constants';
import { api } from '../../interfaces/api';

export const ordersWsApi = createApi({
  reducerPath: 'orderWsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ORDERS_WSS,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).profile.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('content-type', 'application/json;charset=UTF-8');

      return headers;
    }
  }),
  endpoints: (build) => ({
    getOrders: build.query<api.response.orders[], { anonymous: boolean; url: string }>({
      queryFn() {
        return { data: [] };
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        let url = `${ORDERS_WSS}/${arg.url}`;
        if (!arg.anonymous) {
          const token = (getState() as RootState).profile.token;
          url += `?token=${token}`;
        }
        const ws = new WebSocket(url);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data: api.response.orders = JSON.parse(event.data);
            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          const onOpenWs = () => {
            console.log('openning connection');
          };

          const onCloseWs = () => {
            console.log('closed connection');
          };

          const onErrorWs = () => {
            console.log('connection error');
          };

          ws.addEventListener('close', onCloseWs);
          ws.addEventListener('error', onErrorWs);
          ws.addEventListener('message', listener);
          ws.addEventListener('open', onOpenWs);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
        }
        await cacheEntryRemoved;
        ws.close();
      }
    })
  })
});

export const { useGetOrdersQuery } = ordersWsApi;
