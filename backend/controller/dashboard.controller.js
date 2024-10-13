
import { Student } from "../model/student.model.js";
import { Interview } from "../model/interview.model.js";

export const dashboard = async (req, res) => {
  try {
    if (req.user) {
      // populating all students with interviews
      let students = await Student.find({}).populate("interviews");

      // populating all interviews with students
      let interviews = await Interview.find({}).populate("students");

      // diplay dashbord
      return res.render("dashboard", {
        title: "Dashboard",
        all_students: students,
        all_interviews: interviews,
      });
    } else {
      return res.redirect("/signin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
