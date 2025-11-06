import axios from 'axios';
import { getBaseUrl, getOrCreateDeviceId } from '@/lib/utils';
import type { Library } from '@/types';

export const getServerInfo = async (
  token?: string,
): Promise<{ serverName: string; libraries: Library[] }> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      const deviceId = getOrCreateDeviceId();
      headers['Authorization'] = `MediaBrowser Token="${token}"`;
      headers['X-Emby-Token'] = token;
      headers['X-Emby-Authorization'] = `MediaBrowser Client="Jellio", Device="Web", DeviceId="${deviceId}", Version="0.0.0", Token="${token}"`;
    }

    const response = await axios.get(`${getBaseUrl()}/server-info`, {
      headers,
      withCredentials: true, // Include cookies for Jellyfin session auth
    });

    return {
      serverName: response.data.name,
      libraries: response.data.libraries.map(
        (lib: { Name: string; Id: string; CollectionType: string }) => {
          return { name: lib.Name, key: lib.Id, type: lib.CollectionType };
        },
      ),
    };
  } catch (error) {
    console.error('Error while getting server info:', error);
    throw error;
  }
};

export const startAddonSession = async (token?: string): Promise<string> => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      const deviceId = getOrCreateDeviceId();
      headers['Authorization'] = `MediaBrowser Token="${token}"`;
      headers['X-Emby-Token'] = token;
      headers['X-Emby-Authorization'] = `MediaBrowser Client="Jellio", Device="Web", DeviceId="${deviceId}", Version="0.0.0", Token="${token}"`;
    }

    const response = await axios.post(`${getBaseUrl()}/start-session`, null, {
      headers,
      withCredentials: true,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Error starting new session:', error);
    throw error;
  }
};
