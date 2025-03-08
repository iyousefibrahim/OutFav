export interface IReview {
    status: string
    avgRating: string
    reviewCount: number
    data: IReviewData[]
}

export interface IReviewData {
    reviewId: string
    userId: string
    productId: string
    title: string
    review: string
    rating: number
    createdAt: string
    updatedAt: string
}
