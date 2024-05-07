import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonProps, SizableText, YStack, styled } from 'tamagui';

const TButton = styled(YStack, {
  alignItems: 'center',
  backgroundColor: '#6366F1',
  borderRadius: 28,
  hoverStyle: {
    backgroundColor: '#5a5fcf',
  },
  justifyContent: 'center',
  maxWidth: 500,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

export const ButtonText = styled(SizableText, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
});

export const Button = forwardRef<TouchableOpacity, ButtonProps>(({ onPress, title }, ref) => {
  return (
    <TButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </TButton>
  );
});
