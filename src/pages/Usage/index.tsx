import React, { Component } from 'react';
import { BarChart } from 'react-native-chart-kit';
import _ from 'lodash';
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
import { useSelector } from '@models';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const Usage = () => {
  const dpState = useSelector(state => state.dpState);
  const dpSchema = useSelector(state => state.devInfo.schema);
  if (_.isEmpty(dpState)) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View flexDirection="row" style={{ justifyContent: 'center' }}>
        <Text style={styles.heading}>Water usage</Text>
        <Text style={styles.normalText}>(litres)</Text>
      </View>
      <ScrollView horizontal={true}>
        <BarChart
          data={data}
          width={windowWidth * 2}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </ScrollView>
      <View style={styles.block}>
        <Text>Lastest Usage</Text>
        <Text>{dpState['Flow']} Litres</Text>
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 25,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: '500',
  },
  normalText: {
    fontSize: 23,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: '400',
  },
  chartContainer: {
    height: 200,
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
    marginBottom: 20,
  },
});

export default Usage;
