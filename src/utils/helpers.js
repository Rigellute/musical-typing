export function chunkArray(array, size) {
  return array.reduce((arr, it, i) => {
    const segment = Math.floor(i / size);

    if (!arr[segment]) {
      arr[segment] = [];
    }

    arr[segment].push(it);

    return arr;
  }, []);
}
