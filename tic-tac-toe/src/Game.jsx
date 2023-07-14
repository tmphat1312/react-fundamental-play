import { useState } from "react";
import Board from "./Board";
import "./Game.css";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];
	const [moveHistory, setMoveHistory] = useState([]);

	function handlePlay(nextSquares, i) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		const nextMoveHistory = [...moveHistory.slice(0, currentMove + 1), i];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
		setMoveHistory(nextMoveHistory);
	}

	function jumpToMove(move) {
		setCurrentMove(move);
	}

	const moves = history.map((squares, move) => {
		let desc;
		let squareCoordinate;
		const index = Math.max(0, move - 1);

		if (moveHistory[index] != null) {
			squareCoordinate = `(${Math.floor(moveHistory[index] / 3) + 1}, ${
				(moveHistory[index] % 3) + 1
			})`;
		} else {
			squareCoordinate = "";
		}

		if (move == 0) {
			desc = `Go to game start`;
		} else {
			desc = `Go to move #${move} ${squareCoordinate}`;
		}

		return (
			<li key={move}>
				<button onClick={() => jumpToMove(move)}>{desc}</button>
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					currentMove={currentMove}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<ol className="game-info">
				<li key={-1}>
					<button onClick={() => jumpToMove(history.length - 1)}>
						Continue the last move!
					</button>
				</li>
				{moves}
			</ol>
		</div>
	);
}
