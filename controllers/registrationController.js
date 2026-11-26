const registration = require(".../model/registration");

const registerEvent = async (req, res) => {
    try{
        const{ studentname, email, eventname } = req.body;

        if(!studentname || !email || !eventname || !studentname.trim() || !email.trim() || !eventname.trim()){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }
        const alreadyRegistered = await registration.findOne({
            email: email.trim();
            eventName: eventname.trim();
            status: "registered"
        });

        if(alreadyRegistered){
            return res.status(409).json({message: "Student already registered for this event!"});
        }

        const newRegistration = new registration({
            studentName: studentname.trim(),
            email: email.trim(),
            eventName: eventname.trim(),
            status: "registered"
        });
        await newRegistration.save();

        return res.status(201).json({
            message: "Registered successfully",
            newRegistration
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

const getRegistration = async (req, res) => {
    try{
        const{eventName, status} = req.query;

        if(status && !["registered", "cancelled"].includes(status)){
            return res.status(400).json({message: "Invalid status"});
        }

        const filter = {}

        if(eventName){
            filter.eventName = eventName;
        }
        if(status){
            filter.status = status;
        }

        const registrations = await registration.find(filter);
        return res.status(200).json(registrations);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

const cancelRegistrations = async (req, res) => {
    try{
        const {id} = req.params;
        if(!require("mongoose").isValidObjectId(id)){
            return res.status(400).json({message: "Invalid Id"});
        }
        const Registration = await registration.findById(id);
        if(!Registration){
            return res.status(404).json({message: "Not found"});
        }
        if(Registration.status === "cancelled"){
            return res.status(400).json({message: "Already cancelled"});
        }
        Registration.status = "cancelled";
        await Registration.save();

        return res.status(200).json({
            message: "registratin cancelled",
            Registration
        });

    }
    catch(err){
     console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

module.exports = {
    registerEvent,
    getRegistrations,
    cancelRegistrations
};
