//this solution assumes even numbered arrays

var fs = require("fs");
fs.readFile("array.txt", function (err, data) {
  //console.log(data.toString());
  let numa = data.toString().split("\n");
  numa.pop();
  numa = numa.map((val) => {
    return parseInt(val);
  });

  let localInvs = 0;
  let globalInvs = 0;

  const main = () => {
    let sorted = sortt(numa);
    //console.log(localInvs);
    console.log(`Global Inversions: ${globalInvs}`);
    //console.log(sorted);
  };

  var sortt = function (nums) {
    if (nums.length <= 1) {
      return nums;
    }
    //splitarray
    let a = sortt(nums.slice(0, nums.length / 2));
    let b = sortt(nums.slice(nums.length / 2));

    //count side by side inversion
    if (a[a.length - 1] > b[0]) {
      ++localInvs;
    }

    //merge a and b
    let i = 0;
    let j = 0;

    for (let k = 0; k < nums.length; k++) {
      if (a[i] < b[j]) {
        nums[k] = a[i];
        if (i === a.length - 1) {
          return nums.slice(0, k + 1).concat(b.slice(j));
        }
        i++;
      } else if (b[j] <= a[i]) {
        globalInvs += a.length - i;
        nums[k] = b[j];
        if (j === b.length - 1) {
          return nums.slice(0, k + 1).concat(a.slice(i));
        }
        j++;
      }
    }
  };

  main();
});
