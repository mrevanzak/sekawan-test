import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useToastController } from '@tamagui/toast';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, Paragraph, Spacer, XStack, YStack } from 'tamagui';

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
      const signInAttempt = await signIn?.create({
        identifier: fullPhoneNumber,
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_not_found') {
          try {
            await signUp?.create({
              phoneNumber: fullPhoneNumber,
            });
            signUp?.preparePhoneNumberVerification();

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
        <Button
          borderRadius="$10"
          theme="blue"
          backgroundColor="$blue10"
          color="white"
          size="$5"
          onPress={() => onSubmit()}
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
