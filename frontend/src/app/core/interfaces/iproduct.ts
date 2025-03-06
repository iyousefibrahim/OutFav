export interface IProduct {
    _id: string
    title: string
    price: number
    sizes: string[]
    stockStatus: string
    description: string
    category: Category
    productImage: string
    colors: string[]
    availableQuantity: number
    createdAt: string
    updatedAt: string
}

export interface Category {
    _id: string
    name: string
}

