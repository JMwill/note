/**
 * 给定两个链表，每个节点只能包含一个非负且小于10的整数，将每个对应位置
 * 的数相加，多于10的向后进一位数
 *
 * 思路分析：根据结构，两个数相加后进行取余并将进位加到后面的数中。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var log = console.log;

function ListNode(val) {
	this.val = val;
	this.next = null;
}

var addTwoLN = function(l1, l2) {
	var sum, rest, carry;
	sum = l1.val + l2.val;
	rest = sum % 10;
	carry = parseInt(sum / 10);

	return {
		val: new ListNode(rest),
		carry: carry
	};
};


var addTwoNumbers = function(l1, l2) {
	var returnLN = tempLN = new ListNode(0);
	var rel;

	while (l1 && l2) {

		rel = addTwoLN(l1, l2);
		tempLN.next = rel.val;

		tempLN = tempLN.next;
		l1 = l1.next;
		l2 = l2.next;

		if (rel.carry > 0) {
			l1 ? (l1.val += rel.carry) : (l1 = new ListNode(rel.carry));
		}

	}

	var restLN = l1 || l2;
	while (restLN) {
		var rel = addTwoLN(restLN, new ListNode(0));
		tempLN.next = rel.val;

		tempLN = tempLN.next;
		restLN = restLN.next;

		if (rel.carry > 0)
			restLN ? (restLN.val += rel.carry) : (restLN = new ListNode(rel.carry));
	}

	returnLN = returnLN.next;
	return returnLN;
	
};

var testArr = [
	[
	 {val: 9, next: {val: 9, next: null } },
	 {val: 9, next: null }
	],
	[
	 {val: 2, next: {val: 4, next: {val: 3, next: null } } },
	 {val: 5, next: {val: 6, next: {val: 4, next: null } } }
	],
	[
	 {val: 0, next: {val: 4, next: {val: 3, next: null } } },
	 {val: 5, next: {val: 6, next: {val: 4, next: {val: 3, next: null } } } }
	],
	[
	 {val: 2, next: {val: 4, next: {val: 3, next: null } } },
	 {val: 5, next: {val: 6, next: {val: 4, next: {val: 3, next: null } } } }
	],
	[
	 {val: 9, next: {val: 9, next: {val: 9, next: {val: 9, next: null } } } },
	 {val: 9, next: {val: 9, next: {val: 9, next: null } } }
	],
	[
	 {val: 2, next: {val: 4, next: {val: 3, next: {val: 1, next: null } } } },
	 {val: 5, next: {val: 6, next: {val: 4, next: null } } },
	]
]

function printResult(ln) {
	var val = [];
	while (ln) {
		val.push(ln.val);
		ln = ln.next;
	}
	return '[' + val.join(', ') + ']';
}
testArr.forEach((l1Withl2) => {
	log('-----------begin-------------');
	log(printResult(addTwoNumbers.apply(null, l1Withl2)));
	log('---------------------------->');
})
