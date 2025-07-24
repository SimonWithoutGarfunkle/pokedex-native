import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const endpoint = "https://pokeapi.co/api/v2"

type API = {
    '/pokemon?limit=21': {
        count: number,
        next: string | null,
        results: {name: string, url: string}[]
    }
}

export function useFetchQuery<T extends keyof API>(path: T) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            return fetch(endpoint + path).then(r => r.json() as Promise<API[T]>)
        }
    })
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        queryFn: async ({ pageParam }) => {
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(r => r.json() as Promise<API[T]>);
            },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage && lastPage.next) {
                return lastPage.next;
            }
            return null;
        }
    })
}