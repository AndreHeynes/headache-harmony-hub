
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { getSecuritySummary, securityMonitor } from '@/utils/security/securityMonitor';

export const SecurityDashboard = () => {
  const [securitySummary, setSecuritySummary] = useState(getSecuritySummary());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const updateSummary = () => {
      setSecuritySummary(getSecuritySummary());
      setLastUpdated(new Date());
    };

    // Update every 30 seconds
    const interval = setInterval(updateSummary, 30000);
    
    // Listen for security events
    securityMonitor.onAlert(() => {
      updateSummary();
    });

    return () => clearInterval(interval);
  }, []);

  const getSecurityStatus = () => {
    const { severityBreakdown } = securitySummary;
    const criticalEvents = severityBreakdown.critical || 0;
    const highEvents = severityBreakdown.high || 0;

    if (criticalEvents > 0) {
      return { status: 'critical', color: 'destructive' as const, icon: XCircle, text: 'Critical Issues Detected' };
    } else if (highEvents > 0) {
      return { status: 'warning', color: 'secondary' as const, icon: AlertTriangle, text: 'Security Warnings' };
    } else {
      return { status: 'good', color: 'default' as const, icon: CheckCircle, text: 'Security Status Good' };
    }
  };

  const clearSecurityEvents = () => {
    securityMonitor.cleanup(0); // Clear all events
    setSecuritySummary(getSecuritySummary());
  };

  const securityStatus = getSecurityStatus();
  const StatusIcon = securityStatus.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Dashboard
        </CardTitle>
        <CardDescription>
          Monitor your data security and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${
              securityStatus.status === 'critical' ? 'text-red-500' :
              securityStatus.status === 'warning' ? 'text-yellow-500' :
              'text-green-500'
            }`} />
            <div>
              <h3 className="font-medium">{securityStatus.text}</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Badge variant={securityStatus.color}>
            {securityStatus.status.toUpperCase()}
          </Badge>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg">
            <div className="text-2xl font-bold">{securitySummary.totalEvents}</div>
            <div className="text-sm text-muted-foreground">Total Security Events</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-2xl font-bold">{securitySummary.recentEvents}</div>
            <div className="text-sm text-muted-foreground">Recent Events (24h)</div>
          </div>
        </div>

        {/* Severity Breakdown */}
        {securitySummary.recentEvents > 0 && (
          <div>
            <h4 className="font-medium mb-3">Recent Event Severity</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(securitySummary.severityBreakdown).map(([severity, count]) => (
                <div key={severity} className="text-center p-2 border rounded">
                  <div className="font-semibold">{count}</div>
                  <div className="text-xs capitalize text-muted-foreground">{severity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Event Types */}
        {securitySummary.topEventTypes.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Recent Activity Types</h4>
            <div className="space-y-2">
              {securitySummary.topEventTypes.map(({ type, count }) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Features Status */}
        <div>
          <h4 className="font-medium mb-3">Security Features</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Encryption</span>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Input Validation</span>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Security Monitoring</span>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">User Authentication</span>
              <Badge variant="secondary">
                <XCircle className="h-3 w-3 mr-1" />
                Pending Database Integration
              </Badge>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearSecurityEvents}>
            Clear Event Log
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSecuritySummary(getSecuritySummary())}>
            Refresh Status
          </Button>
        </div>

        {/* Security Tips */}
        <div className="p-3 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Security Tips</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Keep your browser updated for the latest security features</li>
            <li>• Avoid accessing sensitive data on public networks</li>
            <li>• Regularly review your privacy settings</li>
            <li>• Report any suspicious activity immediately</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
