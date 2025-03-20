export interface ICart {
  cartId: string
  userId: string
  numOfCartItems: number
  totalPrice: number
  products: Product[]
  createdAt: string
  updatedAt: string
}

export interface Product {
  productId: string
  title: string
  price: number
  sizes: string[]
  stockStatus: string
  categoryId: string
  productImage: string
  colors: string[]
  availableQuantity: number
  quantity: number
}
