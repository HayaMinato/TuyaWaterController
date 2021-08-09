import React from 'react';
import { TYSdk, Utils, IconFont, Divider } from 'tuya-panel-kit';
import { useState } from 'react';
import Modal from 'react-native-modal';
import ModalContent from './components/ModalContent';
// import ContentLayout from './contentLayout';
// import ConsoleLayout from './consoleLayout';
// import { LinearGradient } from 'tuya-panel-kit';
// import { Button } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons/Icon';
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

const MainLayout = () => {
  // var modifiers = {
  //   weekend: function (weekday) {
  //     return weekday == 0 || weekday == 6;
  //   },
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navToPlanning = () => {
    TYSdk.Navigator.push({ id: 'planning' });
  };

  return (
    <View style={[{ flex: 1 }, styles.container]}>
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
      <View flexDirection="row" style={{ marginVertical: 20, justifyContent: 'center' }}>
        <View style={styles.circle}>
          <View flexDirection="row" style={{ alignItems: 'flex-end' }}>
            <View>
              <Text style={styles.litre}>5 </Text>
            </View>
            <View>
              <Text style={{ color: 'grey', fontSize: 20 }}>L</Text>
            </View>
          </View>
          <Text>lastest usage</Text>
          <View height={50} />
          <View width={windowWidth / 2}>
            <Divider height={1} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Current mode</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Closed</Text>
        </View>
      </View>
      <View flexDirection="row" style={{ marginTop: 40, justifyContent: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => toggleModal()}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>Open</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          testID={'modal'}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <ModalContent onPress={() => setModalVisible(false)} />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F8F8F8',
    height: windowHeight,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  section__mode: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: cx(16),
    paddingVertical: cy(6),
    borderRadius: cy(15),
  },
  section__quality: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: cy(11),
  },
  section__fault: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: cy(36),
    paddingHorizontal: cx(18),
    backgroundColor: '#FF813E',
  },
  quality__left: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  quality__right: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: cx(6),
    paddingHorizontal: cx(6),
  },
  text: {
    color: '#333',
  },
  text__big: {
    fontSize: cx(18),
    marginRight: cx(6),
  },
  litre: {
    color: 'grey',
    fontSize: 65,
    alignSelf: 'flex-end',
  },
});

export default MainLayout;
