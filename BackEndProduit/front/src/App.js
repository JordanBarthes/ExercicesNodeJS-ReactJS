import React, { useState } from 'react';
import './App.css';

function App() {
	const [state, setState] = useState();

	const send = () => {
		let formData = new FormData();
		formData.append('file', state);

		fetch(`http://localhost:3001/upload`, {
			method: 'POST',
			body: formData
		}).then(
			(res) => {
				console.log(res);
			},
			(err) => console.log(err)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		send();
	};

	return (
		<div className="App">
			<form className="form" onSubmit={handleSubmit}>
				<input
					onChange={(e) => setState(e.target.files[0])}
					type="file"
					name="file"
					required
				/>
				<input type="submit" />
			</form>
		</div>
	);
}

export default App;
