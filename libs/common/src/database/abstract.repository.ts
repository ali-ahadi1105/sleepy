/* eslint-disable prettier/prettier */
import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: Types.ObjectId
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true);
        if(!document) {
            this.logger.warn("Document was not found with this filter query");
            throw new NotFoundException("Document was not found");
        }
        return document;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, updateQuery, { new: true }).lean<TDocument>(true);
        if(!document) {
            this.logger.warn("Document was not found with this filter query");
            throw new NotFoundException("Document was not found");
        }
        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }
}