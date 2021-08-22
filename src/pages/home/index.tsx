import React from 'react';
import _ from 'lodash';
import { TYSdk, Utils, IconFont, Divider, DpSchema, DpValue } from 'tuya-panel-kit';
import { useState, useEffect } from 'react';
import CircularPicker from 'react-native-circular-picker';
import { HcdWaveView } from '../../components/react-native-art-hcdwave';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useSelector } from '@models';
import { useDispatch } from 'react-redux';
import { actions } from '@models';
import Res from '@res';
import base64 from 'base64-js';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const circularRadius = (windowWidth - 80).toFixed(0);
interface DpProps {
  value: string | number | boolean;
  code: string;
}

const MainLayout = () => {
  const dispatch = useDispatch();
  const dpState = useSelector(state => state.dpState);
  const dpSchema = useSelector(state => state.devInfo.schema);
  let receivedBinaryArray = new Array<string>();
  console.log('dpState-->', dpState);
  console.log('dpSchema-->', dpSchema);
  if (_.isEmpty(dpState)) {
    return null;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [workStatus, setWorkStatus] = useState(dpState['WorkStatus'] ? dpState['WorkStatus'] : 0);
  const [waterTime, setWaterTime] = useState(0);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleChange = v => {
    setWaterTime(v.toFixed(0));
  };

  const updateDpValue = (props: DpProps) => {
    const { code, value } = props;
    console.log('code', code, 'value', value);
    dispatch(actions.common.updateDp({ [code]: value }));
  };

  const CurrentMode = () => {
    switch (workStatus) {
      case 0:
        return <Text style={styles.mbText}>Closed</Text>;
      case 1:
        return <Text style={styles.mbText}>Opened</Text>;
      case 2:
        return <Text style={styles.mbText}>Automatic</Text>;
      case 3:
        return <Text style={styles.mbText}>Delay</Text>;
    }
  };

  function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
      throw new Error(n + ' does not fit in a byte');
    }
    return ('000000000' + n.toString(2)).substr(-8);
  }

  const toByteArrayFromHexString = (hexVal: any) => {
    let str = hexVal.toString();
    let hexArr = new Array();
    for (let i = 0; i < str.length; i += 2) {
      hexArr.push(str[i] + '' + str[i + 1]);
    }
    for (let i = 0; i < hexArr.length; i++) {
      var hexNum = parseInt(hexArr[i], 16);
      receivedBinaryArray.push(byteString(hexNum));
    }
    console.log('Received:', receivedBinaryArray);
  };

  useEffect(() => {
    toByteArrayFromHexString(dpState['Timer1']);
  });

  return (
    <View style={styles.container}>
      <View flexDirection="row" style={styles.center}>
        <Image source={Res.battery_icon} />
        <Text
          accessibilityLabel="HomeScene_TopView_Mode"
          style={[styles.text, { fontSize: 14, marginLeft: 10 }]}
        >
          Battery Full : {dpState['BatteryCapacity']}
        </Text>
      </View>
      <View flexDirection="row" style={styles.matchCenter}>
        <View flexDirection="column" style={styles.matchCenter}>
          <Text
            accessibilityLabel="HomeScene_TopView_Mode"
            style={[styles.text, { fontSize: 20, fontWeight: '500' }]}
          >
            Next Program
          </Text>
        </View>
      </View>
      <View flexDirection="row" style={styles.matchCenter}>
        <Text accessibilityLabel="HomeScene_TopView_Mode" style={[styles.text, { fontSize: 14 }]}>
          {dpState['next_time']}
        </Text>
      </View>
      <View flexDirection="row" style={styles.circleBlock}>
        <View style={styles.circle}>
          {workStatus == 1 ? (
            <View style={{ position: 'absolute' }}>
              <HcdWaveView
                surfaceWidth={365}
                surfaceHeigth={365}
                powerPercent={waterTime}
                type="dc"
                style={{ backgrounundColor: '#FF7800' }}
              ></HcdWaveView>
            </View>
          ) : (
            <View></View>
          )}
          <View style={{ alignItems: 'center', paddingTop: windowHeight * 0.1 }}>
            <View flexDirection="row" style={{ alignItems: 'center' }}>
              <View>
                {workStatus == 1 ? (
                  <Text style={styles.litre}>{dpState['LeftTime']}</Text>
                ) : (
                  <Text style={styles.litre}>{dpState['Flow']}</Text>
                )}
              </View>
              <View style={styles.ml_1}>
                {workStatus == 1 ? <></> : <Text style={styles.lStyle}>L</Text>}
              </View>
            </View>
            {workStatus == 1 ? <Text>minutes remaining</Text> : <Text>lastest usage</Text>}
            <View height={40} />
            <View width={windowWidth * 0.6}>
              <Divider height={1} color="grey" />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Current mode</Text>
            </View>
            {CurrentMode()}
          </View>
        </View>
      </View>
      <View flexDirection="row" style={styles.buttonView}>
        {workStatus == 1 ? (
          <TouchableOpacity
            style={[styles.unactiveButton, {}]}
            onPress={() => {
              setWorkStatus(0);
              updateDpValue({ code: 'ManualSwitch', value: false });
              updateDpValue({ code: 'ManualTimer', value: 0 });
              updateDpValue({ code: 'WorkStatus', value: 0 });
            }}
          >
            <Text style={styles.unactiveText}>Close</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.activeButton} onPress={() => toggleModal()}>
            <Text style={styles.openTextStyle}>Open</Text>
          </TouchableOpacity>
        )}
      </View>
      {modalVisible ? (
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modal}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={[styles.text__big, { padding: 10 }]}>SetDuration</Text>
            <View style={styles.circle}>
              <CircularPicker
                size={300}
                steps={[15, 30, 45, 60]}
                gradients={{
                  0: ['#62C2A1', '#62C2A1'],
                }}
                strokeWidth={30}
                borderColor="#CCC"
                onChange={val => handleChange(val)}
              ></CircularPicker>

              <View style={{ position: 'absolute' }}>
                <Text style={styles.priceText}>{waterTime}</Text>
                <Text style={{ textAlign: 'center', zIndex: 1001 }}>minutes</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ marginVertical: 10 }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.activeButton, { marginVertical: 10 }]}
              onPress={() => {
                setModalVisible(false);
                setWorkStatus(1);
                updateDpValue({ code: 'ManualSwitch', value: true });
                updateDpValue({ code: 'ManualTimer', value: +waterTime });
                updateDpValue({ code: 'WorkStatus', value: 1 });
              }}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  center: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 1000,
    borderColor: '#111',
    backgroundColor: 'white',
    width: windowWidth - 80,
    height: windowWidth - 80,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBlock: {
    marginVertical: 20,
    justifyContent: 'center',
    zIndex: 1,
    padding: 5,
  },
  modal: {
    backgroundColor: '#00000055',
    width: windowWidth,
    height: windowHeight,
    zIndex: 999,
  },
  mbText: {
    fontSize: 20,
    fontWeight: '500',
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: windowHeight * 0.1,
  },
  activeButton: {
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
  unactiveButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    width: windowWidth / 1.5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonView: {
    marginVertical: 0,
    justifyContent: 'center',
    zIndex: 1,
    padding: 10,
  },
  matchCenter: {
    justifyContent: 'center',
    marginVertical: 5,
  },
  ml_1: {
    marginLeft: 5,
  },
  text: {
    color: '#333',
  },
  text__big: {
    fontSize: cx(22),
    fontWeight: 'bold',
    color: '#565656',
  },
  litre: {
    color: 'grey',
    fontSize: 65,
    lineHeight: 65,
  },
  priceText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 8,
    zIndex: 1001,
    color: '#787878',
  },
  lStyle: {
    color: 'grey',
    fontSize: 25,
    lineHeight: 65,
  },
  openTextStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  unactiveText: {
    fontSize: 20,
    color: '#787878',
    fontWeight: '500',
  },
});

export default MainLayout;
