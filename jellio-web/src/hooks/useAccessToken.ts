import { useEffect, useState } from 'react';
import type { Maybe } from '@/types';

const useAccessToken = (): Maybe<string> => {
  const [accessToken, setAccessToken] = useState<Maybe<string>>();

  useEffect(() => {
    try {
      const storedCredentialsString = localStorage.getItem('jellyfin_credentials');
      if (storedCredentialsString) {
        const parsed = JSON.parse(storedCredentialsString);

        // Case 1: Web client-style credentials: { Servers: [{ AccessToken }...] }
        if (parsed?.Servers && Array.isArray(parsed.Servers)) {
          const withToken = parsed.Servers.find((s: any) => s?.AccessToken);
          if (withToken?.AccessToken) {
            setAccessToken(withToken.AccessToken as string);
            return;
          }
        }

        // Case 2: Direct session-style: { AccessToken: "..." }
        if (typeof parsed?.AccessToken === 'string' && parsed.AccessToken.length > 0) {
          setAccessToken(parsed.AccessToken as string);
          return;
        }
      }
      setAccessToken(null);
    } catch (_err) {
      setAccessToken(null);
    }
  }, []);

  return accessToken;
};

export default useAccessToken;
