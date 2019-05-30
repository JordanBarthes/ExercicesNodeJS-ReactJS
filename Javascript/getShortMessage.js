function getShortMessage(array) {
	return array.filter((message) => message.length < 50);
}