import { Logger, ILogObj } from "tslog";

/**
 * Logger configuration based on environment
 */
const getLoggerConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";

  return {
    name: "ui-kit",
    type: (isDevelopment ? "pretty" : "json") as "pretty" | "json",
    minLevel: isTest ? 4 : isDevelopment ? 0 : 2, // test: error, dev: silly, prod: info
    hideLogPositionForProduction: !isDevelopment,
    prettyLogTemplate:
      "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t",
    prettyErrorTemplate:
      "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
    prettyLogStyles: {
      logLevelName: {
        "*": ["bold", "black", "bgWhiteBright", "dim"],
        SILLY: ["bold", "white"],
        TRACE: ["bold", "whiteBright"],
        DEBUG: ["bold", "green"],
        INFO: ["bold", "blue"],
        WARN: ["bold", "yellow"],
        ERROR: ["bold", "red"],
        FATAL: ["bold", "redBright"],
      },
      dateIsoStr: "white",
      filePathWithLine: "white",
      name: ["white", "bold"],
      nameWithDelimiterPrefix: ["white", "bold"],
      nameWithDelimiterSuffix: ["white", "bold"],
      errorName: ["bold", "bgRedBright", "whiteBright"],
      fileName: ["yellow"],
    },
  };
};

/**
 * Create logger instance
 */
const createLogger = () => {
  const config = getLoggerConfig();
  return new Logger<ILogObj>(config);
};

/**
 * Main logger instance
 */
export const logger = createLogger();

/**
 * Create a child logger with additional context
 */
export const createChildLogger = (context: Record<string, unknown>) => {
  return logger.getSubLogger(context);
};

/**
 * Logger interface for consistent usage
 */
export interface ILogger {
  silly: (message: string, ...args: unknown[]) => void;
  trace: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, error?: Error, ...args: unknown[]) => void;
  fatal: (message: string, error?: Error, ...args: unknown[]) => void;
}

/**
 * Performance logging utility
 */
export class PerformanceLogger {
  private startTime: number;
  private logger: Logger<ILogObj>;

  constructor(
    private operation: string,
    context?: Record<string, unknown>,
  ) {
    this.logger = context ? createChildLogger(context) : logger;
    this.startTime = performance.now();
    this.logger.debug(`Starting operation: ${operation}`);
  }

  end(additionalInfo?: Record<string, unknown>) {
    const duration = performance.now() - this.startTime;
    this.logger.info(`Operation completed: ${this.operation}`, {
      duration: `${duration.toFixed(2)}ms`,
      ...additionalInfo,
    });
  }

  checkpoint(checkpointName: string) {
    const duration = performance.now() - this.startTime;
    this.logger.debug(`Checkpoint ${checkpointName} in ${this.operation}`, {
      duration: `${duration.toFixed(2)}ms`,
    });
  }
}

/**
 * Convenience function to create performance logger
 */
export const startPerformanceLog = (
  operation: string,
  context?: Record<string, unknown>,
) => {
  return new PerformanceLogger(operation, context);
};

/**
 * Log levels enum for type safety
 */
export enum LogLevel {
  SILLY = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
}

/**
 * Utility functions for common logging patterns
 */
export const logUtils = {
  /**
   * Log API request/response
   */
  apiCall: (
    method: string,
    url: string,
    status?: number,
    duration?: number,
  ) => {
    const logData = {
      method,
      url,
      status,
      duration: duration ? `${duration}ms` : undefined,
    };
    if (status && status >= 400) {
      logger.error("API call failed", logData);
    } else {
      logger.info("API call", logData);
    }
  },

  /**
   * Log user action
   */
  userAction: (
    action: string,
    userId?: string,
    additionalData?: Record<string, unknown>,
  ) => {
    logger.info("User action", { action, userId, ...additionalData });
  },

  /**
   * Log component lifecycle
   */
  componentLifecycle: (
    component: string,
    lifecycle: string,
    props?: Record<string, unknown>,
  ) => {
    logger.debug("Component lifecycle", { component, lifecycle, props });
  },

  /**
   * Log error with context
   */
  errorWithContext: (error: Error, context: Record<string, unknown>) => {
    logger.error("Error occurred", {
      error: error.message,
      stack: error.stack,
      ...context,
    });
  },
};

export default logger;
