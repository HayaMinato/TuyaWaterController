import React from 'react';
import { TYSdk, Utils, IconFont, Divider } from 'tuya-panel-kit';
import { useState } from 'react';
// import Modal from 'react-native-modal';
// import ModalContent from './components/ModalContent';
import CircularPicker from 'react-native-circular-picker';
// import ContentLayout from './contentLayout';
// import ConsoleLayout from './consoleLayout';
// import { LinearGradient } from 'tuya-panel-kit';
// import { Button } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons/Icon';
import Wave from 'react-wavify';
import { HcdWaveView } from '../../components/react-native-art-hcdwave';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const circularRadius = (windowWidth - 80).toFixed(0);
const MainLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [waterPercent, setWaterPercent] = useState(50);
  const [waterState, setWaterState] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navToPlanning = () => {
    TYSdk.Navigator.push({ id: 'planning' });
  };

  const [price, setPrice] = useState(0);
  const handleChange = v => {
    console.log('------ : ', v);
    setPrice(v.toFixed(0));
  };

  const changeNavigation = props => {
    TYSdk.Navigator.push({ id: props });
  };

  const NavigatorButton = props => {
    return (
      <TouchableOpacity onPress={() => changeNavigation(props)}>
        <View>
          <Text>111</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View flexDirection="row" style={{ marginVertical: 20, justifyContent: 'center' }}>
        <View>
          <Text accessibilityLabel="HomeScene_TopView_Mode" style={[styles.text, { fontSize: 14 }]}>
            Battery Full
          </Text>
        </View>
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
          Wednesday 18:30
        </Text>
      </View>
      <View
        flexDirection="row"
        style={{ marginVertical: 20, justifyContent: 'center', zIndex: 1, padding: 5 }}
      >
        <View style={styles.circle}>
          {waterState ? (
            <View style={{ position: 'absolute' }}>
              <HcdWaveView
                surfaceWidth={365}
                surfaceHeigth={365}
                powerPercent={waterPercent}
                type="dc"
                style={{ backgrounundColor: '#FF7800' }}
              ></HcdWaveView>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <View flexDirection="row" style={{ alignItems: 'flex-end' }}>
                <View>
                  <Text style={styles.litre}>{(60 * waterPercent) / 100}</Text>
                </View>
                <View>
                  <Text style={{ color: 'grey', fontSize: 20 }}>L</Text>
                </View>
              </View>
              <Text>lastest usage</Text>
              <View height={50} />
              <View width={windowWidth / 2}>
                <Divider height={1} color="grey" />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text>Current mode</Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>Closed</Text>
            </View>
          )}
        </View>
      </View>
      <View
        flexDirection="row"
        style={{ marginTop: 25, justifyContent: 'center', zIndex: 1, padding: 5 }}
      >
        {/* <TouchableOpacity style={styles.button} onPress={() => toggleModal()}> */}
        <TouchableOpacity style={styles.button} onPress={() => toggleModal()}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>Open</Text>
        </TouchableOpacity>
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
                <Text style={styles.priceText}>{price}</Text>
                <Text style={{ textAlign: 'center', zIndex: 1001 }}>minutes</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginVertical: 10 }]}
              onPress={() => {
                setModalVisible(false);
                setWaterState(true);
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
  bottomNavStyle: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: 60,
    backgroundColor: '#EEE',
    justifyContent: 'space-between',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
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
  modal: {
    backgroundColor: '#00000055',
    width: windowWidth,
    height: windowHeight,
    zIndex: 999,
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
  matchCenter: {
    justifyContent: 'center',
    marginVertical: 5,
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
    alignSelf: 'flex-end',
  },
  priceText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 8,
    zIndex: 1001,
    color: '#787878',
  },
});

export default MainLayout;
