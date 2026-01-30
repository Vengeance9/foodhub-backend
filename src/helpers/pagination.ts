import { sort } from './../../node_modules/effect/src/Array';
type options = {
  page?: number | string;
  limit?: number | string;
  sortOrder?: string;
  sortBy?: string;
};

type paginationResult = {
    page: number;
    skip: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
    };

export const pagination = (options:options):paginationResult=>{
    const page = options.page?Number(options.page):1
    const limit = options.limit?Number(options.limit):10
    const skip = (page-1)*limit

    const sortBy = options.sortBy?options.sortBy:'createdAt'
    const sortOrder = options.sortOrder==='desc'?'desc':'asc'

    return {page,skip,limit,sortBy,sortOrder}

}