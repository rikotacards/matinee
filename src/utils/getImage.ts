export const getImage = (posterPath?: string) => {
    if(!posterPath){
        return undefined
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`

}