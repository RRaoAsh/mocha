let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const dotenv = require('dotenv');
const should = require('should');
dotenv.config();
let add_a_photo = require("../addaSinglePhoto.json");
let add_a_person = require("../addPersonET.json");
let assign_a_Task_ET = require("../assignTaskET.json");


//Assertion Style
chai.should();

chai.use(chaiHttp);

//describe('Tasks API', () => {

    /**
     * Test the GET route
     */
describe("POST dev/getprofile", () => {
    it("Return error(401) if only authorization sent", (done) => {
        const task = {
            authorization: process.env.AUTHORIZATION,
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .post("/dev/getprofile")
            .set(task)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });

        });      

});

describe("Profile API's", () => {
    it("Return error(403) if only Accesstoken  sent", (done) => {
        const task = {
            accesstoken: process.env.ACCESSTOKEN,
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .post("/dev/getprofile")
            .set(task)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

        }); 
        
    it("Return error(401) if null value is sent for both Accesstoken and Authorization value ", (done) => {
        const task = {
            authorization: "",
            accesstoken: "",
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .post("/dev/getprofile")
            .set(task)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });

        });  

    it("Return Success when both valid authorization and accesstoken sent", (done) => {
        const task = {
            authorization: process.env.AUTHORIZATION,
            accesstoken: process.env.ACCESSTOKEN,
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .get("/dev/getprofile")
            .set(task)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

        });      

});

describe("POST dev/-auth-check/getusers", () => {
    it("Return Success when authorization sent", (done) => {
        const task = {
            authorization: process.env.AUTHORIZATION,
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .post("/dev/-auth-check/getusers")
            .set(task)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 
    it("Return Error when authorization value is not sent", (done) => {
        const task = {
            authorization: "",
            completed: false
        };
        chai.request(process.env.BASEURL)                
            .post("/dev/-auth-check/getusers")
            .set(task)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });

    });        

});

describe("Task API's", () => {
    it("It should GET all the tasks", (done) => {
        chai.request(process.env.BASE_URL)
            .get("/dev/get-tasks")
            .end((err, response) => {
                response.should.have.status(200);
                
            done();
            });
    });

    it("It should GET list of actions for a task", (done) => {
        chai.request(process.env.BASE_URL)
            .get("/dev/get-duty-actions?dutyId=2")
            .end((err, response) => {
                response.should.have.status(200);
                
            done();
            });
    });

});

describe("Ephemeral Team API's", () => {
    it("It should GET all Ephemeral Teams", (done) => {
        chai.request(process.env.BASE_URL)
            .get("/dev/get-ephemeral-teams")
            .end((err, response) => {
                response.should.have.status(200);
                
            done();
            });
    });

    it("Add a single Photo to a Task: Return Success when existing field values are sent", (done) => {
        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.validValues)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when invalid field values are sent", (done) => {
        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.inValidValues)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when photo field is empty", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.photoValueNull)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when nonexisting dutyId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.invalidDutyId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when nonexisting personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.invalidPersonId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when nonexisting actionId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.invalidActionId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when nonexisting assetId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.invalidAssetId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Error when more than 1 photo is sent to existing fields", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.morePhotos)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add a single Photo to a Task: Return Success when measurment field values is null", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/photo-task")
            .set(add_a_photo.noMeasurementValue)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 

    it("It should GET List of tasks under Ephemeral Team", (done) => {
        chai.request(process.env.BASE_URL)
            .get("/dev/get-tasks-by-ephemeral-team?ephemeralTeamId=2")
            .end((err, response) => {
                response.should.have.status(200);
                
            done();
            });
    });

    it("Add Task to ET: Return Success when existing ephemeralTeamId and dutyId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-task-to-ephemeral-team")
            .set(assign_a_Task_ET.validValues)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 

    it("Add Task to ET : Return Error when nonxisting ephemeralTeamId  and existing dutyId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-task-to-ephemeral-team")
            .set(assign_a_Task_ET.invalidEphemeralTeamId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add Task to ET : Return Error when existing ephemeralTeamId and nonexisting dutyId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-task-to-ephemeral-team")
            .set(assign_a_Task_ET.invalidDutyId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add Task to ET : Return Error when nonexisting ephemeralTeamId and nonexisting dutyId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-task-to-ephemeral-team")
            .set(assign_a_Task_ET.invalidValues)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add Person to ET: Return Success when existing ephemeralTeamId and personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-persons-to-ephemeral-team")
            .set(add_a_person.validValues)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 

    it("Add Person to ET : Return Error when nonexisting ephemeralTeamId and existing personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-persons-to-ephemeral-team")
            .set(add_a_person.inValidephemeralTeamId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add Person to ET : Return Error when existing ephemeralTeamId and nonexisting personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-persons-to-ephemeral-team")
            .set(add_a_person.inValidPersonId)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

    it("Add Person to ET : Return Error when existing ephemeralTeamId and already in the team personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-persons-to-ephemeral-team")
            .set(add_a_person.personAlreadyOntheTeam)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });

    }); 

    it("Add Person to ET : Return Error when nonexisting ephemeralTeamId and nonexisting personId is sent", (done) => {

        chai.request(process.env.BASE_URL)                
            .post("/dev/add-persons-to-ephemeral-team")
            .set(add_a_person.inValidValues)
            .end((err, response) => {
                response.should.have.status(403);
            done();
            });

    }); 

   /*it("It should GET Person in the Ephemeral Team with parameters ephemeralTeamID and sharing Task", (done) => {
        chai.request("https://4y7qbhsxoh.execute-api.us-east-1.amazonaws.com")
            .get("/dev/get-persons?ephemeralTeamId=0&sharingTask=false")
            .end((err, response) => {
                response.should.have.status(200);
                
            done();
            });
    }); */

    

});


//});
