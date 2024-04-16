import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from 'src/@types/audio';
import {CartData} from 'src/@types/cart';
import {subMenu} from 'src/@types/partners';
import catchAsyncError from 'src/api/catchError';
import client, {getClient} from 'src/api/client';
import {updateNotification} from 'src/store/notification';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');

  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: fetchLatest,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/recommended');

  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: fetchRecommended,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  // const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const {data} = await client('/playlist/by-profile');

  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/uploads');

  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: () => fetchUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/favorite');

  return data.audios;
};

export const useFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

export const fetchPartProductSub = async (
  id: string | undefined,
  page: number | undefined,
) => {
  const {data} = await client.get('/partnerProducts/list/' + id + '/' + page);
  console.log('>>>fetched');
  console.log(data);
  return {
    results: data.partnersProducts,
    page: page,
  };
};

export const useFetchPartProductSub = (
  productId: string | undefined,
): UseInfiniteQueryResult<InfiniteData<subMenu[]>, Error> => {
  const dispatch = useDispatch();
  return useInfiniteQuery(
    ['infinityPartProducts', productId],
    ({pageParam = 0}) => fetchPartProductSub(productId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log('nextParam>>>>>>');
        console.log(lastPage);

        // return lastPage.page + 1;
        // if (lastPage === undefined || lastPage.page === 3) return null;
        // return lastPage.page + 1;
        return lastPage.page === 2 ? null : lastPage.page + 1;
      },
      onError(err) {
        const errorMessage = catchAsyncError(err);
        dispatch(updateNotification({message: errorMessage, type: 'error'}));
      },
    },
  );
};

const fetchCartProducts = async (): Promise<CartData[]> => {
  const client = await getClient();
  const {data} = await client('/cart/getCartItems');

  return data.cartProducts;
};

export const useFetchCartProducts = () => {
  const dispatch = useDispatch();
  return useQuery(['cartProducts'], {
    queryFn: fetchCartProducts,
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
