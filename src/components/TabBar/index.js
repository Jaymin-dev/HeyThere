import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';
import style from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {brandColors, fontScale, horizontalScale} from '../Core/basicStyles';

const TabBar = ({state, navigation}) => {
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  const animateSlider = index => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: horizontalScale(10),
      useNativeDriver: true,
      bounciness: 15,
    }).start();
  };

  const BottomMenuItem = ({iconName, isCurrent}) => {
    const color = isCurrent
      ? iconName === 'Map'
        ? brandColors.barColor
        : brandColors.buttonColor
      : brandColors.placeHolder;
    return (
      <View style={style.bottomMenuView}>
        {iconName === 'Map' ? (
          <FontAwesome5 name="map" color={color} size={fontScale(20)} />
        ) : (
          <FontAwesome name="wechat" color={color} size={fontScale(20)} />
        )}
        <Text style={[style.text, {color: color}]}>{iconName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[style.tabContainer, {width: totalWidth}]}>
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{translateX: translateValue}],
              width: horizontalScale(40),
              marginLeft: horizontalScale(60),
            },
            state.index === 1 && {backgroundColor: brandColors.timeColor},
          ]}
        />
        {state.routes.map((route, index) => {
          const {name: options} = route;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            animateSlider(index);
          };
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, marginBottom: horizontalScale(10)}}
              key={index}>
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
