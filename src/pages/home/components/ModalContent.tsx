import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CircularPicker from 'react-native-circular-picker';
// import { Example as CircularSlider } from 'react-native-elements-universe';
type Props = {
  onPress: () => any;
};

const ModalContent = (props: Props) => {
  const [price, setPrice] = useState(10);
  const handleChange = v => {
    setPrice((v * 20).toFixed(0));
  };

  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Set Duration</Text>
      <Button testID={'close-button'} onPress={props.onPress} title="Close" />
      <View>
        <CircularPicker
          size={300}
          steps={[15, 40, 70, 100]}
          gradients={{
            0: ['rgb(255, 97, 99)', 'rgb(247, 129, 119)'],
            15: ['rgb(255, 204, 0)', 'rgb(255, 214, 10)'],
            40: ['rgb(52, 199, 89)', 'rgb(48, 209, 88)'],
            70: ['rgb(0, 122, 255)', 'rgb(10, 132, 255)'],
          }}
          onChange={val => handleChange(val)}
          defaultPos={50}
        >
          <>
            <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 8, color: 'black' }}>
              {price} $
            </Text>
            <Text style={{ textAlign: 'center', color: 'black' }}>Available balance 1000 $</Text>
          </>
        </CircularPicker>
      </View>
    </View>
  );
};

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
