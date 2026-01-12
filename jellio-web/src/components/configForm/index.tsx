import type { FC } from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { encode } from 'js-base64';
import { Clipboard, Globe, Monitor, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LibrariesField, ServerNameField, JellyseerrFieldset } from '@/components/configForm/fields';
import { formSchema } from '@/components/configForm/formSchema.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LogsViewer } from '@/components/logsViewer';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Form } from '@/components/ui/form';
import { getBaseUrl } from '@/lib/utils';
import { startAddonSession, saveConfigToServer } from '@/services/backendService';
import { useConfigStorage } from '@/hooks/useConfigStorage';
import type { ServerInfo } from '@/types';

interface Props {
  serverInfo: ServerInfo;
}

const ConfigForm: FC<Props> = ({ serverInfo }) => {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: serverInfo.serverName,
      libraries: [],
      jellyseerrEnabled: false,
      jellyseerrUrl: '',
      jellyseerrApiKey: '',
      publicBaseUrl: '',
    },
  });

  // Load and save config to localStorage and server
  const { saveConfig } = useConfigStorage(form, serverInfo.accessToken, serverInfo.libraries);

  const serverName = form.watch('serverName');

  const isHttps = window.location.protocol === 'https:';

  const handleSaveToServer = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const values = form.getValues();
      
      // Strip trailing slashes
      const stripTrailingSlash = (url: string) => url?.replace(/\/+$/, '') || '';
      
      // Save to localStorage first
      saveConfig();
      
      // Then save to Jellyfin server
      await saveConfigToServer(
        {
          jellyseerrEnabled: values.jellyseerrEnabled ?? false,
          jellyseerrUrl: stripTrailingSlash(values.jellyseerrUrl ?? ''),
          jellyseerrApiKey: values.jellyseerrApiKey ?? '',
          publicBaseUrl: stripTrailingSlash(values.publicBaseUrl ?? ''),
          selectedLibraries: values.libraries?.map((lib: { key: string }) => lib.key.replace(/-/g, '')) ?? [],
        },
        serverInfo.accessToken,
      );
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      alert('Failed to save configuration to server');
    } finally {
      setSaving(false);
    }
  };

  const handleInstall = async (action: 'clipboard' | 'web' | 'client') => {
    const values = form.getValues();
    
    // Save config to localStorage before generating addon URL
    saveConfig();
    
    // Helper to strip trailing slashes
    const stripTrailingSlash = (url: string) => url?.replace(/\/+$/, '') || '';
    
    const newToken = await startAddonSession(serverInfo.accessToken);
    const configuration: any = {
      AuthToken: newToken,
      LibrariesGuids: values.libraries.map((lib) =>
        lib.key.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5'),
      ),
      ServerName: serverInfo.serverName,
    };
    if (values.jellyseerrEnabled && values.jellyseerrUrl) {
      configuration.JellyseerrEnabled = true;
      configuration.JellyseerrUrl = stripTrailingSlash(values.jellyseerrUrl);
      if (values.jellyseerrApiKey) configuration.JellyseerrApiKey = values.jellyseerrApiKey;
    }
    if (values.publicBaseUrl) {
      configuration.PublicBaseUrl = stripTrailingSlash(values.publicBaseUrl);
    }
    const encodedConfiguration = encode(JSON.stringify(configuration), true);
    const addonUrl = `${getBaseUrl()}/${encodedConfiguration}/manifest.json`;
    if (action === 'clipboard') {
      navigator.clipboard.writeText(addonUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } else if (action === 'web') {
      window.location.href = `https://web.stremio.com/#/addons?addon=${encodeURIComponent(addonUrl)}`;
    } else {
      window.location.href = addonUrl.replace(/https?:\/\//, 'stremio://');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-2 p-2 rounded-lg border">
        <ServerNameField form={form} />
        <LibrariesField
          form={form}
          serverName={serverName}
          libraries={serverInfo.libraries}
        />
        <JellyseerrFieldset form={form} />
        <div className="p-3">
          <LogsViewer accessToken={serverInfo.accessToken} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-3">
          <Button
            type="button"
            variant="outline"
            className="w-full max-w-md"
            onClick={handleSaveToServer}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saved ? 'Saved to Jellyfin!' : saving ? 'Saving...' : 'Save Configuration to Jellyfin'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-11 rounded-md px-8 text-xl"
                disabled={copied}
              >
                {copied ? 'Copied' : 'Install'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                onSelect={() => void handleInstall('clipboard')}
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Copy install URL
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => void handleInstall('web')}>
                <Globe className="mr-2 h-4 w-4" />
                Install in Stremio web
              </DropdownMenuItem>
              {isHttps && (
                <DropdownMenuItem onSelect={() => void handleInstall('client')}>
                  <Monitor className="mr-2 h-4 w-4" />
                  Install in Stremio client
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </Form>
  );
};

export default ConfigForm;
