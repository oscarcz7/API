const mongoose = require('mongoose');
// Setup schema
const serviceSchema = mongoose.Schema({
    serviceID: Number,
    serviceType: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        min: 0
    },
    petId: Number,
    creation_date: {
        type: Date
    },
    estimated_date: {
        type: Date
    },
    status: {type:String, default: 'Enviado'}
});
// Export service model
const Service = module.exports = mongoose.model('service', serviceSchema);
export default Service;