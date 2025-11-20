const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../modules/campground");


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Yelp-camp');
    await console.log("connected to mongoose")
}


const sample = array => array[(Math.floor(Math.random() * array.length))]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '69123474fccbc1c9aad5b580',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rerum facere odit exercitationem, maxime architecto minima nam, maiores libero error fuga. Incidunt praesentium possimus ex placeat ullam, optio cupiditate delectus.`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbfriowvq/image/upload/v1763225147/YelpCamp/ptxihkuylv3k7cyepsze.png',
                    filename: 'YelpCamp/ptxihkuylv3k7cyepsze',
                },
                {
                    url: 'https://res.cloudinary.com/dbfriowvq/image/upload/v1763215101/YelpCamp/tkd7awcuwq9farweyknh.png',
                    filename: 'YelpCamp/tkd7awcuwq9farweyknh',
                }
            ]

        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
}) 