import {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

interface TableProps {
  tableState: {tableHead: string[]; widthArr: number[]};
  tableData: [];
  children?: ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
  borderStyle?: StyleProp<ViewStyle> | undefined;
  rowStyle?: StyleProp<ViewStyle> | undefined;
  headStyle?: StyleProp<ViewStyle> | undefined;
  clickEvent?(key: any, value: any): void;
}

const DefaultTable: FC<TableProps> = ({
  tableState,
  tableData,
  clickEvent,
  rowStyle,
  headStyle,
}) => {
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row
          data={tableState.tableHead}
          widthArr={tableState.widthArr}
          style={headStyle !== undefined ? headStyle : styles.head}
          textStyle={styles.text}
        />
        {tableData
          ? tableData.map(
              (rowData: (string | React.JSX.Element)[], index: number) => (
                // <TableWrapper
                //   key={index}
                //   style={rowStyle !== undefined ? rowStyle : styles.row}>
                //   {rowData.map(
                //     (
                //       cellData: string | React.JSX.Element,
                //       cellIndex: number,
                //     ) => {
                //       return (
                //         <Cell
                //           key={cellIndex}
                //           data={cellData}
                //           textStyle={styles.text}
                //           //   width={tableState.tableHead[index] + 20}
                //           style={{backgroundColor: 'green'}}
                //         />
                //       );
                //     },
                //   )}
                // </TableWrapper>
                <Row
                  key={index}
                  data={rowData}
                  widthArr={tableState.widthArr}
                  style={rowStyle !== undefined ? rowStyle : styles.row}
                  textStyle={styles.text}
                />
              ),
            )
          : null}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {
    height: 40,
    backgroundColor: '#808B97',
    borderBottom: '1px solid black',
  },
  text: {margin: 6, textAlign: 'center'},
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
    padding: 2,
    // paddingTop: 2,
    // paddingBottom: 2,
  },
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
  countBox: {
    flexDirection: 'row',
  },
  countBoxChild: {paddingLeft: 3, paddingRight: 3, border: '1px solid black'},
});

export default DefaultTable;
