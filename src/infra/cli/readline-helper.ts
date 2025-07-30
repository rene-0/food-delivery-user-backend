import readline, { Interface } from 'readline'

export class ReadLineHelper {
	instance: ReadLineHelper
	readline: Interface

	private constructor () {
		this.readline = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: '> '
		})
	}

	init(): ReadLineHelper {
		if (this.instance) {
			return this.instance
		}
		this.instance = new ReadLineHelper()
		this.readline.prompt()
		this.readline.on('close', () => {
			console.log('👋 Finalizando CLI...')
			process.exit(0)
		})
		return this.instance
	}
}

// rl.on('line', (line) => {})