const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = new Schema({

    teacherid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },

    videoUrl:{
        type: String,
        required: true
    },
    notesUrl:{
        type: String,
        required: true 
    },
    quiz:[
    {
        question:String,
        options: [String],
        CorrectOption: Number

    }
]
});

const Course = mongoose.model('course', CourseSchema);
module.exports  = Course;