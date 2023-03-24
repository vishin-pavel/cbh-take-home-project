const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const getPartitionKeyHash = data => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event?.partitionKey;
  if (typeof candidate === 'undefined')
    return getPartitionKeyHash(JSON.stringify(event))

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getPartitionKeyHash(candidate);
  }
  return candidate;
};
