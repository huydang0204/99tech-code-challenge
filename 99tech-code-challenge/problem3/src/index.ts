function sum_to_n_a(n: number): number {
    // Mathematical formula approach: n * (n + 1) / 2
    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - constant space
    return n * (n + 1) / 2;
}

function sum_to_n_b(n: number): number {
    // Iterative approach using a for loop
    // Time Complexity: O(n) - linear time
    // Space Complexity: O(1) - constant space
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_c(n: number): number {
    // Recursive approach
    // Time Complexity: O(n) - linear time due to n recursive calls
    // Space Complexity: O(n) - linear space due to call stack
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(100))
console.log(sum_to_n_b(100))
console.log(sum_to_n_c(100))