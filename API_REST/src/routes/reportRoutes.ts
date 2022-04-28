import {Request, response, Response, Router} from 'express';
import Report from '../models/Report';

import User from '../models/User';

class ReportRoutes{
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getReports(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allReports = await Report.find().populate('reportingUser', 'username');
        if (allReports.length == 0){
            res.status(404).send("There are no reports yet!")
        }
        else{
            res.status(200).send(allReports);
        }
    }

    public async getReport(req: Request, res: Response) : Promise<void> {
        //Arrrglar el buscar per ID
        const reportFound = await Report.findById(req.params.idRep).populate('reportingUser', 'username');
        if(reportFound == null){
            res.status(404).send("The report doesn't exist!");
        }
        else{
            res.status(200).send(reportFound);
        }
    }

    public async addReport(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {reportingUser, description, code} = req.body;
        const newReport = new Report({reportingUser, description, code});
        await newReport.save();

        const user = await User.findById(reportingUser);
        console.log(user);
        user.reportList.push(newReport);
        const userToUpdate = await User.findOneAndUpdate({ name: user.name }, { reportList: user.reportList});


        res.status(200).send('Report added!');
    }


    public async deleteReport(req: Request, res: Response) : Promise<void> {
        const reportToDelete = await Report.findOneAndDelete ({_id: req.params.idRep});
        if (reportToDelete == null){
            res.status(404).send("The report doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 

    public async updateReport(req: Request, res: Response) : Promise<void> {        
        const reportToUpdate = await Report.findOneAndUpdate({_id: req.params.idRep}, req.body);
        console.log(reportToUpdate);
        if(reportToUpdate == null){
            res.status(404).send("The report doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }

    }
    
    routes(){
        this.router.get('/', this.getReports);
        this.router.get('/:idRep', this.getReport);
        this.router.post('/', this.addReport);
        this.router.delete('/:idRep', this.deleteReport);
        this.router.put('/:idRep', this.updateReport);

    }
}

const activityroutes = new ReportRoutes();

export default activityroutes.router;