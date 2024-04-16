import ItemCardContainer from '@ui/ItemCardContainer';
import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {subMenu} from 'src/@types/partners';
import {useFetchPartProductSub} from 'src/hooks/query';

interface Props {
  items: subMenu[];
  pressEvent?(type: any): void;
}

const ItemListContainer: FC<Props> = ({items, pressEvent}) => {
  /**getSubItemsData For InfinityScroll*/
  const {data, hasNextPage, fetchNextPage, isFetched} = useFetchPartProductSub(
    items[0]?._id.split('_')[0] + '_' + items[0]?._id.split('_')[1],
  );

  const loadMoreItems = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      {/** flat(): 배열안 오브젝트를 하나씩 리턴   **/}
      {data !== undefined ? (
        <FlatList
          data={
            data.pages.map(page => {
              return page.results;
            })
            // .flat()
          }
          renderItem={({item}) => (
            <ItemCardContainer
              divideMenu={item}
              listHeart={{listTitle: 'partName'}}
              cardStyle={{width: 195, marginRight: 0}}
              pressEvt={pressEvent}
            />
          )}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.4}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ItemListContainer;
