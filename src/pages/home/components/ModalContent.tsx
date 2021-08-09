import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
// import { Example as CircularSlider } from 'react-native-elements-universe';
type Props = {
  onPress: () => any;
};

const ModalContent: React.FC<Props> = props => (
  <View style={styles.content}>
    <Text style={styles.contentTitle}>Set Duration</Text>
    <Button testID={'close-button'} onPress={props.onPress} title="Close" />
    <View>
      {/* <CircularSlider maxAngle={90} /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircularSlider value={90} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default ModalContent;
