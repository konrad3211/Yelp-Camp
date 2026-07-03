const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../modules/campground");
require("dotenv").config();

const images = [
  {
    url: "https://res.cloudinary.com/dbfriowvq/image/upload/v1783075895/pexels-petra-g-3036820-12921226_natggh.jpg",
    filename: "pexels-petra-g-3036820-12921226_natggh",
  },
  {
    url: "https://res.cloudinary.com/dbfriowvq/image/upload/v1783075892/pexels-jedrzej-koralewski-14125120-27694025_ezt64w.jpg",
    filename: "pexels-jedrzej-koralewski-14125120-27694025_ezt64w",
  },
  {
    url: "https://res.cloudinary.com/dbfriowvq/image/upload/v1783075885/pexels-1093389518-27133307_hxhywq.jpg",
    filename: "pexels-1093389518-27133307_hxhywq",
  },
  {
    url: "https://res.cloudinary.com/dbfriowvq/image/upload/v1783075883/pexels-quang-nguyen-vinh-222549-6877993_ezsqhu.jpg",
    filename: "pexels-quang-nguyen-vinh-222549-6877993_ezsqhu",
  },
  {
    url: "https://res.cloudinary.com/dbfriowvq/image/upload/v1783075881/pexels-zh-ru-17397272_tpaz4l.jpg",
    filename: "pexels-zh-ru-17397272_tpaz4l",
  },
];

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedDB() {
  await Campground.deleteMany({});

  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: "69123474fccbc1c9aad5b580",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rerum facere odit exercitationem, maxime architecto minima nam, maiores libero error fuga. Incidunt praesentium possimus ex placeat ullam, optio cupiditate delectus.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [sample(images), sample(images)],
    });

    await camp.save();
  }
}

async function main() {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected to MongoDB");

    await seedDB();

    console.log("Database seeded!");

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error(err);
  }
}

main();
