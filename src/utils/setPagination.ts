export const setPagination = (
  totalCount: number,
  limit: number,
  page: number,
  baseUrl: string,
  array: any[],
  where?: object,
  order?: object
) => {
  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  let nextPageUrl = nextPage ? `${baseUrl}?page=${nextPage}` : null;
  let previousPageUrl = previousPage
    ? `${baseUrl}?page=${previousPage}`
    : null;

  if (limit) {
    nextPageUrl ? (nextPageUrl += `&limit=${limit}`) : null;
    previousPageUrl ? (previousPageUrl += `&limit=${limit}`) : null;
  }

  if (where) {
    for (const [key, value] of Object.entries(where)) {
      nextPageUrl ? (nextPageUrl += `&${key}=${value}`) : null;
      previousPageUrl ? (previousPageUrl += `&${key}=${value}`) : null;
    }
  }

  if (order) {
    for (const [key, value] of Object.entries(order)) {
      nextPageUrl ? (nextPageUrl += `&${key}=${value}`) : null;
      previousPageUrl ? (previousPageUrl += `&${key}=${value}`) : null;
    }
  }

  return {
    next: nextPageUrl,
    previous: previousPageUrl,
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    results: [...array],
  };
};
