import Square from "./Square";

export default function Board({ xIsNext, currentMove, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWin(squares)) {
			return;
		}

		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares, i);
	}

	let status, move;
	const winner = calculateWin(squares);

	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Current player: ${xIsNext ? "X" : "O"}`;
	}

	if (currentMove == 0) {
		move = `Let's start the game!`;
	} else if (currentMove == 9) {
		move = `The game is draw!`;
	} else {
		move = `You are at move #${currentMove}`;
	}

	const winRouteIndices = new Set(getWinRoute(squares));
	const board = squares.map((square, index) => {
		const isWinRoute = winRouteIndices.has(index);
		return (
			<Square
				winRoute={isWinRoute}
				key={index}
				value={square}
				onSquareClick={() => handleClick(index)}
			/>
		);
	});

	return (
		<div>
			<div className="status">{status}</div>
			<div className="move">{move}</div>
			<div className="board">{board}</div>
		</div>
	);
}

function calculateWin(squares) {
	const lines = [
		[0, 1, 2],
		[0, 3, 6],
		[0, 4, 8],
		[1, 4, 7],
		[2, 4, 6],
		[2, 5, 8],
		[3, 4, 5],
		[6, 7, 8],
	];

	for (const line of lines) {
		const [a, b, c] = line;

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}

function getWinRoute(squares) {
	const lines = [
		[0, 1, 2],
		[0, 3, 6],
		[0, 4, 8],
		[1, 4, 7],
		[2, 4, 6],
		[2, 5, 8],
		[3, 4, 5],
		[6, 7, 8],
	];

	for (const line of lines) {
		const [a, b, c] = line;

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return line;
		}
	}

	return null;
}
