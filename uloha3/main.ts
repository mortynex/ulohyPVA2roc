function nextPalindrome(from: number, radix: number): number {
	while (true) {
		const palindrome = (++from).toString(radix);
		if (palindrome === palindrome.split("").reverse().join("")) {
			return from;
		}
	}
}
