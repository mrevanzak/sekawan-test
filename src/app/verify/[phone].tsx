import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useToastController } from '@tamagui/toast';
import { useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { H2, Paragraph, YStack } from 'tamagui';

const CELL_COUNT = 6;

const Page = () => {
  const toast = useToastController();

  const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
  const [code, setCode] = useState('');
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === 'true') {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
      toast.show('Success', {
        message: 'You have successfully signed up',
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn?.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      });
      await setActive!({ session: signIn?.createdSessionId });
      toast.show('Success', {
        message: 'You have successfully signed in',
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
    }
  };

  return (
    <YStack>
      <H2>6-digit code</H2>
      <Paragraph>Code sent to {phone} unless you already have an account</Paragraph>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          </Fragment>
        )}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
});
export default Page;
