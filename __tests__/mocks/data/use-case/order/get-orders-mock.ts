import { Order } from '../../../../../src/domain/models/entities/Order'
import { User } from '../../../../../src/domain/models/entities/User'
import { IGetOrders } from '../../../../../src/domain/use-cases/order/get-orders'

export class GetOrdersMock implements IGetOrders {
  async getOrders(request: IGetOrders.Request): Promise<IGetOrders.Response> {
    return [new Order('any_id', 'done', new User('any_user_id', 'any_name', 'any_email', '', 'any_phone_number', '1998-01-01', '1998-01-01'), [], '1998-01-01', '1998-01-01')]
  }
}
