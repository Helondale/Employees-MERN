require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(cors({
  allowedHeaders: ['Content-Type']
}))

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.get("/employees/:search", async (req, res) => {
  const searchTerm = req.params.search.toLowerCase();
  const employees = await EmployeeModel.find({ $text: { $search: searchTerm } });
  return res.json(employees);
});

app.get("/employee/notes/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee.notes)

});

app.post("/employee/notes/:id", async (req, res, next) => { 
const notes = req.body.notes;

try {
  let employee = await EmployeeModel.findById(req.params.id);
  employee.notes.push(notes)
  await employee.save()
  return res.json(employee.notes);
} catch (err) {
  return next(err);
}
 });

 ////////
app.get("/missing", async (req, res) => {
const employee = await EmployeeModel.find({present: false})
return res.json(employee)
});

app.get("/employee/present/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee.present);
});

app.post("/employee/present/:id", async (req, res) => {
  const present = req.body.present;

  try {
    let employee = await EmployeeModel.findById(req.params.id);
    employee.present = present;
    await employee.save()
    return res.json(employee.present);
  } catch (err) {
    return err;
  }
   });

app.get("/years-of-experience/:experience", async (req, res) => {
  const experience = req.params.experience
  const employee = await EmployeeModel.find({experience: experience});
  return res.json(employee)
}) 

app.post("/years-of-experience/:experience", async (req, res) => {
  const experience = req.body.experience;

  try {
    let employee = await EmployeeModel.findById(req.params.id);
    employee.experience = experience;
    await employee.save()
    return res.json(employee.experience);
  } catch (err) {
    return err;
  }
   });


////////   

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});


app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});


app.get('/api/types/', async (req, res) => {
      const data = await EquipmentModel.find();
      res.json(data)
});



app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
