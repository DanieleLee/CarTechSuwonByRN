import LatestUploads from '@components/LatestUploads';
import OptionsModal from '@components/OptionsModal';
import PlaylistForm, {PlaylistInfo} from '@components/PlaylistForm';
import PlaylistModal from '@components/PlaylistModal';
import RecommendedAudios from '@components/RecommendedAudios';
import CardContainer from '@components/CardContainer';
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

import CardRows from '@ui/CardRows';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Badge} from '@rneui/base';
import {Header as HeaderHome} from '@rneui/themed';
// import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const Home_new: FC<Props> = props => {
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

  const dummy = [
    {
      text: '가상계좌 잔액',
      style: {
        borderBottomWidth: 1,
        borderBottomColor: '#D3D4DD',
        flexDirection: 'row',
      },
      components: (
        <Pressable onPress={() => console.log('@@@')} style={{}}>
          <MaterialIcon name="more-horiz" size={15} color={colors.OVERLAY} />
        </Pressable>
      ),
    },
    {
      text: '남은잔액',
      style: {
        borderBottomWidth: 1,
        borderBottomColor: '#D3D4DD',
        flexDirection: 'row',
      },
      components: (
        <Badge
          value="1,000원"
          badgeStyle={{backgroundColor: '#D3D4DD', borderRadius: 5}}
        />
      ),
    },
    {
      text: '가상계좌 입금',
      style: {},
      components: (
        <Badge
          value="국민은행: 279801 04 243576"
          badgeStyle={{backgroundColor: '#D3D4DD', borderRadius: 5}}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderHome
        leftComponent={{
          text: '수원지의회 적립금 시스템',
          style: styles.headerHomeLeft,
        }}
        rightComponent={
          <MaterialComIcon
            size={20}
            name={'bell-outline'}
            color={colors.PRIMARY}
          />
        }
        containerStyle={{backgroundColor: '#E1E8ED'}}
      />
      <View style={styles.container}>
        {/* <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      /> */}

        <View style={styles.cardContainer}>
          <CardContainer
            rows={
              <CardRows
                data={dummy}
                rowStyle={{
                  width: 200,
                  height: 35 * dummy.length,
                  marginVertical: 20,
                  marginHorizontal: 20,
                }}
              />
            }
            size={dummy.length}
          />
        </View>
        {/* <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      /> */}

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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 15,
    backgroundColor: colors.gray1,
  },
  cardContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
  headerHomeLeft: {
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: -10, height: -3},
    textShadowRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    width: 200,
    paddingVertical: 2,
  },
});

export default Home_new;
