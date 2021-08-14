import React, { Component, useState } from 'react';
import { TYSdk, Utils, IconFont, Divider } from 'tuya-panel-kit';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button';
import _ from 'lodash';
import { useSelector } from '@models';
import { useDispatch } from 'react-redux';
import { actions } from '@models';
import BitView from 'pages/home/bitView';
import Svg, { Circle, Path, Rect, LinearGradient, Stop } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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

type Props = {
  startTime: string;
  durationTime: string;
  selectedDays: any;
  wateringType: number;
  pulseWatering: string;
  pulseBreak: string;
};
interface DpProps {
  value: string | number | boolean;
  code: string;
}

type timePickerProps = {
  title: string;
  time: string;
};
function SetPlanning(Props: Props) {
  const dispatch = useDispatch();

  const dpState = useSelector(state => state.dpState);
  const dpSchema = useSelector(state => state.devInfo.schema);
  if (_.isEmpty(dpState)) {
    return null;
  }

  let selectedValues1 = [];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const updateDpValue = (props: DpProps) => {
    const { code, value } = props;
    console.log('code', code, 'value', value);
    dispatch(actions.common.updateDp({ [code]: value }));
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  // const [defualtSelectedIndex, setDefualtSelectedIndex] = useState(Props.selectedDays);
  const [defualtSelectedIndex, setDefualtSelectedIndex] = useState([0, 1, 3]);

  defualtSelectedIndex.map(item => {
    selectedValues1.push(multipleGroupData[item].value);
  });

  const [multipleSelectedData_group, setMultipleSelectedData_group] = useState(selectedValues1);
  const [wateringType, setWateringType] = useState(Props.wateringType ? Props.wateringType : 0);

  const weekValuesChange = selectedValues => {
    setMultipleSelectedData_group(selectedValues);
  };

  const navToSetPlanning = () => {
    TYSdk.Navigator.push({ id: 'usage' });
  };

  const checkedSvg = () => {
    return (
      <Svg width="31" height="31">
        <LinearGradient id="Gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="50" y2="0">
          <Stop offset="0" stopColor="#62C2A1" stopOpacity="1" />
          <Stop offset="1" stopColor="#FCCC41" stopOpacity="1" />
        </LinearGradient>
        <Circle cx={15} cy={15} r={15} fill="url(#Gradient)" />
        <Path
          x="5"
          y="8"
          fill="none"
          stroke="#f5f5f5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M17.533 2.121l-10.6 10.6-4.812-4.82"
          data-name="Icon feather-check"
        ></Path>
      </Svg>
    );
  };
  const emptyCircleSvg = () => {
    return (
      <Svg width="32" height="32">
        <Circle x="1" y="1" cx={15} cy={15} r={15} stroke="#787878" strokeWidth="2" fill="none" />
      </Svg>
    );
  };
  const TimePickerButton = (props: timePickerProps) => {
    return (
      <TouchableOpacity style={[styles.padding_2]}>
        <View flexDirection="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.normalText}>{props.title}</Text>
          <View flexDirection="row">
            <Text style={[styles.blockSmallText, { marginRight: 40 }]}>{props.time}</Text>
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
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.padding_2}>
          <Text style={styles.blockBigText}>Plan A</Text>
        </View>
        <Divider />
        <View>
          <TimePickerButton title="Start" time="16:35" />
        </View>
        <Divider />
        <View>
          <TimePickerButton title="Duration" time="01:30" />
        </View>
        <Divider />
        <View style={{ padding: windowWidth * 0.05 }}>
          <View style={styles.block}>
            <Text style={[styles.normalText, { marginVertical: 10 }]}>Repeat</Text>
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
        <View style={{ padding: windowWidth * 0.05 }}>
          <View style={styles.block}>
            <View>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setWateringType(0)}>
                <View flexDirection="row" style={{ alignItems: 'center' }}>
                  <View flex={1}>{!wateringType ? checkedSvg() : emptyCircleSvg()}</View>
                  <View flex={6}>
                    <Text style={[styles.normalText, styles.marginLeft_1]}>Continuous</Text>
                    <Text style={styles.blockSmallText}>
                      Run the water for a continuous period and turn it off automatically.
                    </Text>
                  </View>
                  <View flex={1.5}>
                    <Svg width="60" height="16">
                      <Rect x="0" y="0" width="150" height="50" fill="#30D0DC" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <Divider />
            <View>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setWateringType(1)}>
                <View flexDirection="row" style={{ alignItems: 'center' }}>
                  <View flex={1}>{wateringType ? checkedSvg() : emptyCircleSvg()}</View>
                  <View flex={6}>
                    <Text style={[styles.normalText, styles.marginLeft_1]}>Pulse</Text>
                    <Text style={styles.blockSmallText}>
                      Give the soil time to absorb the water, better for the plants and saving
                      water.
                    </Text>
                  </View>
                  <View flex={1.5} flexDirection="row" style={{ justifyContent: 'space-between' }}>
                    <Svg width="15" height="16">
                      <Rect x="0" y="0" width="150" height="50" fill="#30D0DC" />
                    </Svg>
                    <Svg width="15" height="16">
                      <Rect x="0" y="0" width="150" height="50" fill="#30D0DC" />
                    </Svg>
                    <Svg width="15" height="16">
                      <Rect x="0" y="0" width="150" height="50" fill="#30D0DC" />
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {wateringType ? (
              <View>
                <TimePickerButton title="Watering" time="20 sec" />
                <Divider />
                <TimePickerButton title="Break" time="2 min" />
              </View>
            ) : (
              <View />
            )}
          </View>
          <View flexDirection="row" style={{ marginTop: 20, justifyContent: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={() => navToSetPlanning()}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  button: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: "grey",
    backgroundColor: '#62C2A1',
    width: windowWidth / 1.5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    margin: 10,
    fontSize: 25,
    fontWeight: '500',
  },
  normalText: {
    fontSize: 20,
    fontWeight: '500',
  },
  blockBigText: {
    fontSize: 25,
    fontWeight: '500',
    padding: 5,
  },
  blockSmallText: {
    fontSize: 14,
    padding: 5,
  },
  delayBlock: {
    width: windowWidth,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
    padding: 10,
  },
  unActiveDayBlock: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 3,
  },
  activeDayBlock: {
    flex: 1,
    backgroundColor: '#62C2A1',
    color: 'white',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 3,
  },
  padding_1: {
    padding: 10,
  },
  padding_2: {
    padding: 15,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  marginLeft_1: {
    marginLeft: 5,
  },
});
export default SetPlanning;
