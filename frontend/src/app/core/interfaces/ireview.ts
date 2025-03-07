export interface IReview {
}

export interface IReview {
    status: string
    avgRating: string
    reviewCount: number
    data: Data[]
}

export interface Data {
    reviewId: string
    userId: string
    productId: string
    title: string
    review: string
    rating: number
    createdAt: string
    updatedAt: string
}
