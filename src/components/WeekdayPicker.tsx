import { useState } from 'react';
import * as React from 'react';
import { TYSdk, Utils, IconFont, Divider } from 'tuya-panel-kit';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SwitchButton from './SwitchButton';
import _ from 'lodash';
import icons from 'icons';
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button';
// import SvgUri from 'react-native-svg-uri';
// import RightArrow from '../img/svg/chevronright.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const multipleGroupData = [
  { value: 'Sun' },
  { value: 'Mon' },
  { value: 'Tue' },
  { value: 'Wed' },
  { value: 'Thi' },
  { value: 'Fri' },
  { value: 'Sat' },
];
const ios_blue = '#007AFF';

type blockProps = {
  planId: number;
  planName: string;
  subPlanName: string;
  startTime: string;
  duration: string;
  selectedDay: any;
  active: boolean;
};

const weekdayPicker = (BlockProps: blockProps) => {
  let selectedValues1 = [];
  const [defualtSelectedIndex, setDefualtSelectedIndex] = useState(BlockProps.selectedDay);

  defualtSelectedIndex.map(item => {
    selectedValues1.push(multipleGroupData[item].value);
  });

  const [multipleSelectedData_group, setMultipleSelectedData_group] = useState(selectedValues1);
  const [switchActive, setSwitchActive] = useState(BlockProps.active);

  const weekValuesChange = selectedValues => {
    setMultipleSelectedData_group(selectedValues);
  };

  const navToSetPlanning = () => {
    TYSdk.Navigator.push({ id: 'setPlanning' });
  };

  return (
    <View style={[styles.block]}>
      <TouchableOpacity onPress={() => navToSetPlanning()}>
        <View flexDirection="row" style={{ alignItems: 'center' }}>
          <Text color="red" flex={1} style={styles.blockBigText}>
            {BlockProps.planName}
          </Text>
          <Text color="red" flex={1} style={styles.normalText}>
            {BlockProps.subPlanName}
          </Text>
          <View flex={6}></View>
          {/* <SvgUri
            width="40"
            height="40"
            fill="black"
            source={require('../img/svg/chevronright.svg')}
          /> */}
        </View>
        <Divider height={1} />
      </TouchableOpacity>
      <View flexDirection="row" style={{ paddingTop: 10 }}>
        <Text style={styles.blockSmallText}>Start:</Text>
        <Text style={styles.blockSmallText}>{BlockProps.startTime}</Text>
        <Text style={styles.blockSmallText}>Duration</Text>
        <Text style={styles.blockSmallText}>{BlockProps.duration}</Text>
        <View flex={1}></View>
        <SwitchButton
          accessibilityLabel="switch"
          value={switchActive}
          onValueChange={value => setSwitchActive(value)}
          onTintColor="#44DB5E"
          onThumbTintColor="#fff"
        />
      </View>
      <View>
        <SelectMultipleGroupButton
          defaultSelectedIndexes={defualtSelectedIndex}
          containerViewStyle={{ justifyContent: 'center', padding: 0 }}
          highLightStyle={{
            borderColor: 'white',
            backgroundColor: '#F5F5F5',
            textColor: 'gray',
            borderTintColor: 'white',
            backgroundTintColor: '#62C2A1',
            textTintColor: 'white',
            fontSize: 10,
          }}
          buttonViewStyle={{
            flex: 1,
            marginHorizontal: 0,
            borderRadius: 0,
            color: '#1E6738',
            paddingVertical: 5,
            borderWidth: 0.5,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onSelectedValuesChange={selectedValues => weekValuesChange(selectedValues)}
          group={multipleGroupData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: windowWidth * 0.05,
    backgroundColor: '#F8F8F8',
    height: windowHeight,
  },
  block: {
    padding: 10,
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
    marginVertical: 5,
  },
  heading: {
    margin: 10,
    fontSize: 25,
    fontWeight: '500',
  },
  normalText: {
    fontSize: 15,
    padding: 5,
  },
  blockBigText: {
    fontSize: 20,
    fontWeight: '400',
    padding: 5,
  },

  blockSmallText: {
    fontSize: 14,
    padding: 5,
  },
});
export default weekdayPicker;
