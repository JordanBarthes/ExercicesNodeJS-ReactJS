import React, { useState } from 'react';
import Notification from './Notification';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
	const [state, setState] = useState({
		file: {},
		isUploadedSuccess: false,
		isUploadedError: false,
		isloading: false
	});

	const send = () => {
		let formData = new FormData();
		formData.append('file', state.file);

		return fetch(`http://localhost:3001/upload`, {
			method: 'POST',
			body: formData
		});
	};

	const resetNotification = () => {
		setState({
			...state,
			isUploadedError: false,
			isUploadedSuccess: false,
			isloading: false
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setState({ ...state, isloading: true });
		send()
			.then(() => setState({ ...state, isUploadedSuccess: true }))
			.catch(() => setState({ ...state, isUploadedError: true }));
	};

	const onChange = (e) => setState({ file: e.target.files[0] });

	return (
		<div className="App">
			<ToastContainer />
			<Notification
				notificationUpload={state.isUploadedSuccess}
				notificationError={state.isUploadedError}
				resetNotification={resetNotification}
			/>
			<form className="form" onSubmit={handleSubmit}>
				<label htmlFor="my-file" className="label">
					Select a file...
				</label>
				<input
					onChange={onChange}
					type="file"
					id="my-file"
					name="file"
					required
				/>
				<button type="submit" disabled={state.isloading}>
					Valider
				</button>
			</form>
		</div>
	);
}

export default App;
