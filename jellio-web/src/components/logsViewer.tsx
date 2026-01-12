import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, RefreshCw, Trash2 } from 'lucide-react';
import { getLogs, clearLogs, type LogEntry } from '@/services/backendService';

interface LogsViewerProps {
  accessToken?: string;
}

export const LogsViewer: FC<LogsViewerProps> = ({ accessToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchLogs = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const fetchedLogs = await getLogs(accessToken, 100);
      setLogs(fetchedLogs);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!accessToken) return;

    try {
      await clearLogs(accessToken);
      setLogs([]);
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, accessToken]);

  useEffect(() => {
    if (isOpen && autoRefresh) {
      const interval = setInterval(fetchLogs, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen, autoRefresh, accessToken]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Error':
        return 'text-red-400';
      case 'Warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="w-full border rounded-lg bg-background">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">Jellio Logs</span>
          {logs.length > 0 && (
            <span className="text-sm text-muted-foreground">
              ({logs.length} entries)
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="border-t p-4 space-y-3">
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fetchLogs}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearLogs}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'Stop Auto-Refresh' : 'Auto-Refresh'}
            </Button>
          </div>
          <div className="h-96 w-full border rounded p-4 bg-black text-green-400 font-mono text-sm overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-center text-gray-500">No logs available</div>
            ) : (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </span>
                    <span className={`${getLevelColor(log.level)} whitespace-nowrap`}>
                      [{log.level}]
                    </span>
                    <span className="break-words">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

