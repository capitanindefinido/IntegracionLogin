import { faker } from "@faker-js/faker"

faker.local = 'es'

const generateProduct = () => {
    return {
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: faker.commerce.price(),
        stock: faker.string.numeric(),
        category: faker.commerce.productAdjective(), 
        availability: faker.commerce.productMaterial()
    }
}

const generateProducts = () => {
    let numberOfProduct = parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))

    let products = []
    for(let i= 0; i < numberOfProduct; i++){
        products.push(generateProduct())
    }
    return products
}

export default generateProducts