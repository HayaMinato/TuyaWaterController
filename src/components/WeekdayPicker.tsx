import { useEffect, useState } from 'react';
import * as React from 'react';
import { TYSdk, Utils, IconFont, Divider } from 'tuya-panel-kit';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SwitchButton from './SwitchButton';
import icons from 'icons';

import _, { slice } from 'lodash';
import { useSelector } from '@models';
import { useDispatch } from 'react-redux';
import { actions } from '@models';
import Svg, { Circle, Path, Rect, LinearGradient, Stop } from 'react-native-svg';
import {
  toWeekArrayFromByteArray,
  toByteArrayFromHexString,
  toWeekBinaryStringFromWeekString,
  toHexStringFromBinaryArray,
} from '../pages/planning/model';
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

interface DpProps {
  value: string | number | boolean;
  code: string;
}

type blockProps = {
  planId: number;
  planName: string;
  subPlanName: string;
  startTime: string;
  duration: string;
  selectedDay: Array<number>;
  active: boolean;
};

const weekdayPicker = (BlockProps: blockProps) => {
  console.log('BlockProps:---', BlockProps);
  let selectedValues1 = [];
  const [defualtSelectedIndex, setDefualtSelectedIndex] = useState<Object>([]);
  const [switch1Active, setSwitch1Active] = useState<boolean>(false);
  const [switch2Active, setSwitch2Active] = useState<boolean>(false);
  const [switch3Active, setSwitch3Active] = useState<boolean>(false);

  const dispatch = useDispatch();

  const dpState = useSelector(state => state.dpState);
  const dpSchema = useSelector(state => state.devInfo.schema);

  const [startHour, setStartHour] = useState(20);
  const [startMin, setStartMin] = useState(0);
  const [workingHour, setWorkingHour] = useState(1);
  const [workingMin, setWorkingMin] = useState(0);
  const [planId, setPlanId] = useState(0);

  if (_.isEmpty(dpState)) {
    return null;
  }
  // defualtSelectedIndex.map(item => {
  //   selectedValues1.push(multipleGroupData[item].value);
  // });

  const [multipleSelectedData_group, setMultipleSelectedData_group] = useState(selectedValues1);

  const weekValuesChange = selectedValues => {
    setMultipleSelectedData_group(selectedValues);
    console.log('LiveWeek:', toWeekBinaryStringFromWeekString(selectedValues, switch1Active));

    const updatedHexVal = toHexStringFromBinaryArray(
      toWeekBinaryStringFromWeekString(selectedValues, switch1Active),
      5,
      dpState['Timer1'].toString()
    );
    updateDpValue({ code: 'Timer1', value: updatedHexVal });
  };

  const navToSetPlanning = () => {
    TYSdk.Navigator.push({ id: 'setPlanning', planId: BlockProps.planId });
  };

  const updateDpValue = (props: DpProps) => {
    const { code, value } = props;
    dispatch(actions.common.updateDp({ [code]: value }));
  };

  useEffect(() => {
    setSwitch1Active(BlockProps.active);
    setDefualtSelectedIndex(BlockProps.selectedDay.slice());
  }, [BlockProps.active, BlockProps.selectedDay]);

  const setPlanningActive = (planIndex: number) => {
    switch (planIndex) {
      case 1:
        setSwitch1Active(BlockProps.active);
        break;
      case 2:
        setSwitch2Active(BlockProps.active);
        break;
      case 3:
        // setSwitch1Active(BlaockProps.active);
        break;
    }
  };

  console.log('ActiveFlg:', BlockProps.active);
  console.log('ActiveSwitch:', switch1Active);
  console.log('selectedDay:', BlockProps.selectedDay);
  console.log('defualtSelectedIndex:', defualtSelectedIndex);
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
          <Svg width="31" height="31">
            <Path
              x="5"
              y="8"
              fill="none"
              stroke="#787878"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1.061 12.334l5.637-5.637-5.637-5.636"
              data-name="Icon feather-chevron-right"
            ></Path>
          </Svg>
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
          value={switch1Active}
          onValueChange={value => setSwitch1Active(value)}
          onTintColor="#44DB5E"
          onThumbTintColor="#fff"
        />
      </View>
      <View>
        {console.log('>>>>', defualtSelectedIndex)}
        {console.log('>>>>', typeof defualtSelectedIndex)}
        <SelectMultipleGroupButton
          defaultSelectedIndexes={BlockProps.selectedDay}
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
          onSelectedValuesChange={selectedValues => {
            weekValuesChange(selectedValues);
          }}
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
