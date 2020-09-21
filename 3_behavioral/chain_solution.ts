abstract class AbstractHandler<T> {
  private nextHandler: AbstractHandler<T>;

  next(handler: AbstractHandler<T>): AbstractHandler<T> {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: T): T {
    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

enum Status {Received, Pending, InProcess, Sent, Delivered }
enum Priority { Low, Medium, High, Urgent }

interface Order {
  id: number;
  itemCount: number;
  ordered: string;
  expectedDelivery: string;
  status: Status,
  priority: Priority;
}
const orders: Order[] = [
  {
    id: 1,
    itemCount: 3,
    ordered: '08/12/2020',
    expectedDelivery: '9/15/2020',
    status: Status.Pending,
    priority: Priority.Low
  },
  {
    id: 2,
    itemCount: 15,
    ordered: '06/10/2020',
    expectedDelivery: '8/15/2020',
    status: Status.Pending,
    priority: Priority.High
  },
  {
    id: 3,
    itemCount: 1,
    ordered: '08/12/2020',
    expectedDelivery: '9/15/2020',
    status: Status.Sent,
    priority: Priority.Low
  },
]

class OrderManager {
  private readonly orders: Order[];

  constructor(orders:Order[]) {
    this.orders = orders;
  }

  process(handler: AbstractHandler<Order>) {
    for(const order of this.orders) {
      handler.handle(order);
    }
  }
}

// concrete handlers
class ValidateOrder extends AbstractHandler<Order> {
  handle(request: Order): Order {
    if(!request.id) {
      return null;
    }
    console.log('order id valid:' + request.id);
    return super.handle(request);
  }
}
class OrderStatus extends AbstractHandler<Order> {
  handle(request: Order): Order {
    if(request.status === Status.Received) {
      console.log('Status.Received');
      return null;
    }
    console.log('Status check complete');
    return super.handle(request);
  }
}

const orderValidator = new ValidateOrder();
const statusCheck = new OrderStatus();

orderValidator.next(statusCheck)

const orderManager = new OrderManager(orders);
orderManager.process(orderValidator)
