import LatestUploads from '@components/LatestUploads';
import OptionsModal from '@components/OptionsModal';
import PlaylistForm, {PlaylistInfo} from '@components/PlaylistForm';
import PlaylistModal from '@components/PlaylistModal';
import RecommendedAudios from '@components/RecommendedAudios';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import client, {getClient} from 'src/api/client';
import {useFetchPlaylist} from 'src/hooks/query';
import {updateNotification} from 'src/store/notification';

// import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const Home: FC<Props> = props => {
  // const {data, isLoading} = useFetchLatestAudios();

  // if (isLoading) {
  //   return (
  //     <PulseAnimationContainer>
  //       <Text style={{color: 'white', fontSize: 25}}>Loading</Text>
  //     </PulseAnimationContainer>
  //   );
  // }

  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const {data} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;

    try {
      const client = await getClient();

      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }

    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;

    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });

      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });

      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        updateNotification({message: 'New audio added', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />

      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Add to PlayList',
            icon: 'playlist-music',
            onPress: handleOnAddToPlaylist,
          },
          {
            title: 'Add to Favorite',
            icon: 'cards-heart',
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <MaterialComIcon
                size={24}
                name={item.icon}
                color={colors.PRIMARY}
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />

      <PlaylistModal
        visible={showPlaylistModal}
        onRequestClose={() => {
          setShowPlaylistModal(false);
        }}
        list={data || []}
        onCreateNewPress={() => {
          setShowPlaylistModal(false);
          setShowPlaylistForm(true);
        }}
        onPlaylistPress={updatePlaylist}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
