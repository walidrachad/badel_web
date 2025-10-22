import { createIsomorphicFn } from '@tanstack/react-start'

class Logger {
	private isDev: boolean

	constructor() {
		this.isDev = process.env.NODE_ENV === 'development' // Only logs in development
	}

	log(...args: Array<unknown>): void {
		if (this.isDev) console.log('[LOG]:', ...args)
	}

	warn(...args: Array<unknown>): void {
		if (this.isDev) console.warn('[WARN]:', ...args)
	}

	error(...args: Array<unknown>): void {
		if (this.isDev) console.error('[ERROR]:', ...args)
	}

	info(...args: Array<unknown>): void {
		if (this.isDev) console.info('[INFO]:', ...args)
	}

	debug(...args: Array<unknown>): void {
		if (this.isDev) console.debug('[DEBUG]:', ...args)
	}

	table(data: Array<unknown> | Record<string, unknown>): void {
		if (this.isDev) console.table(data)
	}

	trace(...args: Array<unknown>): void {
		if (this.isDev) console.trace('[TRACE]:', ...args)
	}
}

// Export a singleton instance
const logger = new Logger()
export default logger

export const logMessage = createIsomorphicFn()
	.server((msg) => console.log(`[SERVER]: ${msg}`))
	.client((msg) => console.log(`[CLIENT]: ${msg}`))
