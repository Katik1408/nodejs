const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/demodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    place: { type: String, required: true },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
