import { useEffect, useState } from 'react';
import useAccessToken from '@/hooks/useAccessToken.ts';
import { getServerInfo } from '@/services/backendService.ts';
import type { ServerInfo, Maybe } from '@/types';

const useServerInfo = (): Maybe<ServerInfo> => {
  const accessToken = useAccessToken();
  const [serverInfo, setServerInfo] = useState<ServerInfo | null | undefined>();

  useEffect(() => {
    const fetchServerInfo = async (): Promise<void> => {
      // Still mounting or computing token
      if (accessToken === undefined) {
        setServerInfo(undefined);
        return;
      }

      // No token available from localStorage
      if (accessToken === null) {
        setServerInfo(null);
        return;
      }

      try {
        const info = await getServerInfo(accessToken);
        setServerInfo({
          accessToken,
          ...info,
        });
      } catch (error) {
        console.error('Failed to fetch server info with access token:', error);
        setServerInfo(null);
      }
    };

    void fetchServerInfo();
  }, [accessToken]);

  return serverInfo;
};

export default useServerInfo;
