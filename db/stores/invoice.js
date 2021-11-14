const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const invoiceSchema = require('../schemas/invoice');

class invoiceStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(invoiceSchema);
        const dbPath = `${process.cwd()}/db/databases/invoice.db`;
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }
    validate(data) {
        return this.schemaValidator(data);
    }

    create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return this.db.insert(data);
        }
    }

    read(_id) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find().sort({ updatedAt: -1 }).exec();
    }

    readActive() {
        return this.db.find({isDone: false}).exec();
    }

    remove(_id) {
        return this.db.remove({ _id });
    }

    // search(regex) {
    //     return this.db.find({ $or: [{ type: /+regex+/}, { planet: 'Mars' }] });
    // }

}

module.exports = new invoiceStore();

