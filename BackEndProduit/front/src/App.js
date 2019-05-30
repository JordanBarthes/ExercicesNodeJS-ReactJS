import React, { useState } from 'react';
import Notification from './Notification';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
	const [state, setState] = useState({
		file: {},
		isUploadedSuccess: false,
		isUploadedError: false
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
		setState({ isUploadedError: false, isUploadedSuccess: false });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		send()
			.then(() => setState({ isUploadedSuccess: true }))
			.catch(() => setState({ isUploadedError: true }));
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
				<input onChange={onChange} type="file" name="file" required />
				<button type="submit">Valider</button>
			</form>
		</div>
	);
}

export default App;
