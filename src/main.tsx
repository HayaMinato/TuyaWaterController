import React from 'react';
import { StatusBar } from 'react-native';
import { Dispatch } from 'redux';
import {
  TYSdk,
  NavigatorLayout,
  NavigationOptions,
  DeprecatedNavigator,
  DeprecatedNavigatorRoute,
} from 'tuya-panel-kit';
import composeLayout from './composeLayout';
import { store, ReduxState } from './models';
import Home from './pages/home';
import Setting from './pages/setting';
import Planning from './pages/planning';
import SetPlanning from './pages/setPlanning';
import Usage from 'pages/Usage';
import { Tab, TabView } from 'react-native-elements';
import Res from '@res';
import Strings from '@i18n';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { string } from 'prop-types';

console.disableYellowBox = true;

type Props = ReduxState & { dispatch: Dispatch };
interface IState {
  selectedSlide?: number;
}
// 慎用，生成环境上不要开启，console 打印层次过深会导致性能问题
// if (__DEV__) {
//   console.log('TYSdk :', TYSdk);
// }
class MainLayout extends NavigatorLayout<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedSlide: 1,
    };
  }
  /**
   *
   * @desc hookRoute 可以在这里针对特定路由做一些控制处理，
   * 具体可控制的参数可参考 NavigationOptions 类型描述
   */
  hookRoute(route: DeprecatedNavigatorRoute): NavigationOptions {
    const routeProps: NavigationOptions = {};
    switch (route.id) {
      case 'main':
        break;
      case 'setting':
        routeProps.title = 'Setting';
        routeProps.background = {
          '3%': '#f82232',
          '90%': '#FF624C',
        };
        break;
      case 'planning':
        break;
      case 'setPlanning':
        break;
      case 'usage':
        break;
      default:
        break;
    }

    return {
      ...routeProps,
      renderStatusBar: () => <StatusBar barStyle="default" />,
    };
  }

  /**
   * @desc
   * 在此您可以通过 route 中的 ID 来判断使用哪个页面组件
   * 如果有额外的 props 需要传递给页面组件的，可以在此进行传递
   * 注意：route 参数来自于 TYSdk.Navigator.push，
   * 如果调用了 TYSdk.Navigator.push({ id: 'setting', title: 'Setting Page' });
   * 则会在推入路由栈时 hookRoute 和 renderScene 这个周期里会接受到 route = { id: 'setting', title: 'Setting Page' }，
   * 但要注意的是，首页的 route 参数是固定的，为 { 'id': 'main', 'initialRoute': true }
   *
   * @param {Object} route - route对象
   * @param {object} navigator - Navigator对象，具体使用方法可参考https://facebook.github.io/react-native/docs/0.43/navigator.html
   */
  renderScene(route: DeprecatedNavigatorRoute, navigator: DeprecatedNavigator) {
    let component;
    switch (route.id) {
      case 'main':
        component = <Home />;
        break;
      case 'setting':
        component = <Setting />;
        break;
      case 'planning':
        component = <Planning />;
        break;
      case 'setPlanning':
        component = <SetPlanning />;
        break;
      case 'usage':
        component = <Usage />;
        break;
      default:
        break;
    }

    const navToSlide = props => {
      if (this.state.selectedSlide != props.slideId) {
        TYSdk.Navigator.push({ id: props.naviName });
      }
      console.log('slideID:', props.slideId);
      this.setState({ selectedSlide: props.slideId });
    };

    const TabIconButton = props => {
      return (
        <TouchableOpacity
          onPress={() => navToSlide(props)}
          style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.selectedSlide == props.slideId ? (
              <Image source={Res[props.g_icon]} />
            ) : (
              <Image source={Res[props.b_icon]} />
            )}
          </View>
          {this.state.selectedSlide == props.slideId ? (
            <Text style={{ fontSize: 15, color: '#7EC894' }}>{props.name}</Text>
          ) : (
            <Text style={{ fontSize: 15, color: '#787878' }}>{props.name}</Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {component}
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 5,
          }}
        >
          <TabIconButton
            naviName="main"
            slideId="1"
            g_icon="power_g_icon"
            b_icon="power_b_icon"
            name="Control"
          ></TabIconButton>
          <TabIconButton
            naviName="planning"
            slideId="2"
            g_icon="calendar_g_icon"
            b_icon="calendar_b_icon"
            name="Planning"
          ></TabIconButton>
          <TabIconButton
            naviName="usage"
            slideId="3"
            g_icon="chart_g_icon"
            b_icon="chart_b_icon"
            name="Usage"
          ></TabIconButton>
        </View>
      </View>
    );
  }
}
export default composeLayout(store, MainLayout);
