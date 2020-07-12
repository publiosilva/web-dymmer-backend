function group(items) {
  return items.reduce((acc, item) => {
    (acc[item] = acc[item] || []).push(item);

    return acc;
  }, {});
}

export default group;
