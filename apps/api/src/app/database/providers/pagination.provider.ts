import { Model } from 'mongoose';
import { PagedQueryModel } from '../../models/page-query.model';
import { PaginationDTO } from '../../models/pagination.dto';

export class PageQueryProvider {
  // @ts-ignore
  public static readonly providePageQuery = async <T, R>(document: Model<R>, query: any | any[], page: PaginationDTO): Promise<PagedQueryModel<T>> => {
    const queries = [];

    if (Array.isArray(query)) {
      (query as any[]).forEach(q => queries.push(q));
    } else {
      if (Object.keys(query).length) {
        queries.push({ $match: query });
      }
    }
    // Sort to newest
    queries.push({ $sort : { creation: -1  }});

    const skip = page.skip ? page.skip : 0;
    const limit = page.limit ? page.limit : 10;
    queries.push({ $group: {
        _id: null,
        count: { $sum: 1 },
        results: {
          $push: '$$ROOT'
        }
      }
    });
    queries.push({ $project: {
        _id: 0,
        count: 1,
        rows: { $slice: ['$results', skip, limit] }
      }});
    const aggregateResult = await document.aggregate(queries);
    let result = new PagedQueryModel<T>();
    if (aggregateResult.length) {
      result = aggregateResult[0] as PagedQueryModel<T>;
      result.skip = skip;
      result.limit = limit;
    } else {
      result.count = 0;
      result.skip = 0;
    }
    result.limit = limit;
    return Promise.resolve(result);
  }
}
