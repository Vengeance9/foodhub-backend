"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (options) => {
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy ? options.sortBy : 'createdAt';
    const sortOrder = options.sortOrder === 'desc' ? 'desc' : 'asc';
    return { page, skip, limit, sortBy, sortOrder };
};
exports.pagination = pagination;
