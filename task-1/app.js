// importing built-in modules
const fs = require("fs");
const path = require("path");

// defining the file path safely
const filePath = path.join(__dirname, "data.json");

// read JSON file
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file: ", err);
    return;
  }

  // parse JSON data (convert string -> JS object)
  const users = JSON.parse(data);
  console.log("Current users: ", users);

  // adding a new user
  users.push({ name: "Ali", age: 31 });

  // writing updated data back to file
  fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log("Error writing file: ", err);
      return;
    }

    console.log("\nData added successfully!");
  });
});
