const fs = require("fs")
const csv = require("csv-parser")

try {
    fs.unlinkSync("canada.txt")
    console.log("canada.txt has been deleted!")
} catch (err) {
    console.log("canada.txt does not exist!")
}

try {
    fs.unlinkSync("usa.txt")
    console.log("usa.txt has been deleted!")
} catch (err) {
    console.log("usa.txt does not exist!")
}

console.log("----------------------")

fs.writeFileSync("canada.txt", "")
console.log("canada.txt created")


fs.writeFileSync("usa.txt", "")
console.log("usa.txt created")


fs.createReadStream("input_countries.csv")
.pipe(csv())
.on("data",(data) => {
    if(data.country == "Canada"){
        fs.appendFileSync("canada.txt",`${data.country},${data.year},${data.population}\n`)
    }
    if(data.country == "United States"){
        fs.appendFileSync("usa.txt",`${data.country},${data.year},${data.population}\n`)
    }
}).on("end", () => {
    console.log("----------------------")
    console.log("Final result of canada.txt:")
    console.log(fs.readFileSync("canada.txt", "utf8"))
    console.log("----------------------")
    console.log("Final result of usa.txt:")
    console.log(fs.readFileSync("usa.txt", "utf8"))
})
