import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Input, Spinner, YStack, Text } from 'tamagui';

export default function App() {
  const [inputUrl, setInputUrl] = useState('https://rvnza.tech');
  const [url, setUrl] = useState(inputUrl);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <YStack flex={1} backgroundColor="white" gap="$3">
      <Input
        value={inputUrl}
        onChangeText={setInputUrl}
        returnKeyType="go"
        autoCapitalize="none"
        onSubmitEditing={() => {
          if (inputUrl !== url) {
            setUrl(inputUrl);
            setIsLoading(true);
          }
        }}
        keyboardType="url"
        size="$5"
        marginHorizontal="$3"
      />

      <WebView
        source={{
          uri: url.startsWith('https://') || url.startsWith('http://') ? url : `https://${url}`,
        }}
        onLoad={() => setIsLoading(false)}
      />
      <LoadingView isLoading={isLoading} />
      <StatusBar style="auto" />
    </YStack>
  );
}

function LoadingView({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <YStack
        backgroundColor="rgba(0,0,0,0.5)"
        flex={1}
        fullscreen
        justifyContent="center"
        alignItems="center"
        gap="$3"
      >
        <Spinner size="large" color="white" />
        <Text color="white">Loading...</Text>
      </YStack>
    )
  );
}
