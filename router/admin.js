const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin"); // Ensure this path is correct
const router = express.Router();

// Admin Registration Route
router.post("/register", async (req, res) => {
    try {
        const { adminName, email, password, phone, hospitaltype } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            adminName,
            email,
            password: hashedPassword,
            phone,
            hospitaltype
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Admin Login Route
router.post("/login", async (req, res) => {
    try {
        const adminExist = await Admin.findOne({ email: req.body.email });
        if (!adminExist) {
            return res.status(400).json({ message: "Email does not exist", success: false });
        }
        const validedPassword = await bcrypt.compare(req.body.password, adminExist.password);
        if (!validedPassword) {
            return res.status(400).json({ message: "Invalid Password", success: false });
        }
        const token = jwt.sign(
            { userid: adminExist._id },
            "abc",
            { expiresIn: "1h" }
        );
        res.json({
            message: "Login Successful",
            success: true,
            data: token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update Admin Details
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delete Admin
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.patch('/employee/doctor-timetable/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedTimetable = req.body;
    
        // Validate the updated timetable
        if (!updatedTimetable || !updatedTimetable.day || !updatedTimetable.timing) {
          return res.status(400).json({ message: 'Invalid timetable data' });
        }
    
        // Update the timetable of the existing doctor
        const updatedEmployee = await employee.findByIdAndUpdate(id, {
          $push: {
            'timetable': updatedTimetable
          }
        }, { new: true });
    
        if (!updatedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        res.json(updatedEmployee);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})


// **Make sure this line is present at the end**
module.exports = router;
