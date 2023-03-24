const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const getPartitionKeyHash = data => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  // If no event is provided, return the trivial partition key
  if (!event) return TRIVIAL_PARTITION_KEY;

  // If the event has no partition key, return the hash of the event
  if (typeof event.partitionKey === 'undefined')
    return getPartitionKeyHash(JSON.stringify(event))

  // If the partition key is provided, validate it and use it
  let candidate = event.partitionKey;
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getPartitionKeyHash(candidate);
  }
  return candidate;
};
