import { Button as ButtonBase, styled } from 'tamagui';

export const Button = styled(ButtonBase, {
  theme: 'blue',
  backgroundColor: '$blue10',
  borderRadius: '$10',
  color: 'white',
  size: '$6',
  disabledStyle: {
    backgroundColor: '$blue20',
  },
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});
