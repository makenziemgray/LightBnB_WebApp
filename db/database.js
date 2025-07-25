/**
 * Get all properties with optional filters.
 * @param {Object} options - Search options.
 * @param {number} limit - Max number of results (default 10).
 * @returns {Promise<Array>} Resolves to array of property objects.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  const whereClauses = [];

  // Filter: City
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    whereClauses.push(`city LIKE $${queryParams.length}`);
  }

  // Filter: Owner ID
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    whereClauses.push(`owner_id = $${queryParams.length}`);
  }

  // Filter: Minimum Price
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100); // convert to cents
    whereClauses.push(`cost_per_night >= $${queryParams.length}`);
  }

  // Filter: Maximum Price
  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100); // convert to cents
    whereClauses.push(`cost_per_night <= $${queryParams.length}`);
  }

  // Append WHERE clause if there are any filters
  if (whereClauses.length > 0) {
    queryString += `WHERE ${whereClauses.join(' AND ')}\n`;
  }

  // GROUP BY and HAVING for average rating
  queryString += `
    GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}\n`;
  }

  // Final ORDER and LIMIT
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  console.log("🧪 FINAL QUERY:\n", queryString);
  console.log("🔢 PARAMS:\n", queryParams);

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error('getAllProperties error:', err.message);
      return null;
    });
};
exports.getAllProperties = getAllProperties;