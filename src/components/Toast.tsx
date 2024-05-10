import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import { CreateNativeToastOptions } from '@tamagui/toast/types/types';

import { isExpo } from '@/lib/utils';

export const Toast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
      backgroundColor="$primary"
    >
      <TamaguiToast.Title lineHeight="$1">{currentToast.title}</TamaguiToast.Title>
      {!!currentToast.message && (
        <TamaguiToast.Description color="$color">{currentToast.message}</TamaguiToast.Description>
      )}
    </TamaguiToast>
  );
};

export const useToast = (): {
  show: (title: string, options?: CreateNativeToastOptions) => void;
} => {
  const toast = useToastController();
  const ting: typeof import('@baronha/ting').toast = require('@baronha/ting').toast;

  return {
    show: (title, options) =>
      isExpo
        ? toast.show(title, options)
        : ting({
            title,
            message: options?.message,
            preset: title === 'Error' ? 'error' : 'done',
          }),
  };
};
