// frontend/src/data/archive/common/utils/logger.ts

/**
 * 前端日志工具
 * 支持模块标签、颜色区分、日志级别控制
 */

// 日志级别定义（数值越大优先级越高）
const LOG_LEVELS = {
  debug: 0,
  test: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5, // 静默模式，不输出任何日志
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

// 颜色配置
const Colors: Record<Exclude<LogLevel, 'silent'>, string> = {
  debug: '#7f8c8d', // 灰色
  test: '#3498db',  // 蓝色
  info: '#2ecc71',  // 绿色
  warn: '#f39c12',  // 橙色
  error: '#e74c3c', // 红色
};

// 全局配置
interface LoggerConfig {
  minLevel: LogLevel;           // 最小输出级别
  showTimestamp: boolean;       // 是否显示时间戳
  showModuleName: boolean;      // 是否显示模块名
  enabled: boolean;             // 全局开关
  moduleFilters: Set<string>;   // 只显示指定模块（空集合表示显示所有）
}

const globalConfig: LoggerConfig = {
  minLevel: 'debug',
  showTimestamp: true,
  showModuleName: true,
  enabled: true,
  moduleFilters: new Set(),
};

/**
 * 全局配置 API
 */
export const LoggerManager = {
  /** 设置最小日志级别 */
  setLevel(level: LogLevel) {
    globalConfig.minLevel = level;
  },

  /** 启用/禁用所有日志 */
  setEnabled(enabled: boolean) {
    globalConfig.enabled = enabled;
  },

  /** 设置是否显示时间戳 */
  setShowTimestamp(show: boolean) {
    globalConfig.showTimestamp = show;
  },

  /** 设置是否显示模块名 */
  setShowModuleName(show: boolean) {
    globalConfig.showModuleName = show;
  },

  /** 只显示指定模块的日志 */
  filterModules(...modules: string[]) {
    globalConfig.moduleFilters = new Set(modules);
  },

  /** 清除模块过滤，显示所有模块 */
  clearFilter() {
    globalConfig.moduleFilters.clear();
  },

  /** 获取当前配置（只读） */
  getConfig(): Readonly<LoggerConfig> {
    return { ...globalConfig, moduleFilters: new Set(globalConfig.moduleFilters) };
  },

  /** 快捷方法：只显示错误 */
  errorsOnly() {
    this.setLevel('error');
  },

  /** 快捷方法：只显示警告及以上 */
  warningsAndAbove() {
    this.setLevel('warn');
  },

  /** 快捷方法：显示所有日志 */
  showAll() {
    this.setLevel('debug');
  },

  /** 快捷方法：静默模式 */
  silent() {
    this.setLevel('silent');
  },
};

class Logger {
  private moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  /** 检查是否应该输出该级别的日志 */
  private shouldLog(level: Exclude<LogLevel, 'silent'>): boolean {
    if (!globalConfig.enabled) return false;
    if (LOG_LEVELS[level] < LOG_LEVELS[globalConfig.minLevel]) return false;
    if (globalConfig.moduleFilters.size > 0 && !globalConfig.moduleFilters.has(this.moduleName)) {
      return false;
    }
    return true;
  }

  /** 核心打印逻辑 */
  private print(level: Exclude<LogLevel, 'silent'>, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return;

    const color = Colors[level];
    const parts: string[] = [];
    const styles: string[] = [];

    // 时间戳
    if (globalConfig.showTimestamp) {
      const timestamp = new Date().toLocaleTimeString();
      parts.push(`%c[${timestamp}]`);
      styles.push('color: #95a5a6; font-size: 10px;');
    }

    // 模块名
    if (globalConfig.showModuleName) {
      parts.push(`%c[${this.moduleName}]`);
      styles.push('color: #3498db; font-weight: bold;');
    }

    // 级别
    parts.push(`%c${level.toUpperCase()}:`);
    styles.push(`color: ${color}; font-weight: bold;`);

    // 消息
    parts.push(`%c ${message}`);
    styles.push('color: inherit;');

    console.log(parts.join(' '), ...styles, ...args);
  }

  // 日志方法
  test(msg: string, ...args: any[]) { this.print('test', msg, ...args); }
  debug(msg: string, ...args: any[]) { this.print('debug', msg, ...args); }
  info(msg: string, ...args: any[]) { this.print('info', msg, ...args); }
  warn(msg: string, ...args: any[]) { this.print('warn', msg, ...args); }
  error(msg: string, ...args: any[]) { this.print('error', msg, ...args); }

  /** 创建子 logger（继承模块名前缀） */
  child(subModule: string): Logger {
    return new Logger(`${this.moduleName}:${subModule}`);
  }
}

/**
 * 创建 logger 实例
 * @param moduleName 模块/组件名称
 */
export const createLogger = (moduleName: string) => new Logger(moduleName);

/** 全局默认 logger */
export const logger = new Logger('Global');