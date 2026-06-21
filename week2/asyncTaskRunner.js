/**
 * @param {Array<() => Promise<any>>} tasks - Array of functions returning promises
 * @param {number} limit - Maximum concurrent executions
 */
async function promiseAllWithConcurrencyLimit(tasks, limit) {
  // TODO: Your implementation
  const results = new Array(tasks.length);
  let currentIndex = 0;

  async function runTask() {
    if (currentIndex >= tasks.length) return;
    const index = currentIndex++;
    results[index] = await tasks[index]();
  }

  const runningPool = [];
  for (let i = 0; i < limit && i < tasks.length; i++) {
    runningPool.push(runTask());
  }

  await Promise.all(runningPool);
  return results;
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () => 
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

const tasks = [
  createDriverTask(1, 1000),
  createDriverTask(2, 500),
  createDriverTask(3, 1500)
];

// If limit is 2, Task 1 and 2 start. 
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 2).then(results => {
  console.log("All tasks completed:", results);
});