export default function Square({ winRoute, value, onSquareClick }) {
	let className = "square";

	if (winRoute) {
		className = `${className} win-route`;
	}

	return (
		<button className={className} onClick={onSquareClick}>
			{value}
		</button>
	);
}
