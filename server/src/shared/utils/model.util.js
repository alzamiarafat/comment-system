const paginationQueryOptions = (query, pipeline) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const sort = query.sortStage;

  pipeline.push({
    $facet: {
      data: [{ $sort: sort }, { $skip: skip }, { $limit: limit }],
      count: [{ $count: "count" }],
    },
  });

  return pipeline;
};

const paginateData = ({ page, limit }, result) => {
  const comments = result[0].data;
  const total = result[0].count[0]?.count || 0;
  const totalPages = Math.ceil(total / limit);
  return {
    rows: comments,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

module.exports = {
  paginationQueryOptions,
  paginateData,
};
