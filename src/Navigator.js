import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Calendar from './calendar';
import useStyle from './@common/useStyle';
import Statistics from './statistics';
import Settings from './settings';

const makeTabBarLabel =
  (title, selectedColor, unSelectedColor) =>
  ({focused}) =>
    (
      <Text
        style={{
          color: focused ? selectedColor : unSelectedColor,
          fontSize: 11,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    );

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const {backgroundColor, unSelectedColor, selectedColor} = useStyle();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon({focused}) {
          let name;
          switch (route.name) {
            case 'Calendar':
              name = 'calendar-check';
              break;
            case 'Statistics':
              name = 'chart-pie';
              break;
            case 'Settings':
              name = 'bars';
              break;
            default:
              console.error('없는 탭 이름 입니다.');
          }

          return (
            <Icon
              name={name}
              size={27}
              color={focused ? selectedColor : unSelectedColor}
            />
          );
        },
      })}
      tabBarOptions={{style: {backgroundColor}}}
      initialRouteName="Calendar">
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: makeTabBarLabel(
            '캘린더',
            selectedColor,
            unSelectedColor,
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: makeTabBarLabel('통계', selectedColor, unSelectedColor),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: makeTabBarLabel('설정', selectedColor, unSelectedColor),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {/*<Stack.Screen name='LoginScreen' component={LoginScreen}/>*/}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
