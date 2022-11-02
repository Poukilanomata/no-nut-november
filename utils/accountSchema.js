import { Schema, model, models } from 'mongoose';

const accountNNNSchema = new Schema({
    name: String,
    last_validation: Number,
    awards: Array,
    password: String,
    fails_dates: Array,
}, {timestamps: true});

const Account = models.AccountNNN || model('AccountNNN', accountNNNSchema);

export default Account