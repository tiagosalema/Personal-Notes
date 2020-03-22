let n = 1e3; // first 100 primes
let max_estimate;
// estimates the n-th prime number
with(Math) max_estimate = ceil(n * log(n) + n * log(log(n)));

// set all numbers between 0 and our estimate as being true
let prime_bits = new Array(max_estimate).fill(1);

prime_bits[0] = prime_bits[1] = 0; // 0 and 1 aren't primes

// composite numbers reset to false
for (let i = 2; i < Math.sqrt(max_estimate); i++) {
    for (let j = 2 * i; j < max_estimate; j += i) {
        prime_bits[j] = 0;
    }
}

let primes = prime_bits.map((x, i) => x && i).filter(x => x);