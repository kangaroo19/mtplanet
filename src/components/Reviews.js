function Reviews({reviewObj}){
    return (
        <div>{reviewObj.displayName}:{reviewObj.userReview}</div>
    )
}

export default Reviews