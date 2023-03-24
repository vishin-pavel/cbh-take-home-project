const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const getHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("use event hash as partition key when event has no partition key", () => {
    const event = {
      data: "some data",
    };
    const eventHash = getHash(JSON.stringify(event))
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(eventHash);
  });

  it("stringify partition key if it is not a string", () => {
    const event = {
      data: "some data",
      partitionKey: 123,
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("use hash if partition key is longer than 256", () => {
    const event = {
      data: "some data",
      partitionKey: "a".repeat(257),
    };
    const partitionKeyHash = getHash(event.partitionKey);
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(partitionKeyHash);
  });
});
