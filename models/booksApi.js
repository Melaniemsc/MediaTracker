export const booksApiSchema ={
    name: { type: String, required: true },
    serie: { type: String, required: false },
    number: { type: Number, required: false },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: false},
}
