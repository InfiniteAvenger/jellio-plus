import { ThemeProvider } from '@/components/themeProvider';
import useServerInfo from '@/hooks/useServerInfo.ts';
import ConfigFormPage from '@/pages/ConfigFormPage';
import { getBaseUrl } from '@/lib/utils';

function App() {
  const serverInfo = useServerInfo();

  if (serverInfo === undefined) {
    return null;
  }

  if (serverInfo === null) {
    // Not authenticated; send user to Jellyfin's login and return to plugin config page
    const jellyfinUrl = getBaseUrl().replace(/\/jellio$/, '');
    const returnUrl = encodeURIComponent('/configurationpage?name=Jellio');
    window.location.replace(`${jellyfinUrl}/web/#/login.html?url=${encodeURIComponent(returnUrl)}`);
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConfigFormPage serverInfo={serverInfo} />
    </ThemeProvider>
  );
}

export default App;
