export const setPagination = (
  totalCount: number,
  limit: number,
  page: number,
  baseUrl: string,
  array: any[]
) => {
  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  const nextPageUrl = nextPage
    ? `https://${baseUrl}?page=${nextPage}&limit=${limit}`
    : null;
  const previousPageUrl = previousPage
    ? `https://${baseUrl}?page=${previousPage}&limit=${limit}`
    : null;

  return {
    next: nextPageUrl,
    previous: previousPageUrl,
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    results: [...array],
  };
};
