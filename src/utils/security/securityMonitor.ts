
/**
 * Security monitoring and incident detection
 */

interface SecurityEvent {
  type: 'login_attempt' | 'data_access' | 'suspicious_activity' | 'encryption_failure' | 'validation_failure';
  timestamp: number;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  ipAddress?: string;
}

interface SecurityConfig {
  maxFailedAttempts: number;
  suspiciousActivityThreshold: number;
  alertThresholds: {
    high: number;
    critical: number;
  };
}

const DEFAULT_CONFIG: SecurityConfig = {
  maxFailedAttempts: 5,
  suspiciousActivityThreshold: 10,
  alertThresholds: {
    high: 5,
    critical: 3
  }
};

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private config: SecurityConfig;
  private alertCallbacks: ((event: SecurityEvent) => void)[] = [];

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.loadEvents();
  }

  /**
   * Log a security event
   */
  logEvent(type: SecurityEvent['type'], details: string, severity: SecurityEvent['severity'] = 'low'): void {
    const event: SecurityEvent = {
      type,
      timestamp: Date.now(),
      details,
      severity,
      userAgent: navigator.userAgent,
      ipAddress: 'client-side' // Would be actual IP on server
    };

    this.events.push(event);
    this.saveEvents();
    this.checkForAlerts(event);

    console.log(`Security Event [${severity.toUpperCase()}]: ${type} - ${details}`);
  }

  /**
   * Check for security alerts based on recent events
   */
  private checkForAlerts(newEvent: SecurityEvent): void {
    const recentEvents = this.getRecentEvents(60 * 60 * 1000); // Last hour
    
    // Check for high severity events
    const highSeverityEvents = recentEvents.filter(e => e.severity === 'high');
    if (highSeverityEvents.length >= this.config.alertThresholds.high) {
      this.triggerAlert(newEvent, 'Multiple high severity security events detected');
    }

    // Check for critical events
    const criticalEvents = recentEvents.filter(e => e.severity === 'critical');
    if (criticalEvents.length >= this.config.alertThresholds.critical) {
      this.triggerAlert(newEvent, 'Critical security incidents detected');
    }

    // Check for failed login attempts
    const failedAttempts = recentEvents.filter(e => e.type === 'login_attempt' && e.details.includes('failed'));
    if (failedAttempts.length >= this.config.maxFailedAttempts) {
      this.triggerAlert(newEvent, 'Multiple failed login attempts detected');
    }
  }

  /**
   * Trigger security alert
   */
  private triggerAlert(event: SecurityEvent, message: string): void {
    console.warn(`SECURITY ALERT: ${message}`);
    this.alertCallbacks.forEach(callback => callback(event));
  }

  /**
   * Get recent security events
   */
  getRecentEvents(timeWindow: number = 24 * 60 * 60 * 1000): SecurityEvent[] {
    const cutoff = Date.now() - timeWindow;
    return this.events.filter(event => event.timestamp > cutoff);
  }

  /**
   * Get security summary
   */
  getSecuritySummary(): {
    totalEvents: number;
    recentEvents: number;
    severityBreakdown: Record<string, number>;
    topEventTypes: Array<{ type: string; count: number }>;
  } {
    const recentEvents = this.getRecentEvents();
    
    const severityBreakdown = recentEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeBreakdown = recentEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topEventTypes = Object.entries(typeBreakdown)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalEvents: this.events.length,
      recentEvents: recentEvents.length,
      severityBreakdown,
      topEventTypes
    };
  }

  /**
   * Add alert callback
   */
  onAlert(callback: (event: SecurityEvent) => void): void {
    this.alertCallbacks.push(callback);
  }

  /**
   * Clear old events to prevent memory issues
   */
  cleanup(olderThan: number = 30 * 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - olderThan;
    this.events = this.events.filter(event => event.timestamp > cutoff);
    this.saveEvents();
  }

  /**
   * Load events from storage
   */
  private loadEvents(): void {
    try {
      const stored = localStorage.getItem('security-events');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load security events:', error);
      this.events = [];
    }
  }

  /**
   * Save events to storage
   */
  private saveEvents(): void {
    try {
      localStorage.setItem('security-events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save security events:', error);
    }
  }
}

// Export singleton instance
export const securityMonitor = new SecurityMonitor();

// Convenience functions
export const logSecurityEvent = (
  type: SecurityEvent['type'], 
  details: string, 
  severity: SecurityEvent['severity'] = 'low'
) => {
  securityMonitor.logEvent(type, details, severity);
};

export const getSecuritySummary = () => securityMonitor.getSecuritySummary();
