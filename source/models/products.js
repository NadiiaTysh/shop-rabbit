import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const staffPerson = await this._transformCreateStaffPerson(this.data);
        const data = await products.create(staffPerson);

        return { hash: data.hash };
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await products.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage)
            .populate({ path: 'classes', select: '-_id -__v'});

        return data;
    }

    async getOneRecord(hash) {
        const data = await products.findOne({ hash })
            .populate({ path: 'classes', select: '-_id -__v'});

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await products.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await products.findOneAndRemove({ hash });

        return data;
    }
}
