import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { EmailCodeFactor } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastController } from '@tamagui/toast';
import { LmInputRhf } from '@tamagui-extras/form';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Form, H2, Paragraph, Spacer, YStack } from 'tamagui';
import { z } from 'zod';

import { Button } from '@/components/Button';

const schema = z.object({
  email: z.string().email(),
});

export default function SignInScreen() {
  const toast = useToastController();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const methods = useForm<z.infer<typeof schema>>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit, formState } = methods;

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const { emailAddressId } = (
        await signIn?.create({
          identifier: email,
        })
      )?.supportedFirstFactors.find((factor) => {
        return factor.strategy === 'email_code' && factor.emailAddressId;
      }) as EmailCodeFactor;

      await signIn?.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId,
      });

      router.push({
        pathname: '/verify/[email]',
        params: { email, signin: 'true' },
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code !== 'form_identifier_not_found') {
          toast.show('Error', {
            message: err.errors[0].message,
            burntOptions: { preset: 'error' },
          });
        }

        if (err.errors[0].code === 'form_identifier_not_found') {
          try {
            await signUp?.create({
              emailAddress: email,
            });
            await signUp?.prepareEmailAddressVerification();

            router.push({
              pathname: '/verify/[email]',
              params: { email },
            });
          } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
              if (err.errors[0].code === 'form_identifier_not_found') {
                toast.show('Error', {
                  message: err.errors[0].message,
                  burntOptions: { preset: 'error' },
                });
              }
            }
          }
        }
      }
    }
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <YStack gap="$5">
        <H2>Let's get started!</H2>
        <Paragraph color="gray">
          Enter your email. We will send you a confirmation code there
        </Paragraph>
      </YStack>

      <Form onSubmit={onSubmit} flex={1} paddingVertical="$5">
        <LmInputRhf
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          inlineImageLeft="email"
        />
        <Spacer flex />
        <Form.Trigger asChild>
          <Button disabled={!formState.isValid} loading={formState.isSubmitting}>
            Continue
          </Button>
        </Form.Trigger>
      </Form>
    </KeyboardAvoidingView>
  );
}
