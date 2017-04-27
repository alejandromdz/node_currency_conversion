import * as mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
  amount:Number,
    date: { type: Date, default: Date.now },
  concept:String,
  transaction:String
});
export default mongoose.model('transaction',transactionSchema);