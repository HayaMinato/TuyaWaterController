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
} from 'react-native';
import SwitchButton from '../../components/SwitchButton';
import WeekdayPicker from '../../components/WeekdayPicker';
import _ from 'lodash';
// import { Icon } from 'react-native-vector-icons/Icon';
// import WeekdayPicker from "react-weekday-picker";

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function settingPage() {
  // const [planA, setPlanA] = useState(false);
  // const [planB, setPlanB] = useState(false);
  // const [planC, setPlanC] = useState(false);
  const [delayDay, setDelayDay] = useState(0);
  const DelayDaySet = id => {
    if (id != delayDay) {
      setDelayDay(id);
    } else {
      setDelayDay(0);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ padding: windowWidth * 0.05 }}>
          <View>
            <Text style={styles.heading}>Planning</Text>
          </View>
          <WeekdayPicker
            planId={1}
            planName="Plan A"
            subPlanName="Pluse"
            startTime="18:00"
            duration="5:00"
            selectedDay={[1, 2, 3]}
            active={true}
          ></WeekdayPicker>
          <WeekdayPicker
            planId={2}
            planName="Plan B"
            subPlanName="Continuous"
            startTime="16:00"
            duration="1:00"
            selectedDay={[2, 3, 4]}
            active={true}
          ></WeekdayPicker>
          <WeekdayPicker
            planId={3}
            planName="Plan C"
            subPlanName="Pluse"
            startTime="18:00"
            duration="5:00"
            selectedDay={[1, 2, 3]}
            active={false}
          ></WeekdayPicker>
        </View>
        <View style={styles.delayBlock}>
          <Text style={styles.heading}>Delay all programs</Text>
          <View flexDirection="row">
            <TouchableOpacity
              style={delayDay == 1 ? styles.activeDayBlock : styles.unActiveDayBlock}
              onPress={() => DelayDaySet(1)}
            >
              <Text style={styles.heading}>1 Day</Text>
              <Text style={styles.blockSmallText}>delay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={delayDay == 2 ? styles.activeDayBlock : styles.unActiveDayBlock}
              onPress={() => DelayDaySet(2)}
            >
              <Text style={styles.heading}>2 Days</Text>
              <Text style={styles.blockSmallText}>delay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={delayDay == 3 ? styles.activeDayBlock : styles.unActiveDayBlock}
              onPress={() => DelayDaySet(3)}
            >
              <Text style={styles.heading}>3 Days</Text>
              <Text style={styles.blockSmallText}>delay</Text>
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
});
export default settingPage;
