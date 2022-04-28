import {Schema, model} from 'mongoose';

const ReportSchema = new Schema({
    reportingUser: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type:String},
    code: {type:Number},
    creationDate: {type: Date, default:Date.now},
})

export default model('Report', ReportSchema);