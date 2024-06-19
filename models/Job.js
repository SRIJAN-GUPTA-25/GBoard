const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    identifier: {
        type: new Schema({
            name: { type: String },
            value: { type: String, required: true },
        }),
        required: true
    },
    datePosted: { type: Date, required: true },
    validThrough: { type: Date, required: true },
    employmentType: { type: String, enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN', 'VOLUNTEER', 'PER_DIEM', 'OTHER'], required: true },
    hiringOrganization: {
        type: new Schema({
            name: { type: String, required: true },
            sameAs: { type: String }
        }),
        required: true
    },
    jobLocation: {
        type: new Schema({
            streetAddress: { type: String },
            addressLocality: { type: String, required: true },
            addressRegion: { type: String },
            postalCode: { type: String },
            addressCountry: { type: String, required: true }
        }),
        required: true
    },
    baseSalary: {
        type: new Schema({
            currency: { type: String, required: true },
            value: {
                type: new Schema({
                    value: { type: Number, required: true },
                    unitText: { type: String, enum: ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR'], required: true }
                }),
                required: true
            }
        })
    },
    jobLocationType: { type: String, enum: ['TELECOMMUTE'], default: null },
    applicantLocationRequirements: {
        type: new Schema({
            type: { type: String }
        })
    },
    experienceRequirements: {
        type: String,
        default: null
    },
    educationRequirements: {
        type: String,
        default: null
    },
    qualifications: {
        type: String,
        default: null
    },
    skills: {
        type: String,
        default: null
    },
    industry: {
        type: String,
        default: null
    },
    incentives: {
        type: String,
        default: null
    },
    responsibilities: {
        type: String,
        default: null
    },
    workHours: {
        type: String,
        default: null
    },
    jobBenefits: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
