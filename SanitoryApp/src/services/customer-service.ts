import http from '../https-common'
import ICustomer from '../models/customer'

class CustomerService {
  getAll() {
    return http.get<Array<ICustomer>>('/customers')
  }

  get(id: string) {
    return http.get<ICustomer>(`/customers/${id}`)
  }

  create(data: ICustomer) {
    return http.post<ICustomer>('/customers', data)
  }

  update(data: ICustomer, id: any) {
    return http.put<any>(`/customers/${id}`, data)
  }

  delete(id: any) {
    return http.delete<any>(`/customers/${id}`)
  }

  deleteAll() {
    return http.delete<any>(`/customers`)
  }

  findByTitle(title: string) {
    return http.get<Array<ICustomer>>(`/customers?title=${title}`)
  }
}

export default new CustomerService()
