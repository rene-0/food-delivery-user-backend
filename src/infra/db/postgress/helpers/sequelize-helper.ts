import { Dialect, Sequelize } from "sequelize"
import databaseConfig from "../config/database-config"

export class SequelizeHelper  {
	static instance: SequelizeHelper
	sequelize?: Sequelize
	
	private constructor (
		private readonly dialect: Dialect = databaseConfig.development.dialect,
		private readonly database = databaseConfig.development.database,
		private readonly username = databaseConfig.development.username,
		private readonly password = databaseConfig.development.password,
		private readonly host = databaseConfig.development.host,
	) {}

	/**
	 * Connects to an sequelize database and creates an SequelizeHelper instance and returns it
	 * @returns Returns the SequelizeHelper instance
	 */
	static async connect(): Promise<SequelizeHelper> {
		if (SequelizeHelper.instance) {
			return this.instance
		}
		console.log('databaseConfig.development.password', databaseConfig.development.password, typeof databaseConfig.development.password)
		this.instance = new SequelizeHelper()
		SequelizeHelper.instance.sequelize = new Sequelize({
			database: SequelizeHelper.instance.database,
			dialect: SequelizeHelper.instance.dialect,
			username: SequelizeHelper.instance.username,
			password: SequelizeHelper.instance.password,
			host: SequelizeHelper.instance.host,
			logging: false
		})
		await SequelizeHelper.instance.sequelize.authenticate()
		console.log('Connected to the database!')
		console.log('  Database:', SequelizeHelper.instance.database)
		console.log('  Host:', SequelizeHelper.instance.host)
		return this.instance
	}
}