import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const DataSchema = mongoose.Schema(
    {

        title: {
            type : String,
            required: true
        },
        due_date : {
            type: Date, 
            required: false,
        },
        content : {
            type : String,
            required: false
        }
    },
    {
        timestamps: true
    }

);


const Data = mongoose.model("Data" , DataSchema);

export default Data;