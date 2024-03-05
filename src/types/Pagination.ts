export type Pagination<PaginationEntity> = {
    data: PaginationEntity[];
    nextPage: string;
    previousPage: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    lastPage: number;
    totalRecords: number;
};
