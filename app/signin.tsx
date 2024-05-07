import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, Paragraph, Spacer, XStack, YStack } from 'tamagui';

import { PhoneInput } from '@/components/PhoneInput';

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async () => {
    try {
      const fullPhoneNumber = `+62${phoneNumber}`;

      const { supportedFirstFactors } = await signIn!.create({
        identifier: fullPhoneNumber,
      });
      const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
        return factor.strategy === 'phone_code';
      });

      const { phoneNumberId } = firstPhoneFactor;

      await signIn!.prepareFirstFactor({
        strategy: 'phone_code',
        phoneNumberId,
      });

      router.push({
        pathname: '/verify/[phone]',
        params: { phone: fullPhoneNumber, signin: 'true' },
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_not_found') {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} onTouchStart={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <YStack gap="$5">
          <H2>Let's get started!</H2>
          <Paragraph color="gray">
            Enter your phone number. We will send you a confirmation code there
          </Paragraph>
          <XStack gap="$3">
            <PhoneInput value="+62" />
            <PhoneInput
              flex={1}
              placeholder="Phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </XStack>
        </YStack>

        <Spacer flex />
        <Button borderRadius="$10" backgroundColor="$blue10" color="white">
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Page;
