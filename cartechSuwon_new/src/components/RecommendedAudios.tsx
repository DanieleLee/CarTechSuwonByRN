import GridView from '@ui/GridView';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AudioData} from 'src/@types/audio';
import {useFetchRecommendedAudios} from 'src/hooks/query';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const RecommendedAudios: FC<Props> = ({onAudioPress, onAudioLongPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();

  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  const dummyData = new Array(6).fill('');

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <GridView
            data={dummyData}
            renderItem={item => {
              return <View style={styles.dummyAudioView} />;
            }}></GridView>
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <GridView
        data={data || []}
        renderItem={item => {
          return (
            <Pressable
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}>
              <Image style={styles.poster} source={getPoster(item.poster)} />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.audioTitle}>
                {item.title}
              </Text>
            </Pressable>
          );
        }}></GridView>

      {/* <View>
        {data?.map(item => {
          return (
            <View style={{width: '33.33%'}} key={item.id}>
              <View style={{padding: 5}}>
               
              </View>
            </View>
          );
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
  },
  dummyAudioContainer: {
    flexDirection: 'row',
  },
});

export default RecommendedAudios;
