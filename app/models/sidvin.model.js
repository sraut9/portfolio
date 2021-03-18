module.exports = mongoose => {
  var schema = mongoose.Schema(
      {
        day: Date,
        name: String,
        description: String,
        type: String,
        invested_nav_price: Number,
        unit_no_of_shares: Number,
        last_nav_price: Number,
        profit: Number,
        current_total: Number,
        percentage: Number
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sidvin = mongoose.model("sidvin", schema);

  return Sidvin;
};
