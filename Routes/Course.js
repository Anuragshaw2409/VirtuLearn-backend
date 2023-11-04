const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Courses = require('../Models/Course');

// -------------------fetch courses to display---------

router.get('/fetchcourses', fetchuser, async (req, res) => {

    try {
        const courses = await Courses.find({ teacherid: req.user });
        res.status(200).json(courses);


    } catch (error) {
        res.status(500).json({ "Error": "Internal server error from catch" })
    }

})



// ----------------creating course-----------
router.post('/createcourse', fetchuser, async (req, res) => {
    try {
        const newCourse = await Courses.create({
            "teacherid": req.user,
            "name":req.body.name,
            "videoUrl": req.body.videoUrl,
            "notesUrl": req.body.notesUrl,
            "quiz": req.body.quiz
        })

        return res.status(200).json("Course Created");
        console.log(newCourse.id);

    } catch (error) {
        return res.status(500).json("Internal server error");

    }

})

// ------------------delete course---------------
router.delete('/deletecourse/:id', fetchuser, async (req, res) => {

    try {
        
        const course = await Courses.findById(req.params.id);
        if (course) {
            const teacherid = await course.teacherid.toString();
            if (req.user === teacherid) {
    
                const deletedCourse = await Courses.findByIdAndDelete(req.params.id);
                console.log(deletedCourse);
                return res.status(200).json("Deleted Successfuly");
    
            }
            else{
                return res.status(401).json("Unauthorized");
            }
        }
        return res.status(404).json("Course does not exists");
    } catch (error) {
        return res.status(500).json("Internal server error from delete")
    }

}
)

// --------------------------Edit Course--------------------

router.put('/editcourse/:id',fetchuser, async(req,res)=>{

    try {
        
        const course = await Courses.findById(req.params.id);
        if (course) {
            const teacherid = await course.teacherid.toString();
            if (req.user === teacherid) {
    
                const editedCourse=await Courses.findByIdAndUpdate(req.params.id,{
                    "videoUrl": req.body.videoUrl,
                    "notesUrl": req.body.notesUrl,
                    "quiz": req.body.quiz

                })
               return res.status(200).json("Edited successfuly");
                console.log(editedCourse);
    
            }
            else{
                return res.status(401).json("Unauthorized");
            }
        }
        return res.status(404).json("Course does not exists");
    } catch (error) {
        return res.status(500).json("Internal server error from edit")
    }


})
















module.exports = router;