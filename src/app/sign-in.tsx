import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { PhoneCodeFactor } from '@clerk/types';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { H2, Paragraph, Spacer, XStack, YStack } from 'tamagui';

import { Button } from '@/components/Button';
import { PhoneInput } from '@/components/PhoneInput';

export default function SignInScreen() {
  const toast = useToastController();
  const [phoneNumber, setPhoneNumber] = useState('');
  const fullPhoneNumber = `+62${phoneNumber}`;

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  async function onSubmit() {
    try {
      console.log('fullPhoneNumber', fullPhoneNumber);
      const { phoneNumberId } = (
        await signIn?.create({
          identifier: fullPhoneNumber,
        })
      )?.supportedFirstFactors.find((factor) => {
        return factor.strategy === 'phone_code' && factor.phoneNumberId;
      }) as PhoneCodeFactor;

      await signIn?.prepareFirstFactor({
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
          try {
            await signUp?.create({
              phoneNumber: fullPhoneNumber,
            });
            await signUp?.preparePhoneNumberVerification();

            router.push({
              pathname: '/verify/[phone]',
              params: { phone: fullPhoneNumber },
            });
          } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
              if (err.errors[0].code === 'form_identifier_not_found') {
                toast.show('Error', {
                  message: err.errors[0].message,
                });
              }
            }
          }
        }
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <YStack gap="$5">
        <H2>Let's get started!</H2>
        <Paragraph color="gray">
          Enter your phone number. We will send you a confirmation code there
        </Paragraph>
        <XStack gap="$3">
          <PhoneInput value="+62" disabled />
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
      <Button onPress={() => onSubmit()} disabled={!phoneNumber}>
        Continue
      </Button>
    </KeyboardAvoidingView>
  );
}
