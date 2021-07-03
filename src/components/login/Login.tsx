import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useStyle from '../@common/useStyle';

function Login() {
  const {containerStyle} = useStyle();

  return (
    <SafeAreaView style={containerStyle}>
      <View>
        <Text>로그인</Text>
      </View>
    </SafeAreaView>
  );
}

export default Login;
