import {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CountBoxProps {
  data: any;
  clicked(statKey: string, count: number): void;
}

const CountBox: FC<CountBoxProps> = ({data, clicked}) => {
  const [countVal, setCountVal] = useState(1);

  const emitClicked = (type: string) => {
    if (clicked === undefined) return;

    if (type === '+') {
      if (countVal + 1 > data) return;

      setCountVal(countVal + 1);
    } else {
      if (countVal - 1 < 1) return;

      setCountVal(countVal - 1);
    }

    clicked('count1', countVal);
  };

  return (
    <View style={styles.countBox}>
      <TouchableOpacity
        onPress={() => emitClicked('+')}
        style={styles.countBoxChild}>
        <Text style={{fontSize: 12, margin: 6}}>{'+'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.countBoxText} disabled>
        <Text style={{fontSize: 12, margin: 6}}>{countVal}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => emitClicked('-')}
        style={styles.countBoxChild}>
        <Text style={{fontSize: 12, margin: 6}}>{'-'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  countBox: {
    flexDirection: 'row',
  },
  countBoxChild: {
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  countBoxText: {
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default CountBox;
