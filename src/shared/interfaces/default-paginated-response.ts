export interface DefaultPaginatedResponse<T> {
	total_rows: {
		limit: number;
		page: number;
		totalpages: number;
		totalrows: number;
	};
	result_rows: T;
}
