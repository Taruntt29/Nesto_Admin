import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteAPI,
  getAPI,
  postAPI,
  postAPIWithoutFormData,
  putAPI,
} from '../services/requests';

// get query
export const useGetQuery = (queryKey, apiEndpoint) => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    [queryKey],
    () => getAPI(apiEndpoint),
    {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: error => console.log(error),
      onSuccess: data => console.log(data),
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isSuccess,
    refetch,
  };
};

// get query with id
export const useGetQueryWithId = (
  apiEndpointQueryKey,
  apiEndpoint,
  id,
  defaultId = 'id'
) => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    // ['getById', apiEndpointQueryKey, id],
    [apiEndpointQueryKey, id],
    () => getAPI(`${apiEndpoint}?${defaultId}=${id}`),
    {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
      onError: error => console.log(error),
      onSuccess: data => console.log(data),
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isSuccess,
    refetch,
  };
};

// builder id
export const useGetQueryWithBuilderId = (
  apiEndpointQueryKey,
  apiEndpoint,
  builderId
) => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    ['getAllpropertyByBuilderId', apiEndpointQueryKey, builderId],
    () => getAPI(`${apiEndpoint}?builderId=${builderId}`),
    {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!builderId,
      onError: error => console.log(error),
      onSuccess: data => console.log(data),
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isSuccess,
    refetch,
  };
};

// delete api
export const useDeleteMutation = (apiEndpoint, invalidateQueriesKey) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(
    id => deleteAPI(`${apiEndpoint}?id=${id}`),
    {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: error => console.log(error),
      onSuccess: () => {
        queryClient.invalidateQueries([invalidateQueriesKey]);
      },
    }
  );

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
};

// use post
export const usePostMutationWithoutFormData = (
  apiEndpoint,
  invalidateQueriesKey
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data, refetch } =
    useMutation(payload => postAPIWithoutFormData(apiEndpoint, payload), {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: error => console.log(error),
      onSuccess: data => {
        console.log(`success ${data}`);
        queryClient.invalidateQueries([invalidateQueriesKey]);
      },
    });

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    refetch,
  };
};

// without form data
export const usePostMutation = (apiEndpoint, invalidateQueriesKey) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data, refetch } =
    useMutation(payload => postAPI(apiEndpoint, payload), {
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: error => console.log(error),
      onSuccess: data => {
        console.log(`success ${data}`);
        queryClient.invalidateQueries([invalidateQueriesKey]);
      },
    });

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    refetch,
  };
};

// use put
export const usePutMutation = (apiEndpoint, invalidateQueriesKey) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(
    payload => putAPI(apiEndpoint, payload),
    {
      onError: error => console.log(error),
      onSuccess: () => {
        queryClient.invalidateQueries([invalidateQueriesKey]);
      },
    }
  );

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
};
