onmessage = (e) => {
  const { multiply } = e.data;
  // check data is correctly framed
  if (multiply && multiply.array.length) {
    // intentionally delay the execution
    setTimeout(() => {
      // this post back the result to the page
      postMessage({
        result: multiply.array.reduce(
          (firstItem, secondItem) => firstItem * secondItem
        ),
      });
    }, 2000);
  } else {
    postMessage({ result: 0 });
  }
};
